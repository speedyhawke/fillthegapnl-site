import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, ChevronRight, ChevronLeft, Heart, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdminStore } from '../data/adminStore';

interface CommunitySurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunitySurveyModal: React.FC<CommunitySurveyModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Survey step: 0 = Intro, 1..11 = Sections 1..11, 12 = Thank You
  const [currentSection, setCurrentSection] = useState<number>(0);

  // Form state
  // Section 1
  const [q1, setQ1] = useState<string>('');
  const [q1Other, setQ1Other] = useState<string>('');
  const [q2, setQ2] = useState<string>('');
  const [q2Other, setQ2Other] = useState<string>('');
  const [q3, setQ3] = useState<string>('');
  const [q4, setQ4] = useState<string>('');
  const [q5, setQ5] = useState<string>('');

  // Section 2
  const [q6, setQ6] = useState<string>('');
  const [q7, setQ7] = useState<string[]>([]);
  const [q7Other, setQ7Other] = useState<string>('');
  const [q8, setQ8] = useState<string>('');
  const [q9, setQ9] = useState<string>('');
  const [q10, setQ10] = useState<string>('');
  const [q11, setQ11] = useState<string>('');

  // Section 3
  const [q12, setQ12] = useState<string[]>([]);
  const [q12Other, setQ12Other] = useState<string>('');
  const [q13, setQ13] = useState<string[]>([]);
  const [q13Other, setQ13Other] = useState<string>('');
  const [q14, setQ14] = useState<string>('');
  const [q15, setQ15] = useState<string>('');

  // Section 4
  const [q16, setQ16] = useState<string>('');
  const [q17, setQ17] = useState<string[]>([]);
  const [q17Other, setQ17Other] = useState<string>('');
  const [q18, setQ18] = useState<string>('');
  const [q19, setQ19] = useState<string[]>([]);
  const [q19Other, setQ19Other] = useState<string>('');

  // Section 5
  const [q20, setQ20] = useState<string>('');
  const [q21, setQ21] = useState<string[]>([]);
  const [q21Other, setQ21Other] = useState<string>('');
  const [q22, setQ22] = useState<string>('');
  const [q23, setQ23] = useState<string>('');

  // Section 6
  const [q24, setQ24] = useState<number | null>(null);
  const [q25, setQ25] = useState<string[]>([]);
  const [q25Other, setQ25Other] = useState<string>('');
  const [q26, setQ26] = useState<string>('');
  const [q27, setQ27] = useState<string[]>([]);
  const [q27Other, setQ27Other] = useState<string>('');
  const [q28, setQ28] = useState<string>('');

  // Section 7
  const [q29, setQ29] = useState<string[]>([]);
  const [q29Other, setQ29Other] = useState<string>('');
  const [q30, setQ30] = useState<string>('');
  const [q31, setQ31] = useState<string>('');
  const [q32, setQ32] = useState<string>('');

  // Section 8
  const [q33, setQ33] = useState<string[]>([]);
  const [q33Other, setQ33Other] = useState<string>('');
  const [q34, setQ34] = useState<string>('');
  const [q35, setQ35] = useState<string>('');

  // Section 9
  const [q36, setQ36] = useState<string>('');
  const [q37, setQ37] = useState<string[]>([]);
  const [q37Other, setQ37Other] = useState<string>('');
  const [q38, setQ38] = useState<string>('');
  const [q39, setQ39] = useState<string[]>([]);
  const [q39Other, setQ39Other] = useState<string>('');

  // Section 10
  const [q40, setQ40] = useState<string>('');
  const [q41, setQ41] = useState<string>('');
  const [q42, setQ42] = useState<string>('');

  // Section 11
  const [q43, setQ43] = useState<string>('');
  const [q44, setQ44] = useState<string>('');
  const [q45, setQ45] = useState<string>('');
  const [q45Other, setQ45Other] = useState<string>('');
  const [q46, setQ46] = useState<string>('');

  if (!isOpen) return null;

  // Toggle helper for arrays
  const handleToggleMulti = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    maxLimit?: number
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      if (maxLimit && list.length >= maxLimit) {
        return; // limit reached
      }
      setList([...list, value]);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      submittedAt: new Date().toISOString(),
      q1, q1Other, q2, q2Other, q3, q4, q5,
      q6, q7, q7Other, q8, q9, q10, q11,
      q12, q12Other, q13, q13Other, q14, q15,
      q16, q17, q17Other, q18, q19, q19Other,
      q20, q21, q21Other, q22, q23,
      q24, q25, q25Other, q26, q27, q27Other, q28,
      q29, q29Other, q30, q31, q32,
      q33, q33Other, q34, q35,
      q36, q37, q37Other, q38, q39, q39Other,
      q40, q41, q42,
      q43, q44, q45, q45Other, q46,
    };

    try {
      AdminStore.addCommunitySurvey(submissionData);
    } catch {}

    setCurrentSection(12);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  const handleResetAndClose = () => {
    setCurrentSection(0);
    onClose();
  };

  const BARRIERS_LIST = [
    "Didn't know where to go",
    "Didn't know the service existed",
    "Couldn't find accurate information",
    "Couldn't reach anyone",
    "Long wait to receive a response",
    "Long wait for an appointment",
    "Transportation problems",
    "Cost",
    "Lack of childcare",
    "Work schedule",
    "Physical accessibility",
    "Communication difficulties",
    "Technology/internet access",
    "Difficulty completing forms",
    "Difficulty understanding eligibility requirements",
    "Too many steps",
    "Required documentation was difficult to obtain",
    "Didn't qualify for the service",
    "Service wasn't available locally",
    "Service wasn't available when needed",
    "Language barrier",
    "Fear or embarrassment",
    "Stigma",
    "Mental or emotional exhaustion",
    "Physical limitations",
    "Didn't know what to ask for",
    "Gave up because the process was too overwhelming",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f19]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-6 p-5 sm:p-8 shadow-2xl border-2 border-slate-200 relative max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 text-[#0f172a]">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-[#0f172a] hover:bg-slate-100 rounded-full transition-colors z-20"
          aria-label="Close survey"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Section Header & Progress indicator */}
        {currentSection > 0 && currentSection < 12 && (
          <div className="mb-6 space-y-2 border-b border-slate-200 pb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-700" />
                Community Survey • Section {currentSection} of 11
              </span>
              <span className="font-bold text-stone-500">
                {Math.round((currentSection / 11) * 100)}% Complete
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentSection / 11) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 0: SURVEY INTRODUCTION */}
        {/* ============================================================ */}
        {currentSection === 0 && (
          <div className="space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Fill the Gap — Community Survey</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Help Us Find the Gaps
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-medium bg-slate-50 border-slate-200 p-5 rounded-2xl border border-slate-200">
              <p className="font-bold text-[#0f172a] text-sm sm:text-base">
                Fill the Gap is just getting started.
              </p>
              <p>
                Before deciding what Fill the Gap should do, we want to listen.
              </p>
              <p>
                There are already many people, organizations, programs, and services working hard to help our communities. We don't want to assume we know what is missing.
              </p>
              <p className="font-semibold text-slate-800">
                We want to hear from the people who actually live here.
              </p>
              <p>
                This survey is about your experiences, what you've noticed, what has been difficult, and what you think could make things better.
              </p>
              <div className="p-3 bg-white/90 rounded-xl border border-slate-200 space-y-1.5 text-xs text-stone-800">
                <p>• You don't need to have a solution.</p>
                <p>• You don't need to know who is responsible for a problem.</p>
                <p>• You don't even need to have personally experienced a problem yourself.</p>
              </div>
              <p>
                If you've seen something that you think could be improved, we want to hear about it.
              </p>
              <p>
                Your answers will help Fill the Gap identify patterns and understand where there may be genuine gaps between people's needs and the help that is available.
              </p>
              <p className="font-bold text-amber-800 text-xs sm:text-sm pt-1">
                Thank you for helping us start this from the ground up.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-stone-600 hover:bg-slate-100 text-xs font-bold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(1)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-[#0f172a] font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-105 shadow-md flex items-center gap-2 border border-amber-300 cursor-pointer"
              >
                <span>Start Survey</span>
                <ChevronRight className="w-4 h-4 text-[#0f172a]" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 1 — ABOUT YOUR CONNECTION TO THE COMMUNITY */}
        {/* ============================================================ */}
        {currentSection === 1 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 1 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                About Your Connection to the Community
              </h3>
            </div>

            {/* Q1 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                1. What best describes your connection to Newfoundland and Labrador? <span className="text-slate-600 font-normal normal-case">(Select one)</span>
              </label>
              <div className="space-y-1.5 pt-1">
                {[
                  'I currently live in Newfoundland and Labrador',
                  'I previously lived in Newfoundland and Labrador',
                  'I work in Newfoundland and Labrador',
                  'I attend school in Newfoundland and Labrador',
                  'I have family or close connections here',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setQ1(opt); setQ1Other(''); }}
                    className={`w-full text-left p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      q1 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] ${
                      q1 === opt ? 'bg-amber-400 text-[#0f172a] border-amber-300 font-black' : 'border-slate-200 bg-white'
                    }`}>
                      {q1 === opt ? '✓' : ''}
                    </span>
                  </button>
                ))}
                {/* Other */}
                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="Other — please specify"
                    value={q1Other}
                    onChange={(e) => { setQ1Other(e.target.value); setQ1('Other'); }}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                2. What area of Newfoundland and Labrador are you connected to? <span className="text-slate-600 font-normal normal-case">(Select one)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  "St. John's",
                  "Mount Pearl",
                  "Paradise",
                  "Conception Bay South",
                  "Torbay",
                  "Portugal Cove–St. Philip's",
                  "Other community in the Northeast Avalon",
                  "Other area of Newfoundland",
                  "Labrador",
                  "Prefer not to say"
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setQ2(opt); setQ2Other(''); }}
                    className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      q2 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                      q2 === opt ? 'bg-amber-400 text-[#0f172a] border-amber-300 font-black' : 'border-slate-200 bg-white'
                    }`}>
                      {q2 === opt ? '✓' : ''}
                    </span>
                  </button>
                ))}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q2Other}
                  onChange={(e) => { setQ2Other(e.target.value); setQ2('Other'); }}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q3 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                3. Which age group are you in?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                {['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefer not to say'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ3(opt)}
                    className={`text-center p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      q3 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                4. Which best describes your household?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'I live alone',
                  'I live with a partner/spouse',
                  'I live with children',
                  'I live with parents/family',
                  'I live with roommates',
                  'I live in another household arrangement',
                  'Prefer not to say'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ4(opt)}
                    className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      q4 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                      q4 === opt ? 'bg-amber-400 text-[#0f172a] border-amber-300 font-black' : 'border-slate-200 bg-white'
                    }`}>
                      {q4 === opt ? '✓' : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Q5 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                5. Do you currently have someone you can turn to when you need help navigating a difficult situation?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Yes, usually', 'Sometimes', 'Rarely', 'No', "I'm not sure"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ5(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q5 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(0)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back to Intro
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(2)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 2</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 2 — EXPERIENCES GETTING HELP */}
        {/* ============================================================ */}
        {currentSection === 2 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 2 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                Experiences Getting Help
              </h3>
            </div>

            {/* Q6 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                6. In the past five years, have you or someone close to you needed help from a community, government, healthcare, social-service, charitable, or other support?
              </label>
              <div className="flex gap-2 pt-1">
                {['Yes', 'No', 'Not sure'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ6(opt)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase border transition-all ${
                      q6 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q7 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                7. If yes, what types of help were needed? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Food',
                  'Housing',
                  'Emergency housing',
                  'Transportation',
                  'Healthcare',
                  'Mental-health support',
                  'Addiction/substance-use support',
                  'Disability-related support',
                  'Financial assistance',
                  'Employment',
                  'Education',
                  'Childcare',
                  'Parenting/family support',
                  'Support for seniors',
                  'Support for youth',
                  'Support for people experiencing homelessness',
                  'Legal assistance',
                  'Domestic violence/family violence support',
                  'Clothing or basic necessities',
                  'Medication or access to prescriptions',
                  'Help accessing government programs',
                  'Help finding community resources',
                  'Help completing applications/forms'
                ].map((opt) => {
                  const isSelected = q7.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q7, setQ7, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q7Other}
                  onChange={(e) => setQ7Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q8 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                8. How difficult was it to figure out where to go for help?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', "I don't know"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ8(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q8 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q9 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                9. How many different places or people did you have to contact before reaching the help you needed?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                {['1', '2', '3', '4', '5 or more', "I don't remember", "I never found the help I needed", 'Not applicable'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ9(opt)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      q9 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q10 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                10. Have you ever been referred from one organization or service to another without getting the help you originally needed?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Frequently', 'Sometimes', 'Once', 'Never', 'Not sure', 'Not applicable'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ10(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q10 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q11 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                11. Have you ever had difficulty figuring out who was actually responsible for helping with your situation?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Yes, frequently', 'Yes, sometimes', 'Once', 'No', 'Not sure'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ11(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q11 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(1)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(3)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 3</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 3 — BARRIERS */}
        {/* ============================================================ */}
        {currentSection === 3 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 3 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                Barriers
              </h3>
            </div>

            {/* Q12 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                12. What kinds of things have made it difficult for you or someone you know to access help? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {BARRIERS_LIST.map((opt) => {
                  const isSelected = q12.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q12, setQ12, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q12Other}
                  onChange={(e) => setQ12Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q13 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                13. Which of these barriers do you think causes the BIGGEST problems for people in our community? <span className="text-amber-700 font-bold normal-case">(Select up to three — {q13.length}/3 selected)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {BARRIERS_LIST.map((opt) => {
                  const isSelected = q13.includes(opt);
                  const isMaxed = q13.length >= 3 && !isSelected;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isMaxed}
                      onClick={() => handleToggleMulti(q13, setQ13, opt, 3)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                          : isMaxed
                          ? 'bg-stone-50 border-stone-100 text-stone-400 opacity-60 cursor-not-allowed'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-amber-400 text-[#0f172a] font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q13Other}
                  onChange={(e) => setQ13Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q14 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                14. Have you ever given up trying to get help because the process became too overwhelming?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                {['Yes', 'No', 'Maybe', 'Prefer not to say'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ14(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q14 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q15 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                15. If you answered yes, what made you give up? <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={3}
                value={q15}
                onChange={(e) => setQ15(e.target.value)}
                placeholder="Share your experience here if comfortable..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(2)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(4)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 4</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 4 — INFORMATION AND NAVIGATION */}
        {/* ============================================================ */}
        {currentSection === 4 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 4 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                Information and Navigation
              </h3>
            </div>

            {/* Q16 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                16. How easy do you think it is for people to find accurate information about available community resources?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Very easy', 'Somewhat easy', 'Neither easy nor difficult', 'Somewhat difficult', 'Very difficult', "I don't know"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ16(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q16 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q17 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                17. Where do you usually look when you need information about getting help? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Google/search engine',
                  'Facebook',
                  'Other social media',
                  'Government websites',
                  'Community organization websites',
                  'Healthcare providers',
                  'Friends or family',
                  'Someone who has experienced the same thing',
                  'Calling organizations directly',
                  'Libraries/community centres',
                  'Schools',
                  'Religious/community groups',
                  "I don't know where to look"
                ].map((opt) => {
                  const isSelected = q17.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q17, setQ17, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q17Other}
                  onChange={(e) => setQ17Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q18 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                18. Have you ever found information online that was outdated, confusing, incomplete, or difficult to understand?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Frequently', 'Sometimes', 'Once', 'Never', 'Not sure'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ18(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q18 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q19 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                19. What would make finding help easier? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'One place to search for available resources',
                  'Easier-to-understand information',
                  'Clear eligibility information',
                  'Clear instructions about how to apply',
                  'Phone numbers and contact information in one place',
                  'Knowing what to expect before contacting a service',
                  'Help figuring out which service is appropriate',
                  'Someone helping explain the next steps',
                  'Better communication between organizations',
                  'More local resources'
                ].map((opt) => {
                  const isSelected = q19.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q19, setQ19, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q19Other}
                  onChange={(e) => setQ19Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(3)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(5)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 5</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 5 — WHEN EXISTING HELP DOESN'T FIT */}
        {/* ============================================================ */}
        {currentSection === 5 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 5 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                When Existing Help Doesn't Fit
              </h3>
            </div>

            {/* Q20 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                20. Have you ever found a service that seemed like it should help, but it didn't quite fit your situation?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Yes, frequently', 'Yes, sometimes', 'Once', 'No', 'Not sure'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ20(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q20 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q21 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                21. If yes, what made it a poor fit? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Eligibility requirements',
                  'Age requirements',
                  'Location',
                  'Cost',
                  'Availability',
                  'Timing',
                  'Transportation',
                  'The type of help offered',
                  'The amount of help offered',
                  'Required paperwork',
                  'The process was too complicated',
                  'My situation was too complicated',
                  'I needed several types of help at once'
                ].map((opt) => {
                  const isSelected = q21.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q21, setQ21, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q21Other}
                  onChange={(e) => setQ21Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q22 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                22. Have you ever needed help with something that didn't seem to fit neatly into any existing service?
              </label>
              <div className="flex gap-2 pt-1">
                {['Yes', 'No', 'Not sure'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ22(opt)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase border transition-all ${
                      q22 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q23 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                23. If you're comfortable, briefly describe what happened. <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={3}
                value={q23}
                onChange={(e) => setQ23(e.target.value)}
                placeholder="Briefly describe what happened..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(4)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(6)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 6</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 6 — PEOPLE WHO DON'T HAVE SOMEONE IN THEIR CORNER */}
        {/* ============================================================ */}
        {currentSection === 6 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 6 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                People Who Don't Have Someone in Their Corner
              </h3>
            </div>

            {/* Q24 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                24. How important do you think it is for people to have someone who can help them navigate difficult situations?
              </label>
              <p className="text-[11px] text-stone-500 font-semibold">Rating from 1 (Not important) to 5 (Extremely important):</p>
              <div className="grid grid-cols-5 gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setQ24(val)}
                    className={`py-3 rounded-xl text-center border font-black text-sm transition-all ${
                      q24 === val
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-md scale-105'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>{val}</div>
                    <div className="text-[9px] font-bold text-stone-500 mt-0.5">
                      {val === 1 ? 'Not important' : val === 5 ? 'Extremely' : ''}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Q25 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                25. What do you think happens to people who don't have someone to make phone calls, find information, explain options, or help them figure out what to do next? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'They eventually find help on their own',
                  'They may take much longer to get help',
                  'They may miss out on available services',
                  'They may become frustrated',
                  'They may become overwhelmed',
                  'They may give up',
                  'Their situation may become worse',
                  'They may rely on emergency services',
                  'They may rely heavily on friends or family',
                  "I'm not sure"
                ].map((opt) => {
                  const isSelected = q25.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q25, setQ25, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q25Other}
                  onChange={(e) => setQ25Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q26 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                26. Have you ever been that person for someone else?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                {['Yes, frequently', 'Yes, sometimes', 'Once or twice', 'No'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ26(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q26 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q27 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                27. If yes, what kinds of things have you helped someone with? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Making phone calls',
                  'Finding information',
                  'Finding organizations/services',
                  'Filling out forms',
                  'Making appointments',
                  'Transportation',
                  'Finding food',
                  'Finding housing',
                  'Healthcare',
                  'Mental-health support',
                  'Employment',
                  'Financial assistance',
                  'Government programs'
                ].map((opt) => {
                  const isSelected = q27.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q27, setQ27, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q27Other}
                  onChange={(e) => setQ27Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q28 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                28. How difficult was it for you to figure out what to do for that person?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
                {['Very easy', 'Somewhat easy', 'Neither', 'Somewhat difficult', 'Very difficult'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ28(opt)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      q28 === opt
                        ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(5)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(7)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 7</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 7 — WHAT COULD MAKE A DIFFERENCE? */}
        {/* ============================================================ */}
        {currentSection === 7 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 7 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                What Could Make a Difference?
              </h3>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-bold">
              Note: The options below represent areas to explore and learn about, not promises that Fill the Gap will provide these services.
            </div>

            {/* Q29 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                29. Which kinds of support do you think could make it easier for people to get through difficult situations? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Easier access to information',
                  'Help finding the appropriate service',
                  'Help understanding available options',
                  'Help navigating complicated systems',
                  'Better connections between existing organizations',
                  'Practical short-term assistance',
                  'Transportation assistance',
                  'Help with forms/applications',
                  'Help preparing for appointments',
                  'Help preparing for employment',
                  'Help finding basic necessities',
                  'Someone who can listen without judgment',
                  'Clearer information about existing resources',
                  'More community education'
                ].map((opt) => {
                  const isSelected = q29.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q29, setQ29, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q29Other}
                  onChange={(e) => setQ29Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q30 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                30. If you could make ONE thing easier for people trying to get help in our community, what would it be? <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={2}
                value={q30}
                onChange={(e) => setQ30(e.target.value)}
                placeholder="What is one thing that would make getting help easier?"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Q31 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                31. What is one problem you think people don't talk about enough? <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={2}
                value={q31}
                onChange={(e) => setQ31(e.target.value)}
                placeholder="A challenge or topic that isn't talked about enough..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Q32 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                32. What is one small change that you think could make a big difference? <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={2}
                value={q32}
                onChange={(e) => setQ32(e.target.value)}
                placeholder="One small, practical change..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(6)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(8)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 8</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 8 — COMMUNITY PRIORITIES */}
        {/* ============================================================ */}
        {currentSection === 8 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 8 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                Community Priorities
              </h3>
            </div>

            {/* Q33 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                33. Which areas do you think deserve more attention in our communities? <span className="text-amber-700 font-bold normal-case">(Select up to five — {q33.length}/5 selected)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Food insecurity',
                  'Housing',
                  'Homelessness',
                  'Healthcare access',
                  'Mental-health support',
                  'Addiction/substance-use support',
                  'Disability support',
                  'Seniors',
                  'Youth',
                  'Children and families',
                  'Employment',
                  'Education',
                  'Transportation',
                  'Poverty/financial hardship',
                  'Access to government services',
                  'Domestic/family violence',
                  'Social isolation'
                ].map((opt) => {
                  const isSelected = q33.includes(opt);
                  const isMaxed = q33.length >= 5 && !isSelected;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isMaxed}
                      onClick={() => handleToggleMulti(q33, setQ33, opt, 5)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                          : isMaxed
                          ? 'bg-stone-50 border-stone-100 text-stone-400 opacity-60 cursor-not-allowed'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-amber-400 text-[#0f172a] font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q33Other}
                  onChange={(e) => setQ33Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q34 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                34. Of the areas you selected, which ONE do you believe is most urgent? <span className="text-slate-600 font-normal normal-case">(Select one)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {(q33.length > 0 ? q33 : [
                  'Food insecurity', 'Housing', 'Homelessness', 'Healthcare access', 'Mental-health support', 'Addiction/substance-use support'
                ]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ34(opt)}
                    className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      q34 === opt
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                        : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                      q34 === opt ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                    }`}>
                      {q34 === opt ? '✓' : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Q35 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                35. Why do you believe this is particularly important? <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={3}
                value={q35}
                onChange={(e) => setQ35(e.target.value)}
                placeholder="Explain why this area is urgent or important to you..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(7)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(9)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 9</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 9 — IDEAS FOR FILL THE GAP */}
        {/* ============================================================ */}
        {currentSection === 9 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 9 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                Ideas for Fill the Gap
              </h3>
            </div>

            {/* Q36 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                36. What do you think Fill the Gap should focus on learning about first? <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={2}
                value={q36}
                onChange={(e) => setQ36(e.target.value)}
                placeholder="What should we research and explore first?"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Q37 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                37. What would make you more likely to trust and use an organization like Fill the Gap? <span className="text-slate-600 font-normal normal-case">(Select all that apply)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Transparency',
                  'Honesty about what it can and cannot do',
                  'Listening to the community',
                  'Working with existing organizations',
                  "Respecting people's privacy",
                  'Treating people without judgment',
                  'Following through on commitments',
                  'Being accessible',
                  'Clearly explaining where information comes from',
                  'Showing how research is being used'
                ].map((opt) => {
                  const isSelected = q37.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleToggleMulti(q37, setQ37, opt)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0f172a] border-amber-300 font-black shadow-2xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-slate-900 text-amber-300 font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q37Other}
                  onChange={(e) => setQ37Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Q38 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                38. What would make you NOT trust an organization like Fill the Gap? <span className="text-slate-600 font-normal normal-case">(Optional written response)</span>
              </label>
              <textarea
                rows={2}
                value={q38}
                onChange={(e) => setQ38(e.target.value)}
                placeholder="What red flags or practices would break trust?"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Q39 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                39. If Fill the Gap eventually develops programs or projects, what should be most important when deciding what to work on? <span className="text-amber-700 font-bold normal-case">(Select up to three — {q39.length}/3 selected)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {[
                  'Number of people affected',
                  'Severity of the problem',
                  'Whether existing help is unavailable',
                  'Whether a practical solution is possible',
                  'Whether the community wants it',
                  'Whether professionals identify it as a recurring problem',
                  'Whether a small intervention could make a significant difference',
                  'Cost and available resources'
                ].map((opt) => {
                  const isSelected = q39.includes(opt);
                  const isMaxed = q39.length >= 3 && !isSelected;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isMaxed}
                      onClick={() => handleToggleMulti(q39, setQ39, opt, 3)}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                          : isMaxed
                          ? 'bg-stone-50 border-stone-100 text-stone-400 opacity-60 cursor-not-allowed'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] shrink-0 ml-1 ${
                        isSelected ? 'bg-amber-400 text-[#0f172a] font-black' : 'border border-slate-200 bg-white'
                      }`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  placeholder="Other — please specify"
                  value={q39Other}
                  onChange={(e) => setQ39Other(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(8)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(10)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Section 10</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 10 — YOUR EXPERIENCE */}
        {/* ============================================================ */}
        {currentSection === 10 && (
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 10 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                Your Experience
              </h3>
            </div>

            {/* Q40 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                40. Without sharing identifying information, is there a particular experience that helped you recognize a gap in our community? <span className="text-slate-600 font-normal normal-case">(Optional long written response)</span>
              </label>
              <textarea
                rows={3}
                value={q40}
                onChange={(e) => setQ40(e.target.value)}
                placeholder="Share your personal observation or experience..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Q41 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                41. Is there something you wish someone had told you when you or someone you cared about was struggling? <span className="text-slate-600 font-normal normal-case">(Optional long written response)</span>
              </label>
              <textarea
                rows={3}
                value={q41}
                onChange={(e) => setQ41(e.target.value)}
                placeholder="What advice, insight, or information do you wish had been shared?"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Q42 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                42. Is there something you wish existed when you needed help? <span className="text-slate-600 font-normal normal-case">(Optional long written response)</span>
              </label>
              <textarea
                rows={3}
                value={q42}
                onChange={(e) => setQ42(e.target.value)}
                placeholder="What service, tool, or support do you wish existed?"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentSection(9)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentSection(11)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>Final Section</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 11 — FINAL THOUGHTS & SUBMIT */}
        {/* ============================================================ */}
        {currentSection === 11 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6 text-left">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Section 11 of 11</span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f172a] uppercase">
                Final Thoughts
              </h3>
            </div>

            <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl space-y-2 text-xs sm:text-sm">
              <h4 className="font-black text-amber-300 uppercase tracking-wider text-xs">
                BEFORE YOU GO...
              </h4>
              <p className="font-semibold text-white">
                You've made it this far, and your input genuinely matters.
              </p>
              <p className="text-slate-300 text-xs">
                We're starting from square one. We don't know yet what all the answers will tell us. That's the point. We're listening first.
              </p>
            </div>

            {/* Q43 */}
            <div className="space-y-2 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                43. IS THERE ANYTHING ELSE YOU WOULD LIKE FILL THE GAP TO KNOW? <span className="text-slate-600 font-normal normal-case">(Large optional text box)</span>
              </label>
              <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                This is your space. Tell us about something we didn't ask. Share a concern, experience, idea, suggestion, resource, observation, or anything else you think could help us understand the gaps in our community. There is no right or wrong answer.
              </p>
              <textarea
                rows={5}
                value={q43}
                onChange={(e) => setQ43(e.target.value)}
                placeholder="Your open-ended thoughts, observations, suggestions..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            {/* Optional Follow-up: Q44, Q45, Q46 */}
            <div className="space-y-4 p-4 bg-slate-50 border-slate-200 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                <h4 className="text-xs font-black uppercase tracking-wider text-[#0f172a]">
                  Optional Research Follow-Up
                </h4>
              </div>

              {/* Q44 */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0f172a]">
                  44. Would you be interested in hearing about what Fill the Gap learns from this research?
                </label>
                <div className="flex gap-2">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setQ44(opt)}
                      className={`px-5 py-2 rounded-xl text-xs font-black uppercase border transition-all ${
                        q44 === opt
                          ? 'bg-slate-900 text-amber-300 border-slate-800 shadow-xs'
                          : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q45 */}
              {q44 === 'Yes' && (
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <label className="block text-xs font-bold text-[#0f172a]">
                    45. How would you prefer to hear about it?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {['Fill the Gap website', 'Facebook', 'Email'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setQ45(opt); setQ45Other(''); }}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          q45 === opt
                            ? 'bg-slate-900 text-amber-300 border-slate-800'
                            : 'bg-white border-slate-200 text-stone-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Other — please specify"
                    value={q45Other}
                    onChange={(e) => { setQ45Other(e.target.value); setQ45('Other'); }}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              )}

              {/* Q46 */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold text-[#0f172a]">
                  46. Optional email address:
                </label>
                <p className="text-[11px] text-stone-500 font-medium">
                  Providing an email address is completely OPTIONAL and is NOT required to complete this survey.
                </p>
                <input
                  type="email"
                  placeholder="your.email@example.com (Optional)"
                  value={q46}
                  onChange={(e) => setQ46(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0f172a] focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Navigation & Submit */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentSection(10)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 text-[#0f172a] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg border border-amber-300 flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current text-[#0f172a]" />
                <span>Submit Community Survey</span>
              </button>
            </div>
          </form>
        )}

        {/* ============================================================ */}
        {/* STEP 12: EXACT POST-SUBMISSION THANK YOU PAGE */}
        {/* ============================================================ */}
        {currentSection === 12 && (
          <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-9 h-9 text-amber-400" />
            </div>

            <div className="space-y-4 max-w-lg mx-auto">
              <h3
                className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                THANK YOU FOR HELPING US START.
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-medium bg-slate-50 border-slate-200 p-5 rounded-2xl border border-slate-200 text-left">
                <p className="font-bold text-[#0f172a]">
                  Fill the Gap is still at the beginning.
                </p>
                <p>
                  Your answers will help us understand what people are experiencing, look for patterns, and learn where there may be genuine gaps between people's needs and the help that exists.
                </p>
                <p>
                  We can't promise what will come from this research.
                </p>
                <p className="font-bold text-slate-900">
                  But we can promise that we're listening.
                </p>
                <p>
                  Thank you for taking the time to help shape the beginning of Fill the Gap.
                </p>
              </div>

              {/* Tagline */}
              <div className="pt-2 text-xs font-black uppercase tracking-wider text-amber-600 space-y-1">
                <div>ONE QUESTION.</div>
                <div>ONE CONVERSATION.</div>
                <div>ONE SURVEY.</div>
                <div className="text-slate-900 text-sm pt-0.5">ONE STEP AT A TIME.</div>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase transition-all shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
