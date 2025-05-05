import React from 'react';
import Oven from './machines/Oven';
import SeasoningSet from './machines/SeasoningSet';
import OtherMachine from './machines/OtherMachine';
import { CardButton } from '../../types/CardButton';
import { Machine } from '../../types/cooking/Machine';
import { Recipe } from '../../types/cooking/Recipe';

type RecipeProps = {
    machine: Machine;
    recipe: Recipe;
    button: CardButton;
};

const renderMachine = (
    { machine, recipe, button }: RecipeProps
) => {
    const alternatives = recipe.alternatives || [];

    switch (machine.id) {
        case 'oven':
            return <Oven 
                key={machine.id} 
                machine={machine} 
                recipe={recipe} 
                alternatives={alternatives} 
                button={button}
            />;
        case 'seasoning set':
            return <SeasoningSet 
                key={machine.id} 
                machine={machine} 
                recipe={recipe} 
                alternatives={alternatives} 
                button={button}
            />;
        default:
            return <OtherMachine 
                key={machine.id} 
                machine={machine} 
                recipe={recipe} 
                alternatives={alternatives} 
                button={button}
            />;
    }
};
  
const RecipeComponent: React.FC<RecipeProps> = (props) => {
    const { machine, recipe, button } = props;

    return (
        <div className='w-auto h-full'>
            <div className='machines-container'>
                {recipe.machines.length > 0 ? (
                    renderMachine(props)
                ) : (
                    <OtherMachine 
                        key='default' 
                        machine={machine} 
                        recipe={recipe} 
                        alternatives={recipe.alternatives || []} 
                        button={button}
                    />
                )}
            </div>
        </div>
    );
};
  
export default RecipeComponent;