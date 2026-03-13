# 📚 ListO - Tu Biblioteca de Entretenimiento Personal

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**ListO** es una aplicación web de página única (SPA) diseñada para que los usuarios puedan gestionar, clasificar y puntuar su catálogo personal de entretenimiento (libros, videojuegos, etc.). Todo ello en un entorno seguro, ultrarrápido y totalmente responsivo.

🔗 **[Visita la aplicación en vivo aquí](https://list-o.vercel.app/)**


<div align="center">
<img src="./public/logo.webp" alt="Logo ListO" width="400" />
</div>

---

## 🧩 Módulos del Sistema

El sistema está dividido en una arquitectura modular altamente escalable, cumpliendo con los estándares de separación de responsabilidades:

1. 🔐 **Módulo de Identidad y Acceso (Auth):** Permite el auto-registro, inicio de sesión y recuperación segura de contraseñas. Incluye la lógica de protección de rutas mediante middleware para separar los privilegios de Administrador y Usuario Estándar. Utiliza Supabase Auth y políticas RLS.
2. 🗂️ **Módulo de Biblioteca Personal (CRUD de Ítems):** Corazón operativo para crear, leer, editar y eliminar fichas de ítems (libros y videojuegos). El sistema asegura que cada usuario solo acceda y modifique los ítems de su propiedad.
3. ⚙️ **Módulo de Administración de Catálogo:** Exclusivo para el perfil de Administrador. Permite la gestión centralizada de la tabla de usuarios y el control total sobre los *Géneros* maestros disponibles en la plataforma.
4. 🖼️ **Módulo de Gestión Multimedia:** Subida y asociación de imágenes (JPG/PNG) para las portadas de los ítems. Implementado mediante Supabase Storage, guardando la referencia visual en la base de datos.
5. 🔍 **Módulo de Navegación y Búsqueda:** Facilita la localización de contenidos con una barra de búsqueda inteligente y un sistema de filtrado dinámico (por tipo, género o puntuación).
6. 📊 **Módulo de Análisis y Estadísticas (Dashboard):** Transforma los datos en información visual mediante tarjetas de estadísticas, mostrando rankings globales (géneros preferidos, total de usuarios) e individuales.
7. 👤 **Módulo de Gestión de Perfil:** Otorga al usuario el control sobre su información. Permite actualizar datos básicos y ejercer el "Derecho al Olvido" mediante una baja lógica (Soft Delete) de la cuenta.
8. 🌍 **Módulo de Internacionalización (i18n):** Sistema preparado para múltiples idiomas sin duplicidad de vistas, implementado con diccionarios de traducción en tiempo real.
9. 🚀 **Módulo de Telemetría:** Rastreo de Web Vitals (LCP, CLS) e interacciones en tiempo real en producción mediante Vercel Insights.

---

## 🗄️ Arquitectura y Base de Datos

El diseño de la base de datos se ha implementado en **PostgreSQL** (vía Supabase), siguiendo un modelo relacional normalizado hasta la **Tercera Forma Normal (3FN)**:
* **1FN:** Atributos atómicos (ej. apellidos divididos en `ape1` y `ape2`).
* **2FN:** Eliminación de dependencias parciales.
* **3FN:** Uso de tablas maestras (Tipo, Rol, Género) para evitar dependencias transitivas.

**Seguridad:** Implementación de claves foráneas (FK) estrictas para evitar registros huérfanos y **Row Level Security (RLS)** para garantizar la privacidad de los registros (`Items`) a nivel de base de datos.

---

## 🚀 Guía de Instalación y Despliegue Local

Si deseas clonar el proyecto o reconstruir el entorno desde cero, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/egilp04/listO.git
cd listO
```

### 2.Instalación Automática 
Para instalar todas las dependencias listadas en el package.json de una sola vez:

```bash
npm install
```

### 3. Desglose de Instalación Manual (Por Tecnologías)
Si estás construyendo un proyecto similar desde cero, estos son los comandos exactos utilizados para montar nuestra arquitectura:

Core de React y Enrutamiento:
```bash
npm install react react-dom react-router-dom
```

Backend as a Service y Estado Global:
```bash
npm install @supabase/supabase-js zustand
```

Estilos, UI y Animaciones:
```bash
npm install tailwindcss @tailwindcss/vite lucide-react react-icons recharts gsap
```

Internacionalización (i18n):
```bash
npm install i18next react-i18next i18next-browser-languagedetector i18next-resources-to-backend
```

Telemetría y Analíticas (Vercel):
```bash
npm install @vercel/analytics @vercel/speed-insights
```

### 4. Configurar Variables de Entorno
Crea un archivo .env.local en la raíz del proyecto. Deberás enlazarlo a tu proyecto de Supabase para que la base de datos conecte:

VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica

### 5. Levantar el Servidor
Inicia el servidor de desarrollo de Vite.
```bash
Para la ejecución en local: npm run dev
```

👥 Equipo de Desarrollo
Proyecto final del ciclo formativo 2DAWB, desarrollado y diseñado por:
Evelia Gil Paredes,
María Ceballos,
Alberto Mera,
Enrique Ambrona

### Desarrollado con ❤️, React y mucho café.
