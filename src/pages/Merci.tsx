import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Merci: React.FC = () => {
    useEffect(() => {
        // Mise a jour SEO cote client : une navigation SPA (sans rechargement
        // complet, ex. juste apres l'envoi du formulaire) ne recharge jamais
        // dist/merci/index.html, donc sans ceci le <head> garderait les
        // balises de la page precedente. Memes valeurs que
        // STATIC_PAGE_CONFIG['/merci'] dans prerender.mjs, qui couvre deja le
        // premier chargement direct / les robots d'indexation.
        const pageTitle = 'Demande Envoyée avec Succès - Dalia Provence';
        const pageDescription = "Votre demande a bien été reçue. Un expert Dalia Provence vous recontacte sous 24 à 48h pour organiser votre devis gratuit de débroussaillage.";
        const canonicalUrl = 'https://daliaprovence.vercel.app/merci';

        document.title = pageTitle;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) metaDescription.setAttribute('content', pageDescription);

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', canonicalUrl);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', pageTitle);
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', pageDescription);
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', canonicalUrl);

        let robots = document.querySelector('meta[name="robots"]');
        if (!robots) {
            robots = document.createElement('meta');
            robots.setAttribute('name', 'robots');
            document.head.appendChild(robots);
        }
        robots.setAttribute('content', 'noindex, follow');

        // Si on quitte /merci vers une autre page en navigation SPA (ex. le
        // lien "Retour a l'accueil" ci-dessous), cette page ne gere pas elle
        // meme de balise robots -- on evite de lui laisser un noindex herite
        // par erreur.
        return () => {
            const r = document.querySelector('meta[name="robots"]');
            if (r) r.remove();
        };
    }, []);

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-centerjustify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-64 bg-emerald-900 overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl mt-10 md:mt-20 px-4">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-stone-100 animate-in slide-in-from-bottom duration-700 fade-in">

                    <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full mb-8 shadow-inner ring-4 ring-emerald-50">
                        <CheckCircle className="w-12 h-12" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 font-display tracking-tight">
                        Demande reçue avec succès !
                    </h1>

                    <p className="text-lg text-stone-600 mb-10 leading-relaxed max-w-lg mx-auto">
                        Merci de nous avoir contactés pour votre projet de débroussaillage. Votre demande a bien été prise en compte par notre équipe.
                    </p>

                    {/* Next Steps */}
                    <div className="bg-stone-50 rounded-2xl p-6 mb-10 border border-stone-200 text-left">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-4 ml-1">Prochaines étapes</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="bg-white p-2 rounded-lg shadow-sm border border-stone-100 shrink-0">
                                    <Phone className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-stone-900">Contact téléphonique</h4>
                                    <p className="text-sm text-stone-500">Un expert vous appellera sous 24 à 48h.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-white p-2 rounded-lg shadow-sm border border-stone-100 shrink-0">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-stone-900">Rendez-vous et Devis</h4>
                                    <p className="text-sm text-stone-500">Nous fixerons une date pour évaluer le terrain si nécessaire.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-900 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-all hover:gap-3 group shadow-lg shadow-emerald-900/20"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Retour à l'accueil
                    </Link>

                </div>

                {/* Brand Footer */}
                <div className="text-center mt-8 opacity-60">
                    <span className="text-sm font-bold tracking-tight text-stone-400">
                        <span className="text-stone-500">Dalia</span>Provence
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Merci;
