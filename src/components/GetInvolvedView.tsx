import React, { useState } from 'react';
import {
  ClipboardList,
  Share2,
  Users2,
  Handshake,
  HeartHandshake,
  Check,
  Copy,
  Mail,
  Briefcase,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface GetInvolvedViewProps {
  onOpenSurvey: () => void;
  onOpenProfessionalSurvey?: () => void;
  onNavigateToDonate: () => void;
}

export const GetInvolvedView: React.FC<GetInvolvedViewProps> = ({
  onOpenSurvey,
  onOpenProfessionalSurvey,
  onNavigateToDonate,
}) => {
  const [copied, setCopied] = useState(false);
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerSubscribed, setVolunteerSubscribed] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleVolunteerInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteerEmail.trim()) {
      setVolunteerSubscribed(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
          Community Participation
        </span>
        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          GET INVOLVED
        </h1>
        <div className="text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed space-y-1">
          <p className="font-bold text-[#0f172a]">
            Fill the Gap isn't something one person can build alone.
          </p>
          <p className="text-stone-600">
            There are many practical ways to participate and support our mission in Newfoundland & Labrador.
          </p>
        </div>
      </div>

      {/* Grid of the Ways to Help */}
      <div className="space-y-6">

        {/* 1. TAKE THE SURVEYS */}
        <section className="civic-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/40 flex items-center justify-center shadow-xs">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              TAKE A SURVEY
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-bold">
              Tell us about gaps you've experienced or noticed in our community.
            </p>
            <p className="text-xs text-stone-500 font-medium">
              Choose the survey tailored for residents or frontline professionals & agencies. Completely confidential.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenSurvey}
              className="gold-gradient-btn px-6 py-3.5 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-amber-200 cursor-pointer"
            >
              <ClipboardList className="w-4 h-4 text-[#0f172a]" />
              <span>Community Survey</span>
            </button>
            {onOpenProfessionalSurvey && (
              <button
                onClick={onOpenProfessionalSurvey}
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-[#F3BA4F] font-black text-xs uppercase tracking-wider transition-all shadow-sm border border-[#E5A93C]/60 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#F3BA4F]" />
                <span>Professional Surveys</span>
              </button>
            )}
          </div>
        </section>

        {/* 2. SHARE */}
        <section className="civic-card rounded-3xl p-8 sm:p-10 space-y-5">
          <div className="space-y-2 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              SHARE
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              Share Fill the Gap with your network to help us reach more residents across Newfoundland & Labrador.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleCopyLink}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-100 text-[#0f172a] border border-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Website Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-800" />
                  <span>Copy Website Link (fillthegapnl.ca)</span>
                </>
              )}
            </button>

            <a
              href="mailto:?subject=Fill%20the%20Gap%20%E2%80%94%20St.%20John's%2C%20NL&body=Check%20out%20Fill%20the%20Gap%20in%20St.%20John's%2C%20NL%20helping%20bridge%20gaps%20between%20people%20and%20community%20support%3A%20https%3A%2F%2Ffillthegapnl.ca"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-100 text-[#0f172a] border border-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4 text-slate-800" />
              <span>Share by Email</span>
            </a>
          </div>
        </section>

        {/* 3. VOLUNTEER */}
        <section className="civic-card rounded-3xl p-8 sm:p-10 space-y-5">
          <div className="space-y-2 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/40 flex items-center justify-center shadow-xs">
              <Users2 className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              VOLUNTEER
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              As Fill the Gap develops, volunteer opportunities will open.
            </p>
            <p className="text-xs text-stone-500 font-medium italic">
              We are currently in the research and community listening phase. Enter your email below to receive updates when volunteer initiatives launch in St. John's and across NL.
            </p>
          </div>

          {volunteerSubscribed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-emerald-900 font-bold">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you for your interest. We will contact you as soon as volunteer roles open.</span>
            </div>
          ) : (
            <form onSubmit={handleVolunteerInterest} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={volunteerEmail}
                onChange={(e) => setVolunteerEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border-slate-200 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0f172a] focus:ring-2 focus:ring-[#1e293b] focus:border-[#1e293b] outline-none font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-[#1A0A38] text-white font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                Notify Me
              </button>
            </form>
          )}
        </section>

        {/* 4. PARTNERSHIPS */}
        <section className="civic-card rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="space-y-3 max-w-3xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/40 flex items-center justify-center shadow-xs">
              <Handshake className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              PARTNERSHIPS
            </h2>
            <p className="text-lg sm:text-xl font-bold text-[#0f172a]">
              We want to work with the people already doing the work.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              Fill the Gap isn't here to replace existing organizations — it's here to work alongside them. We're interested in partnering with:
            </p>
          </div>

          {/* Partner types grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {[
              'Existing charities & nonprofits',
              'Community organizations',
              'Businesses & employers',
              'Government & community services',
              'Volunteers',
              'People with lived experience',
            ].map((partnerType, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-100/60 rounded-2xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm font-bold text-[#0f172a]"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] shrink-0" />
                <span>{partnerType}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="mailto:info@fillthegapnl.ca?subject=Partnership%20Inquiry%20%E2%80%94%20Fill%20the%20Gap"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0f172a] hover:text-slate-800 bg-slate-100 hover:bg-slate-100 border border-slate-200 px-5 py-3 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <Mail className="w-4 h-4 text-slate-800" />
              <span>Reach out to info@fillthegapnl.ca</span>
            </a>
          </div>
        </section>

        {/* 5. DONATE */}
        <section className="bg-[#0f172a] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#E5A93C] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-slate-800 text-[#F3BA4F] border border-[#E5A93C]/50 flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2
              className="text-2xl font-black text-white uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              DONATE
            </h2>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
              Financial support helps us conduct community research and develop future frontline support initiatives.
            </p>
          </div>
          <button
            onClick={onNavigateToDonate}
            className="gold-gradient-btn px-8 py-4 rounded-2xl text-[#0f172a] font-black text-xs uppercase tracking-wider border border-amber-200 shrink-0 cursor-pointer"
          >
            DONATE
          </button>
        </section>

      </div>

    </div>
  );
};
