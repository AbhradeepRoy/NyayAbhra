
import React from 'react';
import { LANGUAGES } from '../constants';
import { Globe } from 'lucide-react';

interface Props {
  currentLang: string;
  onSelect: (code: string) => void;
}

export const LanguageSelector: React.FC<Props> = ({ currentLang, onSelect }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      <Globe className="w-5 h-5 text-indigo-500 shrink-0" />
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap shadow-sm
            ${currentLang === lang.code 
              ? 'bg-indigo-600 text-white scale-105' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
        >
          {lang.native}
        </button>
      ))}
    </div>
  );
};
