import React from 'react';
import ComparisonSlider from './ComparisonSlider';

const Gallery = () => {
    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-4 tracking-tight">
                        Un résultat <span className="text-emerald-700">impeccable</span>
                    </h2>
                    <p className="text-stone-500 max-w-2xl mx-auto font-medium">
                        Faites glisser le curseur pour comparer nos interventions de mise en conformité OLD.
                    </p>
                </div>

                <div className="relative">
                    <ComparisonSlider 
                        before="/assets/avant_1.png" 
                        after="/assets/apres_1.png" 
                    />
                    
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-2xl font-black text-emerald-800">100%</div>
                            <div className="text-xs uppercase font-bold tracking-widest text-stone-400">Conformité légale</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-2xl font-black text-emerald-800">-90%</div>
                            <div className="text-xs uppercase font-bold tracking-widest text-stone-400">Risque incendie</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-2xl font-black text-emerald-800">+40%</div>
                            <div className="text-xs uppercase font-bold tracking-widest text-stone-400">Valeur foncière</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
