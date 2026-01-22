
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, Bot, User, Loader2, Info, ExternalLink, Scale } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { Message } from '../types';

interface Props {
  language: string;
}

export const SmartLawyerBot: React.FC<Props> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Namaste! I am NyayBot. How can I assist you with legal matters today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const gemini = GeminiService.getInstance();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userMsg, timestamp: new Date() }] as Message[];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Map history correctly for the service
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await gemini.generateLegalAdvice(userMsg, language, history);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text, 
        timestamp: new Date(),
        groundingMetadata: response.groundingMetadata
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I apologize, but I'm having difficulty accessing the legal database right now. Please check your internet connection and try again.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-IN' : 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const speakMessage = (text: string) => {
    gemini.speak(text);
  };

  return (
    <div className="flex flex-col h-[650px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 p-5 text-white flex justify-between items-center shadow-lg relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight tracking-tight">NyayAI Legal Assistant</h3>
            <span className="text-xs text-indigo-100 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              Verified Legal Engine • AI
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950/30 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-2 rounded-xl h-fit shadow-md shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border dark:border-slate-700'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-indigo-500" />}
              </div>
              <div className="flex flex-col gap-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}>
                  {msg.text}

                  {msg.groundingMetadata?.groundingChunks && msg.groundingMetadata.groundingChunks.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Legal Sources & Portals</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => (
                          chunk.web && (
                            <a 
                              key={i} 
                              href={chunk.web.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800 rounded-xl text-[10px] text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all font-medium"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span className="max-w-[150px] truncate">{chunk.web.title || "Reference Source"}</span>
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === 'model' && (
                  <button 
                    onClick={() => speakMessage(msg.text)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-1 w-fit"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Read Aloud
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-700 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span className="text-sm font-medium text-slate-500">NyayAI is analyzing laws...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl focus-within:ring-2 ring-indigo-500/30 transition-all">
          <button 
            onClick={startVoiceInput}
            title="Voice Input"
            className={`p-3 rounded-xl transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600'}`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your legal query or issue..."
            className="flex-1 bg-transparent border-none rounded-xl px-2 py-2.5 text-sm focus:ring-0 outline-none dark:text-white font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl text-white transition-all shadow-lg active:scale-95 flex items-center justify-center min-w-[50px]"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">NyayAI provides guidance, not formal legal advice. Consult a professional for critical matters.</p>
      </div>
    </div>
  );
};
