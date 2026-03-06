import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Inputs from "../componentes/Inputs/Inputs";
import Button from "../componentes/Button";
import Checkbox from "../componentes/Inputs/Checkbox";
import File from "../componentes/Inputs/FIle";
import { useItemStore } from "../store/useItemStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationStore } from "../store/useNotificationStore";

interface GestionItemProps {
  item?: any;
}

const GestionItem: React.FC<GestionItemProps> = ({ item: propItem }) => {
  const location = useLocation();
  const stateItem = location.state?.item;
  const itemAEditar = propItem || stateItem;

  const mEdicion = !!itemAEditar;

  const { tipos, generos, fetchTipos, fetchGeneros, guardarItem, guardando } =
    useItemStore();
  const { user } = useAuthStore();
  const { setNotificacion } = useNotificationStore();
  const navegar = useNavigate();

  const [titulo, setTitulo] = useState(itemAEditar?.informacion || "");
  const [informacion, setInformacion] = useState(itemAEditar?.descripcion || "");
  const [valoracion, setValoracion] = useState(itemAEditar?.valoracion || 0);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>(itemAEditar?.id_tipo || "");
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>(
    itemAEditar?.generosIds || []
  );
  const [archivo, setArchivo] = useState<globalThis.File | null>(null);
  const [errores, setErrores] = useState({
    titulo: false,
    informacion: false,
    tipo: false,
    genero: false,
    valoracion: false,
  });
  const [tipoAbierto, setTipoAbierto] = useState(true);
  const [generoAbierto, setGeneroAbierto] = useState(true);

  useEffect(() => {
    fetchTipos();
    fetchGeneros();
  }, [fetchTipos, fetchGeneros]);

  const manejarCambioTitulo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
  };

  const manejarErrorTitulo = (_nombre: string, error: boolean) => {
    setErrores((prev) => ({ ...prev, titulo: error }));
  };

  const manejarCambioInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformacion(e.target.value);
  };

  const manejarErrorInfo = (_nombre: string, error: boolean) => {
    setErrores((prev) => ({ ...prev, informacion: error }));
  };

  const manejarCambioArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ficheros = e.target.files;
    if (ficheros && ficheros.length > 0) {
      setArchivo(ficheros[0]);
    } else {
      setArchivo(null);
    }
  };

  const manejarCambioTipo = (idTipo: string) => {
    setTipoSeleccionado(idTipo);
    setErrores((prev) => ({ ...prev, tipo: false }));
  };

  const manejarCambioGenero = (idGenero: string) => {
    setGenerosSeleccionados((prev) =>
      prev.includes(idGenero)
        ? prev.filter((id) => id !== idGenero)
        : [...prev, idGenero]
    );
    setErrores((prev) => ({ ...prev, genero: false }));
  };

  const manejarValoracion = (valor: number) => {
    setValoracion(valor);
    setErrores((prev) => ({ ...prev, valoracion: false }));
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores = {
      titulo: titulo.trim() === "",
      informacion: informacion.trim() === "",
      tipo: tipoSeleccionado === "",
      genero: generosSeleccionados.length === 0,
      valoracion: valoracion === 0,
    };
    setErrores(nuevosErrores);
    return !Object.values(nuevosErrores).some((e) => e);
  };

  const manejarEnvio = async () => {
    if (!validarFormulario()) {
      setNotificacion("Rellena todos los campos obligatorios", "error");
      return;
    }

    if (!user?.id_usuario) {
      setNotificacion("No se pudo identificar al usuario", "error");
      return;
    }

    const exito = await guardarItem(
      {
        titulo,
        informacion,
        valoracion,
        id_tipo: tipoSeleccionado,
      },
      generosSeleccionados,
      archivo,
      user.id_usuario,
      itemAEditar?.id_item
    );

    if (exito) {
      setNotificacion(mEdicion ? "Item modificado correctamente" : "Item añadido correctamente", "exito");
      navegar("/biblioteca");
    } else {
      setNotificacion("Error al guardar el item", "error");
    }
  };

  const cabeceraGestion =
    "w-full bg-primary-600 dark:bg-primary-850 p-3 flex justify-center items-center relative cursor-pointer text-white hover:bg-primary-700 transition-colors";

  return (
    <section className="p-4 flex flex-col gap-6 mb-10">
      <h1 className="pt-6 pb-6 text-center">
        {mEdicion ? "Modificar ficha" : "Añadir una nueva ficha"}
      </h1>

      <fieldset className="bg-white dark:bg-primary-900 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <legend className="sr-only">Título</legend>
        <span className="whitespace-nowrap dark:text-primary-50">TÍTULO:</span>
        <Inputs
          error={"El título es obligatorio (Máx. 30 caracteres)"}
          name={"titulo"}
          value={titulo}
          maxLength={30}
          manejarCambio={manejarCambioTitulo}
          manejarError={manejarErrorTitulo}
        />
      </fieldset>

      <div className="flex flex-col md:flex-row gap-6">
        <fieldset className="bg-white dark:bg-primary-900 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between w-full md:w-1/2 shadow-sm min-h-16 gap-3">
          <legend className="sr-only">Subida de imagen</legend>
          <span className="dark:text-primary-50">IMAGEN: </span>
          <File
            label="Subir"
            name="imagen"
            onChange={manejarCambioArchivo}
            disabled={false}
            mensajeError="No es un formato valido(.png, .jpg, .webp) o supera 2MB"
          />
        </fieldset>

        <fieldset className="bg-white dark:bg-primary-900 rounded-xl p-3 flex items-center justify-between w-full md:w-1/2 shadow-sm min-h-16">
          <legend className="sr-only">Valoración</legend>
          <span className="dark:text-primary-50">Valoración:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                aria-hidden="true"
                className="material-symbols-outlined text-warning-500 cursor-pointer"
                style={{
                  fontVariationSettings:
                    star <= valoracion ? "'FILL' 1" : "'FILL' 0",
                }}
                onClick={() => manejarValoracion(star)}
              >
                star
              </span>
            ))}
          </div>
          {errores.valoracion && (
            <span className="text-danger-500 text-sm">Obligatorio</span>
          )}
        </fieldset>
      </div>

      <fieldset className="bg-white dark:bg-primary-900 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <legend className="sr-only">Información General</legend>
        <span className="whitespace-nowrap dark:text-primary-50 ">
          INFORMACIÓN GENERAL:
        </span>
        <Inputs
          error={"La información es obligatoria (Máx. 50 caracteres)"}
          name={"informacion"}
          value={informacion}
          maxLength={50}
          manejarCambio={manejarCambioInfo}
          manejarError={manejarErrorInfo}
        />
      </fieldset>

      <fieldset className="bg-white dark:bg-primary-900 rounded-xl overflow-hidden shadow-sm">
        <legend className="sr-only">Selección de Tipo</legend>
        <button
          type="button"
          className={cabeceraGestion}
          onClick={() => setTipoAbierto(!tipoAbierto)}
        >
          <span className="dark:text-primary-50">Tipo</span>
          <span
            className="material-symbols-outlined absolute right-4"
            aria-hidden="true"
          >
            {tipoAbierto ? "expand_less" : "expand_more"}
          </span>
        </button>
        {tipoAbierto && (
          <div className="p-4 flex flex-col md:flex-row gap-4 justify-around">
            {tipos.map((tipo) => (
              <div
                key={tipo.id_tipo}
                className="bg-primary-600 dark:bg-primary-850 rounded-lg p-2 w-full md:w-5/12 flex justify-center"
              >
                <Checkbox
                  label={tipo.nombre}
                  name={`tipo_${tipo.id_tipo}`}
                  checked={tipoSeleccionado === tipo.id_tipo}
                  manejarCambio={() => manejarCambioTipo(tipo.id_tipo)}
                />
              </div>
            ))}
          </div>
        )}
        {errores.tipo && (
          <span className="text-danger-500 text-sm p-4 block">
            Selecciona un tipo
          </span>
        )}
      </fieldset>

      <fieldset className="bg-white dark:bg-primary-900 rounded-xl overflow-hidden shadow-sm">
        <legend className="sr-only">Selección de Género</legend>
        <button
          type="button"
          className={cabeceraGestion}
          onClick={() => setGeneroAbierto(!generoAbierto)}
        >
          <span>Genero</span>
          <span
            className="material-symbols-outlined absolute right-4"
            aria-hidden="true"
          >
            {generoAbierto ? "expand_less" : "expand_more"}
          </span>
        </button>

        {generoAbierto && (
          <div className="p-4 flex flex-col gap-4">
            {generos.map((genero) => (
              <div
                key={genero.id_genero}
                className="flex items-center gap-4 p-2 rounded-lg"
              >
                <div className="bg-primary-600 dark:bg-primary-850 text-white px-8 py-1 rounded-md text-lg min-w-150 text-center">
                  {genero.nombre}
                </div>
                <Checkbox
                  label={genero.descripcion}
                  name={`genero_${genero.id_genero}`}
                  checked={generosSeleccionados.includes(genero.id_genero)}
                  manejarCambio={() => manejarCambioGenero(genero.id_genero)}
                />
              </div>
            ))}
          </div>
        )}
        {errores.genero && (
          <span className="text-danger-500 text-sm p-4 block">
            Selecciona al menos un género
          </span>
        )}
      </fieldset>

      <Button
        variant="primario"
        onClick={manejarEnvio}
        disabled={guardando}
        className="w-full max-w-sm self-center mb-6"
      >
        {guardando ? "GUARDANDO..." : mEdicion ? "MODIFICAR" : "AÑADIR"}
      </Button>
    </section>
  );
};

export default GestionItem;
