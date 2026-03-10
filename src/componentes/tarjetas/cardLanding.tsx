import React from "react";

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
    <article
      className={`card-landing flex flex-col ${invertido ? "md:flex-row-reverse" : "md:flex-row"
        } w-full h-auto md:h-62.5 lg:h-125 overflow-hidden rounded-xl shadow-sm`}
      data-invertido={invertido.toString()}
    >
      <section className="flex flex-col flex-1 items-center md:items-start h-full text-center md:text-left p-personalizado-30 md:p-6 lg:p-10">
        <header className="px-4 py-2 bg-primary-400 dark:bg-primary-800 rounded-lg w-full max-w-[90%] md:max-w-none mb-personalizado-30 md:mb-4 lg:mb-12 text-center">
          <h3 className="font-bold text-primary-1000 dark:text-primary-50">
            {titulo}
          </h3>
        </header>

        <p className="text-pretty text-primary-900 dark:text-primary-100">
          {descripcion}
        </p>
      </section>

      <figure className="bg-primary-600 flex-1 w-full h-75 md:h-full overflow-hidden">
        <img
          src={imagen}
          alt={`Ilustración de la función: ${titulo}`}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105 dark:brightness-[0.7] dark:saturate-[0.45] dark:contrast-[1.6]"
        />
      </figure>
    </article>
  );
};

export default CardLanding;
