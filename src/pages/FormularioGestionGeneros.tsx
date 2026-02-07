import { Genero } from "../componentes/Formularios/Genero";

const FormularioGestionGeneros = () => {
  return (
    <div className="bg-primary-200 flex flex-col min-h-screen">
      <div className="w-full p-2">
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="w-full p-10 xl:pr-58 xl:pl-58 2xl:pl-68 2xl:pr-68">
        <div className="shadow-elevation-3 bg-primary-50 flex flex-col rounded-sm p-6">
          <Genero></Genero>
        </div>
      </div>
    </div>
  );
};

export default FormularioGestionGeneros;
