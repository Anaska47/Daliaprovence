
import React from 'react';
import { Target, Leaf, Trash2, Zap, ShieldCheck } from 'lucide-react';

const Benefits: React.FC = () => {
  const cards = [
    {
      icon: <Target className="w-10 h-10 text-emerald-600" />,
      title: "Précision Chirurgicale",
      desc: "Broyage fin et coupe rase même sur les terrains les plus difficiles et accidentés."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-emerald-600" />,
      title: "Zéro Amende",
      desc: "Nous garantissons une mise en conformité totale avec les arrêtés DFCI du Var."
    },
    {
      icon: <Trash2 className="w-10 h-10 text-emerald-600" />,
      title: "Gestion des Déchets",
      desc: "Broyage sur place ou évacuation complète selon vos besoins. Chantier propre."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 tracking-tight leading-tight">
              Un terrain <span className="text-emerald-700">impeccable</span>, en toute sérénité.
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              DaliaProvence intervient avec du matériel professionnel pour transformer vos friches en espaces sécurisés et accessibles. Pas de demi-mesure, un résultat net.
            </p>
            <div className="space-y-4">
              {[
                "Équipement spécialisé fortes pentes",
                "Respect de la biodiversité locale",
                "Intervention sans dégâts sur vos arbres",
                "Conseils personnalisés pour l'entretien"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-stone-700 font-bold">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 fill-emerald-600" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {cards.map((card, idx) => (
              <div key={idx} className="flex gap-6 p-8 rounded-[2rem] bg-stone-50 border border-stone-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                <div className="shrink-0">{card.icon}</div>
                <div>
                  <h3 className="text-xl font-black text-stone-900 mb-2">{card.title}</h3>
                  <p className="text-stone-500 leading-relaxed text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
