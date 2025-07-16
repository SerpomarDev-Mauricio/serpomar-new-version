import React from "react";

const WaterWaveBackground = () => {
  return (
    <div
      className="absolute w-full h-screen overflow-hidden
                 bg-gradient-to-br from-blue-700 to-indigo-900
                 dark:from-gray-900 dark:to-blue-950" // Fondo con gradiente y colores de modo oscuro
    >
      {/* Wave 1 */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto z-10" // Añadimos z-index para capas
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          // Color de onda con Tailwind, adaptable a modo oscuro
          className="fill-white/10 dark:fill-blue-800 animate-wave-slow"
          d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,171,864,186.7C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {/* Wave 2 - slightly different color/opacity for depth */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto z-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ transform: "translateY(20px)" }} // Slightly offset for depth
      >
        <path
          // Color de onda con Tailwind, adaptable a modo oscuro
          className="fill-white/5 dark:fill-blue-900 animate-wave-medium"
          d="M0,224L48,229.3C96,235,192,245,288,218.7C384,192,480,128,576,106.7C672,85,768,107,864,138.7C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {/* Wave 3 - even more transparent and faster for foreground */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto z-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ transform: "translateY(40px)" }} // More offset
      >
        <path
          // Color de onda con Tailwind, adaptable a modo oscuro
          className="fill-white/2 dark:fill-blue-950 animate-wave-fast"
          d="M0,96L48,112C96,128,192,160,288,181.3C384,203,480,213,576,213.3C672,213,768,203,864,186.7C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default WaterWaveBackground;
