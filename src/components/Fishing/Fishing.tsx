import React, { useState } from 'react';
import fishesData from '../../data/fishs.json';
import FishComponent from './FishComponent';

const Fishing: React.FC = () => {
    const [selectedFishId, setSelectedFishId] = useState<string | null>(null);

    const handleFishClick = (id: string) => {
        setSelectedFishId((currentId) => {
            // Si la recette est déjà sélectionnée, on la ferme et on arrête de scroller
            if (currentId === id) {
                return null;
            } else {
                // Si une recette différente est sélectionnée, on fait défiler la page vers la div avec l'id "craft"
                const craftDiv = document.getElementById('fish');
                if (craftDiv) {
                    craftDiv.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start', // Positionner le haut de la div en haut de la fenêtre
                    });
                }
                return id;
            }
        });
    };

    const selectedFish = fishesData.find((fish) => fish.id === selectedFishId);

    return (
        <section className='flex flex-col items-center justify-baseline min-h-screen relative p-4'>
            <h1 className='text-5xl font-bold text-center'>Pêche - Poissons</h1>
            <div className='w-60 h-1 bg-[#ef476f] my-4'></div>

            <h2 className='text-3xl font-semibold text-center'>Liste des poissons</h2>
            <div className='w-30 h-1 bg-[#ffd166] my-2'></div>

            <div id='fish' className='flex flex-row flex-wrap justify-center items-center gap-2 mt-6'>
                {selectedFish ? (
                    <FishComponent 
                        fish={selectedFish} 
                        onClose={() => setSelectedFishId(null)}
                    />
                ) : (
                    <p className='mt-10 font-comfortaa text-xl text-blue-100'>Sélectionnez un poisson pour afficher ses informations...</p>
                )}
            </div>

            <ul className='flex flex-wrap justify-center items-center sm:mt-0 xs:gap-2 sm:gap-3 md:gap-4 gap-1 mx-60'>
                {fishesData.map((fish) => (
                    <li
                        key={fish.id}
                        onClick={() => handleFishClick(fish.id)}
                        className='flex-shrink-0 w-full sm:w-1/4 md:w-1/6 lg:w-1/18 xl:w-1/10 min-w-[90px] max-w-[100px] flex justify-center mt-12'
                    >
                        <div className='group relative w-full h-full'>
                            <img 
                                src={`${import.meta.env.BASE_URL}images/items/webp/${fish.id.replace(/ /g, '_')}.webp`}
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    target.onerror = null;
                                    const pngSrc = `${import.meta.env.BASE_URL}images/items/png/${fish.id.replace(/ /g, '_')}.png`;
                                    const checkImage = new Image();
                                    checkImage.onload = () => {
                                        target.src = pngSrc;
                                    };
                                    checkImage.onerror = () => {
                                    // Si l'image ne peut pas être chargée dans aucun format, on casse la boucle et affiche alt
                                        target.src = `${import.meta.env.BASE_URL}images/icon.webp`;
                                        target.alt = `${fish.name}`;
                                    };
                                    checkImage.src = pngSrc;
                                }}
                                alt={fish.name}
                                className='w-full h-auto object-contain duration-500 ease-out hover:scale-120 hover:cursor-pointer'
                            />

                            {/* Infobulle */}
                            <div role='tooltip' className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                                {fish.name}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Fishing;