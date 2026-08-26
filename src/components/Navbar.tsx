
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Navigation, Calculator, Camera } from 'lucide-react';

interface NavbarProps {
  location?: string;
}

const Navbar: React.FC<NavbarProps> = ({ location = 'Brignoles' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const routerLocation = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Si on arrive sur une page avec une section a rejoindre en attente (ex:
  // on a clique "Services" depuis une page qui n'a pas cette section, comme
  // un article de guide), on scrolle une fois que la page de destination est
  // montee. Plusieurs tentatives espacees : sur une page longue (images,
  // animations au scroll), la position finale de la section peut encore
  // bouger juste apres le montage, donc un seul scroll trop tot peut
  // atterrir un peu court.
  useEffect(() => {
    const targetId = (routerLocation.state as { scrollTo?: string } | null)?.scrollTo;
    if (targetId) {
      const attempt = () => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      const timers = [150, 500, 1100].map((delay) => setTimeout(attempt, delay));
      return () => timers.forEach(clearTimeout);
    }
  }, [routerLocation.state]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // La section n'existe pas sur cette page (ex: un article de guide) :
    // direction la page d'accueil, qui l'a toujours, avec un scroll differe
    // une fois arrivee (voir le useEffect ci-dessus).
    navigate('/', { state: { scrollTo: id } });
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
