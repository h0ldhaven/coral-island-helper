import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

const App: React.FC = () => {

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default App;
