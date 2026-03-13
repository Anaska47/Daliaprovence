
import React from 'react';
import { ShieldCheck, Clock, Phone, ArrowRight } from 'lucide-react';

interface HeroProps {
  location?: string;
  description?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  location = 'Brignoles', 
  description = 'Mise en conformité légale incendie (OLD) • Intervention rapide • Évacuation incluse.' 
}) => {
  const scrollToForm = () => {
    document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const phoneNumber = "+33619926923";

  return (
    <section className="relative bg-emerald-950 text-white pt-16 pb-24 px-6 text-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Var (83) • Devis sous 24h</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
          Débroussaillage <span className="text-amber-400">professionnel</span> à {location}
        </h1>

        <p className="text-xl md:text-2xl text-emerald-50/90 font-medium max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-10 py-6 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-all transform hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3"
          >
            Obtenir mon devis gratuit
            <ArrowRight className="w-6 h-6" />
          </button>

          <a
            href={`tel:${phoneNumber}`}
            className="w-full sm:w-auto px-10 py-6 bg-white/5 hover:bg-white/10 text-white font-bold text-xl rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
          >
            <Phone className="w-5 h-5 text-amber-400" />
            06 19 92 69 23
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
          <div className="flex flex-col items-center gap-1 opacity-90">
            <ShieldCheck className="w-8 h-8 text-amber-400 mb-2" />
            <span className="font-bold">Conformité DFCI / OLD</span>
            <span className="text-xs text-emerald-100/70">Respect des arrêtés préfectoraux</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-90">
            <Clock className="w-8 h-8 text-amber-400 mb-2" />
            <span className="font-bold">Intervention rapide</span>
            <span className="text-xs text-emerald-100/70">Mise en sécurité immédiate</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-90">
            <div className="w-8 h-8 flex items-center justify-center bg-amber-400 text-emerald-950 rounded-full font-bold text-sm mb-2">83</div>
            <span className="font-bold">Secteur Var</span>
            <span className="text-xs text-emerald-100/70">40km autour de Brignoles</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
