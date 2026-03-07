import { type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mensajeError?: string;
}

function Checkbox({
  label,
  name,
  disabled,
  manejarCambio,
  ...props
}: CheckboxProps) {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    manejarCambio(e);
  };

  return (
    <section className="checkbox-container flex items-center gap-2">
      <input
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        className="checkbox-input checkbox-responsive cursor-pointer"
        aria-disabled={disabled}
        {...props}
        onChange={handleChange}
      />

      <label
        htmlFor={name}
        className={`cursor-pointer text-primary-1100 dark:text-primary-50 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {label}
      </label>
    </section>
  );
}

export default Checkbox;
