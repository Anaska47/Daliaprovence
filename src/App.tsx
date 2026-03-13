import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Debroussaillage from './pages/Debroussaillage';
import Merci from './pages/Merci';
import Partners from './pages/Partners';
import Elagage from './pages/Elagage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Debroussaillage />} />
                <Route path="/debroussaillage" element={<Debroussaillage />} />
                <Route path="/debroussaillage/:citySlug" element={<Debroussaillage />} />
                <Route path="/elagage" element={<Elagage />} />
                <Route path="/elagage/:citySlug" element={<Elagage />} />
                <Route path="/merci" element={<Merci />} />
                <Route path="/partenaires" element={<Partners />} />
                {/* Placeholder for future services */}
                {/* <Route path="/elagage" element={<Elagage />} /> */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
