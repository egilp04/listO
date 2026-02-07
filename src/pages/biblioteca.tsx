import React from 'react'
import Button from "../componentes/Button";
import Input from "../componentes/Inputs/Inputs";
import CardBiblioteca from "../componentes/tarjetas/cardBiblioteca";
import logo from "../assets/img/logo/logo.png";

const itemEjemplo = {
    imagen: logo,
    tipo: "Juego",
    generos: ["RPG", "Aventura"],
    informacion: "CD Projekt Red - 2015",
    descripcion: "Un juego de rol de acción en mundo abierto...",
    valoracion: 5
};

const Biblioteca = () => {
    return (
        <div className="min-h-screen bg-primary-200 p-6 md:p-10">
            <h1 className="font-bold mb-10">Mi Biblioteca</h1>

            <div className="flex justify-center mb-8">
                <Button>Añadir</Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8 flex flex-col gap-6">
                <Input type="text" placeholder='Buscar nombre' />
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <Button>Todos</Button>
                    <Button variant='secundario'>Libros</Button>
                    <Button variant='secundario'>Juegos</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <CardBiblioteca item={itemEjemplo} />
                <CardBiblioteca item={itemEjemplo} />
                <CardBiblioteca item={itemEjemplo} />
                <CardBiblioteca item={itemEjemplo} />
            </div>
        </div>
    )
}

export default Biblioteca