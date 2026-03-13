
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "33619926923";
  const message = "Bonjour Dalia Provence, je souhaiterais obtenir un devis pour un débroussaillage sur mon terrain.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2"
    >
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
        className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-stone-100 text-stone-800 text-xs font-black uppercase tracking-wider mb-2 relative"
      >
        Besoin d'aide ?
        <div className="absolute right-4 bottom-[-6px] w-3 h-3 bg-white border-r border-b border-stone-100 rotate-45"></div>
      </motion.div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        aria-label="Contacter Dalia Provence sur WhatsApp"
        title="Ouvrir WhatsApp"
      >
        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
        <div className="relative bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center">
          <MessageCircle className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
          </span>
        </div>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;
