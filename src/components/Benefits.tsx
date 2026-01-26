
import React from 'react';
import { Shield, Sparkles, Truck } from 'lucide-react';

const Benefits: React.FC = () => {
  const cards = [
    {
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      title: "Mise en conformité DFCI",
      desc: "Respect strict des obligations légales de débroussaillage pour votre sécurité incendie."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      title: "Finitions propres",
      desc: "Coupe rase et broyage précis pour un terrain net, esthétique et accessible."
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-500" />,
      title: "Évacuation (option)",
      desc: "Gestion complète des déchets verts si vous ne souhaitez pas de broyage sur place."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-stone-900 mb-12">Nos Engagements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50 border border-stone-100 transition-hover hover:border-amber-200">
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">{card.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
