const NoImplementado = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-10">
        <h1>No Implementado</h1>
        <p>
          Esta funcionalidad se encuentra actualmente en desarrollo por nuestro
          equipo. Vuelve a consultar más tarde para disfrutar de las novedades
          de <strong>listO</strong>.
        </p>
        <div className="flex flex-row gap-4 items-center justify-center text-7xl no-implementado-container">
          <div>🔨</div>
          <div>⛏️</div>
          <div>🛠️</div>
        </div>
      </div>
    </div>
  );
};

export default NoImplementado;
