import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mountain,
  Award,
  Scale,
  AlertTriangle,
  CalendarClock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import LeadForm from '../../components/LeadForm';
import WhatsAppButton from '../../components/WhatsAppButton';
import LegalModal from '../../components/LegalModal';
import SeoSchema from '../../components/SeoSchema';
import { faqRestanques } from '../../data/faqContent';

const PAGE_TITLE = 'Restanques et Murs en Pierre Sèche en Provence : Guide Complet - Dalia Provence';
const PAGE_DESCRIPTION = "Qu'est-ce qu'une restanque, faut-il une autorisation, technique de pierre sèche reconnue par l'UNESCO, réparation : tout savoir sur les restanques en Provence. Devis gratuit.";
const CANONICAL_URL = 'https://daliaprovence.vercel.app/guides/restanques-pierre-seche-var';

const GuideRestanquesPierreSeche: React.FC = () => {
  const [modalType, setModalType] = useState<'legal' | 'privacy' | null>(null);

  useEffect(() => {
    document.title = PAGE_TITLE;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', PAGE_DESCRIPTION);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', CANONICAL_URL);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', PAGE_TITLE);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', PAGE_DESCRIPTION);
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', CANONICAL_URL);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SeoSchema
        serviceName="Création et restauration de restanques"
        serviceDescription={PAGE_DESCRIPTION}
        cityName="Brignoles"
        canonicalUrl={CANONICAL_URL}
        faqs={faqRestanques}
      />
      <Navbar location="Brignoles" />

      <main className="flex-grow pt-28 pb-24">
        {/* En-tete de l'article */}
        <header className="px-6 mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <Link
              to="/restanques"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour aux restanques
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <Mountain className="w-4 h-4" /> Guide technique
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter leading-[0.95]">
              Restanques en Provence : technique, autorisation et entretien
            </h1>

            <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Pierre sèche, autorisation de construire, réparation d'un mur existant : le point complet sur les restanques, ce patrimoine provençal toujours utile aujourd'hui.
            </p>
          </div>
        </header>

        {/* Sections du guide */}
        <article className="px-6">
          <div className="max-w-3xl mx-auto space-y-16">

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Mountain className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Qu'est-ce qu'une restanque et pourquoi en construire une ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Une restanque est un mur de soutènement traditionnel en pierre, typique du paysage provençal. Elle permet de terrasser un terrain en pente pour l'aménager ou le cultiver, tout en gérant l'écoulement des eaux et en limitant l'érosion du sol.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">La pierre sèche, une technique reconnue par l'UNESCO</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Construite sans mortier, selon un savoir-faire traditionnel reconnu à l'UNESCO, une restanque en pierre sèche respire et draine naturellement l'eau — ce qui lui permet de durer des décennies sans les désordres liés au ciment (fissures, poches d'humidité).
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-900 text-sm leading-relaxed">
                  <strong>À retenir :</strong> un mur en pierre sèche bien construit s'entretient plus facilement qu'un mur maçonné — les pierres déplacées peuvent être reposées sans démolir l'ensemble.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Faut-il une autorisation pour construire un mur de soutènement ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Selon la hauteur du mur et son emplacement par rapport aux limites de propriété, une <strong className="text-stone-900">déclaration préalable de travaux</strong> peut être nécessaire, notamment en zone classée. Un conseil avant de démarrer le chantier permet d'éviter les mauvaises surprises.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Ma restanque s'effondre : peut-on la réparer ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Oui. Un diagnostic de l'état du mur permet de proposer une reprise partielle ou totale selon le degré de dégradation, en réutilisant si possible les pierres d'origine pour préserver l'aspect traditionnel de l'ouvrage.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Combien de temps dure la construction d'une restanque ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Cela dépend du linéaire et de la hauteur du mur : de quelques jours pour un muret court à plusieurs semaines pour un chantier de restanques important sur une grande parcelle.
              </p>
            </section>

            {/* CTA intermediaire */}
            <section className="bg-yellow-950 rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500 rounded-full blur-[100px] opacity-10 -mr-36 -mt-36"></div>
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Un terrain en pente à aménager ?
                </h2>
                <p className="text-yellow-100/70 max-w-xl mx-auto">
                  Dalia Provence construit et répare vos restanques en pierre sèche dans tout le Var : diagnostic et devis gratuits sous 24h.
                </p>
                <Link
                  to="/restanques"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-yellow-950 rounded-xl font-black hover:bg-amber-400 transition-all group"
                >
                  Voir le service restanques
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

          </div>
        </article>

        <FAQ
          faqs={faqRestanques}
          titleHighlight="les restanques en pierre sèche"
          subtitle="Savoir-faire provençal Var (83)"
        />

        {/* Formulaire de devis */}
        <section className="bg-yellow-900 py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-10"></div>
          <div className="max-w-xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un projet de maçonnerie paysagère ?</h2>
              <p className="text-yellow-200">Décrivez votre terrain, nous vous répondons sous 24h avec un devis gratuit.</p>
            </div>
            <LeadForm onSuccess={() => {}} source="Guide Restanques Pierre Seche" initialCity="Brignoles" />
          </div>
        </section>
      </main>

      <Footer
        location="Brignoles"
        onShowLegal={() => setModalType('legal')}
        onShowPrivacy={() => setModalType('privacy')}
      />

      <WhatsAppButton />

      {modalType && <LegalModal type={modalType} onClose={() => setModalType(null)} />}
    </div>
  );
};

export default GuideRestanquesPierreSeche;
