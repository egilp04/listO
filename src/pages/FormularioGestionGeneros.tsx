import { useLocation } from "react-router-dom";
import { Genero } from "../componentes/Formularios/Genero";
import { useTranslation } from "react-i18next";

const FormularioGestionGeneros = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { crear = true, item = null } = state || {};

  return (
    <section
      className="bg-primary-200 dark:bg-primary-1000 flex flex-col mb-4 min-h-[50vh]"
      aria-label={
        crear
          ? t('formularioGestionGeneros.labelCrear')
          : t('formularioGestionGeneros.labelEditar')
      }
    >
      <Genero crear={crear} item={item} />
    </section>
  );
};

export default FormularioGestionGeneros;
