
import React from 'react';

interface FooterProps {
  onShowLegal: () => void;
  onShowPrivacy: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowLegal, onShowPrivacy }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-12 px-6 border-t border-white/5 pb-24 sm:pb-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-amber-400">Dalia</span>Provence
        </div>
        <div className="text-sm opacity-60">
          <p>© {new Date().getFullYear()} DaliaProvence - Tous droits réservés.</p>
          <p>Débroussaillage professionnel à Brignoles et environs.</p>
        </div>
        <div className="flex justify-center gap-6 text-xs uppercase tracking-widest font-semibold opacity-40">
          <button onClick={onShowLegal} className="hover:text-amber-400 transition-colors">Mentions légales</button>
          <button onClick={onShowPrivacy} className="hover:text-amber-400 transition-colors">Confidentialité</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
