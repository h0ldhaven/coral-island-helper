import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const App: React.FC = () => {

    return (
        <Router>
            <Routes>
                <Route path='*' element={<ErrorPage />} />
                <Route path='/' element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
