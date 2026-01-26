
export interface LeadFormData {
  name: string;
  phone: string;
  city: string;
  surface: string;
  details: string;
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
