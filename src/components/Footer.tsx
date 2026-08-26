
import React from 'react';

import { Link } from 'react-router-dom';
import { locations } from '../data/locations';

interface FooterProps {
  onShowLegal: () => void;
  onShowPrivacy: () => void;
  location?: string;
}

const Footer: React.FC<FooterProps> = ({ onShowLegal, onShowPrivacy, location = 'Brignoles' }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-12 px-6 border-t border-white/5 pb-24 sm:pb-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-amber-400">Dalia</span>Provence
        </div>
        <div className="text-sm opacity-60">
          <p>© {new Date().getFullYear()} DaliaProvence - Tous droits réservés.</p>
          <p>Débroussaillage professionnel à {location} et dans tout le Var.</p>
        </div>

        <div className="pt-8 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-30">Nos zones d'intervention (Var 83)</p>
          <div className="max-h-40 overflow-y-auto custom-scrollbar pr-2">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-medium opacity-50">
              {locations.map(loc => (
                <Link 
                  key={loc.slug} 
                  to={`/debroussaillage/${loc.slug}`}
                  className="hover:text-amber-400 transition-colors whitespace-nowrap"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Débroussaillage {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest font-bold mb-3 opacity-30">Guides pratiques</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium opacity-60">
            <Link
              to="/guides/obligation-debroussaillement-var"
              className="hover:text-amber-400 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Obligation de débroussaillement (OLD) dans le Var
            </Link>
            <Link
              to="/guides/elagage-reglementation-var"
              className="hover:text-amber-400 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Réglementation de l'élagage dans le Var
            </Link>
            <Link
              to="/guides/terrassement-autorisation-var"
              className="hover:text-amber-400 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Autorisations pour le terrassement dans le Var
            </Link>
            <Link
              to="/guides/nettoyage-toiture-frequence-var"
              className="hover:text-amber-400 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Fréquence du nettoyage de toiture en Provence
            </Link>
            <Link
              to="/guides/restanques-pierre-seche-var"
              className="hover:text-amber-400 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              Restanques et pierre sèche en Provence
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-6 text-xs uppercase tracking-widest font-semibold opacity-40 pt-4">
          <button onClick={onShowLegal} className="hover:text-amber-400 transition-colors">Mentions légales</button>
          <button onClick={onShowPrivacy} className="hover:text-amber-400 transition-colors">Confidentialité</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
