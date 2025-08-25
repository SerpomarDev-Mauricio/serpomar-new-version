// src/api/auth.js

import axiosInstance from "./axiosInstance";

const authService = {
  /**
   * Realiza una petición de login a la API.
   * @param {string} usuario - El nombre de usuario o email.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<object>} Los datos de respuesta del login (token, userId, etc.).
   */
  login: async (usuario, password) => {
    try {
      const response = await axiosInstance.post("/login", {
        usuario,
        password,
      });
      return response.data; // Axios devuelve la respuesta en .data
    } catch (error) {
      // Axios envuelve los errores de respuesta en error.response
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error("Error de respuesta del servidor:", error.response.data);
        throw new Error(
          error.response.data.message ||
            "Credenciales inválidas. Por favor, inténtalo de nuevo."
        );
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
        throw new Error(
          "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde."
        );
      } else {
        // Algo más causó el error
        console.error("Error al configurar la petición:", error.message);
        throw new Error(
          "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
        );
      }
    }
  },

  // Aquí podrías añadir otras funciones de autenticación como:
  // register: async (userData) => { ... },
  // logout: () => { localStorage.clear(); },
  // refreshToken: async () => { ... }
};

export default authService;
