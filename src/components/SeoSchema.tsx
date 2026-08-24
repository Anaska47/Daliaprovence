import React, { useEffect } from 'react';
import type { FAQItem } from '../data/faqContent';

interface SeoSchemaProps {
  serviceName: string;
  serviceDescription: string;
  cityName: string;
  canonicalUrl: string;
  faqs: FAQItem[];
}

const BUSINESS_URL = 'https://daliaprovence.vercel.app';
const BUSINESS_ID = `${BUSINESS_URL}/#business`;

const SeoSchema: React.FC<SeoSchemaProps> = ({ serviceName, serviceDescription, cityName, canonicalUrl, faqs }) => {
  useEffect(() => {
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HomeAndConstructionBusiness',
          '@id': BUSINESS_ID,
          name: 'Dalia Provence',
          telephone: '+33619926923',
          url: BUSINESS_URL,
          areaServed: {
            '@type': 'City',
            name: cityName
          },
          address: {
            '@type': 'PostalAddress',
            addressRegion: "Provence-Alpes-Côte d'Azur",
            addressCountry: 'FR'
          }
        },
        {
          '@type': 'Service',
          serviceType: serviceName,
          description: serviceDescription,
          provider: { '@id': BUSINESS_ID },
          areaServed: {
            '@type': 'City',
            name: cityName
          },
          url: canonicalUrl
        },
        ...(faqs.length > 0 ? [{
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer
            }
          }))
        }] : [])
      ]
    };

    let script = document.getElementById('seo-schema-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }, [serviceName, serviceDescription, cityName, canonicalUrl, faqs]);

  return null;
};

export default SeoSchema;
