import React from 'react';
import { Fish } from '../../types/fishing/Fish';
import { CardButton } from '../../types/CardButton';

type FishCardProps = {
    fish: Fish;
    button: CardButton;
};

const FishCard: React.FC<FishCardProps> = (props) => {
    const { fish, button } = props;
    return(
        <div className='flex justify-center w-full mt-6'>
            <div className='relative bg-white/50 rounded-3xl p-4 w-[90vw] max-w-[35rem] flex flex-col sm:flex-row gap-4'>
                {/* close window */}
                <button
                    onClick={button.onClose}
                    aria-label='Fermer'
                    className='absolute top-0 right-0 px-4 py-2 text-xl font-bold uppercase text-gray-800 hover:text-red-600 transition-colors duration-200 z-10'
                    style={{ zIndex: 10 }} // Assurez-vous que le bouton est au-dessus des autres éléments
                >
                    X
                </button>

                <button
                    onClick={button.onPrevious}
                    disabled={button.isFirst}
                    aria-label='Recette précédente'
                    className='absolute top-3/10 -translate-y-3/10 left-0 z-11 p-2 bg-red-500 text-white rounded-full disabled:opacity-50 hover:bg-red-600'
                >
                    ←
                </button>
                <button
                    onClick={button.onNext}
                    disabled={button.isLast}
                    aria-label='Recette suivante'
                    className='absolute top-3/10 -translate-y-3/10 right-0 z-11 p-2 bg-green-500 text-white rounded-full disabled:opacity-50 hover:bg-green-600'
                >
                    →
                </button>

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
                    <h1 className='text-lg sm:text-xl lg:text-2xl font-bold font-comfortaa break-words w-full text-center'>
                        {fish.name}
                    </h1>

                    {/* Barre séparatrice */}
                    <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                    {/* Infos en dessous */}
                    <div className='flex flex-col gap-1 text-sm sm:text-base w-full'>
                        {/* ID */}
                        <div className='ml-4 mt-2 mb-2'>
                            <p className='whitespace-pre-line'>
                                <strong>ID :</strong> {fish.id}
                            </p>
                        </div>

                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                        {/* Rareté */}
                        <div className='ml-4 mt-2 mb-2'>
                            <p className='whitespace-pre-line'>
                                <strong>Rareté :</strong> {fish.rarity}
                            </p>
                        </div>

                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                        {/* Difficulté */}
                        <div className='ml-4 mt-2 mb-2'>
                            <p className='whitespace-pre-line'>
                                <strong>Difficulté :</strong> {fish.difficulty}
                            </p>
                        </div>

                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                        {/* Saison */}
                        <div className='mt-2'>
                            <h1 className='text-center font-comfortaa font-semibold mb-2'>Saison(s)</h1>
                            <div className='w-[50%] h-0.5 bg-blue-500/50 my-1 text-center mx-auto'></div>
                            <p className='ml-4 mt-6 mb-2 whitespace-pre-line'>
                                {
                                    (() => {
                                        const genericKeywords = ['peu importe', 'toutes saisons', 'indifférent'];
                                        const allSeasons = ['Printemps', 'Été', 'Automne', 'Hiver'];
                                        const normalized = fish.season.toLowerCase();

                                        const isGeneric = genericKeywords.some(keyword =>
                                            normalized.includes(keyword)
                                        );

                                        const seasonsToDisplay = isGeneric
                                            ? allSeasons
                                            : fish.season
                                                .split(',')
                                                .map(s => s.trim())
                                                .filter(Boolean);

                                        return seasonsToDisplay.map((season, index) => (
                                            <span key={index} className='inline-flex items-center gap-1 mr-4'>
                                                <span className='text-sm'>•</span>
                                                <span>{season}</span>
                                            </span>
                                        ));
                                    })()
                                }
                            </p>
                        </div>

                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                        {/* Lieux */}
                        <div className='mt-2'>
                            <h1 className='text-center font-comfortaa font-semibold mb-2'>Lieu(x) d'apparition(s)</h1>
                            <div className='w-[50%] h-0.5 bg-blue-500/50 my-1 text-center mx-auto'></div>
                            <div className='ml-4 mt-6 mb-2'>
                                {[...fish.location.matchAll(/([^(),-]+(?:\([^)]*\))?[^,-]*)(?:,|-)?/g)]
                                    .map((match: RegExpMatchArray) => match[1].trim())
                                    .filter((entry: string) => Boolean(entry))
                                    .flatMap((entry: string, index: number) => {
                                        const [beforeColon, afterColon] = entry.split(':');

                                        if (afterColon !== undefined) {
                                            // Bloc avec titre (ex: "En automne :") + éléments ligne à puce
                                            return [
                                                <div key={`title-${index}`} className='text-center font-semibold mt-4 mb-2'>
                                                    {beforeColon.trim()} :
                                                </div>,
                                                <div key={`items-${index}`} className='flex flex-wrap gap-x-4 gap-y-2 mb-2'>
                                                    {afterColon
                                                        .split(',')
                                                        .map((item, subIndex) => (
                                                            <span key={`item-${index}-${subIndex}`} className='inline-flex items-center gap-1'>
                                                                <span className='text-sm'>•</span>
                                                                <span>{item.trim()}</span>
                                                            </span>
                                                        ))}
                                                </div>,
                                            ];
                                        }

                                        // Bloc normal, en ligne, sans titre
                                        return (
                                            <span key={`entry-${index}`} className='inline-flex items-center gap-1 mr-4'>
                                                <span className='text-sm'>•</span>
                                                <span>{entry.trim()}</span>
                                            </span>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                        {/* Heure */}
                        <div className='mt-2'>
                            <h1 className='text-center font-comfortaa font-semibold mb-2'>Horaires d'apparition</h1>
                            <div className='w-[50%] h-0.5 bg-blue-500/50 my-1 text-center mx-auto'></div>
                            <p className='ml-4 mt-6 mb-2 whitespace-pre-line'>
                                {fish.time.trim() === 'Toute la journée'
                                    ? '• Toute la journée'
                                    : '• ' + fish.time
                                        .replace(/ /g, '')
                                        .replace(/h/g, ':')
                                        .replace(/(\d{2}h\d{2})-(\d{2}h\d{2})/g, '$1 → $2')
                                        .replace(/,/g, ' • ')
                                }
                            </p>
                        </div>

                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                        {/* Météo */}
                        <div className='mt-2'>
                            <h1 className='text-center font-comfortaa font-semibold mb-2'>Conditions Météorologiques</h1>
                            <div className='w-[50%] h-0.5 bg-blue-500/50 my-2 text-center mx-auto'></div>
                            <div className='flex flex-wrap items-center justify-center gap-2 mt-1 mx-6'>
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

                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                        {/* Prix */}
                        <div className='mt-2 w-full'>
                            <h1 className='text-center font-comfortaa font-semibold mb-2'>La revente</h1>
                            <div className='w-[50%] h-0.5 bg-green-500/50 my-2 text-center mx-auto'></div>
                            <h2 className='text-left font-comfortaa font-semibold mt-4 mb-4'>Prix de base :</h2>
                            {/* Prix de base */}
                            <div className='text-center mb-4'>
                                <span className='inline-flex items-center justify-center gap-1'>
                                    <p>{fish.basic_price}</p>
                                    <img src={`${import.meta.env.BASE_URL}images/coin.png`} alt='po' className='w-4 h-4' />
                                </span>
                            </div>

                            {/* Barre séparatrice */}
                            <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>

                            {/* Prix alternatifs */}
                            <h2 className='text-left font-comfortaa font-semibold mb-4'>Autres Prix :</h2>
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
                        
                        {/* Barre séparatrice */}
                        <div className='w-full h-0.5 bg-blue-300/50 my-2'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FishCard;