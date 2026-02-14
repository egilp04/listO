import { useLocation, useNavigate } from "react-router-dom";
import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const MiPerfil = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user: userLogueado } = useAuthStore();
  const { crear = true, item = null } = state || {};
  const usuario = item || userLogueado;

  const [datos, setDatos] = useState({
    nombre: usuario?.nombre || "",
    apellidos: usuario?.apellidos || "",
    email: usuario?.email || "",
    fecha_nac: usuario?.fechanacimiento || "",
  });

  const [errores, setErrores] = useState({
    nombre: crear ? false : true,
    apellidos: crear ? false : true,
    email: crear ? false : true,
    fecha_nac: crear ? false : true,
  });

  const manejarCambios = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.name;
    setDatos((prev) => {
      const nuevosDatos = { ...prev, [nombre]: e.target.value };
      return nuevosDatos;
    });
  };

  const manejarErrores = (nombre: string, error: boolean) => {
    setErrores((prev) => {
      return { ...prev, [nombre]: error };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tieneErroresVisuales = Object.values(errores).some(
      (err) => err === true,
    );
    if (tieneErroresVisuales) {
      alert(
        "Algunos de los campos tienen errores o las contraseñas no coinciden.",
      );
    } else {
      enviarDatosBD();
    }
  };

  const enviarDatosBD = async () => {
    try {
      const idActualizar = usuario?.id_usuario;
      if (!idActualizar) throw new Error("No se encontró el ID del usuario");
      const { error } = await supabase
        .from("usuario")
        .update({
          nombre: datos.nombre,
          apellidos: datos.apellidos,
          email: datos.email,
          fechanacimiento: datos.fecha_nac,
        })
        .eq("id_usuario", idActualizar);
      if (error) throw error;
      alert("Datos modificados correctamente");
      navigate("/biblioteca");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el género:", error.message);
      } else {
        console.error("Ocurrió un error inesperado:", error);
      }
      alert("Intente registrarse más tarde");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grow w-full max-w-4xl mx-auto px-4 pb-8">
        <div className="flex flex-col gap-6 md:gap-14 lg:gap-14">
          <h2 className="flex justify-center text-2xl font-bold">Mi Perfil</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                  error="El nombre debe comenzar con mayúsculas, por favor"
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
                  placeholder="Mesías Ambrona"
                  name="apellidos"
                  defaultValue={usuario?.apellidos || ""}
                  manejarError={manejarErrores}
                  manejarCambio={manejarCambios}
                  regex={
                    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
                  }
                  error="El/los apellido/s debe/n comenzar con mayúsculas"
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
                  placeholder="correo@ejemplo.com"
                  name="email"
                  type="email"
                  defaultValue={usuario?.email || ""}
                  manejarError={manejarErrores}
                  manejarCambio={manejarCambios}
                  regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                  error="Revise el email"
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
                  name="fechaNacimiento"
                  type="text"
                  placeholder="dd/mm/aaaa"
                  defaultValue={usuario?.fechanacimiento || ""}
                  regex={/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/}
                  manejarError={manejarErrores}
                  manejarCambio={manejarCambios}
                  error="Formato válido: dd/mm/aaaa"
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
