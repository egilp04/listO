import "./App.css";
import Checkbox from "./componentes/Inputs/Checkbox";
import Inputs from "./componentes/Inputs/Inputs";

function App() {


  return (
    <>
      <Inputs label="nombre" name="text" type = "text" placeholder='Ponga su nombre'></Inputs>
      <Inputs label="nombre" name="text" placeholder='Ponga su nombre' error= "NO es el nombre" ></Inputs>
      <Inputs label="nombre" name="text" placeholder='Ponga su nombre' ></Inputs>
      <Inputs label="introduce tu  número" name="number" type = "number" placeholder='ej: 5' ></Inputs>
      <Inputs label="introduce tu  número" name="number" type = "number" placeholder='ej: 5' disabled></Inputs>
      <Inputs label="nombre" name="text" placeholder='Ponga su nombre'></Inputs>
      <Checkbox label="¿aceptas políticas?" name="politicas" ></Checkbox>
      <Checkbox label="¿aceptas políticas?" name="politicas" disabled></Checkbox>
    </>
  );
}

export default App;
