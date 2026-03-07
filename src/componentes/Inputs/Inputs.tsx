import { useState, type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error: string;
  variant?: "primario" | "info";
  regex?: RegExp;
  name: string;
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  manejarError: (nombre: string, error: boolean) => void;
}

function Inputs({
  manejarCambio,
  manejarError,
  error,
  name,
  disabled,
  regex,
  label,
  variant = "primario",
  type,
  ...props
}: InputFieldProps) {
  const [smError, setsmError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  let colorClass = `input-border-${variant}`;

  if (touched) {
    if (smError) {
      colorClass = "input-error";
    } else {
      colorClass = "input-valido";
    }
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    const nombre = e.currentTarget.name;
    const valor = e.currentTarget.value;
    if ((regex && !regex.test(valor)) || valor == "") {
      manejarError(nombre, true);
      setsmError(true);
    } else {
      manejarError(nombre, false);
      setsmError(false);
    }
  };

  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    manejarCambio(e);
  };

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <section
      className="flex flex-col gap-2 w-full"
      aria-labelledby={`${name}-label`}
    >
      <label
        id={`${name}-label`}
        htmlFor={name}
        className="font-medium text-primary-900 dark:text-primary-50"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={name}
          type={inputType}
          name={name}
          disabled={disabled}
          onChange={handleChangeInternal}
          onBlur={handleBlur}
          className={`input-style-comun input-responsive ${
            disabled ? "input-disabled cursor-not-allowed" : `${colorClass}`
          } ${isPassword ? "pr-10" : ""}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500 dark:text-primary-50 hover:text-gray-700 bg-transparent border-none p-0"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? "visibility" : "visibility_off"}
          </button>
        )}
      </div>
      {smError && (
        <footer className="mt-1">
          <p aria-live="polite" className="span-error h-4 text-red-500 text-sm">
            {error}
          </p>
        </footer>
      )}
    </section>
  );
}

export default Inputs;
