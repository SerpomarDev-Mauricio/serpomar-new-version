import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react"; // Import Mail icon from Lucide React
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { LockOpen } from "lucide-react";

// --- Message Modal Component ---
// A reusable modal component to display success or error messages to the user.
const MessageModal = ({ message, type, onClose }) => {
  if (!message) return null; // Don't render if there's no message

  // Determine background and text color based on message type
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`p-6 rounded-lg shadow-xl ${bgColor} ${textColor} max-w-sm w-full text-center transform transition-all duration-300 scale-105`}
      >
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

// --- RestorePassword Component ---
// This component handles the password recovery process, allowing users to request a password reset email.
const RestorePasswordPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset, // Used to clear form fields after submission
  } = useForm();
  // const password = watch("contraseña");

  const Navigate = useNavigate();

  // Function to handle the password recovery form submission
  const onSubmitRecovery = async (data) => {
    console.log("Datos del formulario de recuperación:", data);
    setModalMessage(""); // Clear any previous messages

    try {
      // Simulate an API call for password recovery.
      // Replace this with your actual backend password recovery endpoint.
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second loading time

      // Example success/failure logic based on a dummy condition
      if (data.email.includes("success")) {
        // If email contains "success", simulate a successful recovery email sent
        setModalMessage(
          "¡Correo de recuperación enviado! Revisa tu bandeja de entrada."
        );
        setMessageType("success");
        reset(); // Clear form fields on successful submission
      } else {
        setModalMessage(
          "Error al enviar el correo de recuperación. Inténtalo de nuevo."
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error during password recovery:", error);
      setModalMessage(
        "Hubo un error al intentar recuperar tu contraseña. Por favor, inténtalo más tarde."
      );
      setMessageType("error");
    }
  };

  // Function to close the message modal
  const handleCloseModal = () => {
    setModalMessage("");
    setMessageType("");
  };

  // Function to simulate navigation back to the login page (in a real app, this would use react-router-dom's navigate)
  const handleBackToLogin = () => {
    console.log("Navigating back to login...");
    // In a real application with React Router, you would use:
    Navigate("/auth");
    // For this standalone example, we'll just log it.
  };

  return (
    <>
      {/* Recovery Password Form Container */}
      <div className="relative w-full z-20 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md transform transition-all duration-500 ease-in-out p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Restablecer Contraseña
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Ingresa tu correo electrónico y nueva contraseña para recuperar la
          cuenta.
        </p>
        <form onSubmit={handleSubmit(onSubmitRecovery)} className="space-y-4">
          {/* Correo Electrónico Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <Mail className="h-5 w-5" /> {/* Lucide Mail icon */}
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("email", {
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Formato de correo electrónico inválido",
                  },
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
            <label htmlFor="contraseña" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <Lock className="h-5 w-5" /> {/* Lucide Mail icon */}
              </span>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                placeholder="Contraseña"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("contraseña", {
                  required: "El Contraseña es requerido",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  //   message: "Formato de Contraseña inválido",
                  // },
                })}
              />
            </div>
            {errors.contraseña && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contraseña.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirm_contraseña" className="sr-only">
              confirmar contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <LockOpen className="h-5 w-5" /> {/* Lucide Mail icon */}
              </span>
              <input
                type="password"
                id="confirm_contraseña"
                name="contrasena"
                placeholder="confirmar contraseña"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("confirm_contraseña", {
                  required: "El confirmar contraseña es requerido",
                  validate: (value) =>
                    value === watch("contraseña") || "Las contraseñas no coinciden",
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  //   message: "Formato de confirmar contraseña inválido",
                  // },
                })}
              />
            </div>
            {errors.confirm_contraseña && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_contraseña.message}
              </p>
            )}
          </div>

          {/* Send Recovery Email Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed duration-200 transform transition-transform hover:scale-[1.02]"
            disabled={isSubmitting} // Disable button during submission
          >
            {isSubmitting ? "Enviando..." : "Restablecer Contraseña"}
          </button>

          {/* Back to Login Button */}
          <button
            type="button" // Important: set type to "button" to prevent form submission
            onClick={handleBackToLogin}
            className="w-full mt-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          >
            Volver a Iniciar Sesión
          </button>
        </form>
      </div>

      {/* Message Modal */}
      <MessageModal
        message={modalMessage}
        type={messageType}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default RestorePasswordPage;
