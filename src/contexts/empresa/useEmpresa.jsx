import { useContext } from "react";
import EmpresaContext from "./EmpresaContext";

function useEmpresa() {
    return useContext(EmpresaContext);
}
export default useEmpresa;