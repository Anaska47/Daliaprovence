import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  CalendarClock,
  Truck,
  Hammer,
  ShieldCheck,
  CloudRain,
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
import { faqTerrassement } from '../../data/faqContent';

const PAGE_TITLE = 'Terrassement dans le Var : Quelles Autorisations pour vos Travaux ? - Dalia Provence';
const PAGE_DESCRIPTION = "Déclaration préalable, permis d'aménager, garantie décennale, évacuation des terres : tout savoir avant des travaux de terrassement dans le Var. Devis gratuit Dalia Provence.";
const CANONICAL_URL = 'https://daliaprovence.vercel.app/guides/terrassement-autorisation-var';

const GuideTerrassementAutorisation: React.FC = () => {
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
        serviceName="Terrassement"
        serviceDescription={PAGE_DESCRIPTION}
        cityName="Brignoles"
        canonicalUrl={CANONICAL_URL}
        faqs={faqTerrassement}
      />
      <Navbar location="Brignoles" />

      <main className="flex-grow pt-28 pb-24">
        {/* En-tete de l'article */}
        <header className="px-6 mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <Link
              to="/terrassement"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au terrassement
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <Scale className="w-4 h-4" /> Guide réglementaire
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter leading-[0.95]">
              Terrassement dans le Var : quelles autorisations pour vos travaux ?
            </h1>

            <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Déclaration préalable, permis d'aménager, garanties, délais : le point complet avant de préparer votre terrain dans le Var.
            </p>
          </div>
        </header>

        {/* Sections du guide */}
        <article className="px-6">
          <div className="max-w-3xl mx-auto space-y-16">

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Ai-je besoin d'une autorisation pour terrasser mon terrain ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Une simple mise à niveau ne nécessite généralement pas d'autorisation. En revanche, un <strong className="text-stone-900">exhaussement ou un affouillement important</strong> — au-delà de certains seuils de hauteur et de surface — peut nécessiter une déclaration préalable, voire un permis d'aménager selon votre projet et votre commune.
              </p>
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-orange-900 text-sm leading-relaxed">
                  <strong>À retenir :</strong> les seuils qui déclenchent une déclaration ou un permis dépendent de votre commune et du PLU local — nous vous orientons selon votre projet avant de démarrer.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Combien de temps durent des travaux de terrassement ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Cela dépend de la surface, de l'accès au chantier et de la nature du sol : quelques jours suffisent pour une plateforme de piscine ou une terrasse, tandis que la préparation complète d'un terrain à bâtir demande davantage de temps.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Que deviennent les terres et les gravats ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Les déblais sont évacués vers un site agréé, ou réutilisés sur place pour du remblai lorsque c'est possible — ce qui limite les coûts de transport et le nombre de rotations de camions sur votre terrain.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Hammer className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Avant une construction, une piscine ou un mur de soutènement</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Plateformes, tranchées pour réseaux, terrassements en pente : un matériel adapté à l'accès de votre terrain est indispensable pour préparer correctement l'assise d'un projet de construction, d'une piscine ou d'un mur de soutènement.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Quelles garanties couvrent vos travaux ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Les ouvrages de gros œuvre liés au terrassement — fondations, soutènements — sont couverts par la <strong className="text-stone-900">garantie décennale</strong> de l'entreprise qui réalise les travaux.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-white shrink-0">
                  <CloudRain className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Quelle est la meilleure saison pour terrasser ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Un sol sec facilite l'accès des engins et la stabilité du chantier. Dans le Var, mieux vaut anticiper vos travaux de terrassement avant l'arrivée des pluies plutôt que de les démarrer en pleine saison humide, où le terrain devient plus difficile à travailler et à sécuriser.
              </p>
            </section>

            {/* CTA intermediaire */}
            <section className="bg-stone-900 rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500 rounded-full blur-[100px] opacity-10 -mr-36 -mt-36"></div>
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Un projet de terrassement à préparer ?
                </h2>
                <p className="text-stone-300 max-w-xl mx-auto">
                  Dalia Provence prépare votre terrain dans tout le Var : plateformes, fondations, piscines, nivellement. Devis gratuit et chiffrage précis sous 24/48h.
                </p>
                <Link
                  to="/terrassement"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 rounded-xl font-black hover:bg-orange-400 transition-all group"
                >
                  Voir le service de terrassement
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

          </div>
        </article>

        <FAQ
          faqs={faqTerrassement}
          titleHighlight="le terrassement"
          subtitle="Préparation de terrain & fondations Var (83)"
        />

        {/* Formulaire de devis */}
        <section className="bg-stone-900 py-24 px-4 sm:px-6 relative overflow-hidden border-t border-stone-800">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-800 to-transparent opacity-20"></div>
          <div className="max-w-xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un doute sur les démarches ?</h2>
              <p className="text-stone-400">Décrivez votre projet, nous vous répondons sous 24h avec un devis gratuit.</p>
            </div>
            <LeadForm onSuccess={() => {}} source="Guide Terrassement Autorisation" initialCity="Brignoles" />
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

export default GuideTerrassementAutorisation;
