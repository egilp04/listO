import { useState, type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  manejarError: (nombre: string, error: boolean) => void;
  mensajeError: string;
}

function Checkbox({
  label,
  name,
  disabled,
  manejarCambio,
  manejarError,
  mensajeError,
  ...props
}: CheckboxProps) {
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const estaCheck = e.target.checked;
    const nombre = e.currentTarget.name;
    if (!estaCheck) {
      manejarError(nombre, true);
      setError(true);
    } else {
      manejarError(nombre, false);
      setError(false);
    }
    manejarCambio(e);
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        className={`checkbox-input checkbox-responsive cursor-pointer ${error && "border border-red-500"}`}
        {...props}
        onChange={handleChange}
      />
      {error && <span className="text-red-500">{mensajeError}</span>}
      <label htmlFor={name} className="cursor-pointer text-black">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
