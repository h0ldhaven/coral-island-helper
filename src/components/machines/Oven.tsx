import React from 'react';

type OvenProps = {
    itemName: string;
    itemQuantity: number;
    ingredients: {
        id: string;
        quantity: number;
    }[];
}

const Oven: React.FC<OvenProps> = ({ itemName, itemQuantity, ingredients }) => {
    return(
        <section className='flex flex-col justify-center items-center w-full mt-6'>
            {/* Haut du four */}
            <div className="relative w-[20rem] min-w-[5rem] max-w-[35vw] min-h-[5rem] max-h-[35vh] h-[14rem] bg-white/50 rounded-t-full p-4 flex flex-col items-center">
                <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                    <img 
                        src={`${import.meta.env.BASE_URL}images/machines/Oven.webp`} 
                        alt="Oven"
                        className="w-[120px] sm:w-[160px] h-auto object-contain"
                    />
                </div>

                <div className='absolute bottom-1/8 md:bottom-1/8 w-full max-w-[64px] min-w-[32px] h-full max-h-[64px] min-h-[32px] bg-gray-200/60 rounded-lg flex justify-center items-center'>
                    <img 
                        key={`${itemName}-${itemQuantity}`}
                        src={`${import.meta.env.BASE_URL}images/items/webp/${itemName.replace(/ /g, '_')}.webp`}
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            const pngSrc = `${import.meta.env.BASE_URL}images/items/png/${itemName.replace(/ /g, '_')}.png`;
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
                        className="w-[120px] sm:w-[160px] h-auto object-contain p-2"
                    />
                    <span className="absolute text-xs text-green-950 font-bold bottom-1 right-1 rounded">x{itemQuantity}</span>
                </div>
            </div>


            {/* Séparation entre le haut du four et le bas */}
            <div className="w-[20rem] min-w-[5rem] max-w-[35vw] h-0.5 bg-gray-400/60"></div>


            {/* Bas du four */}
            <div className="relative w-[35rem] min-w-[5rem] max-w-[65vw] py-12 bg-white/50 rounded-3xl flex flex-wrap justify-center items-center p-2 gap-2">
                <div className='w-98 flex flex-row flex-wrap justify-center items-center gap-2'>
                    {ingredients.map((ingredient, index) =>(
                        <div 
                            key={index} 
                            className="relative bg-gray-200/50 w-full max-w-[64px] min-w-[32px] h-full max-h-[64px] min-h-[32px] rounded-lg p-2">
                        
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
                                className="w-[120px] sm:w-[160px] h-auto object-contain"
                            />

                            <span className="absolute text-xs text-green-950 font-bold bottom-1 right-1 rounded">x{ingredient.quantity}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Oven;