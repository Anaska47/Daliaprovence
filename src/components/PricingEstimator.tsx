
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Bug, Ruler, Zap, Calculator, ArrowRight, Gauge } from 'lucide-react';

interface EstimatorProps {
  location?: string;
}

const PricingEstimator: React.FC<EstimatorProps> = ({ location = 'Brignoles' }) => {
  const [surface, setSurface] = useState(500);
  const [terrainType, setTerrainType] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [estimate, setEstimate] = useState({ min: 0, max: 0 });

  useEffect(() => {
    let basePrice = 0.5; // price per m2
    if (terrainType === 'light') basePrice = 0.3;
    if (terrainType === 'heavy') basePrice = 1.2;

    const calculated = surface * basePrice;
    setEstimate({
      min: Math.round(calculated * 0.9),
      max: Math.round(calculated * 1.1)
    });
  }, [surface, terrainType]);

  const terrainOptions = [
    { id: 'light', label: 'Herbes hautes', icon: TreePine, desc: 'Entretien régulier', color: 'emerald' },
    { id: 'medium', label: 'Ronces / Broussaille', icon: Bug, desc: 'Terrain délaissé', color: 'amber' },
    { id: 'heavy', label: 'Friche / Bois', icon: Zap, desc: 'Nettoyage difficile', color: 'rose' }
  ];

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden" id="simulateur">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-widest">
            <Calculator className="w-3 h-3" /> Estimateur Intelligent
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight">
            Estimez le coût à <span className="text-emerald-700">{location}</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            Obtenez une première estimation en 3 clics. Prix basés sur les tarifs préfectoraux et la complexité du terrain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Configuration */}
          <div className="space-y-10 bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100 ring-1 ring-stone-900/5">
            {/* Step 1: Surface */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-black uppercase tracking-wider text-stone-400">1. Surface du terrain</label>
                <span className="text-3xl font-black text-emerald-800">{surface} m²</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={surface}
                title="Surface du terrain"
                aria-label="Sélectionner la surface du terrain en m²"
                onChange={(e) => setSurface(parseInt(e.target.value))}
                className="w-full h-3 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
                <span>100m²</span>
                <span>Petit jardin</span>
                <span>Moyen</span>
                <span>Grand terrain</span>
                <span>5000m² +</span>
              </div>
            </div>

            {/* Step 2: Terrain Type */}
            <div className="space-y-6">
              <label className="text-sm font-black uppercase tracking-wider text-stone-400">2. État actuel</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {terrainOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTerrainType(opt.id as any)}
                    className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                      terrainType === opt.id 
                        ? 'border-emerald-600 bg-emerald-50/50 ring-4 ring-emerald-500/10' 
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <opt.icon className={`w-6 h-6 mb-3 ${terrainType === opt.id ? 'text-emerald-600' : 'text-stone-400'}`} />
                    <div className="font-bold text-stone-900 text-sm leading-tight">{opt.label}</div>
                    <div className="text-[10px] text-stone-500 mt-1">{opt.desc}</div>
                    {terrainType === opt.id && (
                      <motion.div layoutId="active-check" className="absolute top-2 right-2">
                        <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Result */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              {/* Animated BG Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-colors"></div>
              
              <div className="relative space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Gauge className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-200">Estimation immédiate</h4>
                    <p className="text-sm opacity-60">Basé sur les tarifs moyens du Var</p>
                  </div>
                </div>

                <div className="py-6 border-y border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-black text-amber-400 tabular-nums">
                      {estimate.min}
                    </span>
                    <span className="text-2xl font-bold opacity-60">à</span>
                    <span className="text-6xl md:text-7xl font-black tabular-nums">
                      {estimate.max}
                    </span>
                    <span className="text-3xl font-bold text-emerald-300">€</span>
                  </div>
                  <p className="mt-4 text-emerald-100/70 text-sm italic">
                    *TVA incluse. Évacuation des déchets comprise.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-emerald-50">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                    Intervention possible sous 48h à {location}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-emerald-50">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                    Conseil gratuit OLD / DFCI inclus
                  </div>
                </div>

                <button 
                  onClick={() => document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-5 bg-white text-emerald-950 font-black text-xl rounded-2xl shadow-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 group/btn"
                >
                  Valider ce tarif
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <p className="text-center mt-6 text-xs text-stone-400 font-medium">
              L'estimation finale dépend de la pente et de l'accès.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingEstimator;
