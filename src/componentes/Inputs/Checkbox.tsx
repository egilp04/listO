import { type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  manejarError?: (nombre: string, error: boolean) => void;
  mensajeError?: string;
}

function Checkbox({
  label,
  name,
  disabled,
  manejarCambio,
  ...props
}: CheckboxProps) {
  // const [error, setError] = useState(false);
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
      <label htmlFor={name} className="cursor-pointer text-black">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
