import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  variant?: "primario" | "info";
}

function TextArea({ label, error, name, disabled, variant = "primario", ...props }: TextAreaProps) {

  const colorClass = error ? "input-error" : `input-border-${variant}`;

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
        className={`dark:text-primary-50 input-style-comun textarea-style textarea-responsive ${disabled
            ? "input-disabled cursor-not-allowed"
            : `cursor-text ${colorClass}`
          }`}
        {...props}
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