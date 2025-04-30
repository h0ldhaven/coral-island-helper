import React from 'react';

const Crafting: React.FC = () => {
    return (
        <section className='flex flex-col items-center justify-baseline min-h-screen relative p-4'>
            <h1 className='text-5xl font-bold text-center'>Crafting - Fabrication</h1>
            <div className='w-60 h-1 bg-[#ef476f] my-4'></div>

            <h2 className='text-3xl font-semibold text-center'>Recettes Disponibles</h2>
            <div className='w-30 h-1 bg-[#ffd166] my-2'></div>

            <div className='flex flex-row flex-wrap justify-center items-center gap-2 mt-6'>
                <p className='mt-20 font-comfortaa text-xl text-blue-100'>Onglet en cours de fabrication, veuillez revenir pluis tard.</p>
            </div>
        </section>
    );
};

export default Crafting;