import React, { useState, useEffect } from 'react';
import recipesData from '../../data/recipes.json';
import machinesData from '../../data/machines.json';
import itemsData from '../../data/ingredients.json';
import RecipeComponent from './RecipeComponent';
import { Machine } from '../../types/cooking/Machine';
  
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
        setSelectedRecipeId((currentId) => {
            // Si la recette est déjà sélectionnée, on la ferme et on arrête de scroller
            if (currentId === id) {
                return null;
            } else {
                // Si une recette différente est sélectionnée, on fait défiler la page vers la div avec l'id "craft"
                const craftDiv = document.getElementById('craft');
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

    const handlePreviousRecipe = () => {
        if (!selectedRecipeId) return;
    
        const currentIndex = recipesData.findIndex(r => r.id === selectedRecipeId);
        if (currentIndex > 0) {
            setSelectedRecipeId(recipesData[currentIndex - 1].id);
        }
    };
    
    const handleNextRecipe = () => {
        if (!selectedRecipeId) return;
    
        const currentIndex = recipesData.findIndex(r => r.id === selectedRecipeId);
        if (currentIndex < recipesData.length - 1) {
            setSelectedRecipeId(recipesData[currentIndex + 1].id);
        }
    };
  
    const selectedRecipe = recipesData.find((recipe) => recipe.id === selectedRecipeId);
  
    return (
        <section className='flex flex-col items-center justify-baseline min-h-screen relative p-4'>
            <h1 className='text-5xl font-bold text-center'>Cuisine - Préparation</h1>
            <div className='w-60 h-1 bg-[#ef476f] my-4'></div>

            <h2 className='text-3xl font-semibold text-center'>Recettes Disponibles</h2>
            <div className='w-30 h-1 bg-[#ffd166] my-2'></div>

            <div id='craft' className='flex flex-row flex-wrap justify-center items-center gap-2 mt-6'>
                {selectedRecipe ? (
                    <div className='relative flex items-center'>
                        {[...new Set(selectedRecipe.machines.map(m => m.id))].map(machineId => {
                            const fullMachine = machinesMap[machineId];

                            if (!fullMachine) return null;

                            return (
                                <RecipeComponent 
                                    key={fullMachine.id}
                                    machine={fullMachine} 
                                    recipe={{
                                        ...selectedRecipe,
                                        name: selectedRecipe.name && selectedRecipe.name !== 'null'
                                            ? selectedRecipe.name
                                            : itemsMap[selectedRecipe.id] ?? selectedRecipe.id,
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
                                    button={{
                                        onClose: () => setSelectedRecipeId(null),
                                        onPrevious: handlePreviousRecipe,
                                        onNext: handleNextRecipe,
                                        isFirst: recipesData.findIndex(r => r.id === selectedRecipeId) === 0,
                                        isLast: recipesData.findIndex(r => r.id === selectedRecipeId) === recipesData.length - 1,
                                    }}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p className='mt-10 mb-10 font-comfortaa text-xl text-blue-100'>Appuyez sur un plat pour afficher son craft.</p>
                )}
            </div>
            
            <ul className='flex flex-row flex-wrap justify-center items-center xs:mx-10 sm:mx-20 md:mx-30 lg:mx-40 mx-4 xs:gap-1 sm:gap-2 md:gap-4 gap-1'>
                {recipesData.map((recipe) => (
                    <li
                        key={recipe.id}
                        onClick={() => handleRecipeClick(recipe.id)}
                        className='flex flex-shrink-0 justify-center w-full min-w-[90px] max-w-[100px] xs:mt-2 sm:mt-4 md:mt-8 mt-12 xs:w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/18 xl:w-1/10'
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
                                className='w-full h-auto object-contain duration-500 ease-out hover:scale-120 hover:cursor-pointer'
                            />
                            {/* Infobulle */}
                            <div role='tooltip' className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                                {
                                    recipe.name && recipe.name !== 'null'
                                        ? recipe.name
                                        : itemsMap[recipe.id] ?? recipe.id
                                }
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
  
export default Cooking;