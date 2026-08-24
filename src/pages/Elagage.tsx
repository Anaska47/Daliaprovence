
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
import UrgencyBanner from '../components/UrgencyBanner';
import MaintenanceSubscription from '../components/MaintenanceSubscription';
import { motion } from 'framer-motion';
import { getLocationBySlug } from '../data/locations';
import { faqElagage } from '../data/faqContent';
import { Shield, Award, MapPin, CheckCircle, X } from 'lucide-react';

const Elagage: React.FC = () => {
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

    const canonicalUrl = location ? `https://daliaprovence.vercel.app/elagage/${location.slug}` : 'https://daliaprovence.vercel.app/elagage';
    const pageDescription = location
        ? `Services d'élagage et abattage d'arbres à ${location.name}. Intervention en toute sécurité par des arboristes experts. Devis gratuit sous 24h.`
        : 'Experts en élagage et abattage d\'arbres délicats dans le Var. Taille douce, démontage d\'arbres dangereux et évacuation. Devis rapide à Brignoles et 83.';

    useEffect(() => {
        // Dynamic SEO Update for Elagage
        const pageTitle = location 
            ? `Élagage et Abattage à ${location.name} (${location.zipCode}) - Devis Gratuit 24h` 
            : 'Élagage & Abattage d\'arbres dans le Var (83) - Devis Gratuit 24h - Dalia Provence';
        
        document.title = pageTitle;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', pageDescription);
        }

        // Canonical Tag
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);
    }, [location, canonicalUrl, pageDescription]);

    return (
        <div className="min-h-screen flex flex-col selection:bg-amber-100 relative pt-10 sm:pt-0">
            <SeoSchema
                serviceName="Élagage et abattage d'arbres"
                serviceDescription={pageDescription}
                cityName={cityName}
                canonicalUrl={canonicalUrl}
                faqs={faqElagage}
            />
            <div className="fixed top-0 left-0 right-0 z-[60]">
                <UrgencyBanner />
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
                        description={`Services d'élagage professionnel à ${cityName}. Taille douce, abattage délicat et mise en sécurité de vos arbres.`} 
                    />
                </motion.div>

                <TrustSignals />

                {/* Trust Badges */}
                <div className="bg-amber-50/30 py-8 border-y border-amber-100">
                    <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Shield className="w-6 h-6 text-amber-800" />
                            <span className="font-bold text-amber-950 uppercase tracking-tighter text-xs">Assurance RC Pro</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Award className="w-6 h-6 text-amber-800" />
                            <span className="font-bold text-amber-950 uppercase tracking-tighter text-xs">Arboriste Grimpeur Diplômé</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <MapPin className="w-6 h-6 text-amber-800" />
                            <span className="font-bold text-amber-950 uppercase tracking-tighter text-xs">Intervention Rapide Var 83</span>
                        </div>
                    </div>
                </div>

                <PricingEstimator location={cityName} />

                <Testimonials />

                <div className="bg-stone-900 py-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-[120px] opacity-10 -mr-48 -mt-48"></div>
                    <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 border border-stone-700 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Spécialiste Arbres Dangereux
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            Un arbre menaçant à <span className="text-amber-400">{cityName}</span> ?
                        </h2>
                        <p className="text-stone-300 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Ne prenez aucun risque. Nos grimpeurs certifiés interviennent sous 24h pour sécuriser votre propriété.
                        </p>
                    </div>
                </div>

                <Benefits />

                <Gallery />

                <FAQ faqs={faqElagage} titleHighlight="l'élagage professionnel" subtitle="Arboristes certifiés Var (83)" />

                <motion.div
                    id="devis-form"
                    className="bg-stone-900 py-24 px-4 sm:px-6 scroll-mt-20 relative overflow-hidden"
                >
                    <div className="max-w-xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Votre devis d'élagage gratuit</h2>
                            <p className="text-stone-400">Réponse et déplacement sous 24h à {cityName}.</p>
                        </div>
                        <LeadForm 
                            onSuccess={handleFormSuccess} 
                            source={`Page Élagage ${cityName}`} 
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

export default Elagage;
