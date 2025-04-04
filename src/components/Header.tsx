import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.location.reload();
        } else {
            navigate('/');
        }
    };

    return(
        <header className='relative overflow-clip'>
            <img
                className='absolute object-cover object-center w-full h-full -z-10'
                src={`${import.meta.env.BASE_URL}images/background_1.webp`}
                alt='Fond de coral island'
                aria-hidden='true'
            />

            {/* Conteneur Flex pour le logo et le titre */}
            <div className='flex flex-col items-center justify-between w-full h-full px-4 md:flex-row sm:px-8 md:px-16'>
                {/* Logo à gauche */}
                <img
                    onClick={handleLogoClick}
                    className='md:left-[2.5vw] md:absolute md:top-1/2 md:-translate-y-1/2 w-auto max-w-36 sm:max-w-44 lg:max-w-48 h-auto z-50'
                    src={`${import.meta.env.BASE_URL}images/icon.webp`}
                    alt='Logo de coral island'
                    aria-hidden='true'
                />

                {/* Titre centré sous le logo */}
                <div className='text-shadow-custom flex flex-col items-center justify-center w-full md:pt-24 pb-10 md:pb-16 leading-none text-white font-comfortaa text-[3em] z-10'>
                    <h1>Coral Island</h1>
                    <hr />
                    <h2>Craft Helper</h2>
                </div>
            </div>
        </header>
    );
};

export default Header;