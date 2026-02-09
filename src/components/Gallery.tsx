
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        {
            before: '/assets/avant_1.png',
            after: '/assets/apres_1.png',
            title: 'Terrain en friche (Brignoles)',
            desc: 'Remise en état complète d\'un terrain de 2000m².'
        },
        // On pourra en ajouter d\'autres
    ];

    return (
        <section className="py-20 bg-stone-50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4 font-display">
                        Nos réalisations
                    </h2>
                    <p className="text-stone-600 max-w-2xl mx-auto italic">
                        "Un travail précis pour un terrain prêt à affronter l'été."
                    </p>
                </div>

                <div className="relative group bg-white rounded-3xl p-4 shadow-2xl border border-stone-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Avant */}
                        <div className="relative rounded-2xl overflow-hidden aspect-video shadow-inner">
                            <img
                                src={images[currentIndex].before}
                                alt="Avant"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-stone-900/80 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                Avant
                            </div>
                        </div>

                        {/* Après */}
                        <div className="relative rounded-2xl overflow-hidden aspect-video shadow-inner">
                            <img
                                src={images[currentIndex].after}
                                alt="Après"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-emerald-600/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                Après
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <h3 className="text-xl font-bold text-stone-900">{images[currentIndex].title}</h3>
                        <p className="text-stone-500 text-sm mt-1">{images[currentIndex].desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
