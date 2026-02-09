
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, HeartHandshake, BadgeCheck } from 'lucide-react';

const TrustSignals = () => {
    const signals = [
        {
            icon: <BadgeCheck className="w-10 h-10 text-emerald-600" />,
            label: "Intervention Gratuite",
            desc: "Service sans frais pour les particuliers éligibles."
        },
        {
            icon: <Zap className="w-10 h-10 text-amber-500" />,
            label: "Réponse sous 48h",
            desc: "Contact rapide pour l'évaluation de votre terrain."
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
            label: "Conformité DFCI",
            desc: "Respect total des normes incendie en vigueur."
        }
    ];

    return (
        <div className="py-12 bg-white border-y border-stone-100">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {signals.map((signal, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-4"
                        >
                            <div className="shrink-0 bg-stone-50 p-3 rounded-2xl border border-stone-100">
                                {signal.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-stone-900 mb-1">{signal.label}</h4>
                                <p className="text-sm text-stone-500 leading-relaxed">{signal.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustSignals;
