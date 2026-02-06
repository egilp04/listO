import type { SelectHTMLAttributes } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  variant?: "primario" | "info";
}

export default function Select({options, value="",variant = "primario", disabled, ...props}: SelectProps) {
  
  const colorClass = `input-border-${variant}`;
  
  return (
    <select
      value={value}
      disabled={disabled}
      className={`select-responsive input-style-comun ${disabled ? "input-disabled cursor-not-allowed" : `cursor-pointer ${"select-color-text"} ${colorClass}`}`}
      {...props}
    >
      <option value= "" disabled hidden>Seleccionar</option>
      
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
