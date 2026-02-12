import { useState, type SelectHTMLAttributes } from "react";

export interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  variant?: "primario" | "info";
  mensajeError: string;
  manejarambio: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  manejarError: (nombre: string, error: boolean) => void;
}

export default function Select({
  options,
  value = "",
  variant = "primario",
  disabled,
  mensajeError,
  manejarambio,
  manejarError,
  ...props
}: SelectProps) {
  const colorClass = `input-border-${variant}`;

  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    manejarambio(e);
    const valor = e.currentTarget.value;
    const nombre = e.currentTarget.name;
    if (valor == "") {
      setError(true);
      manejarError(nombre, true);
    } else {
      setError(false);
      manejarError(nombre, false);
    }
  };

  return (
    <div className="flex flex-col gap-0.5">
      <select
        value={value}
        disabled={disabled}
        className={`select-responsive input-style-comun ${disabled ? "input-disabled cursor-not-allowed" : `cursor-pointer ${"select-color-text"} ${colorClass}`}`}
        {...props}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          Seleccionar
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500">{mensajeError}</span>}
    </div>
  );
}
