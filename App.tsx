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
      if (message.includes('429') || message.includes('quota')) {
        message = "Market data limit reached. Please try again in a moment.";
      }
      setState({ isLoading: false, error: message, data: null });
    }
  }, [url]);

  return (
    <div className="min-h-screen grid-bg selection:bg-amber-500/30">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-gem text-slate-950 text-lg"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              PALM<span className="text-amber-500 font-black">VIEW</span> <span className="text-[10px] align-top bg-white/10 px-1.5 py-0.5 rounded text-slate-400 ml-1">AI 3.0</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Market Intel</a>
            <a href="#" className="hover:text-white transition-colors">Portfolio</a>
            <button className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all">Connect</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        {/* Search Hero */}
        <div className={`max-w-4xl mx-auto text-center space-y-10 transition-all duration-700 ${state.data ? 'mb-20 opacity-80 scale-95' : 'mb-32'}`}>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Real-time Analysis Active
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
              Verify Value. <br />
              <span className="accent-gradient bg-clip-text text-transparent italic">Instantly.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed">
              Premium property intelligence for Dubai's most exclusive listings. Paste any Property Finder link to begin.
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-200 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
            <div className="relative flex flex-col md:flex-row gap-2 p-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl focus-within:border-amber-500/40 transition-all glow-amber">
              <div className="flex-1 flex items-center px-5 py-3">
                <i className="fa-solid fa-search text-slate-500 mr-4 text-lg"></i>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste property listing URL..."
                  className="bg-transparent w-full text-white placeholder-slate-600 outline-none font-medium text-lg"
                />
              </div>
              <button 
                type="submit"
                disabled={state.isLoading}
                className="bg-white hover:bg-amber-500 text-slate-950 px-10 py-4 rounded-xl font-black transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {state.isLoading ? (
                  <i className="fa-solid fa-circle-notch animate-spin text-xl"></i>
                ) : (
                  <>
                    ANALYZE
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Quick Actions */}
          {!state.data && (
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => setUrl('https://www.propertyfinder.ae/en/plp/buy/villa-for-sale-dubai-palm-jumeirah-signature-villas-signature-villas-frond-p-15946332.html')}
                className="text-[11px] font-bold px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:border-amber-500/40 hover:text-white transition-all uppercase tracking-widest"
              >
                Try Sample Villa
              </button>
            </div>
          )}
        </div>

        {/* Results / Content */}
        <div className="relative">
          {state.error && (
            <div className="max-w-2xl mx-auto mb-10 p-6 glass-card border-red-500/20 rounded-3xl text-red-400 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-circle-exclamation text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-white">Analysis Interrupted</h4>
                <p className="opacity-70 text-sm leading-relaxed">{state.error}</p>
              </div>
            </div>
          )}

          {state.isLoading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in duration-1000">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 border-[6px] border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fa-solid fa-microchip text-amber-500 text-4xl animate-pulse"></i>
                </div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight uppercase tracking-widest">Compiling Intelligence</h3>
                <div className="flex gap-1 justify-center">
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}

          {state.data && !state.isLoading && (
            <PropertyCard details={state.data} />
          )}

          {!state.data && !state.isLoading && !state.error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'fa-layer-group', title: 'Data Aggregation', desc: 'Combines listing data with historical DLD permit records.' },
                { icon: 'fa-bolt', title: 'Instant Valuation', desc: 'Gemini 3 evaluates pricing against current market benchmarks.' },
                { icon: 'fa-shield-halved', title: 'Risk Assessment', desc: 'Identifies potential regulatory gaps and ROI variances.' }
              ].map((f, i) => (
                <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:border-white/10 transition-all group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className={`fa-solid ${f.icon} text-amber-500 text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">© 2025 PalmView AI Systems</p>
          <div className="flex gap-6">
            <i className="fa-brands fa-x-twitter text-slate-700 hover:text-white transition-colors cursor-pointer"></i>
            <i className="fa-brands fa-linkedin text-slate-700 hover:text-white transition-colors cursor-pointer"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;