import React, { useState, useEffect } from 'react';
import recipesData from '../../data/recipes.json';
import machinesData from '../../data/machines.json';
import itemsData from '../../data/ingredients.json';
import RecipeComponent, { Machine } from '../RecipeComponent';
  
const Cooking: React.FC = () => {
    const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
    const [machinesMap, setMachinesMap] = useState<Record<string, Machine>>({}); // Typage corrigé
    const [itemsMap, setItemsMap] = useState<Record<string, string>>({});

    useEffect(() => {
        const machines = machinesData.reduce((acc, machine) => {
            acc[machine.id] = machine; // Stocker l'objet complet de la machine
            return acc;
        }, {} as Record<string, Machine>);

        const items = itemsData.reduce((acc, item) => {
            acc[item.id] = item.name; // Seulement le nom de l'ingrédient
            return acc;
        }, {} as Record<string, string>);

        setMachinesMap(machines);
        setItemsMap(items);
    }, []);
  
    const handleRecipeClick = (id: string) => {
        setSelectedRecipeId(id);
    };
  
    const selectedRecipe = recipesData.find((recipe) => recipe.id === selectedRecipeId);
  
    return (
        <section className='flex flex-col items-center justify-baseline min-h-screen relative p-4'>
            <h1 className='text-5xl font-bold text-center'>Cuisine - Fabrication</h1>
            <div className='w-60 h-1 bg-[#ef476f] my-2'></div>

            <h2 className='text-3xl font-semibold text-center'>Recettes Disponibles</h2>
            <div className='w-30 h-1 bg-[#ffd166] my-2'></div>
            
            <ul className='flex flex-wrap justify-center items-center sm:mt-0 xs:gap-2 sm:gap-3 md:gap-4 gap-1'>
                {recipesData.map((recipe) => (
                    <li
                        key={recipe.id}
                        onClick={() => handleRecipeClick(recipe.id)}
                        className='flex-shrink-0 w-full sm:w-1/4 md:w-1/6 lg:w-1/18 xl:w-1/10 min-w-[90px] max-w-[100px] flex justify-center mt-12'
                    >
                        <div className='group relative w-full h-full'>
                            <img 
                                src={`${import.meta.env.BASE_URL}images/items/webp/${recipe.id.replace(/ /g, '_')}.webp`}
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    target.onerror = null;
                                    const pngSrc = `${import.meta.env.BASE_URL}images/items/png/${recipe.id.replace(/ /g, '_')}.png`;
                                    const checkImage = new Image();
                                    checkImage.onload = () => {
                                        target.src = pngSrc;
                                    };
                                    checkImage.onerror = () => {
                                    // Si l'image ne peut pas être chargée dans aucun format, on casse la boucle et affiche alt
                                        target.src = `${import.meta.env.BASE_URL}images/icon.webp`;
                                        target.alt = `${recipe.name}`;
                                    };
                                    checkImage.src = pngSrc;
                                }}
                                alt={recipe.name}
                                className='w-full h-auto object-contain'
                            />
                            {/* Infobulle */}
                            <div role='tooltip' className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                                {recipe.name}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
  
            <hr />
            
            <div className='flex flex-row flex-wrap justify-center items-center gap-2 mt-6'>
                {selectedRecipe ? (
                    [...new Set(selectedRecipe.machines.map(m => m.id))].map(machineId => {
                        const fullMachine = machinesMap[machineId];

                        if (!fullMachine) return null;

                        return (
                            <RecipeComponent 
                                key={fullMachine.id}
                                machine={fullMachine} 
                                recipe={{
                                    ...selectedRecipe,
                                    ingredients: selectedRecipe.ingredients.map((ingredient) => ({
                                        ...ingredient,
                                        name: itemsMap[ingredient.id] ?? ingredient.id, 
                                    })),
                                    machines: [...new Set(selectedRecipe.machines.map(m => ({
                                        ...m,
                                        name: machinesMap[m.id]?.name ?? 'Inconnu',
                                    })))], // Supprime les doublons de machines
                                    alternatives: selectedRecipe.alternatives?.map((alt) => ({
                                        ...alt,
                                        name: itemsMap[alt.id] ?? alt.id, // Enrichir les alternatives avec 'name'
                                    })) ?? [],
                                }}
                            />
                        );
                    })
                ) : (
                    <p>Veuillez sélectionner une recette...</p>
                )}
            </div>
        </section>
    );
};
  
export default Cooking;