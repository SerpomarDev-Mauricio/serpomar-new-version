// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Importa Navigate para redirigir
import { useAuth } from '../contexts/hooks'; // Importa el hook useAuth

// Componente para proteger rutas.
// Recibe 'children' (el componente de página a proteger) y 'requiredRoles' (opcional).
const ProtectedRoute = ({ requiredRoles, redirectPath="/" }) => {
  const { user, hasRole } = useAuth(); // Obtiene el usuario y la función hasRole del contexto

  // Paso 1: Verificar si el usuario está autenticado.
  if (!user) {
    // Si no hay un usuario (no logueado), redirige a la página de login.
    // 'replace' asegura que el historial de navegación no guarde la ruta protegida fallida.
    return <Navigate to="/auth" replace />;
  }

  // Paso 2: Si hay roles requeridos, verificar si el usuario tiene al menos uno de ellos.
  // Esto es para autorización basada en roles (RBAC).
  if (requiredRoles && requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    // Si el usuario está logueado pero no tiene el rol necesario,
    // muestra una alerta y lo redirige a la página principal.
    alert('Acceso denegado: No tienes los permisos necesarios para acceder a esta sección.');
    return <Navigate to={redirectPath} replace />; // O podrías redirigir a una página de "Acceso No Autorizado"
  }

  // Si el usuario está autenticado y tiene los roles correctos (o no se requieren roles),
  // renderiza el componente hijo (la página que se desea proteger).
  return <Outlet/>; // Utiliza Outlet para renderizar el componente hijo dentro de la ruta protegida
};

export default ProtectedRoute;