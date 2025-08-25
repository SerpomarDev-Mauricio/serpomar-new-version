
// Importa tu video de fondo. Ajusta la ruta si es necesario.
import { Outlet } from "react-router-dom";
import BackgroundVideoNodhus from "../../assets/videos/bodega.webm";
import BackgroundVideoSiiHub from "../../assets/videos/video-fondo-login_DyAiXism.mp4";
import useEmpresa from "../../contexts/empresa/useEmpresa";

const SignBackground = () => {

  const { empresa } = useEmpresa();

  return (
    <div className="relative flex items-center justify-center min-h-screen min-w-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Capa de color de fondo para el video (opcional, para dar un tono base) */}
      <div className="absolute inset-0 w-full h-full bg-blue-900 dark:bg-blue-950 z-0"></div>

      {/* Video de Fondo */}

      <video
        key={empresa} // Cambia el video al cambiar la empresa
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10 z-[1]" // z-index 1 para estar sobre la capa de color
      >
        <source
          src={
            empresa === "Nodhus" ? BackgroundVideoNodhus : BackgroundVideoSiiHub
          }
          type="video/mp4"
        />
        Tu navegador no soporta el tag de video.
      </video>

      <Outlet></Outlet>
    </div>
  );
};

export default SignBackground;
