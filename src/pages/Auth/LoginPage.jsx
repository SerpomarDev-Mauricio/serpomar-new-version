import { useState } from "react";
import { useForm } from "react-hook-form";

// Importa tu video de fondo. Ajusta la ruta si es necesario.
import axios from "axios";
import lodoSiiHub from "../../assets/images/logo-hubemar.png";
import logoNodhus from "../../assets/images/nodhus.png";
import BackgroundVideoNodhus from "../../assets/videos/bodega.webm";
import BackgroundVideoSiiHub from "../../assets/videos/video-fondo-login_DyAiXism.mp4";
import ButtonEmpresa from "../../components/specific/ButtonEmpresa";
import useEmpresa from "../../contexts/empresa/useEmpresa";
import { useNavigate } from "react-router-dom";
import logoSerpomar from "../../assets/images/logo-serpomar.png";

// Componente simple de Modal para mensajes
const MessageModal = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg shadow-xl ${bgColor} ${textColor} max-w-sm text-center`}
      >
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const LoginPage = () => {
  // Inicializa react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { empresa } = useEmpresa();
  const Navigate = useNavigate();
  // Estados para el modal de mensajes
  const [modalMessage, setModalMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    console.log("Datos del formulario:", data);
    console.log("causa");

    setModalMessage(""); // Limpiar mensajes anteriores
    // const client = axios.create({
    //   baseURL: "https://backendtest-testing.up.railway.app/api/login"
    // });

    // Asegúrate de que tengas los valores de email y password disponibles aquí,
    // por ejemplo, de un estado en un componente React o de campos de formulario.
    const userEmail = data.email; // Reemplaza con el valor real
    const userPassword = data.password; // Reemplaza con el valor real

    axios
      .post("https://backendtest-testing.up.railway.app/api/login", {
        usuario: userEmail,
        password: userPassword,
      })
      .then((response) => {
        // Aquí recibes la respuesta exitosa del login
        console.log(response.data); // Muestra la respuesta completa
        // Guarda el token si lo recibes:
        const token = response.data.token; // Ajusta según la estructura de tu respuesta
        localStorage.setItem("token", token);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userId", response.data.user_id);
        localStorage.setItem("rol_Id", response.data.rol_id);
        localStorage.setItem("cliente", response.data.cliente);
        Navigate("/dashboard"); // Redirige al usuario a la página principal o dashboard
        setModalMessage("¡Inicio de sesión exitoso! Redirigiendo...");
      })
      .catch((error) => {
        // Maneja los errores aquí (ej. credenciales incorrectas, errores de red)
        console.error("Error during login:", error);
        if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          console.error("No response received:", error.request);
        } else {
          // Algo más causó el error
          console.error("Error message:", error.message);
        }
      });

    // Nota: console.log(post) fuera del .then()/.catch()
    // se ejecutará antes de que la promesa se resuelva,
    // por lo que 'post' probablemente estará vacío o será el valor inicial.
    // Mueve tu lógica que depende de 'post' dentro del .then()
    // o usa useEffect/equivalente si estás en un framework.

    // try {
    //   const response = await authService.login(data.email, data.password);
    //   // Suponiendo que el backend devuelve el token dentro de response.data.data.token
    //   const token = response.data.token;

    //   if (token) {
    //     localStorage.setItem("token", token);
    //     // Si tienes un idioma preferido, también podrías guardarlo aquí
    //     // localStorage.setItem('lang', 'es');
    //     console.log("Login exitoso. Token guardado:", token);
    //     setMessageType("success");
    //     setModalMessage("¡Inicio de sesión exitoso! Redirigiendo...");
    //     Navigate("/dashboard"); // Redirige al usuario a la página principal o dashboard
    //   } else {
    //     setModalMessage("No se recibió un token válido.");
    //     setMessageType("error");
    //   }
    // } catch (err) {
    //   console.error("Error durante el login:", err);
    //   // El error.message puede venir del throw en authService.js
    //   setModalMessage(
    //     err.message || "Error al iniciar sesión. Verifica tus credenciales."
    //   );
    //   setMessageType("error");
    // } finally {
    //   // setLoading(false);
    // }

    // try {
    //   // Simular una llamada a una API de login
    //   // En un entorno real, aquí harías un fetch/axios a tu backend
    //   await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula 2 segundos de carga

    //   // Simular éxito o fallo basado en alguna condición (ej: usuario/contraseña)
    //   if (data.username === "admin" && data.password === "password") {
    //     setModalMessage("¡Inicio de sesión exitoso! Redirigiendo...");
    //     setMessageType("success");
    //     // Aquí normalmente redirigirías al usuario: navigate('/dashboard');
    //   } else {
    //     setModalMessage("Credenciales incorrectas. Inténtalo de nuevo.");
    //     setMessageType("error");
    //   }
    // } catch (error) {
    //   console.error("Error al iniciar sesión:", error);
    //   setModalMessage(
    //     "Hubo un error al intentar iniciar sesión. Por favor, inténtalo más tarde."
    //   );
    //   setMessageType("error");
    // }
  };

  const handleCloseModal = () => {
    setModalMessage("");
    setMessageType("");
  };

  return (
    <>
      {/* Contenedor del Login (por encima del video) */}
      <div className="relative z-10 dark:bg-gray-800 m-6 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden min-h-[500px]">
        {/* Columna Izquierda: Bienvenida */}
        <div className="w-20 absolute z-500 top-0 left-0 translate-x-6 -translate-y-2">
          <img
            src={empresa === "Nodhus" ? logoSerpomar : lodoSiiHub}
            className="h-24 object-contain"
            alt="logo Nodhus"
          />
        </div>
        <div className="w-full md:w-1/2 bg-blue-700 dark:bg-blue-900 text-white p-8 flex flex-col items-center justify-center gap-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
          <div className="w-3/5 flex justify-center">
            <img
              src={empresa === "Nodhus" ? logoNodhus : lodoSiiHub}
              className="h-24 object-contain"
              alt="logo Nodhus"
            />
          </div>
          <h1 className="text-4xl font-bold">BIENVENIDO</h1>
          <ButtonEmpresa />

          <p className="text-lg text-center">
            {empresa === "Nodhus"
              ? `Accede al sistema de gestión logística más confiable y eficiente. Optimiza tus procesos de transporte, almacenamiento y distribución con la agilidad y visibilidad que tu empresa necesita.`
              : `Accede al sistema de gestión aduanera más confiable y eficiente.
            Administra tus operaciones con la seguridad y transparencia que tu
            empresa necesita.`}
          </p>
        </div>

        {/* Columna Derecha: Formulario de Login */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ingresa tus credenciales para acceder al sistema
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Nombre de usuario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  {...register("email", {
                    required: "El nombre de usuario es requerido",
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-200"
                >
                  Recordarme
                </label>
              </div>
              {empresa === "Nodhus" && <button type="button" className="cursor-pointer hover:underline" onClick={()=>{Navigate("/recovery")}}>Olvidaste contraseña</button>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting} // Deshabilita el botón durante el envío
            >
              {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </button>
            {empresa === "Nodhus" && (
              <button
                type="button"
                className="w-full bg-blue-600 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => Navigate("/register")} // Deshabilita el botón durante el envío
              >
                Registrarse
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Modal de Mensajes */}
      <MessageModal
        message={modalMessage}
        type={messageType}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default LoginPage;
