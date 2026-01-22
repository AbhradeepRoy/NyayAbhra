
import React, { useState } from 'react';
import { FileText, Download, Copy, RefreshCcw, Sparkles } from 'lucide-react';
import { GeminiService } from '../services/geminiService';

interface Props {
  language: string;
}

export const DocumentGenerator: React.FC<Props> = ({ language }) => {
  const [formData, setFormData] = useState({
    type: 'cyber_fraud',
    details: '',
    date: '',
    platform: '',
    amount: ''
  });
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const data = await GeminiService.getInstance().generateComplaintDraft(formData, language);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
          <FileText className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold dark:text-white">Legal Document Drafter</h2>
          <p className="text-sm text-slate-500">Generate professional complaints in seconds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issue Category</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="cyber_fraud">Cyber Crime / Online Fraud</option>
              <option value="consumer_complaint">Consumer Court Complaint</option>
              <option value="fir_draft">FIR (Police Complaint) Draft</option>
              <option value="rti_request">RTI (Right to Information)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date of Incident</label>
              <input 
                type="date"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none dark:text-white"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount involved (₹)</label>
              <input 
                type="number"
                placeholder="e.g. 5000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none dark:text-white"
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
            <textarea 
              rows={4}
              placeholder="Tell us exactly what happened..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              onChange={(e) => setFormData({...formData, details: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {isGenerating ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Official Draft
          </button>
        </form>

        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-4 min-h-[400px]">
          {result ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-slate-800 dark:text-white">Generated Draft</h4>
                <div className="flex gap-2">
                  <button onClick={() => navigator.clipboard.writeText(result.englishDraft)} className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"><Copy className="w-4 h-4 text-indigo-600" /></button>
                  <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"><Download className="w-4 h-4 text-indigo-600" /></button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border text-sm max-h-60 overflow-y-auto whitespace-pre-wrap dark:text-slate-300">
                  <p className="font-bold mb-2">English Copy:</p>
                  {result.englishDraft}
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900 text-sm max-h-60 overflow-y-auto whitespace-pre-wrap dark:text-slate-300">
                  <p className="font-bold mb-2">Translated Copy:</p>
                  {result.localDraft}
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-900">
                  <h5 className="font-bold text-green-800 dark:text-green-400 text-sm mb-2">Next Steps:</h5>
                  <p className="text-xs text-green-700 dark:text-green-500 mb-2">Submit this to: {result.suggestedAuthority}</p>
                  <ul className="text-xs text-green-700 dark:text-green-500 list-disc list-inside">
                    {result.documentsNeeded.map((doc: string, i: number) => <li key={i}>{doc}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center px-6">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-sm">Your generated draft will appear here after you fill out the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
