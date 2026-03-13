
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, CreditCard, BellRing, ArrowRight } from 'lucide-react';

const MaintenanceSubscription = () => {
  return (
    <section className="py-24 px-6 bg-emerald-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900 border border-emerald-800 text-emerald-200 rounded-full text-xs font-black uppercase tracking-widest">
              <Calendar className="w-3 h-3" /> Revenus Récurrents
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Passez en <span className="text-amber-400">pilote automatique</span>
            </h2>
            <p className="text-emerald-100/70 text-lg md:text-xl font-medium max-w-xl">
              L'obligation légale de débroussaillage (OLD) est annuelle. Ne vous souciez plus jamais des amendes ou de la mise en conformité.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Garantie de conformité permanente 365j/an" },
                { icon: BellRing, text: "Relance automatique avant la saison des feux" },
                { icon: CreditCard, text: "Paiement mensualisé ou annuel sans frais" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-white">
                  <div className="p-2 bg-emerald-900 rounded-xl">
                    <item.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="font-bold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-4 shadow-2xl transform lg:rotate-2">
            <div className="bg-stone-50 rounded-[2.5rem] p-10 border border-stone-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Le Contrat Sérénité</h3>
                <p className="text-stone-400 font-bold text-sm mt-1">À partir de</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <span className="text-5xl font-black text-emerald-950">29€</span>
                  <span className="text-stone-400 font-bold">/mois</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between py-3 border-b border-stone-200">
                  <span className="text-stone-600 font-medium">Intervention annuelle</span>
                  <span className="text-emerald-800 font-black tracking-tighter uppercase text-xs bg-emerald-50 px-2 py-1 rounded">Inclus</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-stone-200">
                  <span className="text-stone-600 font-medium">Évacuation des déchets</span>
                  <span className="text-emerald-800 font-black tracking-tighter uppercase text-xs bg-emerald-50 px-2 py-1 rounded">Inclus</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-stone-200">
                  <span className="text-stone-600 font-medium">Attestation Assurances</span>
                  <span className="text-emerald-800 font-black tracking-tighter uppercase text-xs bg-emerald-50 px-2 py-1 rounded">Inclus</span>
                </div>
              </div>

              <button 
                onClick={() => document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-5 bg-emerald-800 text-white font-black text-xl rounded-2xl shadow-xl hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 group"
              >
                M'abonner maintenant
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[10px] text-center text-stone-400 font-bold mt-4 uppercase tracking-widest">
                Aucun engagement • Résiliable à tout moment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSubscription;
