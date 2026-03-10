import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import CardLanding from "../componentes/tarjetas/cardLanding";
import Button from "../componentes/Button";
import { useTranslation } from "react-i18next";

import card1 from "../assets/img/cards/carta_landing1.webp";
import card2 from "../assets/img/cards/carta_landing2.webp";
import card3 from "../assets/img/cards/carta_landing3.webp";
import card4 from "../assets/img/cards/carta_landing4.webp";
import card5 from "../assets/img/cards/carta_landing5.webp";
import heroLight from "../assets/img/cards/landing-hero-light.webp";

const Landing = () => {
  const { t } = useTranslation();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".card-landing");
      cards.forEach((card) => {
        const isInvertido = card.getAttribute("data-invertido") === "true";
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: isInvertido ? 100 : -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      gsap.from(".hero-element", {
        scrollTrigger: {
          trigger: ".hero-element",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      const fadeElements = gsap.utils.toArray<HTMLElement>(".fade-in-up");
      fadeElements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="flex flex-col items-center text-center gap-8 w-full lg:gap-12 2xl:gap-16">
        <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 2xl:gap-18 hero-element">
          <h1 className="text-balance">{t('landing.heroTitulo')}</h1>
          <p className="max-w-2xl mx-auto">
            {t('landing.heroDescripcion')}
          </p>
        </div>

        <nav className="hero-element" aria-label={t('landing.heroNavLabel')}>
          <Link to="/login">
            <Button variant="primario">{t('landing.heroCta')}</Button>
          </Link>
        </nav>

        <figure className="w-full mt-8 hero-element">
          <img
            src={heroLight}
            alt={t('landing.heroImgAlt')}
            width={1280}
            height={720}
            className="w-full h-auto object-cover rounded-xl shadow-elevation-1 
                       transition-all duration-100
                       dark:brightness-[0.7] dark:saturate-[0.45] dark:contrast-[1.6]"
          />
        </figure>

        <article className="flex flex-col mt-8 mb-btn-h-lg gap-6 2xl:mb-25 md:gap-10 xl:gap-personalizado-50 px-4 md:px-10 lg:px-20 fade-in-up">
          <h2>{t('landing.bitacorasTitulo')}</h2>
          <p className="text-pretty">
            {t('landing.bitacorasDescripcion')}
          </p>
        </article>
      </header>

      <section
        className="flex flex-col w-full gap-personalizado-50 md:gap-20 lg:gap-25 2xl:gap-30 px-4 md:px-8 lg:px-16"
        aria-label={t('landing.funcionalesLabel')}
      >
        <article>
          <CardLanding
            titulo={t('landing.feature1Titulo')}
            descripcion={t('landing.feature1Descripcion')}
            imagen={card1}
            invertido={false}
          />
        </article>

        <article>
          <CardLanding
            titulo={t('landing.feature2Titulo')}
            descripcion={t('landing.feature2Descripcion')}
            imagen={card2}
            invertido={true}
          />
        </article>

        <article>
          <CardLanding
            titulo={t('landing.feature3Titulo')}
            descripcion={t('landing.feature3Descripcion')}
            imagen={card3}
            invertido={false}
          />
        </article>

        <article>
          <CardLanding
            titulo={t('landing.feature4Titulo')}
            descripcion={t('landing.feature4Descripcion')}
            imagen={card4}
            invertido={true}
          />
        </article>
      </section>

      <section className="w-full py-16" aria-labelledby="footer-cta-title">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-8 fade-in-up">
          <div className="flex flex-col items-center text-center gap-6 md:w-1/2">
            <h2 id="footer-cta-title">{t('landing.ctaTitulo')}</h2>
            <p>{t('landing.ctaDescripcion')}</p>
          </div>
          <figure className="w-full md:w-auto max-w-sm">
            <img
              src={card5}
              alt={t('landing.ctaImgAlt')}
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-xl shadow-elevation-1 transition-all duration-100 dark:brightness-[0.7] dark:saturate-[0.45] dark:contrast-[1.6]"
            />
          </figure>
        </div>
      </section>
    </div>
  );
};

export default Landing;
