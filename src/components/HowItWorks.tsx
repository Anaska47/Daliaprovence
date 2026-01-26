
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    { number: "01", title: "Description", desc: "Vous décrivez votre terrain via notre formulaire." },
    { number: "02", title: "Devis clair", desc: "Nous envoyons un devis détaillé sous 24-48h." },
    { number: "03", title: "Intervention", desc: "Action rapide, propre et sécurisée par nos experts." }
  ];

  return (
    <section className="py-20 px-6 bg-emerald-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-stone-900 mb-16">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 text-center">
              <div className="text-5xl font-black text-emerald-900/10 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">{step.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-emerald-900/5 -z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
