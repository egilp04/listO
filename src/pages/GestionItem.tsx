import React, { useState } from "react";
import Inputs from "../componentes/Inputs/Inputs";
import Button from "../componentes/Button";
import Checkbox from "../componentes/Inputs/Checkbox";
import File from "../componentes/Inputs/FIle";
import { useTranslation } from "react-i18next";

interface GestionItemProps {
  item?: unknown;
}

const GestionItem: React.FC<GestionItemProps> = ({ item }) => {
  const mEdicion = !!item;
  const { t } = useTranslation();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    genero: "",
    tipo: "",
    valoracion: 0,
  });

  const manejarCambio = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const cabeceraGestion =
    "bg-primary-600 p-3 flex justify-center items-center relative cursor-pointer text-white hover:bg-primary-700 transition-colors";

  return (
    <div className="min-h-screen bg-primary-200 p-4 flex flex-col gap-6">
      <h2 className="font-bold mb-10 text-center">Añadir una nueva ficha</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between w-full md:w-1/2 shadow-sm min-h-16 gap-3">
          <span>IMAGEN: </span>
          <File
            label="Subir"
            name="imagen"
            onChange={manejarCambio}
            disabled={false}
            mensajeError="No es un formato valido(.png, .jpg, .webp)"
          />
        </div>

        <div className="bg-white rounded-xl p-3 flex items-center justify-between w-full md:w-1/2 shadow-sm min-h-16">
          <span>Valoración:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined text-yellow-400"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <span className="whitespace-nowrap">INFORMACIÓN GENERAL:</span>
        <Inputs />
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className={cabeceraGestion}>
          <span>Tipo</span>
          <span className="material-symbols-outlined absolute right-4">
            expand_more
          </span>{" "}
        </div>
        <div className="p-4 flex flex-col md:flex-row gap-4 justify-around">
          {["Libro", "Juego"].map((tipo) => (
            <div
              key={tipo}
              className="bg-primary-600 rounded-lg p-2 w-full md:w-5/12 flex justify-center"
            >
              <Checkbox label={tipo} colorTexto="text-white" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className={cabeceraGestion}>
          <span>Genero</span>
          <span className="material-symbols-outlined absolute right-4">
            expand_more
          </span>{" "}
        </div>

        <div className="p-4 flex flex-col gap-4">
          {["Suspense", "Miedo"].map((genero) => (
            <div
              key={genero}
              className="flex items-center gap-4 bg-blue-50/50 p-2 rounded-lg"
            >
              <div className="bg-primary-600 text-white px-8 py-1 rounded-md text-lg min-w-150 text-center">
                {genero}
              </div>
              <Checkbox label="Descripción" />
            </div>
          ))}
        </div>
      </div>

      <Button variant="primario">{mEdicion ? "MODIFICAR" : "AÑADIR"}</Button>
    </div>
  );
};

export default GestionItem;
