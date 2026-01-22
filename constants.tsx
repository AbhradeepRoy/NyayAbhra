
import React from 'react';
import { Shield, Gavel, Scale, FileText, Landmark, MonitorSmartphone, HelpCircle } from 'lucide-react';

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
];

export const LEGAL_CATEGORIES = [
  { id: 'civil', title: 'Civil Rights', description: 'Property, Family, Contractual disputes', icon: <Scale className="w-6 h-6" /> },
  { id: 'criminal', title: 'Criminal Law', description: 'FIRs, Police procedures, Bail', icon: <Shield className="w-6 h-6" /> },
  { id: 'cyber', title: 'Cyber Crime', description: 'Online fraud, Harassment, Identity theft', icon: <MonitorSmartphone className="w-6 h-6" /> },
  { id: 'consumer', title: 'Consumer Protection', description: 'Defective products, Unfair trade', icon: <Gavel className="w-6 h-6" /> },
  { id: 'schemes', title: 'Govt Schemes', description: 'Welfare, Education, Health benefits', icon: <Landmark className="w-6 h-6" /> },
  { id: 'rti', title: 'RTI Filings', description: 'Accessing public information', icon: <FileText className="w-6 h-6" /> },
];

export const UI_STRINGS: Record<string, any> = {
  en: {
    heroTitle: "Legal Power in Your Language",
    heroSubtitle: "Get instant legal guidance, understand government schemes, and draft complaints with AI.",
    startChat: "Talk to NyayBot",
    exploreSchemes: "Find Schemes",
    draftComplaint: "Draft Complaint",
    selectLanguage: "Choose Language",
    legalExpert: "Smart Lawyer Bot",
    placeholder: "Ask me anything about law or schemes..."
  },
  hi: {
    heroTitle: "आपकी भाषा में कानूनी शक्ति",
    heroSubtitle: "तुरंत कानूनी मार्गदर्शन प्राप्त करें, सरकारी योजनाओं को समझें और AI के साथ शिकायतें तैयार करें।",
    startChat: "न्यायबॉट से बात करें",
    exploreSchemes: "योजनाएं खोजें",
    draftComplaint: "शिकायत का मसौदा",
    selectLanguage: "भाषा चुनें",
    legalExpert: "स्मार्ट वकील बॉट",
    placeholder: "कानून या योजनाओं के बारे में कुछ भी पूछें..."
  },
  bn: {
    heroTitle: "আপনার ভাষায় আইনি শক্তি",
    heroSubtitle: "তাৎক্ষণিক আইনি নির্দেশনা পান, সরকারি স্কিমগুলো বুঝুন এবং AI দিয়ে অভিযোগ ড্রাফট করুন।",
    startChat: "NyayBot এর সাথে কথা বলুন",
    exploreSchemes: "স্কিম খুঁজুন",
    draftComplaint: "অভিযোগ ড্রাফট করুন",
    selectLanguage: "ভাষা নির্বাচন করুন",
    legalExpert: "স্মার্ট আইনজীবী বট",
    placeholder: "আইন বা স্কিম সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন..."
  }
};
