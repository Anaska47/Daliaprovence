
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, X } from 'lucide-react';
import Hero from '../components/Hero';
import LeadForm from '../components/LeadForm';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import Reassurance from '../components/Reassurance';
import FAQ from '../components/FAQ';
import StickyCTA from '../components/StickyCTA';
import Footer from '../components/Footer';
import LegalModal from '../components/LegalModal';

const Debroussaillage: React.FC = () => {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showTopNotification, setShowTopNotification] = useState(false);
    const [modalType, setModalType] = useState<'legal' | 'privacy' | null>(null);

    const handleFormSuccess = () => {
        setFormSubmitted(true);
        // Redirection vers la page de remerciement pour le tracking Google Ads
        navigate('/merci');
    };

    useEffect(() => {
        if (showTopNotification) {
            const timer = setTimeout(() => {
                setShowTopNotification(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [showTopNotification]);

    return (
        <div className="min-h-screen flex flex-col selection:bg-emerald-100 relative">
            {/* Top Notification */}
            {showTopNotification && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md animate-in slide-in-from-top duration-500">
                    <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between border border-emerald-500/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-100" />
                            <p className="text-sm font-medium">Votre demande a été transmise avec succès.</p>
                        </div>
                        <button
                            onClick={() => setShowTopNotification(false)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Fermer la notification"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <header className="bg-emerald-900 text-white py-4 px-6 sticky top-0 z-40 shadow-sm flex justify-between items-center border-b border-white/5">
                <div className="text-xl font-bold tracking-tight">
                    <span className="text-amber-400">Dalia</span>Provence
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-80 hidden sm:block bg-white/10 px-3 py-1 rounded-full">
                    Secteur Brignoles • Var (83)
                </div>
            </header>

            <main className="flex-grow">
                <div id="accueil">
                    <Hero />
                </div>

                <div id="devis-form" className="bg-stone-50 py-16 px-4 sm:px-6 scroll-mt-20">
                    <div className="max-w-xl mx-auto">
                        <LeadForm onSuccess={handleFormSuccess} source="Page Débroussaillage" />
                    </div>
                </div>

                <div id="avantages">
                    <Benefits />
                </div>
                <div id="temoignages">
                    <Testimonials />
                </div>
                <div id="processus">
                    <HowItWorks />
                </div>
                <Reassurance />
                <div id="faq">
                    <FAQ />
                </div>
            </main>

            <Footer onShowLegal={() => setModalType('legal')} onShowPrivacy={() => setModalType('privacy')} />

            {!formSubmitted && <StickyCTA />}

            {/* Modale Juridique */}
            {modalType && (
                <LegalModal
                    type={modalType}
                    onClose={() => setModalType(null)}
                />
            )}
        </div>
    );
};

export default Debroussaillage;
