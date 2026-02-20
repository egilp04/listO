import { type SelectHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-0.5">
      <select
        value={value}
        disabled={disabled}
        className={`select-responsive input-style-comun ${disabled ? "input-disabled cursor-not-allowed" : `cursor-pointer ${"select-color-text"} ${colorClass}`}`}
        {...props}
        onChange={manejarambio}
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
    </div>
  );
}
