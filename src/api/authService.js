import { axiosAuthInstance } from './axios'; // Asegúrate de que la ruta sea correcta

const authService = {
    /**
     * Realiza la petición de login al backend.
     * @param {string} usuario - El usuario del usuario.
     * @param {string} password - La contraseña del usuario.
     * @returns {Promise<Object>} La respuesta del servidor, que debería contener el token.
     */
    login: async (usuario, password) => {
        try {
            // El endpoint para login suele ser algo como /auth/login o /login
            const response = await axiosAuthInstance.post('/api/login', {
                usuario: usuario,
                password: password,
            });
            return response.data; // Retorna los datos de la respuesta (ej: { data: { token: '...' } })
        } catch (error) {
            // Si el error tiene una respuesta (ej. 401 Unauthorized), la lanza
            if (error.response) {
                throw error.response.data;
            }
            // Si es un error de red u otro, lanza el error completo
            throw error;
        }
    },

    /**
     * Cierra la sesión del usuario.
     * Esto generalmente implica eliminar el token y podría llamar a un endpoint de logout.
     */
    logout: () => {
        localStorage.removeItem('token'); // Elimina el token del almacenamiento local
        localStorage.removeItem('lang'); // O cualquier otra cosa que almacenes
        // Podrías opcionalmente llamar a un endpoint /auth/logout en tu backend
        // await axiosAuthInstance.post('/auth/logout');
    },

    /**
     * Verifica si el usuario está autenticado comprobando la existencia del token.
     * @returns {boolean} True si hay un token, false en caso contrario.
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;