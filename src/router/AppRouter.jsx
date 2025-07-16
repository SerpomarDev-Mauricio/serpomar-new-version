// src/router/AppRouter.jsx
import { Route, Routes } from "react-router-dom";

// Importa tus componentes de página
import AdminPage from "../pages/AdminPage"; // Página de administración
import LoginPage from "../pages/Auth/LoginPage"; // Tu componente principal de Login/Registro animado
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage"; // Página de perfil de usuario

// Importa los componentes de autenticación y protección
import ProtectedRoute from "./ProtectedRoute"; // <-- Importa el componente de Ruta Protegida
import RegisterPage from "../pages/auth/RegisterPage";

// Componente para la página 404 (No Encontrado)
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-700 mb-4">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-gray-700">
        Lo sentimos, la página que buscas no existe.
      </p>
    </div>
  );
};

// Asegúrate de que tus componentes de página (ProfilePage, AdminPage)
// estén definidos en sus respectivos archivos como te indiqué anteriormente.
// Si no los tienes creados aún, créalos o estas importaciones darán error.

const AppRouter = () => {
  return (
    <Routes>
      {/* ==================================== */}
      {/* ======== Rutas Públicas ======== */}
      {/* ==================================== */}

      {/* Ruta para la página principal de inicio */}
      <Route path="/" element={<HomePage />} />

      {/* Ruta para la página de login/registro (App.jsx con animación de paneles) */}
      {/* Esta ruta no necesita protección porque es para que los usuarios se autentiquen. */}
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ==================================== */}
      {/* ======== Rutas Protegidas ======== */}
      {/* ==================================== */}

      {/* Ruta protegida para el Dashboard. Solo requiere que el usuario esté autenticado. */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      {/* Ruta protegida para el Perfil del usuario. Solo requiere que el usuario esté autenticado. */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Ruta protegida para la página de Administración.
              Requiere que el usuario esté autenticado Y tenga el rol 'admin'. */}
      <Route element={<ProtectedRoute requiredRoles={["admin"]} redirectPath="/dashboard"/>}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      {/* ==================================== */}
      {/* ======== Ruta 404 (No Encontrado) ======== */}
      {/* ==================================== */}

      {/* Ruta comodín que coincide con cualquier URL que no haya coincidido con las anteriores. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
