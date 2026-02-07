import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

function Checkbox({ label, name, disabled, ...props }: CheckboxProps) {
    const cursorClass = disabled ? "cursor-not-allowed" : "cursor-pointer";

    return (
        <div className="checkbox-container">
            <input
                type="checkbox"
                id={name}
                name={name}
                disabled={disabled}
                className={`checkbox-input checkbox-responsive ${disabled ? "input-disabled" : cursorClass}`}
                {...props}
            />
            <label htmlFor={name} className={`${cursorClass} ${disabled ? "label-disabled" : "text-black"}`}>
                {label}
            </label>
        </div>
    );
}

export default Checkbox;