import { useState, type InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error: string;
  variant?: "primario" | "info";
  regex: RegExp;
  name: string;
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  manejarError: (nombre: string, error: boolean) => void;
}

function Inputs({
  manejarCambio,
  manejarError,
  error,
  name,
  disabled,
  regex,
  value,
  label,
  variant = "primario",
  ...props
}: InputFieldProps) {
  const [smError, setsmError] = useState(false);
  const colorClass = smError ? "input-error" : `input-border-${variant}`;
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.currentTarget.name;
    const valor = e.currentTarget.value;
    if ((regex && !regex.test(valor)) || valor == "") {
      manejarError(nombre, true);
      setsmError(true);
    } else {
      manejarError(nombre, false);
      setsmError(false);
    }
  };

  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    manejarCambio(e);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={name}
        className={disabled ? "label-disabled" : "text-black"}
      >
        {label}
      </label>
      <input
        id={name}
        type={props.type}
        name={name}
        disabled={disabled}
        onChange={handleChangeInternal}
        onBlur={handleBlur}
        className={`input-style-comun input-responsive ${disabled ? "input-disabled cursor-not-allowed" : `${colorClass}`}`}
        {...props}
      />
      {smError && <p className="span-error mt-1 h-4">{error}</p>}
    </div>
  );
}

export default Inputs;
