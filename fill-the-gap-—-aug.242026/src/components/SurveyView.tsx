import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, MapPin, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurveyViewProps {
  onNavigateToResources?: () => void;
}

export const SurveyView: React.FC<SurveyViewProps> = ({ onNavigateToResources }) => {
  const gapOptions = [
    'Food',
    'Housing',
    'Employment',
    'Transportation',
    'Addiction/recovery support',
    'Mental health/community support',
    'Family support',
    "Children's needs",
    'Basic necessities',
    'Access to services',
    'Other'
  ];

  const [selectedGaps, setSelectedGaps] = useState<string[]>([]);
  const [struggledToFind, setStruggledToFind] = useState<'Yes' | 'No' | 'Unsure' | ''>('');
  const [whatMadeDifficult, setWhatMadeDifficult] = useState('');
  const [sentFromOneToAnother, setSentFromOneToAnother] = useState<'Yes' | 'No' | ''>('');
  const [whatIsMissing, setWhatIsMissing] = useState('');
  const [oneThingWishExisted, setOneThingWishExisted] = useState('');
  const [anythingElse, setAnythingElse] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleGap = (gap: string) => {
    if (selectedGaps.includes(gap)) {
      setSelectedGaps(selectedGaps.filter(g => g !== gap));
    } else {
      setSelectedGaps([...selectedGaps, gap]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Title & Intro */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-800" />
          St. John's & Newfoundland Community Survey
        </span>
        <h1
          className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight uppercase"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          TELL US WHERE THE GAPS ARE
        </h1>
        <p className="text-base sm:text-lg text-[#0f172a] font-bold max-w-3xl leading-relaxed">
          We don't want to guess what our community needs. We want to hear from the people who live here.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1e293b] text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-10 h-10 text-amber-400" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h2
              className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Thank You For Sharing Your Voice
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
              Your responses will help us understand community needs and identify potential gaps.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedGaps([]);
                setStruggledToFind('');
                setWhatMadeDifficult('');
                setSentFromOneToAnother('');
                setWhatIsMissing('');
                setOneThingWishExisted('');
                setAnythingElse('');
              }}
              className="px-5 py-3 rounded-2xl border border-slate-200 hover:bg-slate-100 text-[#0f172a] font-bold text-xs uppercase"
            >
              Submit Another Response
            </button>
            {onNavigateToResources && (
              <button
                onClick={onNavigateToResources}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 text-[#0f172a] font-black text-xs uppercase shadow-md border border-amber-300"
              >
                Browse Verified Resources
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-10">
          
          {/* Question 1: What areas have the biggest gaps */}
          <div className="space-y-3">
            <label className="block font-black text-[#0f172a] text-base sm:text-lg">
              1. What areas do you believe have the biggest gaps in support?
            </label>
            <p className="text-xs text-stone-500">Select all that apply:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              {gapOptions.map((gap) => {
                const isSelected = selectedGaps.includes(gap);
                return (
                  <button
                    key={gap}
                    type="button"
                    onClick={() => toggleGap(gap)}
                    className={`p-3.5 rounded-2xl text-left text-xs font-bold border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-[#0f172a] border-amber-300 shadow-sm font-black'
                        : 'bg-slate-100 border-slate-200 text-stone-700 hover:bg-slate-100 hover:text-[#0f172a]'
                    }`}
                  >
                    <span>{gap}</span>
                    <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-[#0f172a] text-amber-300 font-black' : 'border border-slate-200 bg-white'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Struggled to find right place */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="block font-black text-[#0f172a] text-base sm:text-lg">
              2. Have you ever needed help but struggled to find the right place to get it?
            </label>
            <div className="flex flex-wrap gap-3">
              {(['Yes', 'No', 'Unsure'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStruggledToFind(opt)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border transition-all ${
                    struggledToFind === opt
                      ? 'bg-[#0f172a] text-amber-300 border-amber-400/50 shadow-sm'
                      : 'bg-slate-100 border-slate-200 text-stone-700 hover:bg-slate-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: What made it difficult */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <label className="block font-black text-[#0f172a] text-base sm:text-lg">
              3. What made it difficult?
            </label>
            <textarea
              rows={3}
              value={whatMadeDifficult}
              onChange={(e) => setWhatMadeDifficult(e.target.value)}
              placeholder="Share what barriers or challenges you ran into..."
              className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:border-slate-200"
            />
          </div>

          {/* Question 4: Sent from one to another */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="block font-black text-[#0f172a] text-base sm:text-lg">
              4. Have you ever been sent from one organization or service to another?
            </label>
            <div className="flex flex-wrap gap-3">
              {(['Yes', 'No'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSentFromOneToAnother(opt)}
                  className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border transition-all ${
                    sentFromOneToAnother === opt
                      ? 'bg-[#0f172a] text-amber-300 border-amber-400/50 shadow-sm'
                      : 'bg-slate-100 border-slate-200 text-stone-700 hover:bg-slate-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 5: What is missing in our community */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <label className="block font-black text-[#0f172a] text-base sm:text-lg">
              5. What do you think is missing in our community?
            </label>
            <textarea
              rows={3}
              value={whatIsMissing}
              onChange={(e) => setWhatIsMissing(e.target.value)}
              placeholder="Tell us what resources or support are absent..."
              className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:border-slate-200"
            />
          </div>

          {/* Question 6: What is one thing you wish existed */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <label className="block font-black text-[#0f172a] text-base sm:text-lg">
              6. What is one thing you wish existed?
            </label>
            <textarea
              rows={3}
              value={oneThingWishExisted}
              onChange={(e) => setOneThingWishExisted(e.target.value)}
              placeholder="If you could create one practical program or service, what would it be?"
              className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:border-slate-200"
            />
          </div>

          {/* Question 7: Anything else Fill the Gap should know */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <label className="block font-black text-[#0f172a] text-base sm:text-lg">
              7. Is there anything else you think Fill the Gap should know?
            </label>
            <textarea
              rows={3}
              value={anythingElse}
              onChange={(e) => setAnythingElse(e.target.value)}
              placeholder="Any other comments, thoughts, or suggestions..."
              className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:border-slate-200"
            />
          </div>

          {/* Survey Guarantee Note */}
          <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs text-slate-800 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
            <p className="font-bold text-[#0f172a]">
              Your responses will help us understand community needs and identify potential gaps. Responses are collected securely and never published publicly.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 text-[#0f172a] font-black text-sm uppercase tracking-wider transition-all shadow-md border border-amber-300 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Survey Responses</span>
          </button>

        </form>
      )}

    </div>
  );
};
