// src/api/axiosInstance.js

import axios from "axios";

// Define la URL base de tu API.
// Es buena práctica tener esto en una variable de entorno (.env)
// para poder cambiarla fácilmente entre desarrollo y producción.
// Por ejemplo: VITE_API_BASE_URL=https://backendtest-testing.up.railway.app/api
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://backendtest-testing.up.railway.app/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: Puedes añadir interceptores aquí para manejar tokens de autenticación
// automáticamente en cada petición, o para manejar errores globales.
axiosInstance.interceptors.request.use(
  (config) => {
    // Por ejemplo, añadir el token de autenticación a las cabeceras
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores global, por ejemplo, si el token expira
    if (error.response && error.response.status === 401) {
      console.error("Token expirado o no autorizado. Redirigiendo al login...");
      localStorage.clear(); // Limpia cualquier dato de sesión
      window.location.href = "/login"; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
