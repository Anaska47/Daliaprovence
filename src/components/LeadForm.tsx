
import React, { useState } from 'react';
import { FormStatus, LeadFormData } from '../types';
import { Send, CheckCircle, Loader2, ShieldCheck, MapPin, Zap, Phone, Info } from 'lucide-react';

// --- CONFIGURATION FINALE ---
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

      // 2. Déclenchement via Google Tag Manager (GTM) et Google Ads Enhanced Conversions
      if (typeof window !== 'undefined' && (window as any).gtag) {
        let formattedPhone = formData.phone.replace(/\s+/g, '');
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '+33' + formattedPhone.substring(1);
        }

        (window as any).gtag('set', 'user_data', {
          'phone_number': formattedPhone,
          'address': {
            'first_name': formData.name.split(' ')[0],
            'last_name': formData.name.split(' ').slice(1).join(' ') || formData.name,
            'region': formData.city
          }
        });

        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-16817024317/DaliaLead',
          'value': 1.0,
          'currency': 'EUR'
        });
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'generate_lead',
          'user_data': {
            'phone_number': formData.phone,
            'address': {
              'region': formData.city,
            }
          }
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
      <div className="bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-10 text-center space-y-6 animate-in fade-in zoom-in duration-500 border border-emerald-100">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full mb-2">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-stone-900 leading-tight">C'est envoyé !</h3>
          <p className="text-stone-500 mt-2">Nous analysons votre terrain immédiatement.</p>
        </div>
        <p className="text-stone-600 leading-relaxed max-w-sm mx-auto bg-stone-50 p-4 rounded-2xl">
          Merci <span className="font-bold text-emerald-800">{formData.name}</span>. Votre devis gratuit vous sera communiqué par téléphone au <span className="font-bold text-stone-900">{formData.phone}</span> sous 24h.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-12 border border-stone-100 ring-1 ring-stone-200/50 relative overflow-hidden group">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -z-10 opacity-30"></div>

      <div className="mb-8 text-center sm:text-left">
        <h3 className="text-2xl sm:text-4xl font-black text-stone-900 mb-2 tracking-tight">
          Obtenez votre devis gratuit sous 24h
        </h3>
        <p className="text-emerald-700 font-bold text-base sm:text-lg mb-4">
          Intervention rapide dans le Var (83) • Sans engagement
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
          <Info className="w-3 h-3 text-amber-600" />
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">Étape 1 sur 1 – Demande rapide (30 secondes)</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" id="devis-form">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-stone-500 ml-1">
              Nom & Prénom
            </label>
            <input
              required
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Marc Durand"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-stone-300 font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="flex flex-col gap-0.5 ml-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-emerald-600" /> Téléphone
              </span>
              <span className="text-[9px] font-medium text-emerald-600/70 lowercase italic">Indispensable pour vous rappeler rapidement.</span>
            </label>
            <input
              required
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="06 -- -- -- --"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-stone-300 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="city" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-stone-500 ml-1">
              <MapPin className="w-3 h-3 text-emerald-600" /> Commune
            </label>
            <input
              required
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: Brignoles"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-stone-300 font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="surface" className="text-[11px] font-bold uppercase tracking-widest text-stone-500 ml-1">
              Surface Approx.
            </label>
            <input
              id="surface"
              name="surface"
              type="text"
              value={formData.surface}
              onChange={handleChange}
              placeholder="Ex : 500m² (facultatif si inconnu)"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-stone-300 font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="details" className="text-[11px] font-bold uppercase tracking-widest text-stone-500 ml-1">
            Détails de votre besoin
          </label>
          <textarea
            id="details"
            name="details"
            rows={3}
            value={formData.details}
            onChange={handleChange}
            placeholder="Ex : terrain en friche, ronces hautes, arbre tombé, pente…"
            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-stone-300 font-medium resize-none shadow-inner"
          ></textarea>
        </div>

        {/* BLOC RASSURANCE */}
        <div className="bg-emerald-50/50 rounded-2xl p-5 space-y-2 border border-emerald-100/50">
          <div className="flex items-center gap-2 text-stone-700 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Respect strict des obligations DFCI / OLD
          </div>
          <div className="flex items-center gap-2 text-stone-700 font-bold text-xs">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            Intervention possible sous 48h
          </div>
          <div className="flex items-center gap-2 text-stone-700 font-bold text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Devis gratuit et sans engagement
          </div>
        </div>

        <div className="space-y-4">
          <button
            disabled={status === FormStatus.SUBMITTING}
            type="submit"
            className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] group"
          >
            {status === FormStatus.SUBMITTING ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Recevoir mon devis gratuit
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-[10px] text-stone-400 text-center italic">
            Vos informations sont utilisées uniquement pour vous recontacter. Aucun spam.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
