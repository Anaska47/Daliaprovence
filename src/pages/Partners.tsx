
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, TrendingUp, Users, CheckCircle2, MapPin, Phone } from 'lucide-react';
import LeadForm from '../components/LeadForm';

const PartnersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar location="Recrutement Var" />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 mb-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <Briefcase className="w-4 h-4" /> Programme Partenaires
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-stone-900 tracking-tighter leading-[0.9]">
              Recevez nos leads <span className="text-emerald-700">qualifiés</span> dans le Var
            </h1>
            <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Nous générons plus de 100 demandes de débroussaillage par mois. Devenez notre prestataire de confiance dans votre secteur.
            </p>
          </div>
        </section>

        {/* Benefits for Partners */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: TrendingUp, 
                title: "Plus de Chantiers", 
                desc: "Remplissez votre emploi du temps sans dépenser 1€ en publicité. Nous gérons le marketing pour vous." 
              },
              { 
                icon: Users, 
                title: "Clients Qualifiés", 
                desc: "Tous nos leads sont filtrés (surface, localisation, téléphone vérifié) avant de vous être envoyés." 
              },
              { 
                icon: MapPin, 
                title: "Secteur Exclusif", 
                desc: "Devenez le partenaire numéro 1 sur votre zone géographique pour éviter la concurrence." 
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4 p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-sm">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-stone-900">{item.title}</h3>
                <p className="text-stone-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-6 bg-emerald-900 py-24 rounded-[4rem] mx-4 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-10 -mr-48 -mt-48"></div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
                Prêt à faire croître votre <span className="text-amber-400">chiffre d'affaires</span> ?
              </h2>
              <p className="text-emerald-100/60 font-medium">
                Remplissez le formulaire ci-contre. Notre responsable partenariats vous contactera sous 48h pour valider votre dossier.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  <span>Inscription gratuite et sans engagement</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  <span>Paiement par lead ou commission</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl">
              <LeadForm 
                onSuccess={() => {}} 
                source="Recrutement Partenaires"
                initialCity="Partenaire Var"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnersPage;
