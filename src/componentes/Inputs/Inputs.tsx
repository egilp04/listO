import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "primario" | "info";
}

function Inputs({ label, error, name, disabled, variant = "primario", ...props }: InputFieldProps) {

  const colorClass = error ? "input-error" : `input-border-${variant}`;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className={disabled ? "label-disabled" : "text-black"}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        disabled={disabled}
        className={`input-style-comun input-responsive ${disabled ? "input-disabled cursor-not-allowed" : `${colorClass}`}`}
        {...props}
      />
      {error && <p className="span-error mt-1 h-4">{error}</p>}
    </div>
  );
}

export default Inputs;
