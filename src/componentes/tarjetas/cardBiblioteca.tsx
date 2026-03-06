import Button from "../Button";
import { useItemStore } from "../../store/useItemStore";

interface Item {
  id_item: string;
  imagen: string;
  tipo: string;
  generosIds: string[];
  generos: string[];
  informacion: string;
  descripcion: string;
  valoracion: number;
}

interface CardBibliotecaProps {
  item: Item;
}

import { useNavigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

const Dialog = lazy(() => import("../Dialog"));

const CardBiblioteca: React.FC<CardBibliotecaProps> = ({ item }) => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { eliminarItem, idUltimoItemAñadido, setIdUltimoItemAñadido } = useItemStore();

  const esNuevo = item.id_item === idUltimoItemAñadido;
  const [fueNuevo, setFueNuevo] = useState(esNuevo);

  useEffect(() => {
    if (esNuevo) {
      setFueNuevo(true);
      const timer = setTimeout(() => {
        setIdUltimoItemAñadido(null);
      }, 1050);
      return () => clearTimeout(timer);
    }
  }, [esNuevo, setIdUltimoItemAñadido]);

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
    <article
      className={`card-biblioteca ${isDeleting
        ? "animate-slide-rotate-out"
        : esNuevo
          ? "animate-drop-and-spin"
          : fueNuevo
            ? ""
            : "animate-slide-rotate-in"
        }`}
    >
      <header className="relative h-32 md:h-40">
        {item.imagen ? (
          <img
            src={item.imagen}
            alt={`${item.tipo}: ${item.informacion}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary-400 dark:bg-primary-850" />
        )}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
          <span className="bg-primary-1000/80 backdrop-blur-sm text-white dark:bg-primary-50/90 dark:text-primary-800 px-2 py-0.5 rounded text-xs font-bold uppercase">
            {item.tipo}
          </span>
        </div>
      </header>

      <section className="flex flex-col flex-1 gap-2 px-3 py-3 text-left overflow-hidden min-w-0 w-full">
        <div className="flex flex-wrap gap-1 overflow-hidden max-h-5">
          {item.generos.map((genero, index) => (
            <span
              key={index}
              className="text-[10px] uppercase tracking-wider font-bold text-primary-700 dark:text-primary-200"
            >
              #{genero}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold leading-tight text-primary-950 dark:text-primary-50 truncate">
          {item.informacion}
        </h3>

        <p className="text-sm line-clamp-2 text-primary-800 dark:text-primary-200">
          {item.descripcion}
        </p>

        <div
          className="mt-2 flex items-center gap-2"
          aria-label={`Valoración: ${item.valoracion} de 5 estrellas`}
        >
          <span className="text-xs font-medium uppercase text-primary-600 dark:text-primary-400">
            Rating:
          </span>
          <div className="flex items-center text-warning-500" aria-hidden="true">
            {renderizarEstrellas(item.valoracion)}
          </div>
        </div>
      </section>

      <footer className="px-3 pb-3 mt-auto">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button
            variant="primario"
            className="flex-1 text-xs py-2"
            onClick={() => navigate("/admin/items", { state: { item } })}
          >
            Modificar
          </Button>

          <Button
            variant="primario"
            className="flex-1 text-xs py-2 !bg-danger-500 hover:!bg-danger-700 border-none"
            onClick={() => setShowDialog(true)}
          >
            Eliminar
          </Button>
        </div>
      </footer>
      <Suspense
        fallback={
          <div className="text-primary-1100 dark:text-primary-50 text-center">
            <span>Cargando modal...</span>
          </div>
        }
      >
        <Dialog
          titulo={`Eliminar ${item.tipo}`}
          descripcion={`¿Estás seguro de que quieres eliminar "${item.informacion.split(" -")[0]}"?`}
          show={showDialog}
          onClose={async (confirmar) => {
            setShowDialog(false);
            if (confirmar) {
              setIsDeleting(true);
              setTimeout(async () => {
                const exito = await eliminarItem(item.id_item, item.imagen);
                if (exito) {
                  console.log("Ítem borrado correctamente");
                }
              }, 450);
            }
          }}
        />
      </Suspense>
    </article>
  );
};

export default CardBiblioteca;
