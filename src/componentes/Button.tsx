import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primario" | "secundario" | "fantasma";
    size?: "lg" | "md" | "sm";
}

export default function Button({
    children,
    variant = "primario",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-transparent focus:outline-none";

    const sizeStyles = {
        lg: "h-[var(--spacing-btn-h-lg)] min-w-[var(--spacing-btn-w-lg)] px-4 text-lg",
        md: "h-[var(--spacing-btn-h-md)] min-w-[var(--spacing-btn-w-md)] px-3 text-base",
        sm: "h-[var(--spacing-btn-h-sm)] min-w-[var(--spacing-btn-w-sm)] px-2 text-sm",
    };

    const variants = {
        primario: "bg-[var(--color-primary-700)] text-white hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-500)] disabled:bg-[var(--color-primary-200)]",
        secundario: "bg-gray-100 text-black hover:bg-gray-200 active:bg-[var(--color-primary-700)] active:text-white disabled:bg-gray-50",
        fantasma: "bg-transparent text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] active:bg-[var(--color-primary-200)] disabled:text-[var(--color-primary-300)]",
    };

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}