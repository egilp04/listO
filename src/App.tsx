import { useState } from "react";
import "./App.css";
import Checkbox from "./componentes/Inputs/Checkbox";
import Inputs from "./componentes/Inputs/Inputs";
import Select from "./componentes/Inputs/Select";
import TextArea from "./componentes/Inputs/TextArea";
import { Registro } from "./componentes/Formularios/Registro";
import { Login_ChangePasswd } from "./componentes/Formularios/Login_ChangePasswd";
import { Genero } from "./componentes/Formularios/Genero";


function App() {

  const opcionesMeses = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" }
  ];

  const [mes, setMes] = useState("");


  return (
    <div>
      {/* <Inputs label="nombre" name="text" type="text" placeholder='Ponga su nombre'></Inputs>
      <Inputs label="nombre" name="text-2" placeholder='Ponga su nombre' error="NO es el nombre" ></Inputs>
      <Inputs label="nombre" name="text-3" placeholder='Ponga su nombre' ></Inputs>
      <Inputs label="introduce tu  número" name="number-1" type="number" placeholder='ej: 5' ></Inputs>
      <Inputs label="introduce tu  número" name="number-2" type="number" placeholder='ej: 5' disabled></Inputs>
      <Select name="mes-normal" value = {mes} options={opcionesMeses} onChange={(e) => setMes(e.target.value)}/> 
      <Select name="mes" options={opcionesMeses} disabled/>
      <Inputs label="nombre" name="text-4" placeholder='Ponga su nombre'></Inputs>
      <Checkbox label="¿aceptas políticas?" name="politicas" ></Checkbox>
      <Checkbox label="¿aceptas políticas?" name="politicas-2" disabled></Checkbox>
      <TextArea label="Comentarios del Proyecto" name="comentarios-normal-1" placeholder="Escribe aquí tus observaciones..."/>
      <TextArea label="Comentarios del Proyecto" name="comentarios-normal-2" placeholder="Escribe aquí tus observaciones..." error="sobrepasa las letras"/>
      <TextArea label="Comentarios del Proyecto" name="comentarios-normal-3" placeholder="Escribe aquí tus observaciones..." disabled/>
      <Registro></Registro>
      <Login_ChangePasswd login={true}></Login_ChangePasswd> */}
      <Genero></Genero>
    </div>
  );
}

export default App;
