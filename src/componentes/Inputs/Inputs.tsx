import { useState } from "react";

interface InputsProps {
    label: string;
    input: string;
    placeholder: string;
    variante?: "primario" | "info";
    size?: "lg" | "md" | "sm";
    error?: string;
    disabled?: boolean;
    tiporegex?: "nombre_Ape" | "email" | "passwd" | "fecha_nacimiento"
}

export const Inputs = ({ label, input, placeholder, variante = "primario", size = "md", error, disabled, tiporegex = "nombre_Ape" }: InputsProps) => {

    const [errores, setError] = useState<String | null>(null)
    const [Ok, setOk] = useState(false)

    const regex = {

        nombre_Ape: /^[A-Za-zÑñÁáÉéÍíÓóÚú\s'-]+$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        passwd: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?!(.)\1\1).{8,}$/,
        fecha_nacimiento: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    };

    const errormsg = {

        nombre_Ape: "Error en el nombre. Solamente debe contener letras.",
        email: "No coincide con un formaro correcto de email",
        passwd: "No coincide la contraseña",
        fecha_nacimiento: "No está en el formato correcto"
    };

    const variantStyles = {
        primario: "border-primary-500 hover:border-primary-600 focus:border-primary-700",
        info: "border-info-500 hover:border-info-600 focus:border-info-700",
    };

    const sizeStyles = {
        lg: "h-10 p-3 text-base",
        md: "h-9 p-3 text-sm",
        sm: "h-6 p-2 text-xs",
    };

    let claseColor = variantStyles[variante];

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value
        const validar = regex[tiporegex]

        if (valor === '') {
            setError(null);
            setOk(false);
            return;
        }

        if (validar && !validar.test(valor)) {
            setError(errormsg[tiporegex]);
        } else {
            setError(null)
            setOk(true)
 
        }
    }


    if (disabled) {
        claseColor = "bg-gray-100 border-neutral-300 cursor-not-allowed text-neutral-400";
    } else if (error || errores) {
        claseColor = "border-danger-500";
    } else if (Ok) {
        claseColor = "border-success-500";
    }
    else {
        claseColor = `${variantStyles[variante]} bg-white`;
    }

    const isTextArea = input == 'textarea'
    const texAreaStyle = "w-full h-full gap-1 p-2 px-3"

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="font-Otros font-medium text-black text-sm">{label}</label>
            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
                    flex items border-2 rounded-lg outline-none transition-all duration-200 placeholder:text-gray-400
                    ${sizeStyles[size]}
                    ${claseColor}
                    ${texAreaStyle}
                `}
                ></textarea>
            ) : (<input
                type={input}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleQuery}
                className={`
                    w-full flex items border-2 rounded-lg outline-none transition-all duration-200 placeholder:text-gray-400
                    ${sizeStyles[size]}
                    ${claseColor}
                `} />)
            }


            {error || errores && <span className="text-danger-500 text-xs font-Otros">{error || errores}</span>}
        </div>
    );
};