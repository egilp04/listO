import Button from "./Button";

interface DialogInterface {
  titulo: string;
  descripcion: string;
}

const Dialog = ({ titulo, descripcion }: DialogInterface) => {
  return (
    <div className="flex flex-col gap-8 rounded-sm p-6 max-w-125 bg-primary-50 shadow-elevation-3 border border-neutral-100">
      <div className="flex w-full justify-end">x</div>
      <div className="flex flex-col gap-4 ">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
      </div>
      <div className="flex flex-row gap-2 justify-end pr-2">
        <Button>
          <span>No, cancelar</span>
        </Button>
        <Button>
          <span>No, cancelar</span>
        </Button>
      </div>
    </div>
  );
};

export default Dialog;
