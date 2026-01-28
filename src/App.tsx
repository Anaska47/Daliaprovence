
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Debroussaillage from './pages/Debroussaillage';
import Merci from './pages/Merci';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Debroussaillage />} />
                <Route path="/debroussaillage" element={<Debroussaillage />} />
                <Route path="/merci" element={<Merci />} />
                {/* Placeholder for future services */}
                {/* <Route path="/elagage" element={<Elagage />} /> */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
