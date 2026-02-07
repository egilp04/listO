import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';
import Button from '../componentes/Button';
import CardLanding from '../componentes/tarjetas/cardLanding';

import card1 from '../assets/img/cards/carta_landing1.jpg';
import card2 from '../assets/img/cards/carta_landing2.jpg';
import card3 from '../assets/img/cards/carta_landing3.jpg';
import card4 from '../assets/img/cards/carta_landing4.jpg';

const Landing = () => {
  const heroImage = "https://placehold.co/800x500?text=Hero+Image";
  const featureImage1 = card1;
  const featureImage2 = card2;
  const featureImage3 = card3;
  const featureImage4 = card4;
  const statsImage = "https://placehold.co/600x400?text=Stats+Image";

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      <Navbar estaLogueado={false} />
      <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 gap-20">
        {/* Sección Hero */}
        <section className="flex flex-col items-center text-center gap-8 w-full max-w-4xl">
          <div className="space-y-4">
            <h1>
              El espacio para tus historias
            </h1>
            <p>
              Centraliza todo tu entretenimiento. Gestiona libros, juegos, cine y música en un catálogo personal único y organizado
            </p>
          </div>
          <Link to="/login">
            <Button variant="primario">
              Comenzar
            </Button>
          </Link>
          <div className="w-full max-w-3xl mt-8">
            <img
              src={heroImage}
              alt="Bitácora digital"
              className="w-full h-auto object-cover rounded-xl shadow-elevation-1"
            />
          </div>
          <div className="space-y-6 mt-8 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-medium text-primary-600 font-Titulos">
              Tu bitácora digital de entretenimiento
            </h2>
            <p className="text-base md:text-lg text-black leading-relaxed font-Otros">
              Nuestra aplicación te permite registrar y valorar todos los libros, juegos y contenidos multimedia que has terminado. Podrás documentar cada título con su fecha, reseña e imagen, y visualizar tu historial mediante estadísticas de progreso anual y puntuación media, siendo el espacio ideal para preservar y organizar tus experiencias culturales.
            </p>
          </div>
        </section>

        {/* Carta 1 */}
        <section className="w-full">
          <CardLanding
            titulo="Tu universo de entretenimiento"
            descripcion="Olvida tener listas dispersas en notas o diferentes apps. Centraliza todos tus libros, videojuegos, películas y música en un único catálogo personal. ListO es el hogar digital para todas esas historias que has terminado y que merecen ser recordadas."
            imagen={featureImage1}
            invertido={false}
          />
        </section>

        {/* Carta 2 */}
        <section className="w-full">
          <CardLanding
            titulo="Tu crítica, tus reglas"
            descripcion="No se trata solo de marcar como completado. Documenta tu experiencia: escribe una reseña personal, sube tu propia portada y asigna una valoración de 1 a 5 estrellas. Convierte cada ficha en una memoria imborrable de lo que ese título te hizo sentir."
            imagen={featureImage2}
            invertido={true}
          />
        </section>

        {/* Carta 3 */}
        <section className="w-full">
          <CardLanding
            titulo="Ordena tu caos digital"
            descripcion="¿Buscas aquel RPG de hace tres años? Encuéntralo al instante. Utiliza nuestros filtros avanzados para organizar tu colección por género, plataforma, fecha de finalización o favoritos. Mantén tu biblioteca perfectamente estructurada sin esfuerzo."
            imagen={featureImage3}
            invertido={false}
          />
        </section>

        {/* Carta 4 */}
        <section className="w-full">
          <CardLanding
            titulo="Visualiza tus logros"
            descripcion="Descubre tus verdaderos hábitos de consumo cultural. Accede a tu panel de estadísticas para ver cuántos libros has leído este año, tus géneros más jugados y tu Top 3 de mejores experiencias. Deja que los datos cuenten tu historia."
            imagen={featureImage4}
            invertido={true}
          />
        </section>

        {/* Sección Estadísticas */}
        <section className="w-full">
          <CardLanding
            titulo="Miles de listas completadas con éxito"
            descripcion="ListO no es solo una App, es la suma de vuestras ideas. Creada desde cero gracias a vuestras sugerencias."
            imagen={statsImage}
            invertido={false}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Landing;