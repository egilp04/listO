import Button from "./Button";

interface DialogInterface {
  titulo: string;
  descripcion: string;
  imagen: string;
  botones?: boolean;
}

const Dialog = ({ titulo, descripcion, imagen, botones }: DialogInterface) => {
  return (
    <div className="dialog">
      <div className="close-icon">
        <span className="material-symbols-outlined">close</span>
      </div>
      <div className="flex flex-col gap-4 ">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
      </div>
      {imagen && (
        <div className="my-4 flex justify-center">
          <img src={imagen} alt={titulo} className="max-h-40 object-contain" />
        </div>
      )}
      {botones && (
        <div className="flex flex-row gap-2 justify-end pr-2">
          <Button variant="fantasma">
            <span>No, cancelar</span>
          </Button>
          <Button>
            <span>Sí, confirmar</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dialog;
