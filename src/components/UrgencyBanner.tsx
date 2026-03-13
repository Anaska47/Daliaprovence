
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, ShieldCheck } from 'lucide-react';

const UrgencyBanner: React.FC = () => {
  return (
    <div className="bg-emerald-950 text-white overflow-hidden relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Alerte Saison des Feux</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <p className="text-xs md:text-sm font-bold opacity-90">
              Obligation légale <span className="text-amber-400">OLD</span> avant le 1er juin dans le Var.
            </p>
          </div>
        </div>

        <button 
          onClick={() => document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-all border border-white/10"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">Vérifier ma conformité</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 bottom-0 w-1/4 bg-gradient-to-l from-emerald-900/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default UrgencyBanner;
