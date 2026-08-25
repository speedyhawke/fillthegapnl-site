import React from 'react';
import { ShieldAlert, Heart, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { PuffinMascot } from './PuffinMascot';

interface DonateViewProps {
  onOpenSurvey: () => void;
  onNavigateToGetInvolved?: () => void;
}

export const DonateView: React.FC<DonateViewProps> = ({
  onOpenSurvey,
  onNavigateToGetInvolved,
}) => {
  const supportAreas = [
    'Community outreach',
    'Research & Listening',
    'Surveys & Data Analysis',
    'Resource development',
    'Technology & Directory Tools',
    'Supplies & Information Packets',
    'Outreach materials',
    'Future frontline programs',
    'Employment initiatives',
    'Practical barrier relief',
    'Community projects',
    'Organizational development',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. AT THE VERY TOP: PROMINENT MANDATORY NOTICE (DEEP PURPLE & GOLD) */}
      <section className="bg-[#0b0f19] border-2 border-[#E5A93C] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-white">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-[#F3BA4F] shrink-0" />
          <h2
            className="text-lg sm:text-xl font-black uppercase tracking-wide text-[#F3BA4F]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            IMPORTANT INFORMATION ABOUT DONATIONS
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-100 leading-relaxed">
          <p className="text-base font-bold text-white">
            Fill the Gap is not yet a registered charity.
          </p>
          <p>
            We are currently building the organization with the goal of pursuing charitable status in the future.
          </p>
          <p className="font-bold text-slate-300">
            Because we are not currently a registered charity:
          </p>
          <div className="font-black text-[#0f172a] text-sm sm:text-base bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] p-3.5 rounded-xl inline-block shadow-md">
            We cannot issue official charitable tax receipts for donations received at this time.
          </div>
        </div>
      </section>

      {/* Page Title */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
          Support Our Mission
        </span>
        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          DONATE
        </h1>
      </div>

      {/* 2. HELP US FILL THE GAP */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              HELP US FILL THE GAP
            </h2>

            <div className="space-y-3 text-stone-700 text-base sm:text-lg leading-relaxed">
              <p>There are people across our Newfoundland & Labrador communities who need support.</p>
              <p>There are organizations already working hard to provide that support.</p>
              <p className="font-bold text-[#0f172a]">
                And there are gaps between people and the resources they urgently need.
              </p>
              <p>
                Fill the Gap wants to understand those gaps and find responsible, collaborative ways to help address them.
              </p>
              <p className="font-black text-[#0f172a] pt-2">
                Your support helps us build the foundation for that work.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-4 rounded-3xl bg-amber-50/80 border-2 border-[#E5A93C]/50 shadow-md text-center max-w-xs space-y-2 bg-white">
              <PuffinMascot
                className="w-full max-h-56 object-contain drop-shadow-md mx-auto"
                alt="Fill the Gap Puffin Mascot with Donation Box"
              />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 block">
                Fill the Gap donations • Giving Together
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOUR SUPPORT CAN HELP US BUILD */}
      <section className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WHAT YOUR SUPPORT CAN HELP US BUILD
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Depending on community needs and organizational priorities, support may eventually help with:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {supportAreas.map((area) => (
            <div
              key={area}
              className="p-3.5 bg-slate-50 border-slate-200 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-2.5 text-xs sm:text-sm text-[#0f172a] font-bold transition-colors shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DONATION PAYMENT STATUS (NO CREDIT CARDS / BANK INFO COLLECTED) */}
      <section className="bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#E5A93C] space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/40 flex items-center justify-center mx-auto shadow-md">
          <Clock className="w-7 h-7" />
        </div>

        <div className="space-y-3 max-w-xl mx-auto">
          <h2
            className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            SECURE DONATION PROCESSING COMING SOON
          </h2>
          <p className="text-sm sm:text-base text-slate-300/90 font-medium leading-relaxed">
            We are working toward establishing a secure mechanism for supporters to contribute.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md mx-auto text-xs text-slate-300/80 leading-relaxed font-medium">
          To protect your privacy and security, Fill the Gap does not collect or store credit card, debit, or banking information directly on this website. A verified, secure third-party payment method will be connected once established.
        </div>
      </section>

      {/* 5. OTHER WAYS TO HELP (CAN'T DONATE?) */}
      <section className="bg-slate-50 border-slate-200 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <h2
            className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            CAN'T DONATE?
          </h2>
          <p className="text-base text-[#0f172a] font-bold">
            That's okay. You can still make a profound impact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-[#0f172a]">
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
            <span>Take our community survey.</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
            <span>Share Fill the Gap with your network.</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
            <span>Tell us about a gap you've experienced or noticed.</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C] shrink-0" />
            <span>Get involved as volunteer opportunities become available.</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onOpenSurvey}
            className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider shadow-md border border-amber-200 cursor-pointer"
          >
            TAKE THE SURVEY
          </button>
          <button
            onClick={() => onNavigateToGetInvolved && onNavigateToGetInvolved()}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-[#0f172a] font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            GET INVOLVED
          </button>
        </div>
      </section>

    </div>
  );
};
