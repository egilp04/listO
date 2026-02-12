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

  const colorClass = error ? "input-error" : `input-border-${variant}`;
  const [smError, setsmError] = useState(false)
 
  const handleBlur = () => {
    if (regex) {
      if (!regex.test(value)) {
        manejarError(name, true);
        setsmError(true);
      } else {
        manejarError(name, false);
        setsmError(false);
      }
    }
  };

  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    manejarCambio(e);

    const valor = e.target.value;
    const nombre= e.target.name;

    if(valor=="") {
      setsmError(true)
      manejarError(nombre, true);
    } else {
      setsmError(false)
      manejarError(nombre, false);
    }

  };

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
