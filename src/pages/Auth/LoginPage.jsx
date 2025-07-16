// src/pages/Auth/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/hooks"; // Importa el hook useAuth
import WaterWaveBackground from "../../components/layout/WaterWaveBackground"; // Asegúrate de la ruta correcta
// Si usas un componente InputGroup, impórtalo aquí.
// import InputGroup from '../../components/ui/InputGroup'; // Ajusta la ruta si es diferente

const LoginPage = () => {
  const { login } = useAuth(); // Obtenemos la función 'login' del contexto de autenticación

  // Estados para los campos del formulario de Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // Estados para los campos del formulario de Registro (si lo implementas aquí)
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  // Estado para la animación de cambio de panel (Login vs Registro)
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // Manejadores para la animación de paneles
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    setLoginErrorMessage(""); // Limpia mensajes de error al cambiar de panel
    setRegisterErrorMessage(""); // Limpia mensajes de error al cambiar de panel
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    setLoginErrorMessage(""); // Limpia mensajes de error al cambiar de panel
    setRegisterErrorMessage(""); // Limpia mensajes de error al cambiar de panel
  };

  // Manejador para el envío del formulario de LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginErrorMessage(""); // Limpiar mensajes de error anteriores

    // Llama a la función 'login' del AuthContext
    const result = await login(loginEmail, loginPassword);

    if (!result.success) {
      setLoginErrorMessage(result.message); // Muestra el mensaje de error si el login falla
    }
    // Si es exitoso, la función 'login' en AuthContext ya se encarga de la redirección.
  };

  // Manejador para el envío del formulario de REGISTRO (funcionalidad simulada por ahora)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterErrorMessage("");

    // --- AQUÍ IRÍA TU LÓGICA REAL DE REGISTRO CON TU API ---
    // Por ahora, solo simula un registro.
    console.log("Intentando registrar:", {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });

    // Simulación de registro exitoso/fallido
    return new Promise((resolve) => {
      setTimeout(() => {
        if (registerEmail === "fail@example.com") {
          setRegisterErrorMessage(
            "Este email ya está registrado o el registro falló."
          );
          resolve({ success: false });
        } else {
          alert("Registro exitoso! Por favor, inicia sesión.");
          setRegisterErrorMessage("");
          setIsRightPanelActive(false); // Vuelve al panel de login después del registro
          resolve({ success: true });
        }
      }, 1000);
    });
  };

  return (
    // Contenedor principal para toda la página de login/registro
    // Asegura que ocupe toda la pantalla y centre el contenido.
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Fondo animado de ondas */}
      <WaterWaveBackground />

      {/* Contenedor del formulario de login/registro */}
      <div
        className={`relative  rounded-lg shadow-xl overflow-hidden w-[768px] max-w-full min-h-[480px] z-10
          ${isRightPanelActive ? "right-panel-active" : ""}`}
      >
        {/* Panel de REGISTRO (SIGN UP) */}
        {/* Este panel se mueve y se hace visible cuando isRightPanelActive es true */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-10
            ${
              isRightPanelActive
                ? "translate-x-full opacity-100 z-50 animate-show"
                : "opacity-0"
            }`}
        >
          <form
            className=" flex flex-col items-center justify-center h-full px-12 text-center"
            onSubmit={handleRegisterSubmit}
          >
            <h1 className="font-bold text-2xl mb-2 text-textDark">
              Crear Cuenta
            </h1>
            <div className="social-container flex my-5">
              <a
                href="#"
                className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-0-5 h-10 w-10 text-textDark transition-all duration-300 hover:-translate-y-px hover:shadow-md"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-0-5 h-10 w-10 text-textDark transition-all duration-300 hover:-translate-y-px hover:shadow-md"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a
                href="#"
                className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-0-5 h-10 w-10 text-textDark transition-all duration-300 hover:-translate-y-px hover:shadow-md"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-xs mb-4">
              o usa tu email para registrarte
            </span>
            {registerErrorMessage && (
              <p className="text-red-500 text-sm mt-2">
                {registerErrorMessage}
              </p>
            )}
            {/* Campos de Input para Registro */}
            {/* Si tienes un componente InputGroup, úsalo aquí */}
            <input
              type="text"
              placeholder="Nombre"
              className=" border-none p-3 my-2 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className=" border-none p-3 my-2 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className=" border-none p-3 my-2 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="rounded-full border border-primary bg-gradient-to-r from-primary to-buttonGreen text-xs font-bold py-3 px-10 tracking-wider uppercase transition-transform duration-80 active:scale-95 focus:outline-none shadow-md mt-5"
            >
              REGISTRARSE
            </button>
          </form>
        </div>

        {/* Panel de LOGIN (SIGN IN) */}
        {/* Este panel es el visible por defecto y se mueve cuando isRightPanelActive es true */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-20
            ${isRightPanelActive ? "translate-x-full opacity-0" : ""}`}
        >
          <form
            className=" flex flex-col items-center justify-center h-full px-12 text-center"
            onSubmit={handleLoginSubmit}
          >
            <h1 className="font-bold text-2xl mb-2 text-textDark">
              Iniciar Sesión
            </h1>
            <div className="social-container flex my-5">
              <a
                href="#"
                className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-0-5 h-10 w-10 text-textDark transition-all duration-300 hover:-translate-y-px hover:shadow-md"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-0-5 h-10 w-10 text-textDark transition-all duration-300 hover:-translate-y-px hover:shadow-md"
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a
                href="#"
                className="social border border-gray-300 rounded-full inline-flex justify-center items-center m-0-5 h-10 w-10 text-textDark transition-all duration-300 hover:-translate-y-px hover:shadow-md"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-xs mb-4">
              o usa tu cuenta de email
            </span>
            {loginErrorMessage && (
              <p className="text-sm mt-2">{loginErrorMessage}</p>
            )}
            {/* Campos de Input para Login */}
            {/* Si tienes un componente InputGroup, úsalo aquí */}
            <input
              type="email"
              placeholder="Email"
              className="border-none p-3 my-2 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className= "border-none p-3 my-2 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <a href="#" className="text-sm my-4 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
            <button
              type="submit"
              className="rounded-full border border-primary bg-gradient-to-r from-primary to-buttonGreen text-xs font-bold py-3 px-10 tracking-wider uppercase transition-transform duration-80 active:scale-95 focus:outline-none shadow-md mt-5"
            >
              INICIAR SESIÓN
            </button>
          </form>
        </div>

        {/* Contenedor de Superposición (Overlay) */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-50
            ${isRightPanelActive ? "-translate-x-full" : ""}`}
        >
          <div
            className={`bg-gradient-to-r from-[#6a11cb] to-accent bg-no-repeat bg-cover bg-center relative left-[-100%] h-full w-[200%] transform transition-transform duration-600 ease-in-out
              ${isRightPanelActive ? "translate-x-1/2" : ""}`}
          >
            {/* Panel Izquierdo del Overlay */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out
                ${isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <h1 className="font-bold text-2xl mb-2">
                ¡Bienvenido de nuevo!
              </h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5">
                Para mantenerte conectado con nosotros, por favor inicia sesión
                con tu información personal.
              </p>
              <button
                className="rounded-full border border-textLight bg-transparent text-xs font-bold py-3 px-10 tracking-wider uppercase transition-transform duration-80 active:scale-95 focus:outline-none hover:bg-opacity-10"
                onClick={handleSignInClick}
              >
                INICIAR SESIÓN
              </button>
            </div>

            {/* Panel Derecho del Overlay */}
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out right-0
                ${isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="font-bold text-2xl mb-2">
                ¡Hola, Amigo!
              </h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5">
                Ingresa tus datos personales y comienza tu viaje con nosotros.
              </p>
              <button
                className="rounded-full border border-textLight bg-transparent text-xs font-bold py-3 px-10 tracking-wider uppercase transition-transform duration-80 active:scale-95 focus:outline-none hover:bg-opacity-10"
                onClick={handleSignUpClick}
              >
                REGISTRARSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
