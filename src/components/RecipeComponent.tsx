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
};

const renderMachine = (machine: Machine, recipe: Recipe) => {
    const alternatives = recipe.alternatives || [];
    switch (machine.id) {
        case 'oven':
            return <Oven key={machine.id} machine={machine} recipe={recipe} alternatives={alternatives} />;
        case 'seasoning set':
            return <SeasoningSet key={machine.id} machine={machine} recipe={recipe} alternatives={alternatives} />;
        default:
            return <OtherMachine key={machine.id} machine={machine} recipe={recipe} alternatives={alternatives} />;
    }
};
  
const RecipeComponent: React.FC<RecipeProps> = ({ machine, recipe }) => {
    return (
        <div className='w-auto h-full'>
            <div className='machines-container'>
                {recipe.machines.length > 0 ? (
                    renderMachine(machine, recipe)
                ) : (
                    <OtherMachine key='default' machine={machine} recipe={recipe} alternatives={recipe.alternatives || []} />
                )}
            </div>
        </div>
    );
};
  
export default RecipeComponent;