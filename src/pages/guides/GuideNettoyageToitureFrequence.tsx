import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Droplet,
  ShieldCheck,
  Sparkles,
  Home,
  Scale,
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
import { faqNettoyageToiture } from '../../data/faqContent';

const PAGE_TITLE = 'Nettoyage de Toiture en Provence : Fréquence et Entretien - Dalia Provence';
const PAGE_DESCRIPTION = "Tous les combien nettoyer sa toiture ? Traitement hydrofuge, produits utilisés, autorisation en copropriété : le guide complet du nettoyage de toiture en Provence. Devis gratuit.";
const CANONICAL_URL = 'https://daliaprovence.vercel.app/guides/nettoyage-toiture-frequence-var';

const GuideNettoyageToitureFrequence: React.FC = () => {
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
        serviceName="Nettoyage et démoussage de toiture"
        serviceDescription={PAGE_DESCRIPTION}
        cityName="Brignoles"
        canonicalUrl={CANONICAL_URL}
        faqs={faqNettoyageToiture}
      />
      <Navbar location="Brignoles" />

      <main className="flex-grow pt-28 pb-24">
        {/* En-tete de l'article */}
        <header className="px-6 mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <Link
              to="/nettoyage-toiture"
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au nettoyage de toiture
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <Droplet className="w-4 h-4" /> Guide entretien
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter leading-[0.95]">
              Nettoyage de toiture en Provence : à quelle fréquence et pourquoi ?
            </h1>

            <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Mousses, lichens, traitement hydrofuge, produits utilisés : ce qu'il faut savoir pour entretenir durablement une toiture exposée au climat méditerranéen.
            </p>
          </div>
        </header>

        {/* Sections du guide */}
        <article className="px-6">
          <div className="max-w-3xl mx-auto space-y-16">

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Pourquoi les toitures se salissent-elles vite en Provence ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Le climat méditerranéen et la végétation environnante favorisent l'apparition de mousses et de lichens, surtout sur les pans de toit orientés au nord, plus humides et moins exposés au soleil. Un nettoyage tous les <strong className="text-stone-900">3 à 5 ans</strong> est généralement recommandé selon l'exposition de votre toiture.
              </p>
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-sky-900 text-sm leading-relaxed">
                  <strong>À retenir :</strong> plus une toiture est ombragée ou proche d'arbres, plus le cycle de nettoyage doit être rapproché — un diagnostic sur place permet d'ajuster la fréquence à votre situation.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Le traitement hydrofuge, vraiment utile ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Oui : appliqué juste après le démoussage, il protège la porosité des tuiles, limite les infiltrations d'eau et prolonge la durée de vie de la toiture, généralement pour plusieurs années.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Droplet className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Quels produits sont utilisés ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Des produits biodégradables à dosage contrôlé, appliqués en protégeant vos plantations et les évacuations d'eaux pluviales pendant toute la durée du traitement.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Et les façades ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Le nettoyage et le traitement anti-mousse des façades peuvent être proposés en complément de la toiture, pour une protection complète de votre habitation face aux mêmes causes d'encrassement.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Faut-il une autorisation pour nettoyer sa toiture ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Pour un entretien standard sur une maison individuelle, non. En copropriété, l'accord du syndic peut être requis si l'intervention nécessite un échafaudage installé sur des parties communes.
              </p>
            </section>

            {/* CTA intermediaire */}
            <section className="bg-sky-950 rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500 rounded-full blur-[100px] opacity-10 -mr-36 -mt-36"></div>
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Une toiture à rajeunir ?
                </h2>
                <p className="text-sky-100/70 max-w-xl mx-auto">
                  Dalia Provence intervient dans tout le Var pour le démoussage et le traitement hydrofuge de votre toiture : diagnostic et devis gratuits sous 24h.
                </p>
                <Link
                  to="/nettoyage-toiture"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-950 rounded-xl font-black hover:bg-sky-200 transition-all group"
                >
                  Voir le service de nettoyage de toiture
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

          </div>
        </article>

        <FAQ
          faqs={faqNettoyageToiture}
          titleHighlight="le nettoyage de toiture"
          subtitle="Démoussage & hydrofuge Var (83)"
        />

        {/* Formulaire de devis */}
        <section className="bg-sky-900 py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-10"></div>
          <div className="max-w-xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un doute sur l'état de votre toit ?</h2>
              <p className="text-sky-200">Décrivez votre situation, nous vous répondons sous 24h avec un devis gratuit.</p>
            </div>
            <LeadForm onSuccess={() => {}} source="Guide Nettoyage Toiture Frequence" initialCity="Brignoles" />
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

export default GuideNettoyageToitureFrequence;
