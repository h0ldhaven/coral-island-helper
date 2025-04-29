import React from 'react';
import FishCard from './FishCard';

export type Fish = {
    id: string;
    name: string;
    basic_price: number;
    bronze_price: number;
    silver_price: number;
    gold_price: number;
    osmium_price: number;
    location: string;
    time: string;
    weather: string;
    season: string;
    rarity: string;
    difficulty: string;
    offering: string;
    offering_quality: string;
};

type FishProps = {
    fish: Fish;
};

const FishComponent: React.FC<FishProps> = ({ fish }) => {
    return(
        <div className='w-auto h-full'>
            {fish.name.length > 0 ? (
                <FishCard key={fish.id} fish={fish} />
            ) : (
                <FishCard key='default' fish={fish} />
            )}
        </div>
    );
};
export default FishComponent;