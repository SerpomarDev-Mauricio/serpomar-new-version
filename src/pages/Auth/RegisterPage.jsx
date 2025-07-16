import React from "react";
import { useForm } from "react-hook-form"; // Para manejar formularios fácilmente
import { Link } from "react-router-dom"; // Para navegación (asegúrate de tener react-router-dom instalado)
// import { useAuth } from '../contexts/authHooks'; // Si tienes un contexto de autenticación

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const { login, registerUser, isLoading, error } = useAuth(); // Descomenta si usas useAuth
  const [isLoginMode, setIsLoginMode] = React.useState(true); // Para alternar entre Login y Sign up

  // Función dummy para simular el envío del formulario
  const onSubmit = async (data) => {
    console.log("Form data:", data);
    // if (isLoginMode) {
    //   await login(data.email, data.password);
    // } else {
    //   await registerUser(data.email, data.password, data.name);
    // }
    alert(
      `Modo: ${isLoginMode ? "Login" : "Sign Up"}\nDatos: ${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* ESTO ES CLAVE PARA EL FONDO "FUERA DE LO COMÚN"
        - absolute inset-0: Cubre todo el espacio del padre (la página completa aquí)
        - z-0: Asegura que esté en la capa más baja
        - bg-cover bg-center: Ajusta la imagen de fondo para que cubra y esté centrada
        - filter blur-8px brightness-0.7: Aplica un desenfoque y reduce el brillo para el efecto "oscuro/difuminado"
        - transform scale-105: Escalamos un poco para evitar bordes blancos por el blur
      */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/diseñoHojasVerde.jpg')", // Ruta a tu imagen de hojas
          filter: "blur(8px) brightness(0.7)", // Desenfoque y oscurecimiento
          transform: "scale(1.05)", // Para evitar bordes blancos del desenfoque
        }}
      ></div>

      {/* Contenedor principal del formulario: Relative para que los paneles internos se posicionen correctamente */}
      <div className="relative z-10 flex w-full max-w-5xl rounded-lg shadow-custom-xl overflow-hidden">
        {/* Panel Izquierdo: "Let's Get Started" */}
        {/* bg-backgroundDarkPanel: Un color oscuro definido en tus variables CSS para paneles */}
        {/* text-textLight: Color de texto claro para este fondo oscuro */}
        <div className="flex-1 bg-backgroundDarkPanel text-textLight p-12 flex flex-col justify-center items-start">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
            Let's Get Started
          </h1>
          <p className="text-lg text-textLight opacity-80 mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenes
            placerat ultricies libero eu pharetra. Vestibulum a ultricies augue.
          </p>
          <div className="text-sm text-textLight opacity-70 flex items-center">
            presented by{" "}
            <img
              src="/placeholder_logo.png"
              alt="Logo"
              className="inline-block h-6 ml-2 filter brightness-150"
            />
          </div>
        </div>

        {/* Panel Derecho: Formulario */}
        {/* bg-cardBackground: Un color de fondo para tarjetas/paneles, adaptado al tema */}
        {/* text-textDark: Color de texto oscuro para este fondo */}
        <div className="flex-1 bg-cardBackground p-12 flex flex-col justify-center items-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-textDark mb-8">
            {isLoginMode ? "Login" : "Sign up"}
          </h2>

          {/* {error && <p className="text-danger mb-4">{error}</p>} // Descomenta si usas useAuth */}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
            {!isLoginMode && (
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-textDark text-sm font-medium mb-2 opacity-80"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  {...register("name", {
                    required: !isLoginMode ? "Name is required" : false,
                  })}
                  className="w-full p-2 bg-transparent border-b border-inputBorder text-textDark placeholder-textDark/60 focus:outline-none focus:border-primary transition-colors duration-200"
                />
                {errors.name && (
                  <p className="text-danger text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-textDark text-sm font-medium mb-2 opacity-80"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
                className="w-full p-2 bg-transparent border-b border-inputBorder text-textDark placeholder-textDark/60 focus:outline-none focus:border-primary transition-colors duration-200"
              />
              {errors.email && (
                <p className="text-danger text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-textDark text-sm font-medium mb-2 opacity-80"
              >
                Create Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                className="w-full p-2 bg-transparent border-b border-inputBorder text-textDark placeholder-textDark/60 focus:outline-none focus:border-primary transition-colors duration-200"
              />
              {errors.password && (
                <p className="text-danger text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {!isLoginMode && (
              <div className="mb-6">
                <label
                  htmlFor="repeat-password"
                  className="block text-textDark text-sm font-medium mb-2 opacity-80"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  placeholder="Repeat password"
                  {...register("repeat-password", {
                    validate: (value) =>
                      value === document.getElementById("password").value ||
                      "Passwords do not match",
                  })}
                  className="w-full p-2 bg-transparent border-b border-inputBorder text-textDark placeholder-textDark/60 focus:outline-none focus:border-primary transition-colors duration-200"
                />
                {errors["repeat-password"] && (
                  <p className="text-danger text-xs mt-1">
                    {errors["repeat-password"].message}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-primary text-textLight font-bold rounded-full hover:bg-green-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              // disabled={isLoading} // Descomenta si usas useAuth
            >
              {/* {isLoading ? 'Loading...' : (isLoginMode ? 'Login' : 'Sign Up')} // Descomenta si usas useAuth */}
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Divisor "OR" */}
          <div className="relative my-8 w-full max-w-xs flex items-center">
            <hr className="flex-grow border-t border-inputBorder" />
            <span className="px-4 text-textDark text-sm opacity-80">OR</span>
            <hr className="flex-grow border-t border-inputBorder" />
          </div>

          {/* Botones de redes sociales */}
          <div className="flex space-x-4 mb-8">
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-700 text-textLight text-xl hover:bg-blue-800 transition-colors duration-200 shadow-md"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-400 text-textLight text-xl hover:bg-blue-500 transition-colors duration-200 shadow-md"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-textLight text-xl hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
              <i className="fab fa-google"></i>
            </a>
          </div>

          {/* Toggle entre Login y Sign up */}
          <p className="text-sm text-textDark opacity-80">
            {isLoginMode ? "Don't have an account?" : "Already a member?"}
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="ml-2 text-primary font-bold hover:underline focus:outline-none"
            >
              {isLoginMode ? "Sign up here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 dark:bg-purple-600"></div>

        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 dark:bg-blue-600"></div>

        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 dark:bg-indigo-600"></div>
      </div>
    </div>
  );
};

export default LoginPage;
