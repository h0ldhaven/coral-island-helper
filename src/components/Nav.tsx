import React, { useState } from 'react';
import Cooking from './Cooking/Cooking';
import Crafting from './Crafting/Crafting';
import Fishing from './Fishing/Fishing';
import HomePage from './Home';

const Nav: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
    const [menuItems] = useState([
        { name: 'Cuisine', component: 'cuisine' },
        { name: 'Craft', component: 'craft' },
        { name: 'Pêche', component: 'fishing' }
    ]);

    const handleMenuClick = (component: string) => {
        if (activeComponent === component) {
            setActiveComponent(null); // Si on clique sur un composant déjà actif, on désactive
        } else {
            setActiveComponent(component); // Sinon, on active le composant
        }
    };

    const handleHomeClick = () => {
        setActiveComponent(null); // Lorsque le bouton "Home" est cliqué, on revient à la page d'accueil
    };

    return (
        <nav className='flex flex-col h-screen'>
            {/* Menu */}
            {activeComponent !== null && ( // Afficher le menu uniquement si on n'est pas sur la page d'accueil
                <div className='flex flex-wrap justify-center gap-x-4 w-full h-full'>
                    {/* Afficher le bouton "Home" si un composant est sélectionné */}
                    {activeComponent !== null && (
                        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4'>
                            <button
                                className='bg-mediumseagreen py-[clamp(0.75rem,1.5vw,1.5rem)] px-[clamp(0.75rem,1.5vw,1.5rem)] rounded-lg shadow-lg text-center text-white w-full duration-500 ease-out hover:scale-110 hover:cursor-pointer active:scale-110'
                                onClick={handleHomeClick}
                            >
                                <h3 className='text-[clamp(0.875rem,2.5vw,1.75rem)] leading-tight font-bold'>Home</h3>
                            </button>
                        </div>
                    )}

                    {/* Afficher uniquement les éléments du menu qui ne sont pas sélectionnés */}
                    {menuItems.map(({ name, component }) => (
                        activeComponent !== component && (
                            <div key={component} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4'>
                                <button
                                    className='bg-mediumseagreen py-[clamp(0.75rem,1.5vw,1.5rem)] px-[clamp(0.75rem,1.5vw,1.5rem)] rounded-lg shadow-lg text-center text-white w-full duration-500 ease-out hover:scale-110 hover:cursor-pointer active:scale-110'
                                    onClick={() => handleMenuClick(component)}
                                >
                                    <h3 className='text-[clamp(0.875rem,2.5vw,1.75rem)] leading-tight font-bold'>{name}</h3>
                                </button>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Afficher la page d'accueil si aucun composant n'est sélectionné */}
            <div className='flex-1'>
                {activeComponent === null && <HomePage setActiveComponent={setActiveComponent} />}
                {activeComponent === 'cuisine' && <Cooking />}
                {activeComponent === 'craft' && <Crafting />}
                {activeComponent === 'fishing' && <Fishing />}
            </div>
        </nav>
    );
};

export default Nav;