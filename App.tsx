
import React, { useState, useEffect } from 'react';
import { SmartLawyerBot } from './components/SmartLawyerBot';
import { DocumentGenerator } from './components/DocumentGenerator';
import { LanguageSelector } from './components/LanguageSelector';
import { UI_STRINGS, LEGAL_CATEGORIES } from './constants';
import { Moon, Sun, Scale, HelpCircle, Menu, X, Landmark, ShieldCheck, Bot, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'home' | 'bot' | 'draft' | 'schemes'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const strings = UI_STRINGS[lang] || UI_STRINGS.en;

  const NavItem = ({ id, label, icon: Icon }: { id: any, label: string, icon: any }) => (
    <button
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all font-semibold
        ${activeTab === id 
          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
    >
      <Icon className="w-4.5 h-4.5" />
      {label}
    </button>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">NyayAI</span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <NavItem id="home" label="Home" icon={HelpCircle} />
            <NavItem id="bot" label="NyayBot Lawyer" icon={ShieldCheck} />
            <NavItem id="schemes" label="Govt Schemes" icon={Landmark} />
            <NavItem id="draft" label="Draft Complaints" icon={Scale} />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-all border dark:border-slate-700"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 space-y-3 animate-in slide-in-from-top-4 duration-300">
            <NavItem id="home" label="Home" icon={HelpCircle} />
            <NavItem id="bot" label="NyayBot Lawyer" icon={ShieldCheck} />
            <NavItem id="schemes" label="Govt Schemes" icon={Landmark} />
            <NavItem id="draft" label="Draft Complaints" icon={Scale} />
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Global Language Bar */}
        <div className="mb-10 animate-in fade-in slide-in-from-top-2 duration-500">
          <LanguageSelector currentLang={lang} onSelect={setLang} />
        </div>

        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Hero Section */}
            <section className="text-center space-y-8 py-10 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -z-10"></div>
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100 dark:border-indigo-800 mb-4">
                <Zap className="w-3.5 h-3.5 fill-current" /> AI for Justice
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight max-w-4xl mx-auto">
                {strings.heroTitle}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                {strings.heroSubtitle}
              </p>
              
              <div className="flex flex-wrap justify-center gap-5 pt-8">
                <button 
                  onClick={() => setActiveTab('bot')}
                  className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-indigo-300 dark:shadow-none hover:scale-105 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-3"
                >
                  <Bot className="w-6 h-6" />
                  {strings.startChat}
                </button>
                <button 
                  onClick={() => setActiveTab('schemes')}
                  className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-black hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm flex items-center gap-3"
                >
                  {strings.exploreSchemes}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </section>

            {/* Features Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
              {[
                { label: "Regional Support", val: "10+ Languages", desc: "Native understanding of local dialects" },
                { label: "Legal Coverage", val: "IPC & BNS", desc: "Complete digital database of laws" },
                { label: "Verified Schemes", val: "5000+ Schemes", desc: "Central & State welfare data" }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-2 hover:border-indigo-500 transition-colors shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <h4 className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{stat.val}</h4>
                  <p className="text-sm text-slate-500">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Categories Section */}
            <section>
              <div className="flex justify-between items-end mb-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black flex items-center gap-3">
                    <span className="w-2.5 h-10 bg-indigo-600 rounded-full"></span>
                    Access Legal Services
                  </h2>
                  <p className="text-slate-500 font-medium">Instant guidance across all legal categories.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {LEGAL_CATEGORIES.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => {
                      if (cat.id === 'schemes') setActiveTab('schemes');
                      else if (cat.id === 'rti') setActiveTab('draft');
                      else setActiveTab('bot');
                    }}
                    className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all cursor-pointer overflow-hidden relative"
                  >
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/5 group-hover:bg-indigo-500/10 rounded-full transition-colors flex items-center justify-center">
                       {/* Subtle decorative BG icon */}
                    </div>
                    <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform shadow-inner">
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-3 dark:text-white group-hover:text-indigo-600 transition-colors">{cat.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {cat.description}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Get Help <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'bot' && (
          <div className="max-w-4xl mx-auto py-4">
             <SmartLawyerBot language={lang} />
          </div>
        )}

        {activeTab === 'draft' && (
          <div className="max-w-5xl mx-auto py-4 animate-in zoom-in-95 duration-500">
             <DocumentGenerator language={lang} />
          </div>
        )}

        {activeTab === 'schemes' && (
          <div className="py-4 space-y-12 animate-in fade-in duration-700">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Direct Benefit Access
              </div>
              <h1 className="text-4xl font-black tracking-tight">Govt Schemes Intelligence</h1>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">NyayAI maps your profile to 5,000+ central and state government welfare schemes in real-time.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dynamic Check Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 scale-150 group-hover:scale-[1.7] transition-transform">
                   <Landmark className="w-32 h-32" />
                </div>
                <div className="space-y-4 relative z-10">
                  <h2 className="text-3xl font-black leading-tight">Check Eligibility<br/>With NyayBot</h2>
                  <p className="text-indigo-100 text-lg">Send a message detailing your household income, occupation, and state. NyayAI will match you instantly.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('bot')}
                  className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black hover:bg-indigo-50 transition-all flex items-center gap-3 w-fit shadow-lg shadow-indigo-900/20 active:scale-95"
                >
                  Ask Eligibility Now <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Browse Lists */}
              <div className="space-y-6">
                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                    Popular State Schemes
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Lakshmir Bhandar', state: 'West Bengal', benefit: 'Monthly Cash Aid' },
                      { name: 'Ladli Behna Yojana', state: 'Madhya Pradesh', benefit: 'Direct Bank Transfer' },
                      { name: 'Rythu Bandhu', state: 'Telangana', benefit: 'Farmer Support' },
                      { name: 'Mazi Ladki Bahin', state: 'Maharashtra', benefit: 'Women Empowerment' }
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all cursor-pointer">
                        <div>
                          <p className="text-sm font-black dark:text-slate-200">{s.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{s.state} • {s.benefit}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Central Schemes Grid */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
               <h3 className="font-black text-2xl mb-8">Major Central Govt Programs</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "PM-Kisan", cat: "Agriculture", color: "bg-emerald-500" },
                    { title: "Ayushman Bharat", cat: "Healthcare", color: "bg-blue-500" },
                    { title: "PM Awas Yojana", cat: "Housing", color: "bg-orange-500" },
                    { title: "PM Mudra Yojana", cat: "MSME Loans", color: "bg-indigo-500" }
                  ].map((p, i) => (
                    <div key={i} className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all cursor-pointer group">
                      <div className={`w-10 h-10 ${p.color} rounded-xl mb-4 group-hover:scale-110 transition-transform opacity-80`}></div>
                      <h4 className="font-black text-lg">{p.title}</h4>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">{p.cat}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Quick Action */}
      {activeTab !== 'bot' && (
        <button 
          onClick={() => setActiveTab('bot')}
          className="fixed bottom-10 right-10 w-20 h-20 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-300 dark:shadow-none flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-40 animate-in slide-in-from-right-10 duration-500 group"
        >
          <div className="absolute -top-3 -right-3 bg-red-500 text-[10px] font-black px-2 py-1 rounded-full animate-pulse border-2 border-white dark:border-slate-900">HELP</div>
          <Bot className="w-10 h-10 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
             <div className="flex items-center gap-3">
               <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md">
                 <Scale className="w-5 h-5 text-white" />
               </div>
               <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">NyayAI</span>
             </div>
             <p className="text-slate-500 text-lg max-w-sm leading-relaxed font-medium">Empowering every Indian citizen with legal awareness and democratic rights in their native tongue.</p>
          </div>
          <div className="space-y-4">
             <h4 className="font-black text-slate-900 dark:text-white">Legal Hub</h4>
             <ul className="space-y-3 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Supreme Court Updates</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Know Your Rights</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Digital Complaint Portals</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">BNS/IPC Database</a></li>
             </ul>
          </div>
          <div className="space-y-4">
             <h4 className="font-black text-slate-900 dark:text-white">Citizen Support</h4>
             <ul className="space-y-3 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Feedback</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Language Support</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API for NGOs</a></li>
             </ul>
          </div>
        </div>
        <div className="pt-16 mt-16 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm font-medium">© 2024 NyayAI • Built for Public Impact & Legal Inclusion</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Open Source</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
