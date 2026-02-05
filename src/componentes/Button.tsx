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
        primario: "bg-[var(--color-primary-700)] text-white hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-500)] disabled:bg-[var(--color-primary-400)] focus:ring-[var(--color-primary-700)]",
        secundario: "bg-neutral-200 text-black hover:bg-neutral-300 active:bg-neutral-400 disabled:bg-neutral-100 focus:ring-neutral-400",
        fantasma: "bg-transparent text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] active:bg-[var(--color-primary-300)] disabled:text-[var(--color-primary-500)] focus:ring-[var(--color-primary-700)]",
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