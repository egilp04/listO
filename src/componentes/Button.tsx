import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primario" | "secundario" | "fantasma";
}

export default function Button({
    children,
    variant = "primario",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles = "button";

    const variants = {
        primario: "btn-primario",
        secundario: "btn-secundario",
        fantasma: "btn-fantasma",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}