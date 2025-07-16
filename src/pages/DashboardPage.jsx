// src/pages/DashboardPage.jsx
import { Link } from 'react-router-dom'; // Para la navegación
import { useAuth } from '../contexts/hooks'; // Importa el hook useAuth

const DashboardPage = () => {
  // Obtiene el objeto 'user' (información del usuario),
  // la función 'logout' (para cerrar sesión),
  // y la función 'hasRole' (para verificar roles/permisos) del contexto de autenticación.
  const { user, logout, hasRole } = useAuth();

  // Opcional: Aunque esta página está protegida por ProtectedRoute,
  // puedes añadir una verificación extra o un mensaje amigable si el 'user' no está disponible.
  // Esto es más un "fail-safe" o para escenarios donde la protección de ruta puede ser saltada (no ideal).
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
        <p className="text-lg text-gray-700">Por favor, inicia sesión para ver el dashboard.</p>
        <Link to="/auth" className="mt-6 bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }

  // Si el usuario está autenticado, muestra el contenido del dashboard.
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      
      <div className="bg-white dark:bg-black p-8 rounded-lg shadow-xl text-center max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">Panel de Control</h1>

        <p className="text-xl text-gray-800 mb-8">
          ¡Bienvenido, <span className="font-semibold">{user.email}</span>!
          Tu rol es: <span className="font-semibold text-blue-600">{user.role}</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Ejemplo de Tarjeta: Mi Perfil */}
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2">Mi Perfil</h2>
            <p className="text-sm">Edita y visualiza tu información personal.</p>
            <Link
              to="/profile"
              className="mt-4 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full inline-block transition-colors duration-300"
            >
              <i className="fas fa-user-circle mr-2"></i> Ver Perfil
            </Link>
          </div>

          {/* Ejemplo de Tarjeta: Mis Proyectos (condicional para rol 'user') */}
          {hasRole('user') && ( // Solo visible si el usuario tiene el rol 'user'
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">Mis Proyectos</h2>
              <p className="text-sm">Consulta y gestiona tus proyectos activos.</p>
              <button className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                <i className="fas fa-folder-open mr-2"></i> Ver Proyectos
              </button>
            </div>
          )}

          {/* Ejemplo de Tarjeta: Acceso a Administración (condicional para rol 'admin') */}
          {hasRole('admin') && ( // Solo visible si el usuario tiene el rol 'admin'
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">Panel de Admin</h2>
              <p className="text-sm">Accede a las herramientas de administración.</p>
              <Link
                to="/admin"
                className="mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full inline-block transition-colors duration-300"
              >
                <i className="fas fa-cog mr-2"></i> Ir a Admin
              </Link>
            </div>
          )}

          {/* Puedes añadir más tarjetas con otras funcionalidades del dashboard aquí */}
          <div className="bg-gray-400 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2">Ayuda y Soporte</h2>
            <p className="text-sm">Encuentra respuestas a tus preguntas y contáctanos.</p>
            <button className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              <i className="fas fa-question-circle mr-2"></i> Ayuda
            </button>
          </div>

        </div>

        {/* Botones de navegación y acción */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 text-textDark font-bold py-3 px-6 rounded-full transition-colors duration-300 inline-block no-underline focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            <i className="fas fa-home mr-2"></i> Volver a Inicio
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

export default DashboardPage;