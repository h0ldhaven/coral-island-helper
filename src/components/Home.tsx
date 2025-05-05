import React from 'react';
import homeMenu from '../data/homeMenu.json';
import { MenuHome } from '../types/MenuHome';

interface HomeProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
}

const Home: React.FC<HomeProps> = ({ setActiveComponent }) => {
    return (
        <section className='flex flex-col items-center justify-center min-h-screen relative overflow-hidden font-comfortaa'>

            {/* Titre principal */}
            <h1 className='mt-14 px-4 text-4xl md:text-5xl font-extrabold leading-tight text-center mb-6 z-10 text-white'>
            Bienvenue dans Coral Island !
            </h1>

            {/* Introduction */}
            <p className='px-6 text-lg md:text-xl mb-8 text-center max-w-xl z-10 text-white'>
            Explorez et apprenez comment maîtriser les différentes mécaniques de jeu de <strong>Coral Island</strong>. 
            Que vous soyez passionné par la cuisine, le craft, ou l'enchantement, nous avons des guides et des astuces pour vous aider.
            </p>

            {/* Sections avec mention des catégories */}
            <div className='flex flex-wrap justify-center gap-8 z-10'>
                {homeMenu.map((menu: MenuHome) => (
                    <div 
                        className='bg-blue-400/60 border-2 border-blue-400/60 hover:border-red-400/60 p-6 rounded-lg shadow-lg text-center w-52 md:w-64 duration-500 ease-out hover:scale-110 hover:cursor-pointer active:scale-110' 
                        onClick={() => setActiveComponent(menu.id)}
                        key={menu.id}
                    >
                        <h3 className='text-white/70 text-lg font-bold mb-4 sm:text-xl md:text-2xl'>{menu.title}</h3>
                        <p className='text-md mb-4 text-emerald-200'>{menu.description}</p>
                        <p className='text-md text-white'>Cliquez-ici pour commencer.</p>
                    </div>
                ))}
            </div>

            {/* Call to action */}
            <div className='mt-12 mb-10 px-4 text-center z-10'>
                <p className='text-lg md:text-xl'>
                    Prêt à explorer ? Utilisez le menu ci-dessus pour choisir une catégorie et commencez votre aventure !
                </p>
                <p className='border-1 mt-8 text-md md:text-lg text-red-800/80 px-6 py-2'>
                    <span className='font-bold'>Attention</span>, cette application est encore en développement, 
                    <br />
                    certains onglets ne sont pas encore terminés où sont en cours de développement et évoluent quotidiennement
                    <br />
                    Nous vous souhaitons néanmoins une bonne visite !
                </p>
            </div>
        </section>
    );
};

export default Home;