import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Ruler,
  CalendarClock,
  Euro,
  Recycle,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import LeadForm from '../../components/LeadForm';
import WhatsAppButton from '../../components/WhatsAppButton';
import LegalModal from '../../components/LegalModal';
import { faqDebroussaillage } from '../../data/faqContent';

const PAGE_TITLE = 'Obligation de Débroussaillement (OLD) dans le Var : Guide Complet - Dalia Provence';
const PAGE_DESCRIPTION = "Rayon 50-100m, amende jusqu'à 30€/m², période légale, crédit d'impôt : tout savoir sur l'obligation de débroussaillement (OLD) dans le Var. Devis gratuit Dalia Provence.";
const CANONICAL_URL = 'https://daliaprovence.vercel.app/guides/obligation-debroussaillement-var';

const GuideObligationDebroussaillement: React.FC = () => {
  const [modalType, setModalType] = useState<'legal' | 'privacy' | null>(null);

  useEffect(() => {
    // Meme mecanique que sur les pages de service : mise a jour du <head> au
    // montage pour que la navigation SPA (sans rechargement) affiche aussi
    // les bonnes balises. Le premier chargement direct / les robots sont deja
    // couverts par prerender.mjs (memes valeurs, a garder synchronisees).
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
      <Navbar location="Brignoles" />

      <main className="flex-grow pt-28 pb-24">
        {/* En-tete de l'article */}
        <header className="px-6 mb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <Link
              to="/debroussaillage"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au débroussaillage
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <ShieldAlert className="w-4 h-4" /> Guide réglementaire
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter leading-[0.95]">
              Obligation de débroussaillement (OLD) dans le Var
            </h1>

            <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Rayon à respecter, dates limites, sanctions en cas de non-conformité, crédit d'impôt : le point complet sur ce que la loi impose aux propriétaires du Var, commune par commune.
            </p>
          </div>
        </header>

        {/* Sections du guide */}
        <article className="px-6">
          <div className="max-w-3xl mx-auto space-y-16">

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Qu'est-ce que l'OLD ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                L'Obligation Légale de Débroussaillement (OLD) impose aux propriétaires de terrains situés dans ou à proximité de zones boisées de débroussailler autour de leurs constructions. Dans un département aussi exposé au risque incendie que le Var, ce n'est pas une simple recommandation d'entretien : c'est une obligation prévue par le Code forestier, contrôlée par les services de l'État et les communes, et directement liée à la sécurité des habitations et de leurs occupants.
              </p>
              <p className="text-stone-600 leading-relaxed">
                L'idée est simple : un terrain débroussaillé autour d'une maison ralentit considérablement la progression d'un feu de forêt et facilite l'intervention des pompiers. À l'inverse, une végétation dense collée à une habitation peut transformer un départ de feu en sinistre majeur en quelques minutes.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Ruler className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Quel périmètre débroussailler ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Dans le Var, la règle de base impose de débroussailler dans un rayon de <strong className="text-stone-900">50 mètres</strong> autour de toute construction : maison principale, mais aussi piscine, cabanon ou dépendance. Ce rayon peut être porté à <strong className="text-stone-900">100 mètres</strong> par arrêté préfectoral selon les zones, notamment dans les secteurs à risque incendie élevé.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Ce périmètre s'applique même si une partie du terrain à débroussailler déborde chez un voisin ou sur un terrain communal : la loi prévoit un droit de passage pour réaliser ces travaux. En cas de doute sur le rayon exact applicable à votre parcelle, votre mairie ou la préfecture du Var peuvent vous communiquer l'arrêté en vigueur pour votre commune.
              </p>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-emerald-900 text-sm leading-relaxed">
                  <strong>À retenir :</strong> le débroussaillement doit être réalisé y compris sur la partie du terrain qui déborde chez un voisin ou sur le domaine public, dans la limite du rayon imposé.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Quand faire débroussailler son terrain ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                La période conseillée s'étend de <strong className="text-stone-900">l'automne au printemps</strong>, avant le <strong className="text-stone-900">1er juin</strong>. Passé cette date, l'utilisation d'outils mécaniques (débroussailleuse thermique, tronçonneuse) peut être interdite ou strictement réglementée par arrêté préfectoral, en raison du risque d'étincelle en pleine période de sécheresse.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Anticiper les travaux avant le printemps permet aussi d'éviter l'afflux de demandes qui se concentre chaque année en mai, juste avant l'échéance légale — et donc d'obtenir un rendez-vous plus rapidement.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Que risque-t-on en cas de non-respect ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Le non-respect de l'OLD expose à plusieurs conséquences cumulables : une amende pouvant aller jusqu'à <strong className="text-stone-900">30€ par m²</strong> non débroussaillé, une mise en demeure du maire avec obligation de réaliser les travaux sous astreinte, et — c'est souvent le point le plus lourd de conséquences — un <strong className="text-stone-900">refus d'indemnisation par votre assurance</strong> en cas d'incendie, si le terrain n'était pas conforme au moment du sinistre.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Concrètement, cela signifie qu'un défaut de débroussaillement peut coûter bien plus cher qu'une amende : en cas de sinistre, c'est potentiellement la reconstruction complète du bien qui reste à la charge du propriétaire.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Recycle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Que faire des déchets verts ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Deux options existent une fois le débroussaillement réalisé : l'évacuation complète des végétaux coupés vers un centre de valorisation agréé, ou le broyage sur place (mulching), qui transforme les déchets en paillage réutilisable pour fertiliser naturellement le sol et limiter la repousse. Le choix dépend du volume de végétation, de l'accès au terrain et de ce que vous souhaitez faire du terrain ensuite.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Euro className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-stone-900">Un crédit d'impôt est-il possible ?</h2>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Le débroussaillage réalisé chez vous (résidence principale ou secondaire) est considéré comme un travail d'entretien de jardin. Selon votre situation, vous pouvez donc bénéficier d'un crédit d'impôt de <strong className="text-stone-900">50%</strong> au titre des services à la personne. Une facture détaillée, mentionnant la nature des travaux, vous sera fournie pour votre déclaration.
              </p>
            </section>

            {/* CTA intermediaire */}
            <section className="bg-emerald-900 rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500 rounded-full blur-[100px] opacity-10 -mr-36 -mt-36"></div>
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Mettez votre terrain en conformité
                </h2>
                <p className="text-emerald-100/70 max-w-xl mx-auto">
                  Dalia Provence intervient dans tout le Var pour votre mise en conformité OLD : devis gratuit sous 24h, évacuation ou broyage sur place, facture éligible au crédit d'impôt.
                </p>
                <Link
                  to="/debroussaillage"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-950 rounded-xl font-black hover:bg-amber-400 transition-all group"
                >
                  Voir le service de débroussaillage
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

          </div>
        </article>

        <FAQ
          faqs={faqDebroussaillage}
          titleHighlight="l'obligation de débroussaillement"
          subtitle="Conformité OLD / DFCI Var (83)"
        />

        {/* Formulaire de devis */}
        <section className="bg-emerald-900 py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-10"></div>
          <div className="max-w-xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un doute sur votre situation ?</h2>
              <p className="text-emerald-100/80">Décrivez votre terrain, nous vous répondons sous 24h avec un devis gratuit.</p>
            </div>
            <LeadForm onSuccess={() => {}} source="Guide OLD Débroussaillement" initialCity="Brignoles" />
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

export default GuideObligationDebroussaillement;
