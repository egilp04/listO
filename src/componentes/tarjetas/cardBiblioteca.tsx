import Button from "../Button";

interface Item {
  imagen: string;
  tipo: string;
  generos: string[];
  informacion: string;
  descripcion: string;
  valoracion: number;
}

interface CardBibliotecaProps {
  item: Item;
}

import { useNavigate } from "react-router-dom";

const CardBiblioteca: React.FC<CardBibliotecaProps> = ({ item }) => {
  const navigate = useNavigate();

  const renderizarEstrellas = (valoracion: number) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= valoracion) {
        estrellas.push(
          <span key={i} className="text-warning-500">
            ★
          </span>,
        );
      } else {
        estrellas.push(
          <span key={i} className="text-neutral-300">
            ☆
          </span>,
        );
      }
    }
    return estrellas;
  };

  return (
    <div className="card-biblioteca">
      <img
        src={item.imagen}
        alt={item.tipo}
        className="w-full h-32 md:h-40 object-cover transition-all duration-300"
      />

      <div className="flex flex-col gap-2 px-3 pb-3 text-left">
        <div className="flex flex-wrap gap-1.5">
          <span className="bg-primary-800 text-white dark:bg-primary-50 dark:text-primary-800 px-2 py-0.5 rounded">
            {item.tipo}
          </span>
          {item.generos.map((genero, index) => (
            <span
              key={index}
              className="bg-primary-800 text-white dark:bg-primary-50 dark:text-primary-800 px-2 py-0.5 rounded"
            >
              {genero}
            </span>
          ))}
        </div>

        <p>{item.informacion}</p>

        <p>{item.descripcion}</p>

        <div className="flex flex-row md:flex-col items-center md:items-stretch justify-between gap-2 mt-1">
          <div className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-0.5">
            <p>Valoración:</p>
            <div className="flex items-center">
              {renderizarEstrellas(item.valoracion)}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2 w-full mt-auto">
            <Button
              variant="primario"
              className="w-full sm:w-auto flex-1 text-sm px-2"
              onClick={() => navigate("/admin/items")}
            >
              Modificar
            </Button>

            <Button
              variant="primario"
              className="w-full w-auto flex-1 text-sm px-2 !border-transparent !bg-danger-500 hover:!bg-danger-700 text-black dark:!bg-danger-500"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBiblioteca;
