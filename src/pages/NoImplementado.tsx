const NoImplementado = () => {
  return (
    <section
      className="flex flex-col justify-center items-center gap-10"
      aria-labelledby="titulo-en-desarrollo"
    >
      <header>
        <h1 id="titulo-en-desarrollo" className="text-center">
          No Implementado
        </h1>
      </header>
      <article className="max-w-prose text-center">
        <p>
          Esta funcionalidad se encuentra actualmente en desarrollo por nuestro
          equipo. Vuelve a consultar más tarde para disfrutar de las novedades
          de <strong>listO</strong>.
        </p>
      </article>

      <figure
        className="flex flex-row gap-4 items-center justify-center text-7xl no-implementado-container"
        aria-hidden="true"
      >
        <span>🔨</span>
        <span>⛏️</span>
        <span>🛠️</span>
      </figure>
    </section>
  );
};

export default NoImplementado;
