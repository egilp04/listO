import { useLocation } from "react-router-dom";
import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNotificationStore } from "../store/useNotificationStore";

const MiPerfil = () => {
  const { setNotificacion } = useNotificationStore();

  const { state } = useLocation();
  const { user: usuarioLogueado } = useAuthStore();
  const { item = null } = state || {};

  const usuario =
    item ||
    (usuarioLogueado
      ? {
          ...usuarioLogueado,
        }
      : null);

  console.log(usuario);

  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    fech_nac: "",
  });

  const [errores, setErrores] = useState({
    nombre: false,
    apellidos: false,
    email: false,
    fech_nac: false,
  });

  const manejarCambios = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const manejarErrores = (nombre: string, error: boolean) => {
    setErrores((prev) => ({ ...prev, [nombre]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tieneErroresVisuales = Object.values(errores).some(
      (err) => err === true,
    );

    if (tieneErroresVisuales) {
      setNotificacion(
        "Algunos de los campos tienen errores, revíselos",
        "error",
      );
    } else {
      await enviarDatosBD();
    }
  };

  const enviarDatosBD = async () => {
    const idActualizar = usuario?.id_usuario;
    console.log("id actualzia", idActualizar);
    if (!idActualizar) {
      setNotificacion("No se encontró el ID del usuario", "error");
      return;
    }
    try {
      const datosActualizar = {
        nombre: datos.nombre || usuario.nombre,
        apellidos: datos.apellidos || usuario.apellidos,
        email: datos.email || usuario.email,
        fechanacimiento: datos.fech_nac || usuario.fechanacimiento,
      };
      console.log("datos actualizat", datosActualizar);
      const { data, error } = await supabase
        .from("usuario")
        .update(datosActualizar)
        .eq("id_usuario", idActualizar)
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        const usuarioActualizadoDB = data[0];
        const usuarioActual = useAuthStore.getState().user;
        console.log(usuarioActual);
        if (usuarioActual) {
          const nuevoUsuarioSesion = {
            ...usuarioActual,
            user_metadata: {
              ...usuarioActual.user_metadata,
              nombre: usuarioActualizadoDB.nombre,
              apellidos: usuarioActualizadoDB.apellidos,
              fechanacimiento: usuarioActualizadoDB.fechanacimiento,
            },
            email: usuarioActualizadoDB.email,
          };
          useAuthStore.getState().setUser(nuevoUsuarioSesion);
        }
        setNotificacion("Datos modificados correctamente 😁", "exito");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el género:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      setNotificacion(
        "No se pudieron guardar los cambios. Inténtelo de nuevo",
        "error",
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grow w-full max-w-4xl mx-auto px-4 pb-8">
        <div className="flex flex-col gap-6 md:gap-14 lg:gap-14">
          <h2 className="flex justify-center text-2xl font-bold">Mi Perfil</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Nombre */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/3">
                <label className="font-bold">Nombre de usuario</label>
              </div>
              <div className="w-full md:w-2/3">
                <Inputs
                  label=""
                  placeholder="Nombre"
                  name="nombre"
                  defaultValue={usuario?.nombre || ""}
                  manejarCambio={manejarCambios}
                  manejarError={manejarErrores}
                  regex={
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                  }
                  error="El nombre debe comenzar con mayúscula"
                />
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/3">
                <label className="font-bold">Apellidos</label>
              </div>
              <div className="w-full md:w-2/3">
                <Inputs
                  label=""
                  placeholder="Apellidos"
                  name="apellidos"
                  defaultValue={usuario?.apellidos || ""}
                  manejarCambio={manejarCambios}
                  manejarError={manejarErrores}
                  regex={
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                  }
                  error="Los apellidos deben comenzar con mayúscula"
                />
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/3">
                <label className="font-bold">Email</label>
              </div>
              <div className="w-full md:w-2/3">
                <Inputs
                  label=""
                  name="email"
                  type="email"
                  defaultValue={usuario?.email || ""}
                  manejarCambio={manejarCambios}
                  manejarError={manejarErrores}
                  regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                  error="Email no válido"
                />
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/3">
                <label className="font-bold">Fecha Nacimiento</label>
              </div>
              <div className="w-full md:w-2/3">
                <Inputs
                  label=""
                  name="fech_nac"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  defaultValue={usuario?.fechanacimiento || ""}
                  manejarCambio={manejarCambios}
                  manejarError={manejarErrores}
                  regex={/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/}
                  error="Formato: dd/mm/aaaa"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <div className="w-full md:w-1/3">
                <Button
                  variant="primario"
                  className="w-full py-4 text-xl"
                  type="submit"
                >
                  Modificar Datos
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
