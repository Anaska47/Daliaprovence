import React from 'react';
import { Phone, FileText } from 'lucide-react';

const StickyCTA: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('devis-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const phoneNumber = "+33619926923";

  return (
    <div className="sm:hidden fixed bottom-6 left-0 right-0 px-6 z-50 flex justify-center translate-y-[-10px] animate-in slide-in-from-bottom duration-500">
      <div className="flex w-full max-w-sm gap-2 bg-emerald-950/90 p-2 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl">
        <button
          onClick={scrollToForm}
          className="flex-grow flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-4 px-4 rounded-2xl text-sm active:scale-95 transition-all border border-white/10"
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          Devis
        </button>
        <a
          href={`tel:${phoneNumber}`}
          className="flex-grow-[2] flex items-center justify-center gap-3 bg-amber-500 text-emerald-950 font-black py-4 px-6 rounded-2xl text-base active:scale-95 transition-all shadow-lg shadow-amber-500/20"
        >
          <Phone className="w-5 h-5" />
          Appeler
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;