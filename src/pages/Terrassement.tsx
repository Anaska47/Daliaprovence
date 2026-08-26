
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
import { faqTerrassement } from '../data/faqContent';
import { Shield, Hammer, MapPin, Truck } from 'lucide-react';

const Terrassement: React.FC = () => {
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

    const canonicalUrl = location ? `https://daliaprovence.vercel.app/terrassement/${location.slug}` : 'https://daliaprovence.vercel.app/terrassement';
    const pageDescription = location
        ? `Travaux de terrassement, nivellement et aménagement de terrain à ${location.name}. Équipe équipée et expérimentée. Devis gratuit rapide.`
        : 'Spécialistes du terrassement et de la préparation de terrain dans le Var. Fondations, piscines, nivellement. Consultez-nous pour un devis gratuit au meilleur prix.';

    useEffect(() => {
        const pageTitle = location 
            ? `Terrassement à ${location.name} (${location.zipCode}) - Devis Gratuit` 
            : 'Entreprise de Terrassement dans le Var (83) - Devis Gratuit - Dalia Provence';
        
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
        <div className="min-h-screen flex flex-col selection:bg-stone-200 relative pt-10 sm:pt-0">
            <SeoSchema
                serviceName="Terrassement"
                serviceDescription={pageDescription}
                cityName={cityName}
                canonicalUrl={canonicalUrl}
                faqs={faqTerrassement}
            />
            {/* Custom Banner for Terrassement */}
            <div className="fixed top-0 left-0 right-0 z-[60] bg-orange-950 text-white overflow-hidden border-b border-white/5 pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-orange-400" />
                        <span className="text-xs md:text-sm font-bold opacity-90">
                            Préparez votre terrain avant l'arrivée des pluies dans le Var.
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
                    {/* Reusing Hero component with dynamic description matching the niche */}
                    <Hero 
                        location={cityName} 
                        description={`Votre partenaire de confiance pour tous vos travaux de terrassement, nivellement, fondations et dessouchage lourd à ${cityName}.`} 
                    />
                </motion.div>

                <TrustSignals />

                {/* Trust Badges - Earth / Stone variation */}
                <div className="bg-stone-100/50 py-8 border-y border-stone-200">
                    <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Shield className="w-6 h-6 text-stone-700" />
                            <span className="font-bold text-stone-900 uppercase tracking-tighter text-xs">Garantie Décennale</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Hammer className="w-6 h-6 text-stone-700" />
                            <span className="font-bold text-stone-900 uppercase tracking-tighter text-xs">Matériel Lourd Pro</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <MapPin className="w-6 h-6 text-stone-700" />
                            <span className="font-bold text-stone-900 uppercase tracking-tighter text-xs">Intervention dans le 83</span>
                        </div>
                    </div>
                </div>

                <PricingEstimator location={cityName} />

                <Testimonials />

                <div className="bg-stone-900 py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-10 -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-500 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48"></div>

                    <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 border border-stone-700 text-orange-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Fondations Solides
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            Un projet de <span className="text-orange-400">Construction</span> ou de <span className="text-orange-400">Piscine</span> à {cityName} ?
                        </h2>
                        <p className="text-stone-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Toute construction durable repose sur un bon terrassement. Notre flotte d'engins nous permet de remanier votre terrain pour l'adapter exactement à vos plans.
                        </p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    id="prestations"
                >
                    <Benefits />
                </motion.div>

                <Gallery />

                <FAQ faqs={faqTerrassement} titleHighlight="le terrassement" subtitle="Préparation de terrain & fondations Var (83)" />

                <div className="text-center pb-16 px-6 -mt-8">
                    <Link
                        to="/guides/terrassement-autorisation-var"
                        className="inline-flex items-center gap-2 text-orange-700 font-bold hover:text-orange-900 transition-colors underline decoration-orange-200 underline-offset-4"
                    >
                        Lire le guide complet sur les autorisations de terrassement dans le Var →
                    </Link>
                </div>

                <motion.div
                    id="devis-form"
                    className="bg-stone-900 py-24 px-4 sm:px-6 scroll-mt-20 relative overflow-hidden border-t border-stone-800"
                >
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-800 to-transparent opacity-20"></div>
                    <div className="max-w-xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">De quel terrassement avez-vous besoin ?</h2>
                            <p className="text-stone-400">Expliquez-nous votre projet. Chiffrage précis sous 24/48h.</p>
                        </div>
                        <LeadForm 
                            onSuccess={handleFormSuccess} 
                            source={`Page Terrassement ${cityName}`} 
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

export default Terrassement;
