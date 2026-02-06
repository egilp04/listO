import Button from "./Button";

interface DialogInterface {
  titulo: string;
  descripcion: string;
}

const Dialog = ({ titulo, descripcion }: DialogInterface) => {
  return (
    <div className="dialog">
      <div className="close-icon">
        <span className="material-symbols-outlined">close</span>
      </div>
      <div className="flex flex-col gap-4 ">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
      </div>
      <div className="flex flex-row gap-2 justify-end pr-2">
        <Button variant="fantasma">
          <span>No, cancelar</span>
        </Button>
        <Button>
          <span>Sí, confirmar</span>
        </Button>
      </div>
    </div>
  );
};

export default Dialog;
