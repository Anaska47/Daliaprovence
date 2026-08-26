import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  CalendarClock,
  AlertTriangle,
  Recycle,
  Euro,
  ArrowLeft,
  ArrowRight,
  TreePine,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import LeadForm from '../../components/LeadForm';
import WhatsAppButton from '../../components/WhatsAppButton';
import LegalModal from '../../components/LegalModal';
import SeoSchema from '../../components/SeoSchema';
import { faqElagage } from '../../data/faqContent';

const PAGE_TITLE = "Élagage d'Arbres dans le Var : Réglementation et Bonne Période - Dalia Provence";
const PAGE_DESCRIPTION = "Autorisation pour abattre ou tailler, période légale (nidification), arbre dangereux, déchets verts, crédit d'impôt : tout savoir sur l'élagage dans le Var. Devis gratuit Dalia Provence.";
const CANONICAL_URL = 'https://daliaprovence.vercel.app/guides/elagage-reglementation-var';

const GuideElagageReglementation: React.FC = () => {
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
        serviceName="Élagage et abattage d'arbres"
        serviceDescription={PAGE_DESCRIPTION}
        cityName="Brignoles"
        canonicalUrl={CANONICAL_URL}
        faqs={faqElagage}
      />
      <Navbar location="Brignoles" />

      <main className="flex-grow pt-28 pb-24">
        {/* En-tete de l'article */}
        <header className="px-6 mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <Link
              to="/elagage"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour à l'élagage
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <Scale className="w-4 h-4" /> Guide réglementaire
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter leading-[0.95]">
              Élagage d'arbres dans le Var : ce que dit la réglementation
            </h1>

            <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Autorisation pour abattre, période légale pour tailler, arbre qui menace de tomber : voici ce qu'il faut savoir avant de faire intervenir un professionnel dans le Var.
            </p>
          </div>
        </header>

        {/* Sections du guide */}
        <article className="px-6">
          <div className="max-w-3xl mx-auto space-y-16">

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Faut-il une autorisation pour élaguer ou abattre un arbre ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Sur un terrain privé, tailler un arbre est en général libre : vous n'avez pas besoin d'autorisation pour un simple entretien. L'abattage, en revanche, peut être soumis à une <strong className="text-stone-900">déclaration préalable</strong> si l'arbre est classé, remarquable, planté en alignement, ou situé dans une zone protégée par le Plan Local d'Urbanisme (PLU) de votre commune.
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-900 text-sm leading-relaxed">
                  <strong>À retenir :</strong> en cas de doute sur le statut d'un arbre (classé, remarquable, protégé), demandez conseil avant travaux plutôt qu'après — le PLU de votre commune fait foi.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Quelle est la meilleure période pour élaguer ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                La période conseillée se situe entre <strong className="text-stone-900">novembre et février</strong>, en dehors de la période de nidification des oiseaux (mars à août, protégée par la réglementation sur la biodiversité) et de la montée de sève. Intervenir à ce moment limite le stress de l'arbre et respecte le cycle de la faune qui peut y nicher.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Anticiper vos travaux avant le printemps permet aussi d'éviter la période la plus chargée, généralement au retour des beaux jours, et donc d'obtenir une intervention plus rapidement.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Un arbre menace de tomber : que faire en urgence ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Un arbre penché, fissuré ou visiblement affaibli après une tempête ne doit pas attendre la prochaine fenêtre météo idéale. Nos grimpeurs-élagueurs certifiés interviennent rapidement pour sécuriser un arbre menaçant, avec un démontage par tronçons lorsque l'accès ou la proximité d'une habitation l'exige.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Recycle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Que deviennent les branches et le bois coupé ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Deux options selon le volume : l'évacuation en déchetterie agréée, ou le broyage sur place, une solution pratique pour valoriser directement les déchets verts sur votre terrain plutôt que de les transporter.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Euro className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Un crédit d'impôt est-il possible ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Les travaux d'entretien courant des arbres réalisés à votre domicile peuvent être éligibles au crédit d'impôt services à la personne, dans la limite d'un plafond annuel. Une facture détaillée vous est fournie pour votre déclaration.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-white shrink-0">
                  <TreePine className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Pourquoi confier l'élagage à un arboriste plutôt que le faire soi-même ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Au-delà du travail en hauteur, qui expose à un risque de chute réel sans équipement adapté, une coupe mal placée peut fragiliser durablement un arbre : plaies mal cicatrisées, déséquilibre du houppier, ou repousses anarchiques qui aggravent le problème initial. La taille douce pratiquée par un arboriste grimpeur diplômé préserve la santé de l'arbre sur le long terme.
              </p>
            </section>

            {/* CTA intermediaire */}
            <section className="bg-stone-900 rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500 rounded-full blur-[100px] opacity-10 -mr-36 -mt-36"></div>
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Un arbre à tailler ou à sécuriser ?
                </h2>
                <p className="text-stone-300 max-w-xl mx-auto">
                  Dalia Provence intervient dans tout le Var pour l'élagage, l'abattage délicat et la mise en sécurité de vos arbres : devis gratuit sous 24h, évacuation ou broyage sur place.
                </p>
                <Link
                  to="/elagage"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-stone-900 rounded-xl font-black hover:bg-amber-400 transition-all group"
                >
                  Voir le service d'élagage
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

          </div>
        </article>

        <FAQ
          faqs={faqElagage}
          titleHighlight="l'élagage professionnel"
          subtitle="Arboristes certifiés Var (83)"
        />

        {/* Formulaire de devis */}
        <section className="bg-stone-900 py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-10"></div>
          <div className="max-w-xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un doute sur votre arbre ?</h2>
              <p className="text-stone-400">Décrivez votre situation, nous vous répondons sous 24h avec un devis gratuit.</p>
            </div>
            <LeadForm onSuccess={() => {}} source="Guide Élagage Réglementation" initialCity="Brignoles" />
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

export default GuideElagageReglementation;
