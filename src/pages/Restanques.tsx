
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import LeadForm from '../components/LeadForm';
import TrustSignals from '../components/TrustSignals';
import Gallery from '../components/Gallery';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import SeoSchema from '../components/SeoSchema';
import StickyCTA from '../components/StickyCTA';
import Footer from '../components/Footer';
import LegalModal from '../components/LegalModal';
import PricingEstimator from '../components/PricingEstimator';
import Navbar from '../components/Navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import { motion } from 'framer-motion';
import { getLocationBySlug } from '../data/locations';
import { faqRestanques } from '../data/faqContent';
import { Shield, MapPin, HardHat, Pickaxe } from 'lucide-react';

const Restanques: React.FC = () => {
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

    const canonicalUrl = location ? `https://daliaprovence.vercel.app/restanques/${location.slug}` : 'https://daliaprovence.vercel.app/restanques';
    const pageDescription = location
        ? `Artisan spécialiste de la création et réparation de restanques à ${location.name}. Murets en pierre naturelle, aménagement paysager traditionnel provençal.`
        : 'Maîtrise de la pierre sèche et création de restanques dans le Var. Aménagez les pentes de votre terrain avec l\'authenticité de la Provence.';

    useEffect(() => {
        const pageTitle = location 
            ? `Création de Restanques & Murs en Pierre à ${location.name} (${location.zipCode})` 
            : 'Murs en Pierre Sèche et Restanques Var (83) - Devis Gratuit';
        
        document.title = pageTitle;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', pageDescription);
        }

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);

        // Open Graph / reseaux sociaux (partage de la page)
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', pageTitle);
        }
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', pageDescription);
        }
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', canonicalUrl);
    }, [location, canonicalUrl, pageDescription]);

    return (
        <div className="min-h-screen flex flex-col selection:bg-amber-200 relative pt-10 sm:pt-0">
            <SeoSchema
                serviceName="Création et restauration de restanques"
                serviceDescription={pageDescription}
                cityName={cityName}
                canonicalUrl={canonicalUrl}
                faqs={faqRestanques}
            />
            {/* Custom Banner for Restanques */}
            <div className="fixed top-0 left-0 right-0 z-[60] bg-yellow-950 text-white overflow-hidden relative border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Pickaxe className="w-4 h-4 text-amber-500" />
                        <span className="text-xs md:text-sm font-bold opacity-90">
                            Valorisez votre patrimoine avec des murets en vraie pierre provençale.
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
                        description={`Création et restauration de taille, restanques et enrochement à ${cityName}. Le savoir-faire des bâtisseurs de Provence.`} 
                    />
                </motion.div>

                <TrustSignals />

                {/* Trust Badges - Stone/Craft variation */}
                <div className="bg-amber-50/50 py-8 border-y border-amber-100">
                    <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Pickaxe className="w-6 h-6 text-yellow-800" />
                            <span className="font-bold text-yellow-950 uppercase tracking-tighter text-xs">Savoir-faire Artisanal</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <HardHat className="w-6 h-6 text-yellow-800" />
                            <span className="font-bold text-yellow-950 uppercase tracking-tighter text-xs">Pierres Naturelles Locales</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <MapPin className="w-6 h-6 text-yellow-800" />
                            <span className="font-bold text-yellow-950 uppercase tracking-tighter text-xs">Intervention Secteur Var</span>
                        </div>
                    </div>
                </div>

                <PricingEstimator location={cityName} />

                <Testimonials />

                <div className="bg-yellow-950 py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-[120px] opacity-10 -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48"></div>

                    <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-900 border border-yellow-800 text-amber-200 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Authenticité Garantie
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            Domptez la pente de votre terrain à <span className="text-amber-400">{cityName}</span>
                        </h2>
                        <p className="text-yellow-100/70 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Les restanques ne font pas que retenir la terre, elles sculptent le paysage. Optez pour la beauté brute et la solidité de la pierre sèche pour habiller vos extérieurs.
                        </p>
                    </div>
                </div>

                <Benefits />

                <Gallery />

                <FAQ faqs={faqRestanques} titleHighlight="les restanques en pierre sèche" subtitle="Savoir-faire provençal Var (83)" />

                <motion.div
                    id="devis-form"
                    className="bg-yellow-900 py-24 px-4 sm:px-6 scroll-mt-20 relative overflow-hidden"
                >
                    <div className="max-w-xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un projet de maçonnerie paysagère ?</h2>
                            <p className="text-yellow-200">Remplissez ce formulaire et recevez un chiffrage personnalisé.</p>
                        </div>
                        <LeadForm 
                            onSuccess={handleFormSuccess} 
                            source={`Page Restanques ${cityName}`} 
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

export default Restanques;
