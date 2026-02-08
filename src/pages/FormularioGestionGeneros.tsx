import { Genero } from "../componentes/Formularios/Genero";

const FormularioGestionGeneros = () => {
  return (
    <div className="bg-primary-200 flex flex-col mb-4">
      <Genero crear={true}></Genero>
    </div>
  );
};

export default FormularioGestionGeneros;
