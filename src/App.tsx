import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Debroussaillage from './pages/Debroussaillage';
import Merci from './pages/Merci';
import Partners from './pages/Partners';
import Elagage from './pages/Elagage';
import Terrassement from './pages/Terrassement';
import NettoyageToiture from './pages/NettoyageToiture';
import Restanques from './pages/Restanques';
import GuideObligationDebroussaillement from './pages/guides/GuideObligationDebroussaillement';
import GuideElagageReglementation from './pages/guides/GuideElagageReglementation';
import GuideTerrassementAutorisation from './pages/guides/GuideTerrassementAutorisation';
import GuideNettoyageToitureFrequence from './pages/guides/GuideNettoyageToitureFrequence';
import GuideRestanquesPierreSeche from './pages/guides/GuideRestanquesPierreSeche';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Debroussaillage />} />
                <Route path="/debroussaillage" element={<Debroussaillage />} />
                <Route path="/debroussaillage/:citySlug" element={<Debroussaillage />} />
                <Route path="/elagage" element={<Elagage />} />
                <Route path="/elagage/:citySlug" element={<Elagage />} />
                <Route path="/terrassement" element={<Terrassement />} />
                <Route path="/terrassement/:citySlug" element={<Terrassement />} />
                <Route path="/nettoyage-toiture" element={<NettoyageToiture />} />
                <Route path="/nettoyage-toiture/:citySlug" element={<NettoyageToiture />} />
                <Route path="/restanques" element={<Restanques />} />
                <Route path="/restanques/:citySlug" element={<Restanques />} />
                <Route path="/merci" element={<Merci />} />
                <Route path="/partenaires" element={<Partners />} />
                <Route path="/guides/obligation-debroussaillement-var" element={<GuideObligationDebroussaillement />} />
                <Route path="/guides/elagage-reglementation-var" element={<GuideElagageReglementation />} />
                <Route path="/guides/terrassement-autorisation-var" element={<GuideTerrassementAutorisation />} />
                <Route path="/guides/nettoyage-toiture-frequence-var" element={<GuideNettoyageToitureFrequence />} />
                <Route path="/guides/restanques-pierre-seche-var" element={<GuideRestanquesPierreSeche />} />
                {/* Placeholder for future services */}
                {/* <Route path="/elagage" element={<Elagage />} /> */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
