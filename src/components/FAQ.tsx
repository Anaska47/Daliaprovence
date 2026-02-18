
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Le débroussaillage est-il obligatoire dans le Var ?",
      a: "Oui. Dans le Var (83), le débroussaillage est une obligation légale (OLD) imposée par arrêté préfectoral. En cas de non-respect, vous risquez des amendes et une mise en demeure."
    },
    {
      q: "Quels sont les risques si je ne débroussaille pas ?",
      a: "Outre les amendes, un terrain non entretenu augmente fortement le risque incendie. En cas de sinistre, votre responsabilité peut être engagée."
    },
    {
      q: "Sous combien de temps intervenez-vous ?",
      a: "Nous intervenons rapidement, généralement sous 48h pour les mises en conformité urgentes autour de Brignoles et dans un rayon de 40 km."
    },
    {
      q: "Que faites-vous des déchets verts ?",
      a: "Nous proposons le broyage sur place ou l’évacuation complète selon vos besoins. Le chantier est laissé propre et sécurisé."
    },
    {
      q: "Le devis est-il vraiment gratuit ?",
      a: "Oui. Le devis est gratuit et sans engagement. Vous recevez une estimation claire et détaillée sous 24h."
    },
    {
      q: "Dois-je connaître la surface exacte de mon terrain ?",
      a: "Non. Une estimation approximative suffit. Nous ajustons si nécessaire après échange ou visite."
    },
    {
      q: "Intervenez-vous sur terrains en pente ou difficiles ?",
      a: "Oui. Nous disposons d’équipements adaptés aux terrains en pente, en friche ou difficiles d’accès."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const scrollToForm = () => {
    document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 bg-stone-50/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-6 border border-stone-100">
            <HelpCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-4 tracking-tight">Vos questions, nos réponses</h2>
          <p className="text-stone-500 font-medium">Tout savoir sur le débroussaillage obligatoire dans le Var (83).</p>
        </div>

        <div className="space-y-4 mb-20">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/40">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left font-bold text-stone-900 transition-colors"
                aria-expanded={openIdx === idx}
              >
                <span className="pr-6 text-lg sm:text-xl leading-snug">{faq.q}</span>
                <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${openIdx === idx ? 'bg-emerald-600 text-white rotate-180 shadow-lg shadow-emerald-600/20' : 'bg-stone-50 text-stone-400 border border-stone-100'}`}>
                  {openIdx === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              <div className={`grid transition-all duration-500 ease-in-out ${openIdx === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="px-6 sm:px-8 pb-8 text-stone-600 text-base sm:text-lg leading-relaxed border-t border-stone-50">
                    <div className="pt-6">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MINI CTA SOUS FAQ */}
        <div className="bg-emerald-950 rounded-[2.5rem] p-10 sm:p-14 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] -z-10 group-hover:scale-125 transition-transform duration-700"></div>

          <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">
            Prêt à mettre votre terrain en conformité ?
          </h3>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black px-10 py-5 rounded-2xl text-lg sm:text-xl transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.03] active:scale-95 group/btn"
          >
            Obtenir mon devis gratuit
            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
