
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ShieldAlert } from 'lucide-react';
import type { FAQItem } from '../data/faqContent';

interface FAQProps {
  faqs: FAQItem[];
  titleHighlight: string;
  subtitle: string;
}

const FAQ: React.FC<FAQProps> = ({ faqs, titleHighlight, subtitle }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-stone-50" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-3 h-3" /> Questions fréquentes
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight">
            Tout savoir sur <span className="text-emerald-700">{titleHighlight}</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-stone-500 font-medium">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <span>{subtitle}</span>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white rounded-[2rem] border transition-all duration-300 ${
                openIndex === index ? 'border-emerald-200 shadow-xl' : 'border-stone-100 hover:border-stone-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-bold text-stone-900 md:text-lg leading-tight">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === index ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-400'
                }`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-stone-500 leading-relaxed border-t border-stone-50 pt-4 italic">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
