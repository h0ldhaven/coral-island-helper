import React from 'react';
import { Alternative, Machine, Recipe } from '../RecipeComponent';

type SeasoningSetProps = {
    machine: Machine;
    recipe: Recipe;
    alternatives: Alternative[];
}

const SeasoningSet: React.FC<SeasoningSetProps> = ({ machine, recipe }) => {
    const { id: itemId, name: itemName, quantity: itemQuantity, ingredients, alternatives } = recipe;
    
    return(
        <div className='flex flex-col justify-center items-center w-auto mt-6'>
            {/* Haut du container */}
            <div className='relative w-[35rem] min-w-[5rem] max-w-[65vw] min-h-[5rem] max-h-[35vh] h-[14rem] bg-white/50 rounded-t-3xl p-4 flex flex-col items-center'>
                <div className='relative w-full h-full flex justify-center items-center overflow-hidden'>
                    <img 
                        src={`${import.meta.env.BASE_URL}images/machines/webp/${machine.id.replace(/ /g, '_')}.webp`} 
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            const pngSrc = `${import.meta.env.BASE_URL}images/machines/png/${machine.id.replace(/ /g, '_')}.png`;
                            const checkImage = new Image();
                            checkImage.onload = () => {
                                target.src = pngSrc;
                            };
                            checkImage.onerror = () => {
                                // Si l'image ne peut pas être chargée dans aucun format, on casse la boucle et affiche alt
                                target.src = `${import.meta.env.BASE_URL}images/icon.webp`;
                                target.alt = `${machine.name}`;
                            };
                            checkImage.src = pngSrc;
                        }}
                        alt={machine.name}
                        className='w-[120px] sm:w-[160px] h-auto object-contain'
                    />
                </div>

                <div className='group absolute bottom-1/8 md:bottom-1/8 w-full max-w-[64px] min-w-[32px] h-full max-h-[64px] min-h-[32px] bg-gray-200/60 rounded-lg flex justify-center items-center'>
                    <img 
                        key={`${itemName}-${itemQuantity}`}
                        src={`${import.meta.env.BASE_URL}images/items/webp/${itemId.replace(/ /g, '_')}.webp`}
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            const pngSrc = `${import.meta.env.BASE_URL}images/items/png/${itemId.replace(/ /g, '_')}.png`;
                            const checkImage = new Image();
                            checkImage.onload = () => {
                                target.src = pngSrc;
                            };
                            checkImage.onerror = () => {
                                // Si l'image ne peut pas être chargée dans aucun format, on casse la boucle et affiche alt
                                target.src = `${import.meta.env.BASE_URL}images/icon.webp`;
                                target.alt = `${itemName}`;
                            };
                            checkImage.src = pngSrc;
                        }}
                        alt={itemName}
                        className='w-[120px] sm:w-[160px] h-auto object-contain p-2'
                    />

                    {/* Infobulle item final */}
                    <div role='tooltip' className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                        {itemName}
                    </div>

                    <span className='absolute text-xs text-green-950 font-bold bottom-1 right-1 rounded'>x{itemQuantity}</span>
                </div>
            </div>


            {/* Séparation entre le haut du container et le bas */}
            <div className='w-[35rem] min-w-[5rem] max-w-[65vw] h-0.5 bg-gray-400/60'></div>


            {/* Bas du container */}
            <div className='relative w-[35rem] min-w-[5rem] max-w-[65vw] h-auto py-12 bg-white/50 rounded-b-3xl flex flex-wrap justify-center items-center p-2 gap-2'>
                <div className='w-98 flex flex-row flex-wrap justify-center items-start gap-2'>
                    {ingredients.map((ingredient, index) =>(
                        
                        <div key={index} className='flex flex-col'>
                            <div className='relative bg-gray-200/50 w-full max-w-[64px] min-w-[32px] h-full max-h-[64px] min-h-[32px] rounded-lg p-2 group '>
                                <img 
                                    key={`${ingredient.id}-${ingredient.quantity}`}
                                    src={`${import.meta.env.BASE_URL}images/items/webp/${ingredient.id.replace(/ /g, '_')}.webp`} 
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        target.onerror = null;
                                        const pngSrc = `${import.meta.env.BASE_URL}images/items/png/${ingredient.id.replace(/ /g, '_')}.png`;
                                        const checkImage = new Image();
                                        checkImage.onload = () => {
                                            target.src = pngSrc;
                                        };
                                        checkImage.onerror = () => {
                                            // Si l'image ne peut pas être chargée dans aucun format, on casse la boucle et affiche alt
                                            target.src = `${import.meta.env.BASE_URL}images/icon.webp`;
                                            target.alt = `${ingredient.id}`;
                                        };
                                        checkImage.src = pngSrc;
                                    }}
                                    alt={ingredient.id}
                                    className='w-[120px] sm:w-[160px] h-auto object-contain'
                                />

                                {/* Infobulle ingredients */}
                                <div role='tooltip' className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                                    {ingredient.name}
                                </div>
                                
                                <span className='absolute text-xs text-green-950 font-bold bottom-1 right-1 rounded'>x{ingredient.quantity}</span>
                            </div>

                            {alternatives?.some(alt => ingredient.id === alt.replaceItem) && (
                                <div className='w-auto h-0.5 bg-gray-400/60 mt-2 mb-2'></div>
                            )}

                            {/* Affichage de l'alternative sous l'ingrédient */}
                            {alternatives && alternatives.length > 0 && (
                                alternatives.map((alt, altIndex) => {
                                    // Vérifie que l'alternative est bien liée à l'ingrédient actuel.
                                    if (ingredient.id === alt.replaceItem) {
                                        return (
                                            <div 
                                                key={altIndex} 
                                                className='group relative bg-gray-200/50 w-full max-w-[64px] min-w-[32px] h-full max-h-[64px] min-h-[32px] rounded-lg p-2'
                                            >
                                                <img 
                                                    src={`${import.meta.env.BASE_URL}images/items/webp/${alt.id.replace(/ /g, '_')}.webp`} 
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        target.onerror = null;
                                                        const pngSrc = `${import.meta.env.BASE_URL}images/items/png/${alt.id.replace(/ /g, '_')}.png`;
                                                        const checkImage = new Image();
                                                        checkImage.onload = () => {
                                                            target.src = pngSrc;
                                                        };
                                                        checkImage.onerror = () => {
                                                            target.src = `${import.meta.env.BASE_URL}images/icon.webp`;
                                                            target.alt = alt.id;
                                                        };
                                                        checkImage.src = pngSrc;
                                                    }}
                                                    alt={alt.id}
                                                    className='w-[120px] sm:w-[160px] h-auto object-contain'
                                                />

                                                <div role='tooltip' className='absolute top-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                                                    {alt.id}
                                                </div>

                                                <span className='absolute text-xs text-green-950 font-bold bottom-1 right-1 rounded'>x{alt.quantity}</span>
                                            </div>
                                        );
                                    }
                                    return null;  // Si l'alternative n'est pas ciblée, on ne la rend pas
                                })
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SeasoningSet;