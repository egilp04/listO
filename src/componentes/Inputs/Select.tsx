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
    <section
      className="flex flex-col gap-0.5 w-fit"
      aria-labelledby={`${props.name}-label`}
    >
      <label
        id={`${props.name}-label`}
        htmlFor={props.name}
        className="sr-only"
      >
        Seleccionar opción
      </label>

      <select
        id={props.name}
        value={value}
        disabled={disabled}
        className={`w-fit min-w-30 select-responsive input-style-comun ${
          disabled
            ? "input-disabled cursor-not-allowed"
            : `cursor-pointer select-color-text ${colorClass}`
        }`}
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
    </section>
  );
}
