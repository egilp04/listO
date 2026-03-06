import { useLocation } from "react-router-dom";
import { Genero } from "../componentes/Formularios/Genero";

const FormularioGestionGeneros = () => {
  const { state } = useLocation();
  const { crear = true, item = null } = state || {};
  return (
    <section
      className="bg-primary-200 dark:bg-primary-1000 flex flex-col mb-4 min-h-[50vh]"
      aria-label={
        crear
          ? "Formulario para crear nuevo género"
          : "Formulario para editar género"
      }
    >
      <Genero crear={crear} item={item} />
    </section>
  );
};

export default FormularioGestionGeneros;
