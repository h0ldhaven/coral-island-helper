import React, { useState } from "react";
import Cooking from "./gameplay/Cooking";
import Crafting from "./gameplay/Crafting";
import Enchanting from "./gameplay/Enchanting";
import HomePage from "./Home";

const Nav: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
    const [menuItems] = useState([
        { name: "Cuisine", component: "cuisine" },
        { name: "Craft", component: "craft" },
        { name: "Enchantement", component: "enchantement" }
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
        <nav className="flex flex-col h-screen">
            {/* Menu */}
            {activeComponent !== null && ( // Afficher le menu uniquement si on n'est pas sur la page d'accueil
                <div className="flex flex-wrap justify-center gap-4 p-4 w-full h-full bg-gradient-to-t from-cyan-400 via-teal-500 to-blue-600 opacity-60 animate-wave">
                    {/* Afficher le bouton "Home" si un composant est sélectionné */}
                    {activeComponent !== null && (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                            <button
                                className="bg-mediumseagreen p-6 rounded-lg shadow-lg text-center text-white w-full"
                                onClick={handleHomeClick}
                            >
                                <h3 className="text-2xl font-bold">Home</h3>
                            </button>
                        </div>
                    )}

                    {/* Afficher uniquement les éléments du menu qui ne sont pas sélectionnés */}
                    {menuItems.map(({ name, component }) => (
                        activeComponent !== component && (
                            <div key={component} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                                <button
                                    className="bg-mediumseagreen p-6 rounded-lg shadow-lg text-center text-white w-full"
                                    onClick={() => handleMenuClick(component)}
                                >
                                    <h3 className="text-2xl font-bold">{name}</h3>
                                </button>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Afficher la page d'accueil si aucun composant n'est sélectionné */}
            <div className="flex-1">
                {activeComponent === null && <HomePage setActiveComponent={setActiveComponent} />}
                {activeComponent === 'cuisine' && <Cooking />}
                {activeComponent === 'craft' && <Crafting />}
                {activeComponent === 'enchantement' && <Enchanting />}
            </div>
        </nav>
    );
};

export default Nav;