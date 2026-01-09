import React from 'react';
import { PropertyDetails } from '../types';

interface PropertyCardProps {
  details: PropertyDetails;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ details }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
      
      {/* Cinematic Hero */}
      <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden glass-card group">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
        <img 
          src={`https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200&h=600`} 
          alt="Luxury Estate" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
        />
        
        <div className="absolute top-8 left-8 z-20 flex gap-2">
          <span className="px-4 py-1.5 glass-panel rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {details.propertyType}
          </span>
          <span className="px-4 py-1.5 bg-amber-500 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Verified
          </span>
        </div>

        <div className="absolute bottom-10 left-10 right-10 z-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter">
              {details.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-amber-500"></i>
                <span className="font-semibold">{details.location}</span>
              </div>
              <span className="text-slate-600 font-mono text-xs">ID: {details.propertyId}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="px-6 py-4 glass-panel rounded-3xl border-white/20">
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-3xl md:text-4xl font-black text-white">{details.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout (Bento Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Key Metrics */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Beds', value: details.bedrooms, icon: 'fa-bed' },
            { label: 'Baths', value: details.bathrooms, icon: 'fa-bath' },
            { label: 'Built Up', value: details.area, icon: 'fa-vector-square' },
            { label: 'DLD Permit', value: details.dldPermitNumber, icon: 'fa-stamp' }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl hover:border-amber-500/30 transition-all text-center">
              <i className={`fa-solid ${stat.icon} text-amber-500 text-xl mb-3`}></i>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-white font-bold text-lg truncate">{stat.value}</p>
            </div>
          ))}

          {/* Large Description Card */}
          <div className="col-span-2 md:col-span-4 glass-card p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-white/50">Executive Analysis</h3>
            <p className="text-white text-xl md:text-2xl font-medium leading-tight tracking-tight italic">
              "{details.description}"
            </p>
            
            <div className="mt-10 pt-10 border-t border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-6 text-center">Exclusive Amenities</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {details.amenities.map((amenity, i) => (
                  <span key={i} className="px-6 py-2 glass-panel rounded-xl text-[12px] font-bold text-slate-300 border-white/5">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Investment Dashboard (Right Rail) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Score Card */}
          <div className="glass-card p-10 rounded-[2.5rem] border-amber-500/20 shadow-[0_0_40px_-10px_rgba(245,158,11,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <i className="fa-solid fa-brain text-8xl"></i>
            </div>
            
            <h3 className="text-xs font-black mb-10 text-amber-500 uppercase tracking-[0.4em] text-center">AI Investment Score</h3>
            
            <div className="relative w-40 h-40 mx-auto mb-10">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
                <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="8" 
                  strokeDasharray={440} 
                  strokeDashoffset={440 - (440 * details.investmentAnalysis.score) / 100}
                  className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-1000" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white leading-none">{details.investmentAnalysis.score}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">PERCENT</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-4 glass-panel rounded-2xl">
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-scale-balanced"></i> Market Delta
                </p>
                <p className="text-white text-sm font-bold leading-tight">{details.investmentAnalysis.marketComparison}</p>
              </div>
              <div className="p-4 glass-panel rounded-2xl">
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-chart-line"></i> Yield Forecast
                </p>
                <p className="text-white text-sm font-bold leading-tight">{details.investmentAnalysis.roiEstimate}</p>
              </div>
            </div>

            <button className="w-full mt-10 py-5 bg-white hover:bg-amber-500 text-slate-950 font-black rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-95 text-xs tracking-widest uppercase">
              Download Full Dossier
            </button>
          </div>

          {/* Sources */}
          <div className="glass-card p-8 rounded-[2rem]">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Data Verification</h4>
            <div className="space-y-3">
              {details.sources.map((source, i) => (
                <a 
                  key={i}
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl glass-panel hover:bg-white/10 transition-all group"
                >
                  <span className="text-slate-300 text-xs font-bold truncate pr-4">{source.title}</span>
                  <i className="fa-solid fa-external-link text-amber-500 text-[10px] opacity-40 group-hover:opacity-100"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;