import useEmpresa from "../../contexts/empresa/useEmpresa";

const ButtonEmpresa = () => {
  const { empresa, setEmpresa } = useEmpresa();

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold">Elige Empresa:</h2>
      <div className="flex rounded-4xl overflow-hidden">
        <button
          onClick={() => setEmpresa("Nodhus")}
          className={`pl-4 pr-3 py-2 border-none cursor-pointer ${
            empresa === "Nodhus"
              ? "bg-blue-500 text-white dark:bg-blue-600 hover:brightness-125"
              : "opacity-50 bg-gray-500 text-gray-200  hover:brightness-125"
          }`}
        >
          NODHUS
        </button>
        <button
          onClick={() => setEmpresa("SiiHub")}
          className={`pl-3 pr-4 py-2 border-none cursor-pointer ${
            empresa === "SiiHub"
              ? "bg-blue-500 text-white dark:bg-blue-600  hover:brightness-125"
              : "opacity-50 bg-gray-500 text-gray-200  hover:brightness-125"
          }`}
        >
          SIIHUB
        </button>
      </div>
    </div>
  );
};

export default ButtonEmpresa;
