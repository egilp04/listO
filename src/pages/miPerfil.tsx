import Button from "../componentes/Button";
import Inputs from "../componentes/Inputs/Inputs";

const MiPerfil = () => {
  return (
    <div className="min-h-screen  flex flex-col">
      <div className="flex-grow w-full max-w-4xl mx-auto px-4 pb-8">
        <div className="space-y-6">
          {/* Tarjeta  del Nombre */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <label>Nombre</label>
            </div>
            <div className="w-full md:w-2/3">
              <Inputs label="" placeholder="Maria" name="nombre" />
            </div>
          </div>

          {/* Tarjeta del Email */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <label>Email</label>
            </div>
            <div className="w-full md:w-2/3">
              <Inputs
                label=""
                placeholder="listOdaw@gmail.com"
                name="email"
                type="email"
              />
            </div>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <label>Fecha Nacimiento</label>
            </div>
            <div className="w-full md:w-2/3">
              <Inputs
                label=""
                placeholder="00/00/0000"
                name="fechaNacimiento"
                type="date"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="w-full md:w-1/3">
              <Button variant="primario" className="w-full py-4 text-xl">
                Modificar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
