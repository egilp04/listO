import { type SelectHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

export interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  variant?: "primario" | "info";
  manejarambio: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  options,
  value = "",
  variant = "primario",
  disabled,
  manejarambio,
  ...props
}: SelectProps) {
  const { t } = useTranslation();
  const colorClass = `input-border-${variant}`;

  return (
    <section
      className="flex flex-col gap-0.5 w-fit"
      aria-labelledby={`${props.name}-label`}
    >
      <label
        id={`${props.name}-label`}
        htmlFor={props.name}
        className="sr-only"
      >
        {t('select.labelSeleccionarOpcion')}
      </label>

      <select
        id={props.name}
        value={value}
        disabled={disabled}
        className={`w-fit min-w-30 select-responsive input-style-comun ${disabled
          ? "input-disabled cursor-not-allowed"
          : `cursor-pointer select-color-text ${colorClass}`
          }`}
        {...props}
        onChange={manejarambio}
      >
        <option value="" className="text-primary-900">
          {t('select.opcionPorDefecto')}
        </option>

        {options.map((option) => {
          const esMes = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ].includes(option.label);

          const labelMostrar = esMes
            ? t(`meses.${option.label.toLowerCase()}`, option.label)
            : option.label;

          return (
            <option
              key={option.value}
              value={option.value}
              className="dark:text-primary-50 dark:bg-primary-900 text-primary-900"
            >
              {labelMostrar}
            </option>
          );
        })}
      </select>
    </section>
  );
}
