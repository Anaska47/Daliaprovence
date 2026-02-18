
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Landmark, Flame } from 'lucide-react';

const TrustSignals = () => {
    const signals = [
        {
            icon: <ShieldAlert className="w-10 h-10 text-emerald-600" />,
            label: "Obligation Légale (OLD)",
            desc: "Évitez les amendes préfectorales et assurez votre terrain."
        },
        {
            icon: <Flame className="w-10 h-10 text-amber-500" />,
            label: "Risque Incendie Réduit",
            desc: "Protégez vos proches et vos biens avant la saison sèche."
        },
        {
            icon: <Zap className="w-10 h-10 text-blue-600" />,
            label: "Intervention Express",
            desc: "Prise en charge prioritaire pour les mises en conformité."
        }
    ];

    return (
        <div className="py-16 bg-stone-50 border-y border-stone-200">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
                        Pourquoi débroussailler maintenant ?
                    </h2>
                    <p className="text-stone-500 mt-2">Plus qu'une corvée, une obligation de sécurité dans le Var.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {signals.map((signal, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center text-center"
                        >
                            <div className="mb-4 bg-stone-50 p-4 rounded-2xl">
                                {signal.icon}
                            </div>
                            <h4 className="font-bold text-lg text-stone-900 mb-2">{signal.label}</h4>
                            <p className="text-sm text-stone-500 leading-relaxed">{signal.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustSignals;
