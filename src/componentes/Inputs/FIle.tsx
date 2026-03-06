import {
  useState,
  type InputHTMLAttributes,
  type ChangeEvent,
  useRef,
} from "react";

interface FileProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  mensajeError: string;
}

function File({
  label,
  name,
  disabled,
  onChange,
  mensajeError,
  ...props
}: FileProps) {
  const [error, setError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleValidClick = () => {
    fileInputRef.current?.click();
  };

  const validaciones = {
    extension: ["jpg", "png", "web"],
    tamano: 2 * 1024 * 1024,
  };

  const validarArchivo = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    let esValido = true;

    if (!extension || !validaciones.extension.includes(extension)) {
      esValido = false;
    }
    if (file.size > validaciones.tamano) {
      esValido = false;
    }
    setError(!esValido);
  };

  const manejarCambio = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      validarArchivo(selectedFile);
    } else {
      setError(false);
    }
    onChange(e);
  };

  return (
    <section
      className="file-container max-w-full"
      aria-labelledby={`${name}-label`}
    >
      <label
        onClick={handleValidClick}
        htmlFor={name}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span
          className={`dark:text-primary-50 material-symbols-outlined ${disabled ? "label-disabled" : ""}`}
          aria-hidden="true"
        >
          upload
        </span>
        <span id={`${name}-label`} className="dark:text-primary-50">
          {label}
        </span>
      </label>

      <input
        ref={fileInputRef}
        type="file"
        id={name}
        name={name}
        disabled={disabled}
        onChange={manejarCambio}
        className={`dark:text-primary-50 ${error ? "input-error" : "input-normal"} w-full max-w-full mt-2`}
        {...props}
      />

      {error && (
        <footer className="mt-1">
          <span aria-live="polite" className="text-red-500 text-sm block">
            {mensajeError}
          </span>
        </footer>
      )}
    </section>
  );
}

export default File;
