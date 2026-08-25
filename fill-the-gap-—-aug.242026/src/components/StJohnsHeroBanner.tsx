import React from 'react';
import {
  MapPin,
  ClipboardList,
  Briefcase,
  Heart,
  Shield,
  Search,
  Layers,
  Sparkles,
} from 'lucide-react';
import { HERO_IMAGE_DATA_URI } from '../data/heroImage';

interface StJohnsHeroHeaderProps {
  onOpenSurvey: () => void;
  onOpenProfessionalSurvey: () => void;
  onNavigateToDonate: () => void;
}

export const StJohnsHeroHeader: React.FC<StJohnsHeroHeaderProps> = ({
  onOpenSurvey,
  onOpenProfessionalSurvey,
  onNavigateToDonate,
}) => {
  return (
    <div className="relative w-full bg-[#0a0f18] text-white border-b border-[#E5A93C]/40 shadow-2xl overflow-hidden">
      
      {/* Background St. John's Scenic Harbour Photography (Houses, Water, Hills) - Crystal Clear */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_IMAGE_DATA_URI}
          alt="Scenic St. John's Newfoundland, Harbour, Hills, Water and colourful Battery houses"
          className="w-full h-full object-cover object-[center_35%] brightness-100 contrast-100 scale-[1.01] transition-transform duration-10000 hover:scale-105"
          loading="eager"
        />
        {/* Crystal Clear Minimalist Gradient for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />
      </div>

      {/* Main Hero Container with airy spacing to reveal the scenic backdrop */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-center space-y-6 sm:space-y-8">
        
        {/* Prestige Regional Pill - Clear Frosted Glass */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-black/40 border border-white/20 text-[#F3BA4F] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
          <span>St. John’s & Newfoundland & Labrador • Community Initiative</span>
        </div>

        {/* Brand Headline & Purpose in Box Tightly Fitted to the Words */}
        <div className="inline-flex flex-col items-center max-w-md mx-auto px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-amber-400/20 border border-amber-300/40 shadow-xl backdrop-blur-md space-y-2 text-center">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            FILL THE GAP
          </h1>
          
          <p className="text-xs sm:text-sm font-semibold text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            Helping close the gaps between people, community resources, and the support they need.
          </p>
        </div>

        {/* 3 Primary Action Buttons */}
        <div className="pt-2 max-w-3xl mx-auto space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* 1. Surveys for the Community (Primary Gold) */}
            <button
              onClick={onOpenSurvey}
              className="gold-gradient-btn px-6 py-4 rounded-2xl text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-amber-200 cursor-pointer shadow-md hover:-translate-y-0.5 transition-all"
            >
              <ClipboardList className="w-4 h-4 text-slate-950 shrink-0" />
              <span>SURVEYS FOR THE COMMUNITY</span>
            </button>

            {/* 2. Professional Surveys (Dark Slate) */}
            <button
              onClick={onOpenProfessionalSurvey}
              className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-slate-700 hover:border-[#F3BA4F] cursor-pointer backdrop-blur-md"
            >
              <Briefcase className="w-4 h-4 text-[#F3BA4F] shrink-0" />
              <span>PROFESSIONAL SURVEYS</span>
            </button>

            {/* 3. Donate (White with Gold Accent) */}
            <button
              onClick={onNavigateToDonate}
              className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white hover:border-[#E5A93C] cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-[#E5A93C] shrink-0" />
              <span>DONATE</span>
            </button>
          </div>

          {/* Quick Credibility / Feature Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">100% Anonymous</span>
                <span className="text-slate-300 text-[11px]">Confidential surveys</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Search className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Verified Help</span>
                <span className="text-slate-300 text-[11px]">Local support</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Lived Experience</span>
                <span className="text-slate-300 text-[11px]">Rooted in real needs</span>
              </div>
            </div>

            <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#F3BA4F] flex items-center justify-center shrink-0 border border-[#E5A93C]/30 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Collaborative</span>
                <span className="text-slate-300 text-[11px]">Community-guided</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const StJohnsHeroBanner = StJohnsHeroHeader;
