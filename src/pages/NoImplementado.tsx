import { useTranslation } from "react-i18next";

const NoImplementado = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="pt-10 flex flex-col justify-center items-center gap-10">
        <h1>No Implementado</h1>
        <p>
          Esta funcionalidad se encuentra actualmente en desarrollo por nuestro
          equipo. Vuelve a consultar más tarde para disfrutar de las novedades
          de <strong>listO</strong>.
        </p>
        <div className="flex flex-col items-center justify-center">
          <img
            src="src/assets/img/others/teddy.png"
            alt="En construcción"
            className="img-no-implementado "
          />
        </div>
      </div>
    </div>
  );
};

export default NoImplementado;
