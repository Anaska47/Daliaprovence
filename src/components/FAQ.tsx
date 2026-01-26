
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Qu'est-ce qui influence le prix du débroussaillage ?",
      a: "Le tarif dépend principalement de la surface, de la densité de la végétation (ronces vs herbes), de la pente et de l'accessibilité du terrain pour nos machines."
    },
    {
      q: "Une visite sur place est-elle nécessaire ?",
      a: "Pour la majorité des terrains, vos informations via le formulaire suffisent. Si le terrain est très accidenté ou inaccessible, une visite gratuite sera organisée."
    },
    {
      q: "Quelles zones couvrez-vous exactement ?",
      a: "Nous intervenons dans un rayon de 150 km autour de Brignoles (83170), couvrant le Var et les départements limitrophes."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-stone-900 mb-12">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                <span>{faq.q}</span>
                {openIdx === idx ? <Minus className="w-5 h-5 text-amber-500" /> : <Plus className="w-5 h-5 text-amber-500" />}
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-50 pt-4 animate-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
