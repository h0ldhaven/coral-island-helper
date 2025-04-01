import React from 'react'

interface HomeProps {
    setActiveComponent: React.Dispatch<React.SetStateAction<string | null>>;
}

const Home: React.FC<HomeProps> = ({ setActiveComponent }) => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden font-comfortaa">
        {/* Animation de vagues */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 via-teal-500 to-cyan-400 opacity-60 animate-wave"></div>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-center mb-6 z-10 text-white">
            Bienvenue dans Coral Island !
        </h1>

        {/* Introduction */}
        <p className="text-lg md:text-xl mb-8 text-center max-w-xl z-10 text-white">
            Explorez et apprenez comment maîtriser les différentes mécaniques de jeu de <strong>Coral Island</strong>. 
            Que vous soyez passionné par la cuisine, le craft, ou l'enchantement, nous avons des guides et des astuces pour vous aider.
        </p>

        {/* Sections avec mention des catégories */}
        <div className="flex flex-wrap justify-center gap-8 z-10">
            <div className="bg-teal-600 p-6 rounded-lg shadow-lg text-center w-52 md:w-64" onClick={() => setActiveComponent('cuisine')}>
                <h3 className="text-2xl font-bold mb-4">Cuisine</h3>
                <p className="text-md mb-4">Découvrez des recettes et astuces pour réussir vos plats dans <strong>Coral Island</strong>.</p>
                <p className="text-md text-crimson">
                    Sélectionnez le menu "Cuisine" dans la navigation pour commencer.
                </p>
            </div>

            <div className="bg-teal-600 p-6 rounded-lg shadow-lg text-center w-52 md:w-64" onClick={() => setActiveComponent('craft')}>
                <h3 className="text-2xl font-bold mb-4">Craft</h3>
                <p className="text-md mb-4">Maîtrisez l'art du crafting et créez des objets uniques dans le jeu.</p>
                <p className="text-md text-crimson">
                    Sélectionnez le menu "Craft" dans la navigation pour commencer.
                </p>
            </div>

            <div className="bg-teal-600 p-6 rounded-lg shadow-lg text-center w-52 md:w-64" onClick={() => setActiveComponent('enchantement')}>
                <h3 className="text-2xl font-bold mb-4">Enchantement</h3>
                <p className="text-md mb-4">Apprenez les secrets de l'enchantement et améliorez vos équipements.</p>
                <p className="text-md text-crimson">
                    Sélectionnez le menu "Enchantement" dans la navigation pour commencer.
                </p>
            </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center z-10">
            <p className="text-lg md:text-xl">
                Prêt à explorer ? Utilisez le menu ci-dessus pour choisir une catégorie et commencez votre aventure !
            </p>
        </div>
    </section>
    );
  }

export default Home;