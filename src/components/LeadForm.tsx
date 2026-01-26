
import React, { useState } from 'react';
import { FormStatus, LeadFormData } from '../types';
import { Send, CheckCircle, Loader2, ShieldCheck } from 'lucide-react';

// --- CONFIGURATION FINALE ---
const GOOGLE_ADS_ID = "AW-17636336700"; 
// REMPLACEZ 'LABEL_ICI' par le label trouvé dans Google Ads (ex: "AbC123Xyz")
const GOOGLE_ADS_LABEL = "LABEL_ICI"; 
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbysaGx-v11vf0-mc6OM3FbY1hYhAh4DyZ2UjZzCBPUYsjZ-YmSDItx3--D9rVof0RaUwg/exec";
// ----------------------------

interface LeadFormProps {
  onSuccess: () => void;
  source?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, source = 'Landing Page Ads' }) => {
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    city: '',
    surface: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.SUBMITTING);
    
    try {
      // 1. Envoi au Google Sheets (Backend)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleString('fr-FR'),
          source: source
        }),
      });

      // 2. Déclenchement de la conversion Google Ads
      if (typeof (window as any).gtag === 'function' && GOOGLE_ADS_LABEL !== "LABEL_ICI") {
        (window as any).gtag('event', 'conversion', {
          'send_to': `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABEL}`,
          'value': 1.0,
          'currency': 'EUR'
        });
      }

      setStatus(FormStatus.SUCCESS);
      onSuccess();
      
    } catch (error) {
      console.error('Erreur:', error);
      setStatus(FormStatus.ERROR);
      setTimeout(() => setStatus(FormStatus.IDLE), 4000);
    }
  };

  if (status === FormStatus.SUCCESS) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4 animate-in fade-in zoom-in duration-500 border border-emerald-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 leading-tight">Demande enregistrée !</h3>
        <p className="text-stone-600 leading-relaxed max-w-sm mx-auto">
          Merci <span className="font-bold text-emerald-800">{formData.name}</span>. Nous vous recontactons au <span className="font-bold text-stone-900">{formData.phone}</span> sous 24 à 48 heures.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-stone-100 ring-1 ring-stone-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 opacity-50"></div>
      
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-600">Devis gratuit sous 48h</span>
        </div>
        <h2 className="text-3xl font-bold text-stone-900 mb-2 tracking-tight">Votre devis express</h2>
        <p className="text-stone-500 text-sm leading-relaxed">
          Complétez ce formulaire pour une mise en conformité rapide de votre terrain.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 ml-1">
              Nom complet / Entreprise
            </label>
            <input
              required
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Paul Martin"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 ml-1">
              Numéro de téléphone
            </label>
            <input
              required
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="06 XX XX XX XX"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 ml-1">
              Ville du terrain
            </label>
            <input
              required
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: Brignoles"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="surface" className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 ml-1">
              Surface estimée (m²)
            </label>
            <input
              required
              id="surface"
              name="surface"
              type="text"
              value={formData.surface}
              onChange={handleChange}
              placeholder="Ex: 1500 m²"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="details" className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 ml-1">
            Détails (accès, pente, ronces...)
          </label>
          <textarea
            id="details"
            name="details"
            rows={3}
            value={formData.details}
            onChange={handleChange}
            placeholder="Décrivez brièvement l'état actuel de votre terrain..."
            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all resize-none"
          ></textarea>
        </div>

        <button
          disabled={status === FormStatus.SUBMITTING}
          type="submit"
          className="w-full py-5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xl rounded-2xl shadow-xl shadow-emerald-900/10 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-[0.98]"
        >
          {status === FormStatus.SUBMITTING ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Envoyer ma demande
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 pt-4 border-t border-stone-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Mise en conformité DFCI & Devis 100% gratuit
          </span>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
