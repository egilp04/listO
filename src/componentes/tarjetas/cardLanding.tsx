interface CardLandingProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  invertido?: boolean;
}

const CardLanding: React.FC<CardLandingProps> = ({
  titulo,
  descripcion,
  imagen,
  invertido = false,
}) => {
  return (
    <div
      className={`card-landing ${invertido ? "md:flex-row-reverse" : "md:flex-row"} w-full h-auto md:h-[250px] lg:h-[500px]`}
    >
      <div className="flex flex-col flex-1 items-center md:items-start h-full text-center md:text-left p-[30px] md:p-6 lg:p-10 overflow-hidden ">
        <div className="px-4 py-2 bg-primary-400 dark:bg-primary-800 rounded-lg w-full max-w-[90%] md:max-w-none mb-[30px] md:mb-4 lg:mb-[48px]  text-center ">
          <h4>{titulo}</h4>
        </div>

        <p className="line-clamp-4 md:line-clamp-3 lg:line-clamp-none">
          {descripcion}
        </p>
      </div>

      <div className="bg-primary-600 flex-1 w-full h-[300px] md:h-full">
        <img
          src={imagen}
          alt={titulo}
          className="w-full h-full object-cover transition-all duration-100 dark:brightness-[0.7] dark:saturate-[0.45] dark:contrast-[1.6]"
        />
      </div>
    </div>
  );
};

export default CardLanding;
