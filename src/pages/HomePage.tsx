import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";


const HomePage: React.FC = () => {
    return(
        <main className="flex flex-col h-full min-h-screen" role="main">
            <Header />
            <Nav />
        </main>
    );
};

export default HomePage;