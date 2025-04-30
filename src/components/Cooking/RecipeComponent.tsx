import React from 'react';
import Oven from './machines/Oven';
import SeasoningSet from './machines/SeasoningSet';
import OtherMachine from './machines/OtherMachine';

export type Machine = {
    id: string;
    name: string;
};

export type Alternative = {
    id: string; 
    name: string; 
    quantity: number;
    replaceItem: string; 
};

export type Ingredient = {
    id: string;
    name: string;
    quantity: number;
};

export type Recipe = {
    id: string;
    name: string;
    quantity: number;
    ingredients: Ingredient[];
    alternatives?: Alternative[];
    machines: Machine[];
};

type RecipeProps = {
    machine: Machine;
    recipe: Recipe;
    onClose: () => void;
};

const renderMachine = (machine: Machine, recipe: Recipe, onClose: () => void) => {
    const alternatives = recipe.alternatives || [];

    switch (machine.id) {
        case 'oven':
            return <Oven key={machine.id} machine={machine} recipe={recipe} alternatives={alternatives} onClose={onClose} />;
        case 'seasoning set':
            return <SeasoningSet key={machine.id} machine={machine} recipe={recipe} alternatives={alternatives} onClose={onClose} />;
        default:
            return <OtherMachine key={machine.id} machine={machine} recipe={recipe} alternatives={alternatives} onClose={onClose} />;
    }
};
  
const RecipeComponent: React.FC<RecipeProps> = ({ machine, recipe, onClose }) => {
    return (
        <div className='w-auto h-full'>
            <div className='machines-container'>
                {recipe.machines.length > 0 ? (
                    renderMachine(machine, recipe, onClose)
                ) : (
                    <OtherMachine key='default' machine={machine} recipe={recipe} alternatives={recipe.alternatives || []} onClose={onClose} />
                )}
            </div>
        </div>
    );
};
  
export default RecipeComponent;