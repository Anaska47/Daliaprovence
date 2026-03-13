
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Navigation, Calculator, Camera } from 'lucide-react';

interface NavbarProps {
  location?: string;
}

const Navbar: React.FC<NavbarProps> = ({ location = 'Brignoles' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-stone-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className={`text-2xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-emerald-900' : 'text-white'}`}>
          <span className="text-amber-500">Dalia</span>Provence
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'accueil', label: 'Accueil', icon: Navigation },
            { id: 'prestations', label: 'Services', icon: Camera },
            { id: 'simulateur', label: 'Simulateur', icon: Calculator },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:text-amber-500 ${
                isScrolled ? 'text-stone-600' : 'text-emerald-50/80'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex flex-col items-end leading-none mr-2 ${isScrolled ? 'text-stone-400' : 'text-emerald-100/60'}`}>
            <span className="text-[10px] font-black uppercase tracking-widest">Secteur</span>
            <span className={`text-sm font-bold ${isScrolled ? 'text-emerald-800' : 'text-white'}`}>{location}</span>
          </div>
          
          <a
            href="tel:+33619926923"
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm transition-all transform active:scale-95 ${
              isScrolled 
                ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-800/20' 
                : 'bg-white text-emerald-950 shadow-xl'
            }`}
          >
            <Phone className="w-4 h-4" />
            06 19 92 69 23
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
