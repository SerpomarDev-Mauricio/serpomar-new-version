// En HomePage.jsx (ejemplo)
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-backgroundLight">
      <h1 className="text-4xl font-bold text-primary mb-4">¡Bienvenido a la Página Principal!</h1>
      <p className="text-lg text-textDark mb-8">Explora nuestra aplicación.</p>
      <nav className="flex space-x-4">
        <Link to="/auth" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Ir a Login/Registro
        </Link>
        <Link to="/dashboard" className="text-blue-300 bg-red-600 hover:bg-green-700 font-bold py-2 px-4 rounded-full">
          Ir al Dashboard
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;