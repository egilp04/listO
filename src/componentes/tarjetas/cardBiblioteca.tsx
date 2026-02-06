import Button from '../Button';



interface Item {
    imagen: string;
    tipo: string;
    generos: string[];
    informacion: string;
    descripcion: string;
    valoracion: number;
}

interface CardBibliotecaProps {
    item: Item;
}

const CardBiblioteca: React.FC<CardBibliotecaProps> = ({ item }) => {
    const renderizarEstrellas = (valoracion: number) => {
        const estrellas = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= valoracion) {
                estrellas.push(<span key={i} className="text-warning-500">★</span>);
            } else {
                estrellas.push(<span key={i} className="text-neutral-300">☆</span>);
            }
        }
        return estrellas;
    };

    return (
        <div className="card-biblioteca">
            {/* Imagen del item */}
            <img src={item.imagen} alt={item.tipo} className="w-full h-32 md:h-48 object-cover transition-all duration-300" />

            <div className="flex flex-col gap-5 px-1 pb-1 md:px-3 md:pb-3 text-left">
                {/* Etiquetas: Tipo y Géneros */}
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">{item.tipo}</span>
                    <div className="flex gap-2">
                        {item.generos.map((genero, index) => (
                            <span key={index} className="bg-primary-100 text-primary-700 px-2 py-1 rounded">{genero}</span>
                        ))}
                    </div>
                </div>

                {/* Información del item */}
                <p>{item.informacion}</p>

                {/* Descripción del item */}
                <p>{item.descripcion}</p>

                {/* Valoración y Botones */}
                <div className="flex flex-row md:flex-col items-center justify-between gap-2 mt-1">
                    <div className="items-center gap-2">
                        <p>Valoración:</p>
                        <div className="flex items-center">
                            {renderizarEstrellas(item.valoracion)}
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <Button variant="primario">Modificar</Button>
                        <Button variant="primario" className="!bg-danger-400 !border-transparent hover:!bg-danger-500">Eliminar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardBiblioteca;