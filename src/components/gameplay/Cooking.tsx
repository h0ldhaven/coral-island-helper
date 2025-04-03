import React, { useState } from 'react';
import recipesData from '../../data/recipes.json';
import RecipeComponent from '../RecipeComponent';
  
const Cooking: React.FC = () => {
    const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  
    const handleRecipeClick = (id: string) => {
        setSelectedRecipeId(id);
    };
  
    const selectedRecipe = recipesData.find((recipe) => recipe.id === selectedRecipeId);
  
    return (
        <section className="flex flex-col items-center justify-baseline min-h-screen relative p-4">
            <h1 className="text-5xl font-bold text-center">Cuisine - Fabrication</h1>
            <div className="w-60 h-1 bg-[#ef476f] my-2"></div>

            <h2 className="text-3xl font-semibold text-center">Recettes Disponibles</h2>
            <div className="w-30 h-1 bg-[#ffd166] my-2"></div>
            
            <ul className="flex flex-wrap justify-center items-center gap-4">
                {recipesData.map((recipe) => (
                    <li
                        key={recipe.id}
                        onClick={() => handleRecipeClick(recipe.id)}
                        className='flex-shrink-0 w-full sm:w-1/4 md:w-1/6 lg:w-1/18 xl:w-1/10 min-w-[90px] max-w-[100px] flex justify-center'
                    >
                        <img 
                            src={`${import.meta.env.BASE_URL}images/items/webp/${recipe.name.replace(/ /g, '_')}.webp`}
                            onError={(e) => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                const pngSrc = `${import.meta.env.BASE_URL}images/items/png/${recipe.name.replace(/ /g, '_')}.png`;
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
                            className="w-full h-auto object-contain"
                        />
                    </li>
                ))}
            </ul>
  
            <hr />
            {selectedRecipe ? (
                <RecipeComponent recipe={selectedRecipe} />
            ) : (
                <p className='mt-6 font-comfortaa text-white font-bold'>Veuillez sélectionner une recette afin de l'afficher ci-dessous.</p>
            )}
        </section>
    );
};
  
export default Cooking;