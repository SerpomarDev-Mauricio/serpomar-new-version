import React from 'react';
import { useAuth } from '../contexts/hooks';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar'; // Import the Navbar component

const ProfilePage = () => {
  const { user, logout } = useAuth();

  // If user is not available, show access denied message
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar /> {/* Include Navbar even on denial page */}
        <div className="flex flex-col items-center justify-center flex-grow bg-backgroundLight p-4">
          <h1 className="text-4xl font-bold text-danger mb-4">Acceso Denegado</h1>
          <p className="text-lg text-textDark">Por favor, inicia sesión para ver tu perfil.</p>
          <Link to="/auth" className="mt-6 bg-primary hover:bg-green-700 text-textLight font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  // If user is authenticated, display profile information
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Include the Navbar here */}
      <div className="flex-grow flex flex-col items-center justify-center bg-backgroundLight p-4">
        <div className="backdrop-blur-md p-8 rounded-lg shadow-custom-lg text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-primary mb-6 font-heading">Mi Perfil</h1>

          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-center space-x-3"> {/* Increased space-x */}
              <i className="fas fa-envelope text-accent text-2xl"></i> {/* Larger icon */}
              <p className="text-lg text-textDark">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <i className="fas fa-user-tag text-accent text-2xl"></i>
              <p className="text-lg text-textDark">
                <span className="font-semibold">Rol:</span> {user.role}
              </p>
            </div>
            {user.name && (
              <div className="flex items-center justify-center space-x-3">
                <i className="fas fa-user text-accent text-2xl"></i>
                <p className="text-lg text-textDark">
                  <span className="font-semibold">Nombre:</span> {user.name}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-4 mt-8"> {/* Increased top margin */}
            <button
              onClick={logout}
              className="bg-danger hover:bg-red-700 text-textLight font-bold py-3 px-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-opacity-50"
            >
              Cerrar Sesión
            </button>
            <Link
              to="/dashboard"
              className="bg-secondary hover:bg-slate-600 text-textLight font-bold py-3 px-6 rounded-full transition-colors duration-300 inline-block no-underline focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
            >
              Ir al Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;