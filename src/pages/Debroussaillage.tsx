
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
import MaintenanceSubscription from '../components/MaintenanceSubscription';
import Navbar from '../components/Navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import UrgencyBanner from '../components/UrgencyBanner';
import { motion } from 'framer-motion';
import { getLocationBySlug } from '../data/locations';
import { Shield, Award, MapPin } from 'lucide-react';

const Debroussaillage: React.FC = () => {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showTopNotification, setShowTopNotification] = useState(false);
    const [modalType, setModalType] = useState<'legal' | 'privacy' | null>(null);

    const handleFormSuccess = () => {
        setFormSubmitted(true);
        navigate('/merci');
    };

    const { citySlug } = useParams<{ citySlug: string }>();
    const location = citySlug ? getLocationBySlug(citySlug) : null;
    const cityName = location ? location.name : 'Brignoles';

    useEffect(() => {
        // Dynamic SEO Update
        const pageTitle = location 
            ? `Débroussaillage à ${location.name} (${location.zipCode}) - Devis Gratuit 24h` 
            : 'Débroussaillage Brignoles & Var (83) - Devis Gratuit 24h - Dalia Provence';
        
        document.title = pageTitle;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', location 
                ? `Besoin d'un débroussaillage à ${location.name} ? Mise en conformité OLD / DFCI rapide. Devis gratuit sous 24h par des experts locaux.`
                : 'Service de débroussaillage professionnel dans le Var. Mise en conformité incendie légale (OLD), intervention rapide à Brignoles et alentours.');
        }

        // Canonical Tag
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        const url = location ? `https://daliaprovence.vercel.app/debroussaillage/${location.slug}` : 'https://daliaprovence.vercel.app/debroussaillage';
        canonical.setAttribute('href', url);
    }, [location]);

    return (
        <div className="min-h-screen flex flex-col selection:bg-emerald-100 relative pt-10 sm:pt-0">
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
                        description={location?.description} 
                    />
                </motion.div>

                <TrustSignals />

                {/* Trust Badges - Premium addition */}
                <div className="bg-emerald-50/30 py-8 border-y border-emerald-100">
                    <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Shield className="w-6 h-6 text-emerald-800" />
                            <span className="font-bold text-emerald-950 uppercase tracking-tighter text-xs">Assurance Décennale</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Award className="w-6 h-6 text-emerald-800" />
                            <span className="font-bold text-emerald-950 uppercase tracking-tighter text-xs">Expertise DFCI</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <MapPin className="w-6 h-6 text-emerald-800" />
                            <span className="font-bold text-emerald-950 uppercase tracking-tighter text-xs">Qualité Pro Var</span>
                        </div>
                    </div>
                </div>

                <PricingEstimator location={cityName} />

                <MaintenanceSubscription />

                <Testimonials />

                <div className="bg-emerald-950 py-24 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-10 -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48"></div>

                    <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900 border border-emerald-800 text-emerald-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Offre spéciale Parrainage
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                            Économisez <span className="text-amber-400">10% de plus</span> avec votre voisin
                        </h2>
                        <p className="text-emerald-100/60 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Le débroussaillage mutualisé est plus efficace. Si vous et votre voisin commandez ensemble, vous bénéficiez tous les deux d'une remise immédiate.
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

                <FAQ />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    id="devis-form"
                    className="bg-emerald-900 py-24 px-4 sm:px-6 scroll-mt-20 relative overflow-hidden"
                >
                    {/* Background decoration for form section */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-10"></div>
                    <div className="max-w-xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Prêt pour votre mise en conformité ?</h2>
                            <p className="text-emerald-100/80">Recevez votre devis gratuit sous 24h.</p>
                        </div>
                        <LeadForm 
                            onSuccess={handleFormSuccess} 
                            source={`Page Débroussaillage ${cityName}`} 
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
