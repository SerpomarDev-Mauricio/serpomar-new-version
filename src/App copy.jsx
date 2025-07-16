// src/App.jsx
import React from "react";
import "./index.css"; // Make sure your Tailwind CSS output is imported here
import fondo2 from "../src/assets/fondo2.jpg"; // Import your background image

function App() {
  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center overflow-hidden" // Add relative and overflow-hidden
      style={{ backgroundImage: `url(${fondo2})` }}
    >
      {/* Overlay para el desenfoque y opacidad */}
      {/* <div className="absolute inset-0 bg-opacity-30 backdrop-blur-lg"></div>{" "} */}
      {/* Este es el cambio clave */}
      {/* Contenido de la izquierda (Let's Get Started) */}
      <div className="z-10 w-1/2 p-4 flex flex-col justify-between relative bg-opacity-30 backdrop-blur-sm">
        {" "}
        {/* Add z-10 to bring content to front */}
        <div className=" flex flex-col items-start justify-center h-full">
          <h1 className="text-white text-5xl font-bold mb-4">
            Let's Get Started
          </h1>
          <p className="text-white text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            placerat ultricies libero eu pharetra. Vestibulum a ultrices augue.
          </p>
        </div>
        <div className="absolute bottom-10 left-10 text-white flex items-center">
          <span className="mr-2">presented by</span>
          {/* Replace with your logo/icon */}
          <img src="../src/assets/react.svg" alt="Logo" className="h-6" />
        </div>
      </div>
      {/* Sección Derecha - Formulario de Registro */}
      <div className="z-10 w-1/2 p-10 bg-black bg-opacity-70 rounded-l-lg flex flex-col justify-center items-center">
        {" "}
        {/* Add z-10 */}
        <h2 className="text-white text-3xl font-bold mb-8">Sign up</h2>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-transparent border-b border-gray-600 text-white py-2 mb-6 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-transparent border-b border-gray-600 text-white py-2 mb-6 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Create Password"
            className="w-full bg-transparent border-b border-gray-600 text-white py-2 mb-6 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Repeat password"
            className="w-full bg-transparent border-b border-gray-600 text-white py-2 mb-8 focus:outline-none"
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition duration-300 mb-6">
            Sign up
          </button>

          <div className="flex items-center justify-center mb-6">
            <span className="text-white mx-4">OR</span>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition duration-300">
              {/* Replace with actual Facebook SVG icon */}
              <img
                src="../src/assets/fondo2.jpg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </button>
            <button className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition duration-300">
              {/* Replace with actual Twitter SVG icon */}
              <img
                src="../src/assets/fondo2.jpg"
                alt="Twitter"
                className="h-6 w-6"
              />
            </button>
            <button className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition duration-300">
              {/* Replace with actual Google SVG icon */}
              <img
                src="/path/to/google-icon.svg"
                alt="Google"
                className="h-6 w-6"
              />
            </button>
          </div>

          <p className="text-white text-center">
            Already a Member?{" "}
            <a href="#" className="text-green-400 font-bold hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
