// src/pages/AdminPage.jsx
import React from 'react';
import { useAuth } from '../contexts/hooks'; // Importa el hook useAuth
import { Link } from 'react-router-dom'; // Para la navegación

const AdminPage = () => {
  const { user, logout, hasRole } = useAuth(); // Obtiene el usuario, logout, y hasRole del contexto

  // Aunque la ruta ya está protegida por <ProtectedRoute requiredRoles={['admin']}>,
  // es una buena práctica tener una doble verificación o un mensaje amigable aquí.
  // Si por alguna razón el usuario llega aquí sin ser admin, le mostraremos esto.
  if (!user || !hasRole('admin')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
          <p className="text-lg text-gray-700 mb-6">
            No tienes permisos para acceder a esta página.
          </p>
          <Link
            to="/"
            className="mt-6 bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Volver al Inicio
          </Link>
          {user && ( // Si está logueado pero no es admin, ofrecer cerrar sesión
            <button
              onClick={logout}
              className="mt-4 ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    );
  }

  // Si el usuario es un admin, muestra el contenido de la página de administración
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">Panel de Administración</h1>

        <p className="text-lg text-gray-800 mb-8">
          ¡Bienvenido, <span className="font-semibold">{user.email}</span>!
          Tienes acceso completo a las herramientas de administración.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta de Gestión de Usuarios */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2">Gestión de Usuarios</h2>
            <p className="text-sm">Administra roles, permisos y usuarios del sistema.</p>
            <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              <i className="fas fa-users mr-2"></i> Ver Usuarios
            </button>
          </div>

          {/* Tarjeta de Configuración del Sistema */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2">Configuración del Sistema</h2>
            <p className="text-sm">Ajusta las configuraciones globales de la aplicación.</p>
            <button className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              <i className="fas fa-cogs mr-2"></i> Configurar
            </button>
          </div>

          {/* Tarjeta de Reportes y Análisis */}
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2">Reportes y Análisis</h2>
            <p className="text-sm">Genera informes y analiza datos de la aplicación.</p>
            <button className="mt-4 bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              <i className="fas fa-chart-line mr-2"></i> Ver Reportes
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/dashboard"
            className="bg-gray-300 hover:bg-gray-400 text-textDark font-bold py-3 px-6 rounded-full transition-colors duration-300 inline-block no-underline focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            <i className="fas fa-tachometer-alt mr-2"></i> Ir al Dashboard
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;