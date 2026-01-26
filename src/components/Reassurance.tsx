
import React from 'react';
import { Check } from 'lucide-react';

const Reassurance: React.FC = () => {
  const items = [
    "Travail propre et sécurisé",
    "Respect des accès et limites de propriété",
    "Équipe locale spécialisée (Brignoles)",
    "Matériel professionnel adapté (pentes, accès difficiles)",
    "Respect strict du calendrier d'intervention"
  ];

  return (
    <section className="py-20 px-6 bg-white border-t border-stone-100">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-stone-900 mb-10 text-center">Pourquoi nous choisir ?</h2>
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-lg text-stone-700 font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reassurance;
