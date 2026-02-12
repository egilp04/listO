import { useState, type InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error: string;
  variant?: "primario" | "info";
  regex: RegExp;
  value: string;
  name: string,
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  manejarError: (nombre: string, error: boolean) => void;

}

function Inputs({ manejarCambio, manejarError, error, name, disabled, regex, value, label, variant = "primario", ...props }: InputFieldProps) {

  let colorClass = `input-border-${variant}`;
  const [smError, setsmError] = useState(false)
  const [esValido, setEsValido] = useState(false);

  const handleBlur = () => {
    if (regex) {
      if (!regex.test(value)) {
        manejarError(name, true);
        setsmError(true);
        setEsValido(false);
      } else {
        manejarError(name, false);
        setsmError(false);
        setEsValido(true);
      }
    }
  };

  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    manejarCambio(e);

    const valor = e.target.value;
    const nombre = e.target.name;

    if (valor == "") {
      setsmError(true)
      setEsValido(false);
      manejarError(nombre, true);
    } else {
      setsmError(false)
      setEsValido(true);
      manejarError(nombre, false);
    }

  };

  if (smError) {
    colorClass = "input-error";
  } else if (esValido && value) {
    colorClass = "input-valido";
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className={disabled ? "label-disabled" : "text-black"}>
        {label}
      </label>
      <input
        id={name}
        type={props.type}
        name={name}
        value={value}
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
