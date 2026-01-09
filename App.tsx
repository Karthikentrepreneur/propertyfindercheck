import React, { useState, useCallback } from 'react';
import { analyzePropertyLink } from './services/geminiService';
import { ScraperState } from './types';
import PropertyCard from './components/PropertyCard';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<ScraperState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await analyzePropertyLink(url);
      setState({
        isLoading: false,
        error: null,
        data: result
      });
    } catch (err: any) {
      let message = err.message || "An unexpected error occurred while analyzing the property.";
      
      // Specific check for 429 Resource Exhausted
      if (message.includes('429') || message.includes('quota') || message.includes('RESOURCE_EXHAUSTED')) {
        message = "The Gemini API quota for this key has been reached. Please try again later or check your Google Cloud billing settings.";
      }

      setState({
        isLoading: false,
        error: message,
        data: null
      });
    }
  }, [url]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header / Navbar */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform">
              <i className="fa-solid fa-building-circle-check text-slate-950 text-xl"></i>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">PALM<span className="text-amber-500">VIEW</span> AI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
            <a href="#" className="hover:text-amber-500 transition-colors">Market Trends</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Portfolio</a>
            <a href="#" className="hover:text-amber-500 transition-colors">API Docs</a>
          </div>
        </div>
      </nav>

      {/* Hero / Search Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
              Scrape & Analyze <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Luxury Dubai Properties</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Paste a Property Finder link to instantly extract structured data and get AI-powered investment insights.
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-amber-500/20 blur-2xl group-focus-within:bg-amber-500/30 transition-colors -z-10 rounded-full"></div>
            <div className="flex flex-col md:flex-row gap-3 p-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl focus-within:border-amber-500/50 transition-all">
              <div className="flex-1 flex items-center px-4 py-2">
                <i className="fa-solid fa-link text-slate-500 mr-3"></i>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.propertyfinder.ae/en/plp/buy/..."
                  className="bg-transparent w-full text-white placeholder-slate-600 outline-none font-medium"
                />
              </div>
              <button 
                type="submit"
                disabled={state.isLoading}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {state.isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Property
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Featured Link Badge */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button 
              onClick={() => {
                setUrl('https://www.propertyfinder.ae/en/plp/buy/villa-for-sale-dubai-palm-jumeirah-signature-villas-signature-villas-frond-p-15946332.html');
              }}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-500 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-bolt-lightning text-amber-500"></i>
              Sample: Signature Villa Frond P
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6">
        {state.error && (
          <div className="max-w-2xl mx-auto mb-10 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-start gap-4 animate-in fade-in zoom-in duration-300">
            <i className="fa-solid fa-triangle-exclamation text-2xl mt-1"></i>
            <div>
              <h4 className="font-bold text-lg mb-1">Analysis Error</h4>
              <p className="opacity-80">{state.error}</p>
              <button onClick={() => setUrl('')} className="mt-4 text-xs font-bold underline hover:no-underline">Clear input and try again</button>
            </div>
          </div>
        )}

        {state.isLoading && !state.data && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-robot text-amber-500 text-3xl"></i>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Processing Intelligence</h3>
              <p className="text-slate-500 max-w-sm">Gemini is visiting the link, extracting metadata, and performing multi-point investment analysis.</p>
            </div>
          </div>
        )}

        {state.data && !state.isLoading && (
          <PropertyCard details={state.data} />
        )}

        {!state.data && !state.isLoading && !state.error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 opacity-60">
            {[
              { icon: 'fa-brain', title: 'Smart Extraction', desc: 'Auto-detects price, location, size and amenities with 99% accuracy.' },
              { icon: 'fa-chart-area', title: 'ROI Forecasting', desc: 'Historical data used to predict annual rental yields and appreciation.' },
              { icon: 'fa-file-shield', title: 'Verified Data', desc: 'Grounds analysis in official real estate portal data for reliability.' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/50 text-center space-y-4">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className={`fa-solid ${feature.icon} text-amber-500 text-2xl`}></i>
                </div>
                <h4 className="text-xl font-bold text-white">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 py-10 px-6 text-center">
        <p className="text-slate-500 text-sm mb-2">Powered by Gemini 3 Flash & Google Search Grounding</p>
        <p className="text-slate-600 text-xs">© 2024 PalmView AI. For demonstration purposes only. Always verify investment data independently.</p>
      </footer>
    </div>
  );
};

export default App;