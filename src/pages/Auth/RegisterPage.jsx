import { useState } from "react";
import { useForm } from "react-hook-form";
import BackgroundVideoNodhus from "../../assets/videos/bodega.webm";
// No necesitamos useNavigate ni BrowserRouter aquí si es una página independiente sin enrutamiento interno
// Si esta página se va a integrar en una aplicación con React Router, entonces necesitarías BrowserRouter en el componente raíz de tu aplicación.

// Import Lucide React Icons for a modern look
import {
  Briefcase,
  Calendar,
  IdCard,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

// --- RegisterForm Component ---
// This component handles the user registration process.
// It's designed to be reusable and takes callbacks for messages and navigation.
const RegisterForm = ({ onBackToLogin, setModalMessage, setMessageType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch, // Used to watch the password field for confirmation
    reset, // Used to clear form fields after submission
  } = useForm();

  const password = watch("password"); // Get the value of the password field

  // Function to handle the registration form submission
  const onSubmitRegister = async (data) => {
    console.log("Datos del formulario de registro:", data);
    setModalMessage(""); // Clear any previous messages

    try {
      // Simulate an API call for user registration.
      // Replace this with your actual backend registration endpoint.
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second loading time

      // Example success/failure logic based on a dummy condition
      if (data.email.includes("success")) {
        // If email contains "success", simulate a successful registration
        setModalMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setMessageType("success");
        reset(); // Clear form fields on successful registration
        // onBackToLogin(); // This would typically navigate back to login in a multi-page app
      } else {
        setModalMessage("Error al registrar. Inténtalo de nuevo.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setModalMessage(
        "Hubo un error al intentar registrarte. Por favor, inténtalo más tarde."
      );
      setMessageType("error");
    }
  };

  // Options for the identification type dropdown
  const identificationTypes = [
    "Cédula de Ciudadanía",
    "Tarjeta de Identidad",
    "Pasaporte",
    "Cédula de Extranjería",
  ];

  return (
    <div className="w-full p-8 flex flex-col justify-center bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
      {" "}
      {/* Adjusted rounding for standalone */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Registrarse
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Crea una nueva cuenta para acceder al sistema
      </p>
      <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-4">
        {/* Contenedor Flex para campos uno al lado del otro */}
        <div className="flex flex-wrap -mx-2">
          {" "}
          {/* Negative margin to counteract padding on children */}
          {/* Tipo Identificación */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            {" "}
            {/* Added px-2 for horizontal spacing and mb-4 for vertical */}
            <label htmlFor="identificationType" className="sr-only">
              Tipo de Identificación
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <IdCard className="h-5 w-5" /> {/* Lucide IdCard icon */}
              </span>
              <select
                id="identificationType"
                name="identificationType"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("identificationType", {
                  required: "El tipo de identificación es requerido",
                })}
              >
                <option value="">Tipo de identificación</option>
                {identificationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {errors.identificationType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identificationType.message}
              </p>
            )}
          </div>
          {/* Identificación */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="identification" className="sr-only">
              Identificación
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <IdCard className="h-5 w-5" /> {/* Lucide IdCard icon */}
              </span>
              <input
                type="text"
                id="identification"
                name="identification"
                placeholder="Número de Identificación"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("identification", {
                  required: "La identificación es requerida",
                })}
              />
            </div>
            {errors.identification && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identification.message}
              </p>
            )}
          </div>
          {/* Primer Nombre */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="firstName" className="sr-only">
              Primer Nombre
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <User className="h-5 w-5" /> {/* Lucide User icon */}
              </span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Primer Nombre"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("firstName", {
                  required: "El primer nombre es requerido",
                })}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          {/* Segundo Nombre */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="secondName" className="sr-only">
              Segundo Nombre
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <User className="h-5 w-5" /> {/* Lucide User icon */}
              </span>
              <input
                type="text"
                id="secondName"
                name="secondName"
                placeholder="Segundo Nombre (Opcional)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("secondName")}
              />
            </div>
          </div>
          {/* Primer Apellido */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="firstLastName" className="sr-only">
              Primer Apellido
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <User className="h-5 w-5" /> {/* Lucide User icon */}
              </span>
              <input
                type="text"
                id="firstLastName"
                name="firstLastName"
                placeholder="Primer Apellido"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("firstLastName", {
                  required: "El primer apellido es requerido",
                })}
              />
            </div>
            {errors.firstLastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstLastName.message}
              </p>
            )}
          </div>
          {/* Segundo Apellido */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="secondLastName" className="sr-only">
              Segundo Apellido
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <User className="h-5 w-5" /> {/* Lucide User icon */}
              </span>
              <input
                type="text"
                id="secondLastName"
                name="secondLastName"
                placeholder="Segundo Apellido (Opcional)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("secondLastName")}
              />
            </div>
          </div>
          {/* Correo Electrónico */}
          <div className="w-full md:w-1/2 px-2 mb-4">
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
          {/* Cargo */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="position" className="sr-only">
              Cargo
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <Briefcase className="h-5 w-5" /> {/* Lucide Briefcase icon */}
              </span>
              <input
                type="text"
                id="position"
                name="position"
                placeholder="Cargo"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("position", { required: "El cargo es requerido" })}
              />
            </div>
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">
                {errors.position.message}
              </p>
            )}
          </div>
          {/* Celular */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="phone" className="sr-only">
              Celular
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <Phone className="h-5 w-5" /> {/* Lucide Phone icon */}
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Número de Celular"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("phone", {
                  required: "El número de celular es requerido",
                  pattern: {
                    value: /^[0-9]{10}$/, // Simple 10-digit phone number validation
                    message: "Formato de celular inválido (10 dígitos)",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          {/* Fecha Nacimiento */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="dob" className="sr-only">
              Fecha de Nacimiento
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <Calendar className="h-5 w-5" /> {/* Lucide Calendar icon */}
              </span>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("dob", {
                  required: "La fecha de nacimiento es requerida",
                })}
              />
            </div>
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>
          {/* Contraseña */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <Lock className="h-5 w-5" /> {/* Lucide Lock icon */}
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirmar Contraseña */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                <Lock className="h-5 w-5" /> {/* Lucide Lock icon */}
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden", // Validate against the password field
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>{" "}
        {/* End of flex container */}
        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-900 hover:bg-blue-500 dark:hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 transform hover:scale-105"
          disabled={isSubmitting} // Disable button during submission
        >
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
        {/* Back to Login Button - Placeholder for navigation */}
        <button
          type="button" // Important: set type to "button" to prevent form submission
          onClick={onBackToLogin}
          className="w-full mt-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
        >
          Volver a Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

// --- RegisterPage Component ---
// This component serves as the standalone page for user registration.
const RegisterPage = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const Navigate = useNavigate();

  const handleCloseModal = () => {
    setModalMessage("");
    setMessageType("");
  };

  // This function would typically navigate to the login page if using react-router-dom
  const HandleBackToLogin = () => {
    Navigate("/auth");
  };

  return (
    <>
      {/* Register Form Container */}
      <div className="relative z-20 dark:bg-gray-800 rounded-3xl shadow-2xl w-xl transform transition-all duration-500 ease-in-out">
        <RegisterForm
          onBackToLogin={HandleBackToLogin}
          setModalMessage={setModalMessage}
          setMessageType={setMessageType}
        />
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

export default RegisterPage;
