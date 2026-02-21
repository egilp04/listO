import { type InputHTMLAttributes } from "react";

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

      <label
        htmlFor={name}
        className={`cursor-pointer ${colorTexto} dark:text-primary-50`}
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
