import { useLocation } from "react-router-dom";
import { Genero } from "../componentes/Formularios/Genero";

const FormularioGestionGeneros = () => {
  const { state } = useLocation();
  return (
    <div className="bg-primary-200 flex flex-col mb-4">
      <Genero crear={state.crear}></Genero>
    </div>
  );
};

export default FormularioGestionGeneros;
