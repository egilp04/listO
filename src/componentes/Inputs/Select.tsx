import { type SelectHTMLAttributes } from "react";

export interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  variant?: "primario" | "info";
  manejarambio: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  options,
  value = "",
  variant = "primario",
  disabled,
  manejarambio,
  ...props
}: SelectProps) {
  const colorClass = `input-border-${variant}`;

  return (
    <div className="flex flex-col gap-0.5">
      <select
        value={value}
        disabled={disabled}
        className={`select-responsive input-style-comun ${disabled ? "input-disabled cursor-not-allowed" : `cursor-pointer ${"select-color-text"} ${colorClass}`}`}
        {...props}
        onChange={manejarambio}
      >
        <option value="" className="text-primary-900">
          Seleccionar
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="dark:text-primary-50 dark:bg-primary-900 text-primary-900"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
