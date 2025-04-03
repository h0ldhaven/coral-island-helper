import React from 'react';
import Oven from './machines/Oven';

type RecipeProps = {
    recipe: {
      id: string;
      name: string;
      quantity: number;
      ingredients: { id: string; quantity: number }[];
      machines: string[];
    };
  };
  
const RecipeComponent: React.FC<RecipeProps> = ({ recipe }) => {
    return (
        <div className='w-full h-full'>
            <div className="machines-container">
                {recipe.machines.map((machineId) => {
                    if (machineId === 'oven') {
                        // Si la machine est un four, afficher le composant Oven
                        return <Oven key={machineId} itemName={recipe.name} itemQuantity={recipe.quantity} ingredients={recipe.ingredients} />;
                    }
                    // Ajoute ici d'autres machines comme "blender", "grill", etc.
                    return null;
                })}
            </div>
        </div>
    );
};
  
export default RecipeComponent;