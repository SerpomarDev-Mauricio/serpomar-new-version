// src/contexts/AuthContext.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../constants"; // Importa el objeto de contexto creado
// No necesitamos importar useAuth aquí, ya que este es el proveedor.

// Componente Proveedor del Contexto de Autenticación.
// Este componente envuelve a los componentes hijos y les proporciona el valor
// del contexto (estado del usuario y funciones de autenticación).
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Hook para la navegación programática de React Router DOM

  // Estado principal que guarda la información del usuario autenticado.
  // Se inicializa intentando cargar el usuario desde localStorage para persistir la sesión.
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      // Si hay datos en localStorage, los parsea de JSON a un objeto JavaScript.
      // Si no hay, o hay un error, el usuario será null.
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al cargar usuario desde localStorage:", error);
      return null;
    }
  });

  // Efecto secundario que se ejecuta cada vez que el estado 'user' cambia.
  // Se encarga de guardar o eliminar la información del usuario en localStorage.
  useEffect(() => {
    if (user) {
      // Si hay un objeto de usuario, lo guarda como una cadena JSON.
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Si el usuario es null (ej. después de un logout), elimina la entrada.
      localStorage.removeItem("user");
    }
  }, [user]); // La dependencia [user] asegura que el efecto se ejecute cuando 'user' cambie.

  // Función asíncrona para manejar el inicio de sesión.
  const login = async (email, password) => {
    console.log(`Intentando iniciar sesión con: ${email}`);

    try {
      // *** LÓGICA DE AUTENTICACIÓN REAL CON TU API AQUÍ ***
      // En una aplicación real, harías una petición HTTP (ej. con fetch o Axios)
      // a tu backend para autenticar las credenciales.
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Simulación de respuesta de la API:
          if (email === "admin@example.com" && password === "password") {
            const loggedInUser = {
              email,
              role: "admin",
              token: "fake-admin-token-123",
              name: "Admin User",
            };
            resolve({ success: true, user: loggedInUser });
          } else if (email === "user@example.com" && password === "password") {
            const loggedInUser = {
              email,
              role: "user",
              token: "fake-user-token-456",
              name: "Regular User",
            };
            resolve({ success: true, user: loggedInUser });
          } else {
            resolve({ success: false, message: "Credenciales incorrectas." });
          }
        }, 1000); // Simula un retraso de 1 segundo en la respuesta de la API
      });

      if (response.success) {
        setUser(response.user); // Actualiza el estado global 'user'
        navigate("/dashboard"); // Redirige al usuario al dashboard después de un login exitoso
        return { success: true, message: "Inicio de sesión exitoso." };
      } else {
        return {
          success: false,
          message: response.message || "Error al iniciar sesión.",
        };
      }
    } catch (error) {
      console.error("Error en el login:", error);
      return {
        success: false,
        message: "Ocurrió un error en el servidor. Inténtalo de nuevo.",
      };
    }
  };

  // Función para manejar el cierre de sesión.
  const logout = () => {
    setUser(null); // Establece el usuario a null, lo que activa el useEffect para limpiar localStorage
    navigate("/auth"); // Redirige al usuario a la página de login/registro
  };

  // Función para verificar si el usuario logueado tiene uno o varios roles específicos.
  const hasRole = (requiredRoles) => {
    // Si no hay usuario o el usuario no tiene un rol definido, no puede tener el rol requerido.
    if (!user || !user.role) {
      return false;
    }

    // Asegura que 'requiredRoles' sea siempre un array para que '.includes()' funcione correctamente.
    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles]; // Convierte un solo rol a un array de un solo elemento
    }

    // Comprueba si el rol del usuario actual está presente en la lista de roles requeridos.
    return requiredRoles.includes(user.role);
  };

  // El objeto 'value' que será proporcionado por el contexto.
  // Contiene el estado 'user' y las funciones 'login', 'logout', 'hasRole'.
  const contextValue = {
    user, // El objeto del usuario autenticado (o null)
    login, // Función para iniciar sesión
    logout, // Función para cerrar sesión
    hasRole, // Función para verificar roles
  };

  // El componente AuthContext.Provider envuelve a sus hijos y les pasa 'contextValue'.
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
