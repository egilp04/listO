import { useLocation } from "react-router-dom";
import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNotificationStore } from "../store/useNotificationStore";

const MiPerfil = () => {
  const setNotificacion = useNotificationStore(
    (state) => state.setNotificacion,
  );
  const { state } = useLocation();
  const { user: usuarioLogueado, setUser } = useAuthStore();
  const usuarioReferencia = state?.item || usuarioLogueado;

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

  useEffect(() => {
    if (usuarioReferencia) {
      setDatos({
        nombre: usuarioReferencia.nombre || "",
        apellidos: usuarioReferencia.apellidos || "",
        email: usuarioReferencia.email || "",
        fech_nac: usuarioReferencia.fechanacimiento || "",
      });
    }
  }, [usuarioReferencia]);

  const manejarCambios = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const manejarErrores = (nombre: string, error: boolean) => {
    setErrores((prev) => ({ ...prev, [nombre]: error }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tieneErroresVisuales = Object.values(errores).some(
      (error) => error === true,
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
    const idActualizar = usuarioReferencia?.id_usuario;
    if (!idActualizar) return;
    try {
      const { data, error } = await supabase
        .from("usuario")
        .update({
          nombre: datos.nombre,
          apellidos: datos.apellidos,
          email: datos.email,
          fechanacimiento: datos.fech_nac,
        })
        .eq("id_usuario", idActualizar)
        .select()
        .single();

      if (error) throw error;

      if (usuarioLogueado && data.id_usuario === usuarioLogueado.id_usuario) {
        setUser({ ...usuarioLogueado, ...data });
        console.log(
          "Sesión de usuario actualizada de forma local, para flejar los datos",
        );
      }

      setNotificacion("Perfil modificado correctamente", "exito");
    } catch (error) {
      console.log(error);
      setNotificacion("Error al guardar los cambios", "error");
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
                  value={datos?.nombre || ""}
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
                  value={datos?.apellidos || ""}
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
                  value={datos?.email || ""}
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
                  value={datos?.fech_nac || ""}
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
