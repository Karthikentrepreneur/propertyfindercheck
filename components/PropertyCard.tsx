
import React from 'react';
import { PropertyDetails } from '../types';

interface PropertyCardProps {
  details: PropertyDetails;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ details }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/seed/luxuryvilla/1200/600" 
          alt="Luxury Property" 
          className="w-full h-[400px] object-cover opacity-60"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-500/30">
                  {details.propertyType}
                </span>
                <span className="text-slate-500 text-xs font-mono uppercase tracking-widest border-l border-slate-800 pl-3">
                  Ref: {details.propertyId}
                </span>
                <span className="text-slate-500 text-xs font-mono uppercase tracking-widest border-l border-slate-800 pl-3">
                  DLD Permit: {details.dldPermitNumber}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-white leading-tight">
                {details.title}
              </h1>
              <p className="text-slate-300 text-lg flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-amber-500"></i>
                {details.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-amber-500 text-sm font-medium uppercase tracking-widest">Listing Price</p>
              <p className="text-4xl font-black text-white">{details.price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Stats & Amenities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Bedrooms', value: details.bedrooms, icon: 'fa-bed' },
              { label: 'Bathrooms', value: details.bathrooms, icon: 'fa-bath' },
              { label: 'Total Area', value: details.area, icon: 'fa-ruler-combined' },
              { label: 'DLD Permit', value: details.dldPermitNumber, icon: 'fa-certificate' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-colors group">
                <i className={`fa-solid ${stat.icon} text-amber-500 text-xl mb-3 group-hover:scale-110 transition-transform`}></i>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-white font-bold text-lg truncate" title={stat.value}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-file-lines text-amber-500"></i>
              Executive Summary
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg italic">
              "{details.description}"
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold mb-6">Premium Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {details.amenities.map((amenity, i) => (
                <span key={i} className="px-5 py-2.5 bg-slate-800/80 rounded-xl text-slate-200 border border-slate-700 flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-default">
                  <i className="fa-solid fa-check text-amber-500 text-sm"></i>
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Investment Analysis */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-3xl border border-indigo-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <i className="fa-solid fa-chart-line text-6xl"></i>
            </div>
            
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-robot text-amber-500"></i>
              AI Investment Score
            </h3>
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-slate-800">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin duration-[3000ms]"
                  style={{ animationDirection: 'reverse' }}
                ></div>
                <span className="text-4xl font-black text-white">{details.investmentAnalysis.score}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">Market Position</p>
                <p className="text-white text-sm leading-relaxed">{details.investmentAnalysis.marketComparison}</p>
              </div>
              <div>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">ROI Potential</p>
                <p className="text-white text-sm leading-relaxed">{details.investmentAnalysis.roiEstimate}</p>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95">
              Download Full Report
            </button>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Verification Sources</h4>
            <div className="space-y-3">
              {details.sources.map((source, i) => (
                <a 
                  key={i}
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-slate-300 text-sm truncate pr-4">{source.title}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></i>
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
