import { Login_ChangePasswd } from "../componentes/Formularios/Login_ChangePasswd";
// 1. Importamos la imagen desde la ruta que muestras en la captura
import fondoLogin from "../assets/img/Fondo-logins.webp"; 

const Login = () => {
  return (
    <div 
      // 2. Añadimos clases para que la imagen cubra todo y no se repita
      className="flex justify-center items-center h-full py-10 bg-cover bg-center bg-no-repeat"
      // 3. Pasamos la imagen importada como variable al estilo inline
      style={{ backgroundImage: `url(${fondoLogin})` }}
    >
      <Login_ChangePasswd login={true} />
    </div>
  );
};

export default Login;