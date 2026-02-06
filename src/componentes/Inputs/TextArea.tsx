import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  variant?: "primario" | "info";
}

function TextArea({ label, error, name, disabled, variant = "primario", ...props }: TextAreaProps) {

  const cursorClass = disabled ? "cursor-not-allowed" : "cursor-text";
  const colorClass = error ? "input-error" : `input-border-${variant}`;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label 
        htmlFor={name} 
        className={disabled ? "label-disabled" : "text-black"}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        disabled={disabled}
        className={`input-style-comun textarea-style textarea-responsive ${colorClass} ${disabled ? "input-disabled" : cursorClass}`}
        {...props}
      />
      {error ? (
        <p className="span-error mt-1 h-4">{error}</p>
      ) : (
        <div className="mt-1 h-4"></div>
      )}
    </div>
  );
}

export default TextArea;