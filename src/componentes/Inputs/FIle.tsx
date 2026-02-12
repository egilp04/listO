import { useState, type InputHTMLAttributes, type ChangeEvent, useRef } from "react";

interface FileProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    mensajeError: string;
}

function File({ label, name, disabled, onChange, mensajeError, ...props }: FileProps) {
    const [error, setError] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleValidClick = () => {
        fileInputRef.current?.click();
    };

    const validaciones = {
        extension: ["jpg", "png", "web"],
        tamano: 2 * 1024 * 1024,
    };

    const validarArchivo = (file: File) => {
        const extension = file.name.split(".").pop()?.toLowerCase();
        let esValido = true;

        if (!extension || !validaciones.extension.includes(extension)) {
            esValido = false;
        }
        if (file.size > validaciones.tamano) {
            esValido = false;
        }
        setError(!esValido);
    };

    const manejarCambio = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            validarArchivo(selectedFile);
        } else {
            setError(false);
        }
        onChange(e);

    };

    return (
        <div className="file-container max-w-full">
            {/*TODO Aplicar estilo de disabled */}
            <div onClick={handleValidClick} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer">
                <span className={`material-symbols-outlined ${disabled ? 'label-disabled' : ''}`}>
                    upload
                </span>
                <span>{label}</span>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                id={name}
                name={name}
                disabled={disabled}
                onChange={manejarCambio}
                className={`${error ? 'input-error' : 'input-normal'} w-full max-w-full mt-2`}
                {...props}
            />
            {error && <span className="text-red-500 text-sm block mt-1">{mensajeError}</span>}
        </div>
    );
}

export default File;