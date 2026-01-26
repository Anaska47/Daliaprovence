import React from 'react';
import { Phone, FileText } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Numéro de téléphone mis à jour : 06 19 92 69 23
  const phoneNumber = "+33619926923"; 

  return (
    <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
      <div className="flex gap-2 bg-emerald-950 p-2 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md">
        <button
          onClick={scrollToForm}
          className="flex-grow flex items-center justify-center gap-2 bg-amber-500 text-emerald-950 font-bold py-4 px-4 rounded-xl text-sm active:scale-95 transition-transform"
        >
          <FileText className="w-4 h-4" />
          Devis express
        </button>
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-4 px-6 rounded-xl text-sm border border-white/10 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4" />
          Appeler
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;