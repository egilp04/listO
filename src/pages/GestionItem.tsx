import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Inputs from "../componentes/Inputs/Inputs";
import Button from "../componentes/Button";
import Checkbox from "../componentes/Inputs/Checkbox";
import File from "../componentes/Inputs/FIle";
import { useItemStore } from "../store/useItemStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationStore } from "../store/useNotificationStore";
import { useTranslation } from "react-i18next";

interface GestionItemProps {
  item?: any;
}

const GestionItem: React.FC<GestionItemProps> = ({ item: propItem }) => {
  const { t } = useTranslation();
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
    if (tipoSeleccionado !== idTipo) {
      setGenerosSeleccionados([]);
    }
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
      setNotificacion(t('gestionItem.notifRellena'), "error");
      return;
    }

    if (!user?.id_usuario) {
      setNotificacion(t('gestionItem.notifSinUsuario'), "error");
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
      setNotificacion(mEdicion ? t('gestionItem.notifModificado') : t('gestionItem.notifAñadido'), "exito");
      navegar("/biblioteca");
    } else {
      setNotificacion(t('gestionItem.notifError'), "error");
    }
  };

  const cabeceraGestion =
    "w-full bg-primary-600 dark:bg-primary-850 p-2 md:p-3 flex justify-center items-center relative cursor-pointer text-white hover:bg-primary-700 transition-colors";

  return (
    <form className="form-registro mx-auto my-4 lg:my-6 md:w-11/12! lg:w-200! min-h-fit! p-4! md:p-6! lg:p-8! gap-4! md:gap-5! lg:gap-6!" onSubmit={(e) => { e.preventDefault(); manejarEnvio(); }}>
      <header className="w-full mb-1 lg:mb-2">
        <h2 className="text-center font-bold text-primary-700 dark:text-primary-50 text-xl md:text-2xl lg:text-3xl">
          {mEdicion ? t('gestionItem.tituloEditar') : t('gestionItem.tituloCrear')}
        </h2>
      </header>

      <fieldset className="grid-registro gap-3! md:gap-4! border-none p-0 m-0">
        <legend className="sr-only">{t('gestionItem.legendTitulo')}</legend>
        <Inputs
          label={t('gestionItem.campoTitulo')}
          error={t('gestionItem.errorTitulo')}
          name={"titulo"}
          value={titulo}
          maxLength={30}
          manejarCambio={manejarCambioTitulo}
          manejarError={manejarErrorTitulo}
        />
        <Inputs
          label={t('gestionItem.campoInformacion')}
          error={t('gestionItem.errorInformacion')}
          name={"informacion"}
          value={informacion}
          maxLength={50}
          manejarCambio={manejarCambioInfo}
          manejarError={manejarErrorInfo}
        />
      </fieldset>

      <div className="grid-registro gap-3! md:gap-4! border-none p-0 m-0 w-full items-center">
        <section className="flex flex-col gap-1 w-full">
          <span className="font-medium text-primary-900 dark:text-primary-50">{t('gestionItem.campoImagen')}</span>
          <File
            label={t('gestionItem.subirImagen')}
            name="imagen"
            onChange={manejarCambioArchivo}
            disabled={guardando}
            mensajeError={t('gestionItem.errorImagen')}
          />
        </section>

        <section className="flex flex-col gap-1 w-full">
          <span className="font-medium text-primary-900 dark:text-primary-50 mb-1">{t('gestionItem.campoValoracion')}</span>
          <div className="flex gap-2 bg-white dark:bg-primary-800 p-2 rounded-lg justify-center border-2 border-transparent hover:border-primary-200 transition-colors shadow-sm h-[60px] items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                aria-hidden="true"
                className="material-symbols-outlined text-warning-500 cursor-pointer text-3xl hover:scale-110 transition-transform"
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
            <span className="text-danger-500 text-sm mt-1">{t('gestionItem.errorValoracion')}</span>
          )}
        </section>
      </div>

      <fieldset className="w-full bg-white dark:bg-primary-900 rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-primary-800 mt-2">
        <legend className="sr-only">{t('gestionItem.legendTipo')}</legend>
        <button
          type="button"
          className={cabeceraGestion}
          onClick={() => setTipoAbierto(!tipoAbierto)}
        >
          <span className="font-medium">{t('gestionItem.campoTipo')}</span>
          <span
            className="material-symbols-outlined absolute right-4"
            aria-hidden="true"
          >
            {tipoAbierto ? "expand_less" : "expand_more"}
          </span>
        </button>
        {tipoAbierto && (
          <div className="p-2 md:p-3 flex flex-col md:flex-row gap-2 justify-around bg-neutral-50 dark:bg-primary-900/50">
            {tipos.map((tipo) => (
              <div
                key={tipo.id_tipo}
                className={`rounded-lg p-2 w-full md:w-5/12 flex justify-center transition-colors border-2 ${tipoSeleccionado === tipo.id_tipo ? 'border-primary-500 bg-primary-100 dark:bg-primary-800' : 'border-transparent bg-white dark:bg-primary-850 hover:border-primary-300 shadow-sm'}`}
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
          <span className="text-danger-500 text-sm p-4 block text-center font-medium">
            {t('gestionItem.errorTipo')}
          </span>
        )}
      </fieldset>

      <fieldset className="w-full bg-white dark:bg-primary-900 rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-primary-800">
        <legend className="sr-only">{t('gestionItem.legendGenero')}</legend>
        <button
          type="button"
          className={cabeceraGestion}
          onClick={() => setGeneroAbierto(!generoAbierto)}
        >
          <span className="font-medium">{t('gestionItem.campoGenero')}</span>
          <span
            className="material-symbols-outlined absolute right-4"
            aria-hidden="true"
          >
            {generoAbierto ? "expand_less" : "expand_more"}
          </span>
        </button>

        {generoAbierto && (
          <div className="p-2 md:p-3 flex flex-col gap-2 bg-neutral-50 dark:bg-primary-900/50 min-h-24 justify-center">
            {!tipoSeleccionado ? (
              <div className="flex flex-col items-center justify-center text-primary-500 dark:text-primary-300 gap-1 py-4 text-center">
                <span className="material-symbols-outlined text-4xl mb-1 opacity-80">lock</span>
                <p className="font-medium">Selecciona primero un tipo para desbloquear los géneros</p>
              </div>
            ) : (
              generos
                .filter((genero) => genero.id_tipo === tipoSeleccionado)
                .map((genero) => (
                  <div
                    key={genero.id_genero}
                    className={`flex items-center gap-3 p-2 rounded-lg border-2 transition-colors ${generosSeleccionados.includes(genero.id_genero) ? 'border-primary-500 bg-primary-100 dark:bg-primary-800' : 'border-transparent bg-white dark:bg-primary-850 hover:border-primary-300 shadow-sm'}`}
                  >
                    <div className="bg-primary-600 dark:bg-primary-700 text-white px-4 py-1.5 rounded-md font-medium min-w-personalizado-150 text-center shadow-sm">
                      {genero.nombre}
                    </div>
                    <Checkbox
                      label={genero.descripcion}
                      name={`genero_${genero.id_genero}`}
                      checked={generosSeleccionados.includes(genero.id_genero)}
                      manejarCambio={() => manejarCambioGenero(genero.id_genero)}
                    />
                  </div>
                ))
            )}

            {tipoSeleccionado && generos.filter((g) => g.id_tipo === tipoSeleccionado).length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4 font-medium">
                No hay géneros disponibles para este tipo.
              </p>
            )}
          </div>
        )}
        {errores.genero && (
          <span className="text-danger-500 text-sm p-4 block text-center font-medium">
            {t('gestionItem.errorGenero')}
          </span>
        )}
      </fieldset>

      <footer className="mt-2 lg:mt-4 flex justify-center w-full">
        <Button
          type="submit"
          variant="primario"
          disabled={guardando}
          className="w-full md:w-1/2 lg:w-1/3 text-base md:text-lg py-2 md:py-3 shadow-md"
        >
          {guardando ? t('gestionItem.botonGuardando') : mEdicion ? t('gestionItem.botonModificar') : t('gestionItem.botonAñadir')}
        </Button>
      </footer>
    </form>
  );
};

export default GestionItem;
