import React from 'react';
import FishCard from './FishCard';
import { Fish } from '../../types/fishing/Fish';
import { CardButton } from '../../types/CardButton';

type FishProps = {
    fish: Fish;
    button: CardButton
};

const FishComponent: React.FC<FishProps> = (props) => {
    const { fish, button } = props;
    return(
        <div className='w-auto h-full'>
            {fish.name.length > 0 ? (
                <FishCard key={fish.id} fish={fish} button={button} />
            ) : (
                <FishCard key='default' fish={fish} button={button} />
            )}
        </div>
    );
};
export default FishComponent;