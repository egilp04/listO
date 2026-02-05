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
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2";

    const sizeStyles = {
        lg: "h-[40px] min-w-[90px] px-4 text-lg",
        md: "h-[36px] min-w-[90px] px-3 text-base",
        sm: "h-[24px] min-w-[90px] px-2 text-sm",
    };

    const variants = {
        primario: "bg-[#8993FF] text-white hover:bg-[#ACCBFF] active:bg-[#DBEDFF] disabled:bg-[#EAF4FF] focus:ring-[#8993FF]",
        secundario: "bg-neutral-200 text-black hover:bg-neutral-300 active:bg-neutral-400 disabled:bg-neutral-100 focus:ring-neutral-400",
        fantasma: "bg-transparent text-[#8993FF] hover:bg-[#F5F9FF] active:bg-[#EAF4FF] disabled:text-[#DBEDFF] focus:ring-[#8993FF]",
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