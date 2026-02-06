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
  const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <select
      value={value}
      disabled={disabled}
      className={`select-responsive ${colorClass} ${disabled ? "input-disabled" : cursorClass}`}
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
