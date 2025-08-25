import axios from "axios";

// Definir las URLs base desde variables de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://backendtest-testing.up.railway.app";;
const AUTH_URL = import.meta.env.VITE_AUTH_URL || "https://backendtest-testing.up.railway.app";

// Instancia de Axios para peticiones de autenticación
const axiosAuthInstance = axios.create({
    baseURL: AUTH_URL,
    withCredentials: true,
});

// Instancia de Axios para el resto de las peticiones (ya configurada en el ejemplo)
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// --- Lógica para el refresco de token (mantener la misma que ya tienes) ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// Interceptor de petición para añadir token y headers (para ambas instancias)
const requestInterceptor = config => {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang') || 'es';

    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers['accept-language'] = lang;
    config.headers['service-slug'] = 'eaty-pos';
    return config;
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosAuthInstance.interceptors.request.use(requestInterceptor);

// Interceptor de respuesta para manejo de errores y refresco de token
const catchResponseError = async err => {
    const originalRequest = err.config;

    // Asumimos que 401 es para token expirado/no autorizado, o 403 si tu backend lo maneja así para esta lógica
    if (
        (err.response?.status === 401 || err.response?.status === 403)
        &&
        !originalRequest._retry
    ) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        resolve(axiosInstance(originalRequest));
                    },
                    reject: (err) => {
                        reject(err);
                    }
                });
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // Asumimos que el endpoint para refrescar es /auth/refresh
            const res = await axiosAuthInstance.post('/auth/refresh', {});

            const newToken = res.data.data.token;
            localStorage.setItem('token', newToken);
            // Actualiza los tokens en las cabeceras comunes de ambas instancias
            axiosAuthInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            processQueue(null, newToken);

            return axiosInstance(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem('token');
            // Redirige o fuerza la recarga para que el usuario inicie sesión de nuevo
            window.location.reload();
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    return Promise.reject(err);
};

axiosInstance.interceptors.response.use(res => res, catchResponseError);
axiosAuthInstance.interceptors.response.use(res => res, catchResponseError);

export { axiosAuthInstance, axiosInstance };