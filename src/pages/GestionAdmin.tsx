import { useNavigate } from "react-router-dom";
import Button from "../componentes/Button";
import Table from "../componentes/Table";
import { useEffect, useState } from "react";
import { useGestionAdminStore } from "../store/useGestionAdminStore";
import { useTranslation } from "react-i18next";

const GestionAdmin = () => {
  const { fetchGeneros, fetchUsuarios } = useGestionAdminStore();
  const [selected, setSelected] = useState("usuario");
  const [valorFiltro, setValorFiltro] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchUsuarios();
    fetchGeneros();
  }, [fetchUsuarios, fetchGeneros]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelected(e.currentTarget.name);
  };

  const crearItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const nombre = e.currentTarget.name;
    if (nombre == "usuario") {
      navigate("/registro", { state: { atras: true } });
    } else {
      navigate("/genero", { state: { crear: true } });
    }
  };

  const handleFiltrar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValorFiltro(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-8 md:p-6 mg:gap-14 mb-12 2xl:gap-18">
      <h2 className="flex justify-center">Gestión</h2>
      <div className="flex flex-row gap-10 w-full justify-center items-center">
        <Button
          variant={selected == "usuario" ? "primario" : "secundario"}
          name="usuario"
          onClick={handleClick}
        >
          <span>Usuario</span>
        </Button>
        <Button
          variant={selected == "genero" ? "primario" : "secundario"}
          onClick={handleClick}
          name="genero"
        >
          <span>Género</span>
        </Button>
      </div>
      <div className="shadow-elevation-3 bg-primary-50 flex flex-col gap-6 max-h-150 overflow-hidden p-10 rounded-sm">
        <div className="flex flex-col gap-4  justify-center items-center md:justify-around md:flex-row w-full">
          <div className="w-1/2">
            <input
              className="input-style-comun border border-success-500 input-responsive"
              placeholder="Busca por nombre o autor"
              onChange={handleFiltrar}
            ></input>
          </div>
          <div>
            <Button variant="primario" onClick={crearItem} name={selected}>
              <span>
                {selected == "usuario" ? "Crear Usuario" : "Crear Género"}
              </span>
            </Button>
          </div>
        </div>

        <Table tipoItem={selected} valorFiltro={valorFiltro}></Table>
      </div>
    </div>
  );
};

export default GestionAdmin;
