
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    { name: "Michel R.", city: "Brignoles", text: "Travail impeccable pour la mise en conformité de mon terrain de 2500m². Devis reçu le lendemain." },
    { name: "Sandrine L.", city: "Le Luc", text: "Équipe sérieuse et ponctuelle. Le terrain est parfaitement propre après leur passage. Je recommande." },
    { name: "Patrice M.", city: "Saint-Maximin", text: "Très réactifs pour un débroussaillage urgent DFCI. Professionnel et efficace." }
  ];

  return (
    <section className="py-16 px-6 bg-white border-y border-stone-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 font-bold text-stone-800">4.9/5 satisfaction client</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-stone-50 p-6 rounded-2xl border border-stone-100 flex flex-col justify-between">
              <p className="text-stone-600 italic text-sm mb-4 leading-relaxed">"{rev.text}"</p>
              <div>
                <p className="font-bold text-stone-900 text-sm">{rev.name}</p>
                <p className="text-stone-400 text-xs">{rev.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
