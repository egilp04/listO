import { useState, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  mensajeError?: string;
  variant?: "primario" | "info";
  manejarCambio: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  manejarError: (nombre: string, error: boolean) => void;
}

function TextArea({
  label,
  mensajeError,
  name,
  disabled,
  variant = "primario",
  manejarCambio,
  manejarError,
  ...props
}: TextAreaProps) {
  const [error, setError] = useState(false);

  const colorClass = error ? "input-error" : `input-border-${variant}`;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nombre = e.currentTarget.name;
    if (e.target.value.trim() == "") {
      setError(true);
      manejarError(nombre, true);
    } else {
      setError(false);
      manejarError(nombre, false);
    }
    manejarCambio(e);
  };

  return (
    <section
      className="flex flex-col gap-2 w-full"
      aria-labelledby={`${name}-label`}
    >
      <header>
        <label
          id={`${name}-label`}
          htmlFor={name}
          className="font-medium text-primary-900 dark:text-primary-50"
        >
          {label}
        </label>
      </header>

      <textarea
        id={name}
        name={name}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`dark:text-primary-50 input-style-comun textarea-style textarea-responsive ${
          disabled
            ? "input-disabled cursor-not-allowed"
            : `cursor-text ${colorClass}`
        }`}
        {...props}
        onChange={handleChange}
      />

      {error && (
        <footer className="mt-1">
          <span
            id={`${name}-error`}
            className="span-error text-red-500 text-sm"
            role="alert"
          >
            {mensajeError}
          </span>
        </footer>
      )}
    </section>
  );
}

export default TextArea;
