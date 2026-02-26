import { useState, type FormHTMLAttributes } from "react";
import Inputs from "../Inputs/Inputs";
import Checkbox from "../Inputs/Checkbox";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";

export const Registro = ({ ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  const navigate = useNavigate();
  const setNotificacion = useNotificationStore(
    (state) => state.setNotificacion,
  );
  const location = useLocation();
  const state = location.state || {};
  const vieneDeGestion = state.atras || false;

  const { logout } = useAuthStore();

  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    fecha_nac: "",
    passwd: "",
    rep_passwd: "",
  });

  const [errores, setErrores] = useState({
    nombre: true,
    apellidos: true,
    email: true,
    fecha_nac: true,
    passwd: true,
    rep_passwd: true,
    politicas: true,
  });

  const manejarCambios = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.name;
    setDatos((prev) => {
      const nuevosDatos = { ...prev, [nombre]: e.target.value };
      if (nombre === "passwd" || nombre === "rep_passwd") {
        const otraPassword =
          nombre === "passwd" ? nuevosDatos.rep_passwd : nuevosDatos.passwd;
        const coinciden = nuevosDatos[nombre] === otraPassword;
        manejarErrores("rep_passwd", !coinciden);
      }
      return nuevosDatos;
    });
    if (e.target.type == "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      if (checked) {
        manejarErrores(nombre, false);
      } else {
        manejarErrores(nombre, true);
      }
    }
  };
  const manejarErrores = (nombre: string, error: boolean) => {
    setErrores((prev) => {
      return { ...prev, [nombre]: error };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordsCoinciden =
      datos.passwd !== "" &&
      datos.rep_passwd != "" &&
      datos.passwd === datos.rep_passwd;

    const tieneErroresVisuales = Object.values(errores).some(
      (err) => err === true,
    );
    if (tieneErroresVisuales || !passwordsCoinciden) {
      setNotificacion(
        "Algunos de los campos tienen errores o las contraseñas no coinciden",
        "error",
      );
    } else {
      await enviarDatosBD();
    }
  };

  const enviarDatosBD = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: datos.email,
        password: datos.passwd,
        options: {
          data: {
            nombre: datos.nombre,
            apellidos: datos.apellidos,
            fechanacimiento: datos.fecha_nac,
          },
        },
      });
      console.log("Error antes de lanzarse", error);

      if (error) throw error;
      else {
        console.log("se hace bien el registro");
        setNotificacion(
          "¡Usuario registrado con éxito! Ya puedes iniciar sesión.",
          "exito",
        );
        if (vieneDeGestion) {
          console.log("viene de gestion");
          navigate(-1);
        } else {
          console.log("se sale jejejej");
          logout();
          navigate("/");
        }
      }
    } catch (error) {
      console.log("catch error", error);
      setNotificacion("Intente registrarse más tarde", "error");
    }
  };

  return (
    <form className="form-registro" {...props} onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <div className="grid-registro">
        <Inputs
          label="Nombre"
          type="text"
          placeholder="Ej: Eve"
          name="nombre"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
          error="El nombre debe comenzar con mayúsculas sin números, por favor"
        />
        <Inputs
          label="Apellidos"
          type="text"
          placeholder="Ej: Ceballos Mateos"
          name="apellidos"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
          error="El/los apellido/s debe/n comenzar con mayúsculas seguido de minúsculas sin números"
        />
        <Inputs
          label="Fecha Nacimiento"
          type="text"
          placeholder="Ej: 30/12/2000"
          name="fecha_nac"
          regex={/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/}
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          error="Introduzca una fecha válida: dd/mm/aaaa"
        />
        <Inputs
          label="Email"
          type="email"
          placeholder="Ej: eve@gmail.com"
          name="email"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
          error="Revise el email"
        />
        <Inputs
          label="Contraseña"
          type="password"
          placeholder="********"
          name="passwd"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/}
          error="La contraseña debe tener una mayúscula mínimo y carácteres especiales"
        />
        <Inputs
          label="Confirmar Contraseña"
          type="password"
          placeholder="********"
          name="rep_passwd"
          manejarError={manejarErrores}
          manejarCambio={manejarCambios}
          regex={/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/}
          error="Revise la contraseña, debe coincidir con el campo anterior"
        />
      </div>

      <Checkbox
        label="Aceptar políticas"
        name="politicas"
        manejarCambio={manejarCambios}
      />
      <Button type="submit">Registrar</Button>
    </form>
  );
};
