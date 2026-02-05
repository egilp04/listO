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
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 lg:h-[40px] lg:min-w-[90px] lg:px-4 lg:text-lg md:h-[36px] md:min-w-[90px] md:px-3 md:text-base sm:h-[24px] sm:min-w-[90px] sm:px-2 sm:text-sm";

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