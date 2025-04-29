import React from 'react';
import { Fish } from './FishComponent';

type FishCardProps = {
    fish: Fish
};

const FishCard: React.FC<FishCardProps> = ({ fish }) => {
    return(
        <div className='flex justify-center w-full mt-6'>
            <div className='bg-white/50 rounded-3xl p-4 w-[90vw] max-w-[35rem] flex flex-col sm:flex-row gap-4'>
                
                {/* Image toujours en haut à gauche */}
                <div className='w-full h-full sm:w-auto flex justify-center align-middle items-center sm:items-center'>
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
                                target.src = `${import.meta.env.BASE_URL}images/icon.webp`;
                                target.alt = `${fish.name}`;
                            };
                            checkImage.src = pngSrc;
                        }}
                        alt={fish.name}
                        className='w-[140px] sm:w-[160px] h-auto object-contain p-2 duration-500 ease-out hover:scale-110 hover:cursor-pointer border-1 border-dashed rounded-4xl'
                    />
                </div>

                {/* Texte centré & contenu */}
                <div className='flex flex-col w-full items-center sm:items-start text-left sm:text-left'>
                    {/* Nom centré qui wrap bien */}
                    <h1 className='text-lg sm:text-xl lg:text-2xl font-bold font-comfortaa break-words w-full'>
                        {fish.name}
                    </h1>

                    {/* Barre séparatrice */}
                    <div className='w-full h-0.5 bg-gray-400/60 my-2'></div>

                    {/* Infos en dessous */}
                    <div className='flex flex-col gap-1 text-sm sm:text-base w-full'>
                        <p><strong>ID :</strong> {fish.id}</p>
                        <p><strong>Prix :</strong> {fish.basic_price} Po</p>
                        <p><strong>Rareté :</strong> {fish.rarity}</p>
                        <p><strong>Difficulté :</strong> {fish.difficulty}</p>
                        <p><strong>Saison :</strong> {fish.season}</p>
                        <p><strong>Lieux :</strong> {fish.location}</p>
                        <p><strong>Heure :</strong> {fish.time}</p>

                        {/* Météo */}
                        <div className='mt-2'>
                            <p className='font-bold'>Météo :</p>
                            <div className='flex flex-wrap items-center gap-2 mt-1 mx-6'>
                                {(() => {
                                    const weatherIcons: Record<string, string> = {
                                        'Ensoleillé': 'sunny',
                                        'Pluie': 'rainy',
                                        'Neige': 'snow',
                                        'Vent': 'windy',
                                        'Orage': 'storm',
                                        'Nuageux': 'cloudy',
                                        'Brouillard': 'foggy',
                                    };

                                    const rawWeatherList = fish.weather?.split(',') ?? [];
                                    const cleanedWeather = rawWeatherList.map(w =>
                                        w.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                                    );

                                    const isAny = cleanedWeather.some(w =>
                                        w.toLowerCase().includes('peu importe') || w.toLowerCase().includes('any')
                                    );

                                    const weathersToShow = isAny
                                        ? Object.entries(weatherIcons)
                                        : Object.entries(weatherIcons).filter(([label]) =>
                                            cleanedWeather.some(input =>
                                                input.toLowerCase() === label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
                                            )
                                        );

                                    return weathersToShow.map(([label, icon]) => (
                                        <div key={icon} className='flex items-center gap-1 bg-gray-600/50 rounded-full p-1 mt-2'>
                                            <img
                                                src={`${import.meta.env.BASE_URL}images/weather/png/${icon}.png`}
                                                alt={label}
                                                className='w-10 h-10 duration-500 ease-out hover:scale-120 p-1'
                                                title={label}
                                            />
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* Prix alternatifs */}
                        <div className='mt-4 w-full'>
                            <h2 className='text-center font-comfortaa font-semibold mb-4'>Autres Prix :</h2>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-center'>
                                {/* Bronze */}
                                <div className='flex flex-col items-center'>
                                    <img 
                                        src={`${import.meta.env.BASE_URL}images/stars/star_bronze.png`} 
                                        alt='Bronze'
                                        className='w-6 h-6 mb-1'
                                    />
                                    <span className='inline-flex items-center gap-1'>
                                        {fish.bronze_price}
                                        <img src={`${import.meta.env.BASE_URL}images/coin.png`} alt='po' className='w-4 h-4' />
                                    </span>
                                </div>

                                {/* Silver */}
                                <div className='flex flex-col items-center'>
                                    <img 
                                        src={`${import.meta.env.BASE_URL}images/stars/star_silver.png`} 
                                        alt='Silver'
                                        className='w-6 h-6 mb-1'
                                    />
                                    <span className='inline-flex items-center gap-1'>
                                        {fish.silver_price}
                                        <img src={`${import.meta.env.BASE_URL}images/coin.png`} alt='po' className='w-4 h-4' />
                                    </span>
                                </div>

                                {/* Gold */}
                                <div className='flex flex-col items-center'>
                                    <img 
                                        src={`${import.meta.env.BASE_URL}images/stars/star_gold.png`} 
                                        alt='Gold'
                                        className='w-6 h-6 mb-1'
                                    />
                                    <span className='inline-flex items-center gap-1'>
                                        {fish.gold_price}
                                        <img src={`${import.meta.env.BASE_URL}images/coin.png`} alt='po' className='w-4 h-4' />
                                    </span>
                                </div>

                                {/* Osmium */}
                                <div className='flex flex-col items-center'>
                                    <img 
                                        src={`${import.meta.env.BASE_URL}images/stars/star_osmium.png`} 
                                        alt='Osmium'
                                        className='w-6 h-6 mb-1'
                                    />
                                    <span className='inline-flex items-center gap-1'>
                                        {fish.osmium_price}
                                        <img src={`${import.meta.env.BASE_URL}images/coin.png`} alt='po' className='w-4 h-4' />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* etc. */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FishCard;