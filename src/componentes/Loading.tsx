import React from "react";

const Loading: React.FC = () => {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-primary-1100"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <figure
        className="relative w-24 h-24 flex items-center justify-center animate-[spin_2s_linear_infinite]"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-6 h-6 bg-primary-800 dark:bg-primary-50 rounded-full shadow-lg" />
        <div className="absolute top-0 right-0 w-6 h-6 bg-primary-700 dark:bg-blue-300 rounded-full shadow-lg" />
        <div className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center bg-primary-500 dark:bg-blue-200 rounded-full shadow-lg" />
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-primary-600 dark:bg-blue-500 rounded-full shadow-lg" />
      </figure>
      <header className="mt-8">
        <p className="text-xl font-bold text-primary-1000 animate-pulse dark:text-primary-50">
          Cargando recursos...
        </p>
      </header>
    </section>
  );
};

export default Loading;
