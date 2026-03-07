import { useTranslation } from "react-i18next";

const NoImplementado = () => {
  const { t } = useTranslation();

  return (
    <section
      className="flex flex-col justify-center items-center gap-10 mb-10"
      aria-labelledby="titulo-en-desarrollo"
    >
      <header>
        <h1 id="titulo-en-desarrollo" className="text-center">
          {t('noImplementado.titulo')}
        </h1>
      </header>
      <article className="max-w-prose text-center">
        <p>
          {t('noImplementado.descripcion')} <strong>listO</strong>.
        </p>
      </article>

      <figure
        className="flex flex-row gap-4 items-center justify-center text-7xl no-implementado-animation"
        aria-hidden="true"
      >
        <span className="text-5xl">🔨</span>
        <span className="text-5xl">⛏️</span>
        <span className="text-5xl">🛠️</span>
      </figure>
    </section>
  );
};

export default NoImplementado;
