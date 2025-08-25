import { useEffect } from "react";
import { useState } from "react";
import EmpresaContext from "./EmpresaContext";


export const EmpresaProvider = ({ children }) => {
  const [empresa, setEmpresa] = useState(() => {
    const savedEmpresa = localStorage.getItem("empresa");
    console.log(`Saved empresa from localStorage: ${savedEmpresa}`); // Para depuración
    return savedEmpresa ? JSON.parse(savedEmpresa) : "Nodhus";
  });

  useEffect(() => {
    localStorage.setItem("empresa", JSON.stringify(empresa));
  }, [empresa]);

  const value = { empresa, setEmpresa };

  return (
    <EmpresaContext.Provider value={value}>
      {children}
    </EmpresaContext.Provider>
  );
}