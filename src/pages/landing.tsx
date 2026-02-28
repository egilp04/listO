import { Link } from "react-router-dom";
import CardLanding from "../componentes/tarjetas/cardLanding";
import Button from "../componentes/Button";

import card1 from "../assets/img/cards/carta_landing1.webp";
import card2 from "../assets/img/cards/carta_landing2.webp";
import card3 from "../assets/img/cards/carta_landing3.webp";
import card4 from "../assets/img/cards/carta_landing4.webp";
import card5 from "../assets/img/cards/carta_landing5.webp";
import heroLight from "../assets/img/cards/landing-hero-light.webp";

const Landing = () => {
  const featureImage1 = card1;
  const featureImage2 = card2;
  const featureImage3 = card3;
  const featureImage4 = card4;
  const featureImage5 = card5;

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col items-center text-center gap-8 w-full lg:gap-12 2xl:gap-16">
        <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 2xl:gap-18">
          <h1>El espacio para tus historias</h1>
          <p>
            Centraliza todo tu entretenimiento. Gestiona libros, juegos, cine y
            música en un catálogo personal único y organizado
          </p>
        </div>
        <Link to="/login">
          <Button variant="primario">Comenzar</Button>
        </Link>
        <div className="w-full mt-8">
          <img
            src={heroLight}
            alt="Bitácora digital"
            className="w-full h-auto object-cover rounded-xl shadow-elevation-1 
               transition-all duration-100
               dark:brightness-[0.7] dark:saturate-[0.45] dark:contrast-[1.6] "
          />
        </div>

        <div className="flex flex-col mt-8 mb-[40px] gap-[30px] 2xl:mb-[100px] md:gap-10 xl:gap-[50px] px-4 md:px-10 lg:px-20">
          <h2>Tu bitácora digital de entretenimiento</h2>
          <p>
            Nuestra aplicación es el refugio definitivo para tu curiosidad
            intelectual, permitiéndote registrar, organizar y valorar con
            precisión quirúrgica cada libro, videojuego y contenido multimedia
            que ha pasado por tus manos. No se trata solo de una lista, sino de
            una biblioteca personal donde podrás documentar cada título con
            fechas exactas de finalización, reseñas críticas profundamente
            personales e imágenes de alta resolución que den vida a tu catálogo.
            Más allá del simple registro, nuestra plataforma transforma tu
            consumo cultural en conocimiento analítico. A través de un motor de
            visualización avanzada, podrás explorar tu historial mediante
            estadísticas detalladas de progreso anual, gráficos de rendimiento
            temático y el cálculo automático de tu puntuación media. Es el
            ecosistema digital diseñado específicamente para aquellos que buscan
            preservar la memoria de sus experiencias, analizando su evolución
            cultural y organizando su legado de entretenimiento en un espacio
            elegante, intuitivo y funcional.
          </p>
        </div>
      </section>

      <div className="flex flex-col w-full gap-[50px] md:gap-[80px] lg:gap-[100px] 2xl:gap-[120px] px-4 md:px-8 lg:px-16">
        <section className="w-full">
          <CardLanding
            titulo="Tu catálogo personal"
            descripcion="Olvida tener listas dispersas en notas o diferentes apps. Centraliza todo en un único catálogo personal. ListO es el hogar digital para todas esas historias que has terminado y que merecen ser recordadas."
            imagen={featureImage1}
            invertido={false}
          />
        </section>
        <section className="w-full">
          <CardLanding
            titulo="Tu crítica, tus reglas"
            descripcion="No se trata solo de marcar como completado. Documenta tu experiencia: escribe una reseña personal, sube tu propia portada y asigna una valoración de 1 a 5 estrellas. Convierte cada ficha en una memoria imborrable."
            imagen={featureImage2}
            invertido={true}
          />
        </section>
        <section className="w-full">
          <CardLanding
            titulo="Ordena tu caos digital"
            descripcion="¿Buscas aquel RPG de hace tres años? Encuéntralo al instante. Utiliza nuestros filtros avanzados para matener tu biblioteca perfectamente estructurada sin esfuerzo."
            imagen={featureImage3}
            invertido={false}
          />
        </section>
        <section className="w-full">
          <CardLanding
            titulo="Visualiza tus logros"
            descripcion="Descubre tus verdaderos hábitos de consumo cultural. Accede a tu panel de estadísticas y deja que los datos cuenten tu historia."
            imagen={featureImage4}
            invertido={true}
          />
        </section>
      </div>

      <section className="w-full py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-8">
          <div className="flex flex-col items-center text-center gap-6">
            <h2>Miles de listas completadas con éxito</h2>
            <p>
              ListO no es solo una aplicación, es la suma de vuestras ideas.
              Creada desde cero gracias a vuestras sugerencias, cada función ha
              sido diseñada para resolver las necesidades reales de quienes
              buscan un control total sobre su biblioteca de libros y su
              catálogo de videojuegos.
            </p>
          </div>
          <div className="w-full md:w-auto max-w-sm">
            <img
              src={featureImage5}
              alt="Listas completadas"
              className="w-full h-auto object-cover rounded-xl shadow-elevation-1 transition-all duration-100 dark:brightness-[0.7] dark:saturate-[0.45] dark:contrast-[1.6]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
