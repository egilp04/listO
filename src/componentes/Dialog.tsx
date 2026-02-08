import Button from "./Button";

interface DialogInterface {
  titulo: string;
  descripcion: string;
  show: boolean;
  onClose: () => void;
}

const Dialog = ({
  titulo,
  descripcion,
  show = false,
  onClose,
}: DialogInterface) => {
  if (!show) return null;
  return (
    <>
      <div className="dialog-overlay" onClick={onClose}></div>
      <div className="dialog">
        <div className="flex justify-end">
          <span
            className="material-symbols-outlined cursor-pointer hover:text-gray-500"
            onClick={onClose}
          >
            close
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{titulo}</h2>
          <p className="text-gray-600">{descripcion}</p>
        </div>

        <div className="flex flex-row gap-2 justify-end mt-6">
          <Button variant="fantasma" onClick={onClose}>
            <span>No, cancelar</span>
          </Button>
          <Button className="bg-danger-500 text-white">
            <span>Sí, confirmar</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dialog;
