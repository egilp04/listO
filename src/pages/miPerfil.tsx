import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";

const MiPerfil = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow w-full max-w-4xl mx-auto px-4 pb-8">
        <div className="flex flex-col gap-12 md:gap-14 lg:gap-20">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <label className="font-bold">Nombre de usuario</label>
            </div>
            <div className="w-full md:w-2/3">
              <Inputs label="" placeholder={"nombre"} name="nombre" />
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
              />
            </div>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <label className="font-bold">Fecha Nacimiento</label>
            </div>
            <div className="w-full md:w-2/3">
              <Inputs label="" name="fechaNacimiento" type="date" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-1/3">
              <Button variant="primario" className="w-full py-4 text-xl">
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
