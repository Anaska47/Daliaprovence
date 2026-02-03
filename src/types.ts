
export interface LeadFormData {
  name: string;
  phone: string;
  city: string;
  surface: string;
  details: string;
}

export interface FormStatusMessage {
  type: 'success' | 'error' | 'info';
  content: string;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
