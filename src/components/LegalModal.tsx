
import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'legal' | 'privacy';
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900">
            {type === 'legal' ? 'Mentions Légales' : 'Politique de Confidentialité'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 sm:p-8 prose prose-stone text-stone-600 space-y-6 text-sm">
          {type === 'legal' ? (
            <div className="space-y-4">
              <section>
                <h3 className="font-bold text-stone-900 mb-2">1. Éditeur du site</h3>
                <p>Le site DaliaProvence est édité par l'entreprise DaliaProvence, spécialisée dans le débroussaillage.</p>
                <p><strong>Siège social :</strong> Brignoles (83170), France.</p>
                <p><strong>Directeur de la publication :</strong> Responsable DaliaProvence.</p>
              </section>
              <section>
                <h3 className="font-bold text-stone-900 mb-2">2. Hébergement</h3>
                <p>Le site est hébergé par des services de déploiement sécurisés garantissant une haute disponibilité.</p>
              </section>
              <section>
                <h3 className="font-bold text-stone-900 mb-2">3. Activité</h3>
                <p>Activité principale : Débroussaillage conforme aux Obligations Légales de Débroussaillage (OLD) et au DFCI.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-4">
              <section>
                <h3 className="font-bold text-stone-900 mb-2">1. Collecte des données</h3>
                <p>Nous collectons les données suivantes via notre formulaire de devis : Nom, Téléphone, Ville, Surface du terrain et détails de l'intervention.</p>
              </section>
              <section>
                <h3 className="font-bold text-stone-900 mb-2">2. Finalité du traitement</h3>
                <p>Les données sont collectées exclusivement dans le but de vous fournir un devis personnalisé pour votre prestation de débroussaillage et de vous recontacter pour organiser l'intervention.</p>
              </section>
              <section>
                <h3 className="font-bold text-stone-900 mb-2">3. Conservation et Sécurité</h3>
                <p>Vos données sont conservées de manière sécurisée (Google Drive / Google Sheets) pour une durée maximale de 2 ans. Elles ne sont jamais vendues ou cédées à des tiers.</p>
              </section>
              <section>
                <h3 className="font-bold text-stone-900 mb-2">4. Vos droits (RGPD)</h3>
                <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous directement lors de notre rappel téléphonique.</p>
              </section>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-900 text-white font-bold rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
