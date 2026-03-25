
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import LeadForm from '../components/LeadForm';
import TrustSignals from '../components/TrustSignals';
import Gallery from '../components/Gallery';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import StickyCTA from '../components/StickyCTA';
import Footer from '../components/Footer';
import LegalModal from '../components/LegalModal';
import PricingEstimator from '../components/PricingEstimator';
import Navbar from '../components/Navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import { motion } from 'framer-motion';
import { getLocationBySlug } from '../data/locations';
import { Shield, Sparkles, MapPin, Droplet } from 'lucide-react';

const NettoyageToiture: React.FC = () => {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modalType, setModalType] = useState<'legal' | 'privacy' | null>(null);

    const handleFormSuccess = () => {
        setFormSubmitted(true);
        navigate('/merci');
    };

    const { citySlug } = useParams<{ citySlug: string }>();
    const location = citySlug ? getLocationBySlug(citySlug) : null;
    const cityName = location ? location.name : 'Brignoles';

    useEffect(() => {
        const pageTitle = location 
            ? `Démoussage & Nettoyage de Toiture à ${location.name} (${location.zipCode})` 
            : 'Nettoyage & Traitement Toiture dans le Var (83) - Devis Gratuit';
        
        document.title = pageTitle;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', location 
                ? `Redonnez l'éclat du neuf à votre toiture ou façade à ${location.name}. Démoussage, traitement hydrofuge et nettoyage professionnel. Devis gratuit.`
                : 'Spécialistes du nettoyage, démoussage et traitement hydrofuge de toitures et façades dans le Var. Protégez votre maison des infiltrations et redonnez-lui son éclat.');
        }

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        const url = location ? `https://daliaprovence.vercel.app/nettoyage-toiture/${location.slug}` : 'https://daliaprovence.vercel.app/nettoyage-toiture';
        canonical.setAttribute('href', url);
    }, [location]);

    return (
        <div className="min-h-screen flex flex-col selection:bg-sky-200 relative pt-10 sm:pt-0">
            {/* Custom Banner for Cleaning */}
            <div className="fixed top-0 left-0 right-0 z-[60] bg-sky-950 text-white overflow-hidden relative border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-sky-400" />
                        <span className="text-xs md:text-sm font-bold opacity-90">
                            Hydrofuge et Démoussage profonds pour protéger votre toit.
                        </span>
                    </div>
                </div>
            </div>
            
            <Navbar location={cityName} />

            <main className="flex-grow">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    id="accueil"
                >
                    <Hero 
                        location={cityName} 
                        description={`Protégez votre habitation à ${cityName}. Démoussage, nettoyage et traitement hydrofuge de toitures et façades.`} 
                    />
                </motion.div>

                <TrustSignals />

                {/* Trust Badges - Clean / Water variation */}
                <div className="bg-sky-50/50 py-8 border-y border-sky-100">
                    <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Droplet className="w-6 h-6 text-sky-700" />
                            <span className="font-bold text-sky-900 uppercase tracking-tighter text-xs">Produits Biodégradables</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Sparkles className="w-6 h-6 text-sky-700" />
                            <span className="font-bold text-sky-900 uppercase tracking-tighter text-xs">Traitement Longue Durée</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <MapPin className="w-6 h-6 text-sky-700" />
                            <span className="font-bold text-sky-900 uppercase tracking-tighter text-xs">Spécialiste Var 83</span>
                        </div>
                    </div>
                </div>

                <PricingEstimator location={cityName} />

                <Testimonials />

                <div className="bg-sky-950 py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10 -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48"></div>

                    <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-900 border border-sky-800 text-sky-200 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Zéro Infiltration
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            Un toit qui vieillit mal à <span className="text-sky-400">{cityName}</span> ?
                        </h2>
                        <p className="text-sky-100/70 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Mousse, lichens et pollution rendent vos tuiles poreuses et fragiles. Notre nettoyage en profondeur suivi d'un hydrofuge redonne à votre toiture 10 ans de tranquillité.
                        </p>
                    </div>
                </div>

                <Benefits />

                <Gallery />

                <FAQ />

                <motion.div
                    id="devis-form"
                    className="bg-sky-900 py-24 px-4 sm:px-6 scroll-mt-20 relative overflow-hidden"
                >
                    <div className="max-w-xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Combien va coûter le rajeunissement ?</h2>
                            <p className="text-sky-200">Demandez votre diagnostic gratuit sous 24h.</p>
                        </div>
                        <LeadForm 
                            onSuccess={handleFormSuccess} 
                            source={`Page Nettoyage Toiture ${cityName}`} 
                            initialCity={cityName}
                        />
                    </div>
                </motion.div>
            </main>

            <Footer 
                location={cityName}
                onShowLegal={() => setModalType('legal')} 
                onShowPrivacy={() => setModalType('privacy')} 
            />

            {!formSubmitted && <StickyCTA />}
            <WhatsAppButton />

            {modalType && (
                <LegalModal
                    type={modalType}
                    onClose={() => setModalType(null)}
                />
            )}
        </div>
    );
};

export default NettoyageToiture;
