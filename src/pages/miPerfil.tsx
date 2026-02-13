import { useState } from "react";
import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";
import { supabase } from "../utils/supabaseClient";

interface DatosActualizarUsuario {
  email?: string;
  options?: {
    data: {
      nombre?: string;
      fechanacimiento?: string;
    };
  };
}

const MiPerfil = () => {

  const [valores, setValores] = useState({
    nombre: "",
    email: "",
    fechaNacimiento: "",
  });

  const [errores, setErrores] = useState({
    nombre: false,
    email: false,
    fechaNacimiento: false,
  });

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const manejarError = (nombre: string, error: boolean) => {
    setErrores((prev) => ({ ...prev, [nombre]: error }));
  };


  const handleSubmit = async () => {
    const hayErrores = Object.values(errores).some((e) => e);
    const hayCamposVacios = Object.values(valores).some((v) => v === "");

    if (hayErrores || hayCamposVacios) {
      alert("Por favor, corrige los errores antes de continuar.");
      return;
    }

    const datosActualizar: DatosActualizarUsuario = {
      email: valores.email,
      options: {
        data: {
          nombre: valores.nombre,
          fechanacimiento: valores.fechaNacimiento,
        },
      },
    };

    const { data, error } = await supabase.auth.updateUser(datosActualizar);

    if (error) {
      console.error("Error al actualizar:", error.message);
      alert("Error al actualizar: " + error.message);
    } else {
      console.log("Datos actualizados:", data);
      alert("Datos modificados correctamente.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grow w-full max-w-4xl mx-auto px-4 pb-8">
        <div className="flex flex-col gap-6 md:gap-14 lg:gap-14">
          <h2 className="flex justify-center">Mi Perfil</h2>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <label className="font-bold">Nombre de usuario</label>
            </div>
            <div className="w-full md:w-2/3">
              <Inputs
                label=""
                placeholder={"Nombre"}
                name="nombre"
                value={valores.nombre}
                regex={/^[A-Z][a-zA-ZáéíóúÁÉÍÓÚñÑ ]{0,19}$/}
                error="Debe empezar por mayúscula y máximo 20 caracteres"
                manejarCambio={manejarCambio}
                manejarError={manejarError}
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
                placeholder={"correo@ejemplo.com"}
                name="email"
                type="email"
                value={valores.email}
                regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                error="Introduce un email válido"
                manejarCambio={manejarCambio}
                manejarError={manejarError}
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
                type="date"
                value={valores.fechaNacimiento}
                regex={/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/}
                error="Formato válido: dd/mm/aaaa"
                manejarCambio={manejarCambio}
                manejarError={manejarError}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-1/3">
              <Button variant="primario" className="w-full py-4 text-xl" onClick={handleSubmit}>
                Modificar Datos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
