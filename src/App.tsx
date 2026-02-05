import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Inputs label="nombre" input="text" placeholder='Ponga su nombre' size="lg" tiporegex="nombre_Ape"></Inputs>
      <Inputs label="nombre" input="text" placeholder='Ponga su nombre' size="sm"></Inputs>
      <Inputs label="nombre" input="text" placeholder='Ponga su nombre' size="md"></Inputs>
      <Inputs label="textarea" input="textarea" placeholder='Esto es un textarea' size="lg"></Inputs>
      <Inputs label="introduce tu  número" input="number" placeholder='ej: 5' size="md"></Inputs>
      <Inputs label="introduce tu  número" input="number" placeholder='ej: 5' size="md" disabled></Inputs>
      <Inputs label="nombre" input="text" placeholder='Ponga su nombre' size="md" error ="No coincide la regex"></Inputs>
    </>
  );
}

export default App;
