import { Genero } from "../componentes/Formularios/Genero";

const FormularioGestionGeneros = () => {
  return (
    <div className="bg-primary-200 flex flex-col min-h-screen">
      <Genero crear={true}></Genero>
    </div>
  );
};

export default FormularioGestionGeneros;
