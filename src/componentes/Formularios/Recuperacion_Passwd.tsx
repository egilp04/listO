import { useState, useEffect, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import { supabase } from "../../utils/supabaseClient";

interface RegistroProps extends FormHTMLAttributes<HTMLFormElement> {
    error?: string;
    login: boolean;
}

export const Recuperacion_Passwd = ({
    error,
    login,
    ...props
}: RegistroProps) => {
    const navigate = useNavigate();
    const { error: authError } = useAuthStore();
    const { setNotificacion } = useNotificationStore();

    const [formData, setFormData] = useState({
        nueva_passwd: "",
        confirm_passwd: "",
    });

    const texto = "Actualizar Contraseña";

    const [erroresActivos, setErroresActivos] = useState<Record<string, boolean>>(
        {},
    );

    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const finalizeUpdate = async () => {
            if (updateSuccess) {
                console.log("Contraseña actualizada con éxito");
                navigate("/biblioteca");
                setNotificacion("Contraseña actualizada con éxito.", "exito");

            }
        };
        finalizeUpdate();
    }, [updateSuccess, navigate, setNotificacion]);

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const manejarError = (nombre: string, hayError: boolean) => {
        setErroresActivos({ ...erroresActivos, [nombre]: hayError });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(erroresActivos).some((e) => e)) {
            setNotificacion("Por favor, corrige los errores antes de continuar", "error");
            return;
        }

        if (formData.nueva_passwd !== formData.confirm_passwd) {
            setNotificacion("Las contraseñas no coinciden", "error");
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: formData.nueva_passwd
            });

            if (error) {
                setNotificacion("Error al actualizar: " + error.message, "error");
            } else {
                setUpdateSuccess(true);
            }
        } catch (err) {
            console.error("Error al actualizar contraseña", err);
            setNotificacion("Error al actualizar. El enlace podría haber expirado.", "error");
        }
    };

    return (
        <form className="form-login_passwd" onSubmit={handleSubmit} {...props}>
            <h2>{texto}</h2>

            <div className="flex-login-passwd">
                <Inputs
                    label="Nueva Contraseña"
                    type="password"
                    placeholder="********"
                    name="nueva_passwd"
                    error={
                        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
                    }
                    regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/}
                    value={formData.nueva_passwd}
                    manejarCambio={manejarCambio}
                    manejarError={manejarError}
                />
                <Inputs
                    label="Confirmar Contraseña"
                    type="password"
                    placeholder="********"
                    name="confirm_passwd"
                    error={"Las contraseñas no coinciden"}
                    regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/}
                    value={formData.confirm_passwd}
                    manejarCambio={manejarCambio}
                    manejarError={manejarError}
                />
            </div>

            <Button type="submit">{texto}</Button>

            {(error || authError) && (
                <p className="span-error mt-1 h-4">{error || authError}</p>
            )}
        </form>
    );
};