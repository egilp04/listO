import { useLocation } from "react-router-dom";
import { Genero } from "../componentes/Formularios/Genero";

const FormularioGestionGeneros = () => {
  const { state } = useLocation();
  const { crear = true, item = null } = state || {};
  return (
    <div className="bg-primary-200 flex flex-col mb-4">
      <Genero crear={crear} item={item}></Genero>
    </div>
  );
};

export default FormularioGestionGeneros;
