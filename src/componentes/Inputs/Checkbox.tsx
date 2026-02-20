import { type InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mensajeError?: string;
  colorTexto?: string;
}

function Checkbox({
  label,
  name,
  disabled,
  colorTexto,
  manejarCambio,
  ...props
}: CheckboxProps) {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    manejarCambio(e);
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        className={`checkbox-input checkbox-responsive cursor-pointer`}
        {...props}
        onChange={handleChange}
      />

      <label htmlFor={name} className={`cursor-pointer ${colorTexto}`}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
