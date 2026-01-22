
export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  BENGALI = 'bn',
  ODIA = 'or',
  TAMIL = 'ta',
  TELUGU = 'te',
  MARATHI = 'mr'
}

export interface Scheme {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string;
  eligibility: string;
  link: string;
}

export interface LegalCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingMetadata?: any;
}

export type Theme = 'light' | 'dark';
