
import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: "Marc Valadier",
    city: "Saint-Maximin-la-Sainte-Baume",
    text: "Excellent travail. Mon terrain de 3000m² était une vraie jungle. Ils ont tout nettoyé et évacué en 2 jours. Équipe très pro et sérieuse.",
    rating: 5,
    date: "Mars 2024"
  },
  {
    name: "Sophie Laurent",
    city: "Le Muy",
    text: "Mise en conformité OLD impeccable. Merci pour les conseils sur la DFCI, je me sens enfin en sécurité pour l'été prochain.",
    rating: 5,
    date: "Février 2024"
  },
  {
    name: "Pierre Giraud",
    city: "Brignoles",
    text: "Prix très compétitif par rapport aux autres devis. Le simulateur sur le site donne une bonne idée du coût final. Je recommande vivement.",
    rating: 5,
    date: "Janvier 2024"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden" id="avis">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-widest">
              <Star className="w-3 h-3 fill-amber-600" /> Avis Clients
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight">
              Ils nous ont fait <span className="text-emerald-700">confiance</span>
            </h2>
            <p className="text-stone-500 max-w-xl font-medium">
              Déjà plus de 80 interventions réussies cette année dans tout le Var.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-inner">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />)}
            </div>
            <div className="text-2xl font-black text-stone-900 leading-none mt-1">4.9/5</div>
            <div className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Score Google My Business</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="relative bg-stone-50 p-10 rounded-[2.5rem] border border-stone-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute top-0 right-10 -translate-y-1/2 p-4 bg-emerald-600 rounded-2xl shadow-xl text-white">
                <Quote className="w-6 h-6" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <blockquote className="text-stone-700 font-medium leading-relaxed mb-8">
                "{review.text}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-stone-200/60">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-black text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-stone-900 text-sm flex items-center gap-1">
                    {review.name}
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="text-xs text-stone-400 flex items-center gap-1 font-bold">
                    <MapPin className="w-3 h-3" /> {review.city} • <span className="opacity-60">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
