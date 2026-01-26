
import React from 'react';
import { ShieldCheck, MapPin, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-emerald-900 text-white pt-16 pb-20 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Débroussaillage rapide et conforme
        </h1>
        
        <p className="text-lg md:text-xl text-emerald-50 font-medium tracking-wide">
          Mise en conformité • Coupe & broyage • Intervention propre
        </p>

        <button
          onClick={scrollToForm}
          className="w-full sm:w-auto px-8 py-5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold text-xl rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Obtenir mon devis en 1 minute
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold opacity-90">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>Devis sous 24–48h</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold opacity-90">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>Brignoles + 150 km</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold opacity-90">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Débroussaillage DFCI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
