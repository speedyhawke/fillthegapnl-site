import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  Building2,
  Send,
  ArrowRight,
  ArrowLeft,
  Users,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  HelpCircle,
  Lock,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdminStore } from '../data/adminStore';

interface ProfessionalSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfessionalSurveyModal: React.FC<ProfessionalSurveyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 11;

  // Section 1 — Professional Background (Q1–Q4)
  const [q1, setQ1] = useState('');
  const [q1Other, setQ1Other] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q3Other, setQ3Other] = useState('');
  const [q4, setQ4] = useState('');
  const [q4Other, setQ4Other] = useState('');

  // Section 2 — What You See (Q5–Q9)
  const [q5, setQ5] = useState<string[]>([]);
  const [q5Other, setQ5Other] = useState('');
  const [q6, setQ6] = useState<string[]>([]);
  const [q6Other, setQ6Other] = useState('');
  const [q7, setQ7] = useState('');
  const [q7Other, setQ7Other] = useState('');
  const [q8, setQ8] = useState('');
  const [q9, setQ9] = useState('');

  // Section 3 — Barriers (Q10–Q13)
  const [q10, setQ10] = useState<string[]>([]);
  const [q10Other, setQ10Other] = useState('');
  const [q11, setQ11] = useState<string[]>([]);
  const [q11Other, setQ11Other] = useState('');
  const [q12, setQ12] = useState('');
  const [q13, setQ13] = useState<string[]>([]);
  const [q13Other, setQ13Other] = useState('');

  // Section 4 — Referrals and Navigation (Q14–Q18)
  const [q14, setQ14] = useState('');
  const [q15, setQ15] = useState('');
  const [q16, setQ16] = useState<string[]>([]);
  const [q16Other, setQ16Other] = useState('');
  const [q17, setQ17] = useState('');
  const [q18, setQ18] = useState('');

  // Section 5 — Gaps Between Services (Q19–Q22)
  const [q19, setQ19] = useState('');
  const [q20, setQ20] = useState<string[]>([]);
  const [q20Other, setQ20Other] = useState('');
  const [q21, setQ21] = useState('');
  const [q22, setQ22] = useState('');

  // Section 6 — Information (Q23–Q25)
  const [q23, setQ23] = useState('');
  const [q24, setQ24] = useState('');
  const [q25, setQ25] = useState<string[]>([]);
  const [q25Other, setQ25Other] = useState('');

  // Section 7 — What Is Working? (Q26–Q29)
  const [q26, setQ26] = useState('');
  const [q27, setQ27] = useState('');
  const [q28, setQ28] = useState('');
  const [q29, setQ29] = useState('');

  // Section 8 — Opportunities (Q30–Q33)
  const [q30, setQ30] = useState<string[]>([]);
  const [q30Other, setQ30Other] = useState('');
  const [q31, setQ31] = useState('');
  const [q32, setQ32] = useState('');
  const [q33, setQ33] = useState('');

  // Section 9 — Fill The Gap (Q34–Q38)
  const [q34, setQ34] = useState('');
  const [q35, setQ35] = useState<string[]>([]);
  const [q35Other, setQ35Other] = useState('');
  const [q36, setQ36] = useState('');
  const [q37, setQ37] = useState('');
  const [q38, setQ38] = useState('');

  // Section 10 — Your Professional Perspective (Q39–Q42)
  const [q39, setQ39] = useState('');
  const [q40, setQ40] = useState('');
  const [q41, setQ41] = useState('');
  const [q42, setQ42] = useState('');

  // Section 11 — Final Thoughts & Optional Follow-Up (Q43–Q46)
  const [q43, setQ43] = useState('');
  const [q44, setQ44] = useState('');
  const [q45, setQ45] = useState('');
  const [q45Other, setQ45Other] = useState('');
  const [q46Name, setQ46Name] = useState('');
  const [q46Org, setQ46Org] = useState('');
  const [q46Email, setQ46Email] = useState('');
  const [q46Phone, setQ46Phone] = useState('');

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Multi-select toggle helpers
  const toggleItem = (list: string[], setList: (items: string[]) => void, item: string, maxItems?: number) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      if (maxItems && list.length >= maxItems) {
        return; // limit reached
      }
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection((prev) => prev + 1);
      const contentEl = document.getElementById('survey-modal-scroll-container');
      if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      const contentEl = document.getElementById('survey-modal-scroll-container');
      if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      AdminStore.addProfessionalSurvey({
        submittedAt: new Date().toISOString(),
        q1: q1 || 'Community/nonprofit organization',
        q1Other,
        q2,
        q3,
        q3Other,
        q4,
        q4Other,
        q5,
        q5Other,
        q6,
        q6Other,
        q7,
        q7Other,
        q8,
        q9,
        q10,
        q10Other,
        q11,
        q11Other,
        q12,
        q13,
        q13Other,
        q14,
        q15,
        q16,
        q16Other,
        q17,
        q18,
        q19,
        q20,
        q20Other,
        q21,
        q22,
        q23,
        q24,
        q25,
        q25Other,
        q26,
        q27,
        q28,
        q29,
        q30,
        q30Other,
        q31,
        q32,
        q33,
        q34,
        q35,
        q35Other,
        q36,
        q37,
        q38,
        q39,
        q40,
        q41,
        q42,
        q43,
        q44,
        q45,
        q45Other,
        q46Name,
        q46Org,
        q46Email,
        q46Phone,
        // Fallbacks
        orgName: q46Org || q1Other || q1 || 'Anonymous Agency',
        role: q3Other || q3,
        sector: q1Other || q1,
        barriers: q11.length > 0 ? q11 : q10,
        frequencyFallingThrough: q19 || 'Frequently',
        referralFailureReason: q18 || 'Referral navigation gap',
        mostNeededSupport: q31 || q23,
        contactName: q46Name,
        contactEmail: q46Email,
        contactPhone: q46Phone,
        additionalComments: q43,
      });

      setSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#E5A93C', '#2563EB', '#10B981'],
        });
      } catch {}
    } catch (err) {
      console.error('Error submitting survey:', err);
      setSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setCurrentSection(0);
    onClose();
  };

  // Standard common lists
  const communityAreas = [
    'Food',
    'Housing',
    'Homelessness',
    'Healthcare',
    'Mental-health support',
    'Addiction/substance-use support',
    'Disability support',
    'Employment',
    'Education',
    'Transportation',
    'Financial assistance',
    'Child/family support',
    'Youth support',
    'Senior support',
    'Legal assistance',
    'Government services',
    'Basic necessities',
  ];

  const barriersList = [
    'Lack of information',
    'Difficulty finding the appropriate service',
    'Eligibility requirements',
    'Long wait times',
    'Limited availability',
    'Transportation',
    'Cost',
    'Lack of childcare',
    'Physical accessibility',
    'Communication difficulties',
    'Technology/internet access',
    'Complex application processes',
    'Lack of required documentation',
    'Service location',
    'Limited hours',
    'Stigma',
    'Fear or embarrassment',
    'Mental/emotional overwhelm',
    'Physical limitations',
    'Lack of coordination between services',
  ];

  const referralDifficulties = [
    'Don’t know which organization is appropriate',
    'Eligibility uncertainty',
    'Lack of available services',
    'Long wait times',
    'Service is full',
    'Service doesn’t cover the person’s situation',
    'Geographic limitations',
    'Transportation',
    'Communication difficulties',
    'Difficulty reaching the organization',
    'Lack of up-to-date information',
    'Client/patient unable to complete the process',
    'Multiple services are needed',
  ];

  const fallingBetweenSituations = [
    'People needing multiple types of support',
    'People who don’t meet eligibility criteria',
    'People with complex needs',
    'Short-term needs',
    'Crisis situations',
    'People waiting for longer-term services',
    'People transitioning between services',
    'People who don’t know how to navigate the system',
    'People with transportation barriers',
    'People with communication barriers',
    'People with limited documentation',
  ];

  const resourceImprovementOptions = [
    'Centralized resource directory',
    'Clear eligibility information',
    'Current contact information',
    'Clear referral instructions',
    'Information about wait times',
    'Information about availability',
    'Information about required documents',
    'Information about geographic coverage',
    'Better communication between organizations',
    'Easier-to-understand information',
  ];

  const opportunityAreas = [
    'Information sharing',
    'Service navigation',
    'Referrals',
    'Communication between organizations',
    'Coordination',
    'Transportation',
    'Accessibility',
    'Application processes',
    'Eligibility information',
    'Short-term support',
    'Transitional support',
    'Community education',
    'Resource directories',
  ];

  const ftgComfortFactors = [
    'Transparency',
    'Clear boundaries',
    'Professionalism',
    'Privacy',
    'Reliability',
    'Good communication',
    'Evidence-based decision-making',
    'Respect for existing organizations',
    'Clear explanation of what the organization can and cannot do',
    'Appropriate training',
    'Proper policies and procedures',
    'Collaboration with existing services',
  ];

  const frequencyOptions = [
    'Very frequently',
    'Frequently',
    'Sometimes',
    'Rarely',
    'Never',
    'Not sure',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-[#F3BA4F]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight uppercase leading-tight text-white">
                PROFESSIONAL SURVEY
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Fill the Gap NL • Community Frontline Research
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close survey modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (if not submitted and in questions) */}
        {!submitted && currentSection > 0 && (
          <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between gap-4 text-xs font-bold text-slate-600 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[#C98A26]">SECTION {currentSection} OF {totalSections}</span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-500 font-medium hidden sm:inline">
                {currentSection === 1 && 'Professional Background'}
                {currentSection === 2 && 'What You See'}
                {currentSection === 3 && 'Barriers'}
                {currentSection === 4 && 'Referrals & Navigation'}
                {currentSection === 5 && 'Gaps Between Services'}
                {currentSection === 6 && 'Information'}
                {currentSection === 7 && 'What Is Working?'}
                {currentSection === 8 && 'Opportunities'}
                {currentSection === 9 && 'Fill the Gap'}
                {currentSection === 10 && 'Your Perspective'}
                {currentSection === 11 && 'Final Thoughts & Follow-up'}
              </span>
            </div>
            <div className="w-32 sm:w-44 bg-slate-200 h-2 rounded-full overflow-hidden shrink-0">
              <div
                className="bg-[#E5A93C] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentSection / totalSections) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div
          id="survey-modal-scroll-container"
          className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-900 space-y-6"
        >
          {submitted ? (
            /* -------------------------------------------------- */
            /* SUCCESS / SUBMISSION SCREEN */
            /* -------------------------------------------------- */
            <div className="py-8 text-center space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              {/* Exact Submission Heading */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                THANK YOU FOR SHARING YOUR EXPERIENCE.
              </h3>

              {/* Exact Supporting Text */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Your professional perspective can help us understand things that aren’t always visible from the outside.
                </p>
                <p>
                  Fill the Gap is still at the beginning.
                </p>
                <p>
                  We’re listening, learning, and figuring out where there may be genuine opportunities to make a difference.
                </p>
                <p className="font-semibold text-slate-900">
                  We appreciate your time and your willingness to help us learn.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
                >
                  Close Survey
                </button>
              </div>
            </div>
          ) : currentSection === 0 ? (
            /* -------------------------------------------------- */
            /* SECTION 0 — WELCOME / INTRO PAGE */
            /* -------------------------------------------------- */
            <div className="space-y-6 text-left animate-in fade-in duration-200">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-[#F3BA4F] text-xs font-black uppercase tracking-wider border border-[#E5A93C]/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fill the Gap — Professional Survey</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  WE WANT TO HEAR FROM THE PEOPLE WHO SEE THE GAPS FIRSTHAND.
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <p className="font-bold text-slate-900">
                  Professionals working in our communities often see things that the general public may never see.
                </p>
                <div className="space-y-2 pl-1 text-slate-700 text-sm">
                  <p>• You may notice the same barriers happening repeatedly.</p>
                  <p>• You may see people being referred from one place to another.</p>
                  <p>• You may know about resources that people struggle to access.</p>
                  <p>• You may see needs that don't fit neatly into existing programs.</p>
                  <p>• Or you may see things that are already working really well.</p>
                </div>
                <p className="font-semibold text-[#0B0F19] pt-1">
                  We want to learn from your experience.
                </p>
                <p>
                  Fill the Gap is starting from square one.
                </p>
                <p>
                  We don't have all the answers, and we're not asking you to provide them.
                </p>
                <p className="font-bold text-amber-900">
                  We're asking you to help us understand what you're seeing.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-stone-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentSection(1);
                    const contentEl = document.getElementById('survey-modal-scroll-container');
                    if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="gold-gradient-btn text-slate-950 font-black px-7 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                >
                  <span>Start Survey</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* ================================================== */}
              {/* SECTION 1 — PROFESSIONAL BACKGROUND (Q1–Q4) */}
              {/* ================================================== */}
              {currentSection === 1 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 1 — PROFESSIONAL BACKGROUND
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Help us understand your general sector and role. All responses are confidential.
                    </p>
                  </div>

                  {/* Q1 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      1. What general field do you currently work in?
                    </label>
                    <p className="text-xs text-slate-500">Select one:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Healthcare',
                        'Mental-health services',
                        'Social services',
                        'Community/nonprofit organization',
                        'Education',
                        'Employment/career services',
                        'Housing/homelessness services',
                        'Addiction/substance-use services',
                        'Disability services',
                        'Child/family services',
                        'Youth services',
                        'Senior services',
                        'Government/public services',
                        'Legal services',
                        'Financial services',
                        'Emergency services',
                        'Community outreach',
                        'Other',
                        'Prefer not to say',
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q1 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q1"
                            value={item}
                            checked={q1 === item}
                            onChange={() => setQ1(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item === 'Other' ? 'Other — please specify' : item}</span>
                        </label>
                      ))}
                    </div>
                    {q1 === 'Other' && (
                      <input
                        type="text"
                        placeholder="Please specify your field..."
                        value={q1Other}
                        onChange={(e) => setQ1Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q2 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      2. How long have you worked in your field?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Less than 1 year',
                        '1–3 years',
                        '4–5 years',
                        '6–10 years',
                        '11–20 years',
                        'More than 20 years',
                        'Prefer not to say',
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q2 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q2"
                            value={item}
                            checked={q2 === item}
                            onChange={() => setQ2(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      3. What best describes your role?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Direct client/patient/community support',
                        'Case management/navigation',
                        'Administration/management',
                        'Healthcare provider',
                        'Education/support role',
                        'Outreach',
                        'Advocacy',
                        'Program development',
                        'Research',
                        'Other',
                        'Prefer not to say',
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q3 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q3"
                            value={item}
                            checked={q3 === item}
                            onChange={() => setQ3(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item === 'Other' ? 'Other — please specify' : item}</span>
                        </label>
                      ))}
                    </div>
                    {q3 === 'Other' && (
                      <input
                        type="text"
                        placeholder="Please specify your role..."
                        value={q3Other}
                        onChange={(e) => setQ3Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q4 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      4. What geographic area do you primarily serve?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "St. John's",
                        'Mount Pearl',
                        'Paradise',
                        'Northeast Avalon',
                        'Other area of Newfoundland',
                        'Labrador',
                        'Province-wide',
                        'Multiple locations',
                        'Other',
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q4 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q4"
                            value={item}
                            checked={q4 === item}
                            onChange={() => setQ4(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item === 'Other' ? 'Other — please specify' : item}</span>
                        </label>
                      ))}
                    </div>
                    {q4 === 'Other' && (
                      <input
                        type="text"
                        placeholder="Please specify geographic area..."
                        value={q4Other}
                        onChange={(e) => setQ4Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 2 — WHAT YOU SEE (Q5–Q9) */}
              {/* ================================================== */}
              {currentSection === 2 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 2 — WHAT YOU SEE
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Insights from your firsthand interactions with people seeking support.
                    </p>
                  </div>

                  {/* Q5 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      5. In your professional experience, what are the most common areas where people seek help?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {communityAreas.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q5.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q5.includes(item)}
                            onChange={() => toggleItem(q5, setQ5, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q5.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q5.includes('Other')}
                          onChange={() => toggleItem(q5, setQ5, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q5.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other area..."
                        value={q5Other}
                        onChange={(e) => setQ5Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q6 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-slate-900">
                        6. Which of these areas creates the greatest challenges for the people you work with?
                      </label>
                      <span className="text-xs font-bold text-[#C98A26]">
                        {q6.length}/5 selected
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Select up to five:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {communityAreas.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q6.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q6.includes(item)}
                            onChange={() => toggleItem(q6, setQ6, item, 5)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q6.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q6.includes('Other')}
                          onChange={() => toggleItem(q6, setQ6, 'Other', 5)}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q6.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other challenging area..."
                        value={q6Other}
                        onChange={(e) => setQ6Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q7 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      7. Which ONE area do you believe deserves the most attention?
                    </label>
                    <p className="text-xs text-slate-500">Select one:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {communityAreas.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q7 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q7"
                            value={item}
                            checked={q7 === item}
                            onChange={() => setQ7(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q7 === 'Other'
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="q7"
                          value="Other"
                          checked={q7 === 'Other'}
                          onChange={() => setQ7('Other')}
                          className="text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q7 === 'Other' && (
                      <input
                        type="text"
                        placeholder="Please specify priority area..."
                        value={q7Other}
                        onChange={(e) => setQ7Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q8 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      8. How frequently do you encounter people who need help but don't know where to turn?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {frequencyOptions.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q8 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q8"
                            value={item}
                            checked={q8 === item}
                            onChange={() => setQ8(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q9 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      9. How frequently do you encounter people who need several different services at the same time?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {frequencyOptions.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q9 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q9"
                            value={item}
                            checked={q9 === item}
                            onChange={() => setQ9(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 3 — BARRIERS (Q10–Q13) */}
              {/* ================================================== */}
              {currentSection === 3 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 3 — BARRIERS
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Identifying systemic and practical roadblocks preventing access.
                    </p>
                  </div>

                  {/* Q10 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      10. What barriers do you most commonly see preventing people from accessing help?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {barriersList.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q10.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q10.includes(item)}
                            onChange={() => toggleItem(q10, setQ10, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q10.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q10.includes('Other')}
                          onChange={() => toggleItem(q10, setQ10, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q10.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other barrier..."
                        value={q10Other}
                        onChange={(e) => setQ10Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q11 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-slate-900">
                        11. Which three barriers appear to have the greatest impact?
                      </label>
                      <span className="text-xs font-bold text-[#C98A26]">
                        {q11.length}/3 selected
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Select up to three:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {barriersList.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q11.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q11.includes(item)}
                            onChange={() => toggleItem(q11, setQ11, item, 3)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q11.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q11.includes('Other')}
                          onChange={() => toggleItem(q11, setQ11, 'Other', 3)}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q11.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other top impact barrier..."
                        value={q11Other}
                        onChange={(e) => setQ11Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q12 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      12. How often do you see people give up trying to access a service because the process is too difficult?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {frequencyOptions.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q12 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q12"
                            value={item}
                            checked={q12 === item}
                            onChange={() => setQ12(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q13 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      13. What usually causes people to give up?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {barriersList.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q13.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q13.includes(item)}
                            onChange={() => toggleItem(q13, setQ13, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q13.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q13.includes('Other')}
                          onChange={() => toggleItem(q13, setQ13, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q13.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify what causes people to give up..."
                        value={q13Other}
                        onChange={(e) => setQ13Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 4 — REFERRALS AND NAVIGATION (Q14–Q18) */}
              {/* ================================================== */}
              {currentSection === 4 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 4 — REFERRALS AND NAVIGATION
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Understanding handoffs between agencies and services.
                    </p>
                  </div>

                  {/* Q14 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      14. How often do you refer people to other organizations or services?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Several times a day',
                        'Daily',
                        'Several times a week',
                        'Weekly',
                        'Occasionally',
                        'Rarely',
                        'Never',
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q14 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q14"
                            value={item}
                            checked={q14 === item}
                            onChange={() => setQ14(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q15 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      15. How often do you encounter difficulty finding an appropriate referral for someone?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {frequencyOptions.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q15 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q15"
                            value={item}
                            checked={q15 === item}
                            onChange={() => setQ15(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q16 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      16. What makes referrals difficult?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {referralDifficulties.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q16.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q16.includes(item)}
                            onChange={() => toggleItem(q16, setQ16, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q16.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q16.includes('Other')}
                          onChange={() => toggleItem(q16, setQ16, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q16.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other referral difficulty..."
                        value={q16Other}
                        onChange={(e) => setQ16Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q17 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      17. Have you ever referred someone to a service only to find that the service couldn't actually meet their needs?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Frequently', 'Sometimes', 'Once or twice', 'Never', 'Not sure'].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q17 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q17"
                            value={item}
                            checked={q17 === item}
                            onChange={() => setQ17(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q18 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      18. If comfortable, briefly explain what tends to happen in those situations.
                    </label>
                    <p className="text-xs text-slate-500">Optional written response (do not share identifying details):</p>
                    <textarea
                      rows={3}
                      value={q18}
                      onChange={(e) => setQ18(e.target.value)}
                      placeholder="e.g. Clients get stuck on waitlists, or receive eligibility denials after waiting several weeks..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 5 — GAPS BETWEEN SERVICES (Q19–Q22) */}
              {/* ================================================== */}
              {currentSection === 5 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 5 — GAPS BETWEEN SERVICES
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Examining situations where people fall between mandates.
                    </p>
                  </div>

                  {/* Q19 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      19. Do you believe there are situations where a person's needs fall between existing services?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {frequencyOptions.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q19 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q19"
                            value={item}
                            checked={q19 === item}
                            onChange={() => setQ19(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q20 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      20. Which types of situations are most likely to fall between services?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {fallingBetweenSituations.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q20.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q20.includes(item)}
                            onChange={() => toggleItem(q20, setQ20, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q20.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q20.includes('Other')}
                          onChange={() => toggleItem(q20, setQ20, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q20.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other situation..."
                        value={q20Other}
                        onChange={(e) => setQ20Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q21 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      21. Are there needs you regularly encounter that you don't have an appropriate service or referral for?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Yes', 'No', 'Sometimes', 'Not sure'].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q21 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q21"
                            value={item}
                            checked={q21 === item}
                            onChange={() => setQ21(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q22 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      22. If yes, what general type of need is it?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response (do not provide identifying information):</p>
                    <textarea
                      rows={3}
                      value={q22}
                      onChange={(e) => setQ22(e.target.value)}
                      placeholder="e.g. Immediate emergency storage for belongings, work gear purchase before first pay, weekend food hamper delivery..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 6 — INFORMATION (Q23–Q25) */}
              {/* ================================================== */}
              {currentSection === 6 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 6 — INFORMATION
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Resource directories, accuracy, and ease of discovery.
                    </p>
                  </div>

                  {/* Q23 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      23. How easy is it for professionals to find accurate information about available community resources?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Very easy',
                        'Somewhat easy',
                        'Neither',
                        'Somewhat difficult',
                        'Very difficult',
                        'Not sure',
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q23 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q23"
                            value={item}
                            checked={q23 === item}
                            onChange={() => setQ23(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q24 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      24. How often do you encounter outdated, incomplete, or difficult-to-understand information about available services?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {frequencyOptions.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q24 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q24"
                            value={item}
                            checked={q24 === item}
                            onChange={() => setQ24(item)}
                            className="text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q25 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      25. What would make resource information easier for professionals to use?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {resourceImprovementOptions.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q25.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q25.includes(item)}
                            onChange={() => toggleItem(q25, setQ25, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q25.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q25.includes('Other')}
                          onChange={() => toggleItem(q25, setQ25, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q25.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify what would make info easier..."
                        value={q25Other}
                        onChange={(e) => setQ25Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 7 — WHAT IS WORKING? (Q26–Q29) */}
              {/* ================================================== */}
              {currentSection === 7 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 7 — WHAT IS WORKING?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Highlighting strong community models, successes, and valuable resources.
                    </p>
                  </div>

                  {/* Q26 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      26. What services, organizations, or approaches do you believe are working particularly well?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q26}
                      onChange={(e) => setQ26(e.target.value)}
                      placeholder="e.g. Low-barrier harm reduction drop-ins, mobile outreach teams, peer navigation programs..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q27 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      27. What do you think makes those approaches successful?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q27}
                      onChange={(e) => setQ27(e.target.value)}
                      placeholder="e.g. Direct human connection, zero-barrier intake, non-judgmental staff, meeting people where they are..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q28 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      28. Are there existing resources that you think more people should know about?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Yes', 'No', 'Not sure'].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center justify-center p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q28 === item
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="q28"
                            value={item}
                            checked={q28 === item}
                            onChange={() => setQ28(item)}
                            className="sr-only"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q29 */}
                  {q28 === 'Yes' && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <label className="block text-sm font-bold text-slate-900">
                        29. If yes, please describe the type of resource or service.
                      </label>
                      <p className="text-xs text-slate-500">Optional written response:</p>
                      <textarea
                        rows={3}
                        value={q29}
                        onChange={(e) => setQ29(e.target.value)}
                        placeholder="Describe the resource or service..."
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                      />
                    </div>
                  )}

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 8 — OPPORTUNITIES (Q30–Q33) */}
              {/* ================================================== */}
              {currentSection === 8 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 8 — OPPORTUNITIES
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Identifying high-leverage areas for meaningful community progress.
                    </p>
                  </div>

                  {/* Q30 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      30. Where do you think there may be opportunities for improvement?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {opportunityAreas.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q30.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q30.includes(item)}
                            onChange={() => toggleItem(q30, setQ30, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q30.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q30.includes('Other')}
                          onChange={() => toggleItem(q30, setQ30, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q30.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other opportunity..."
                        value={q30Other}
                        onChange={(e) => setQ30Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q31 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      31. What is one relatively small change that could make a meaningful difference for the people you work with?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q31}
                      onChange={(e) => setQ31(e.target.value)}
                      placeholder="e.g. Free photo ID clinics, extended food locker hours, transit vouchers for first week of work..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q32 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      32. What is one problem that you think is frequently overlooked?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q32}
                      onChange={(e) => setQ32(e.target.value)}
                      placeholder="e.g. Working poverty where people earn just over the benefits cutoff, youth aging out of care cliffs..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q33 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      33. If you could remove ONE barrier for the people you work with, what would it be?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q33}
                      onChange={(e) => setQ33(e.target.value)}
                      placeholder="The single biggest barrier..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 9 — FILL THE GAP (Q34–Q38) */}
              {/* ================================================== */}
              {currentSection === 9 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 9 — FILL THE GAP
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Advice and expectations for a new grassroots research and community initiative.
                    </p>
                  </div>

                  {/* Q34 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      34. Based on what you see in your work, what should a new community initiative research before deciding what to do?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q34}
                      onChange={(e) => setQ34(e.target.value)}
                      placeholder="What should we research first?"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q35 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      35. What would make you comfortable working alongside or referring someone to a new organization such as Fill the Gap?
                    </label>
                    <p className="text-xs text-slate-500">Select all that apply:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ftgComfortFactors.map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                            q35.includes(item)
                              ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={q35.includes(item)}
                            onChange={() => toggleItem(q35, setQ35, item)}
                            className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                      <label
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          q35.includes('Other')
                            ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={q35.includes('Other')}
                          onChange={() => toggleItem(q35, setQ35, 'Other')}
                          className="rounded text-[#C98A26] focus:ring-[#C98A26]"
                        />
                        <span>Other — please specify</span>
                      </label>
                    </div>
                    {q35.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify other factor..."
                        value={q35Other}
                        onChange={(e) => setQ35Other(e.target.value)}
                        className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                      />
                    )}
                  </div>

                  {/* Q36 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      36. What would concern you about a new organization entering this space?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q36}
                      onChange={(e) => setQ36(e.target.value)}
                      placeholder="e.g. Overpromising, duplicating existing efforts without checking, lack of follow-through..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q37 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      37. Are there areas where you think Fill the Gap should NOT try to duplicate existing services?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q37}
                      onChange={(e) => setQ37(e.target.value)}
                      placeholder="e.g. Existing food bank warehouses or clinical therapy queues that are already established..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q38 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      38. What would you recommend someone starting a project like Fill the Gap learn before doing anything?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q38}
                      onChange={(e) => setQ38(e.target.value)}
                      placeholder="Your honest advice..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 10 — YOUR PROFESSIONAL PERSPECTIVE (Q39–Q42) */}
              {/* ================================================== */}
              {currentSection === 10 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 10 — YOUR PROFESSIONAL PERSPECTIVE
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Broader understandings and systemic insights from your career.
                    </p>
                  </div>

                  {/* Q39 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      39. What is something you wish the general public better understood about accessing community support?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q39}
                      onChange={(e) => setQ39(e.target.value)}
                      placeholder="What the public often doesn't realize..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q40 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      40. What is something you wish organizations understood about the people they are trying to help?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q40}
                      onChange={(e) => setQ40(e.target.value)}
                      placeholder="What service organizations should understand..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q41 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      41. What is something you wish policymakers or decision-makers understood?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q41}
                      onChange={(e) => setQ41(e.target.value)}
                      placeholder="Message to policymakers..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Q42 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-slate-900">
                      42. What do you think people most often misunderstand about the challenges faced by the people you serve?
                    </label>
                    <p className="text-xs text-slate-500">Optional written response:</p>
                    <textarea
                      rows={3}
                      value={q42}
                      onChange={(e) => setQ42(e.target.value)}
                      placeholder="Common misconceptions..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                </div>
              )}

              {/* ================================================== */}
              {/* SECTION 11 — FINAL THOUGHTS & OPTIONAL FOLLOW-UP (Q43–Q46) */}
              {/* ================================================== */}
              {currentSection === 11 && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      SECTION 11 — FINAL THOUGHTS
                    </h3>
                    <p className="text-sm font-bold text-[#C98A26] mt-1 uppercase">
                      WE WANT TO HEAR WHAT WE DIDN’T THINK TO ASK.
                    </p>
                  </div>

                  {/* Q43 */}
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-900">
                      43. Is there anything we didn't ask that you believe Fill the Gap should know?
                    </label>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      This is your opportunity to tell us anything you think could help us understand the community better — practical gaps, unexpected obstacles, or advice for the research phase.
                    </p>
                    <textarea
                      rows={4}
                      value={q43}
                      onChange={(e) => setQ43(e.target.value)}
                      placeholder="Share any additional thoughts, observations, or suggestions..."
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C] resize-y"
                    />
                  </div>

                  {/* Optional Follow-up Divider */}
                  <div className="pt-4 border-t border-slate-200 space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 uppercase">
                        OPTIONAL FOLLOW-UP & RESEARCH CONVERSATION
                      </h4>
                      <p className="text-xs text-slate-600">
                        Contact information is <strong>completely optional</strong> and is NOT required to submit your survey.
                      </p>
                    </div>

                    {/* Q44 */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-slate-900">
                        44. Would you be willing to provide additional general information or participate in a future conversation about the research?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Yes', 'No', 'Maybe'].map((item) => (
                          <label
                            key={item}
                            className={`flex items-center justify-center p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                              q44 === item
                                ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name="q44"
                              value={item}
                              checked={q44 === item}
                              onChange={() => setQ44(item)}
                              className="sr-only"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Q45 */}
                    {(q44 === 'Yes' || q44 === 'Maybe') && (
                      <div className="space-y-3 animate-in fade-in duration-200">
                        <label className="block text-sm font-bold text-slate-900">
                          45. Preferred way to be contacted:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Email', 'Phone', 'Other', 'I prefer not to be contacted'].map((item) => (
                            <label
                              key={item}
                              className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                                q45 === item
                                  ? 'bg-amber-50/80 border-[#C98A26] text-amber-950 font-bold shadow-xs'
                                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name="q45"
                                value={item}
                                checked={q45 === item}
                                onChange={() => setQ45(item)}
                                className="text-[#C98A26] focus:ring-[#C98A26]"
                              />
                              <span>{item === 'Other' ? 'Other — specify' : item}</span>
                            </label>
                          ))}
                        </div>
                        {q45 === 'Other' && (
                          <input
                            type="text"
                            placeholder="Specify preferred contact method..."
                            value={q45Other}
                            onChange={(e) => setQ45Other(e.target.value)}
                            className="mt-2 w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                          />
                        )}
                      </div>
                    )}

                    {/* Q46 */}
                    {(q44 === 'Yes' || q44 === 'Maybe') && q45 !== 'I prefer not to be contacted' && (
                      <div className="space-y-3 animate-in fade-in duration-200 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
                        <label className="block text-sm font-bold text-slate-900">
                          46. Optional contact details (Leave blank if you prefer anonymity):
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <input
                            type="text"
                            placeholder="Your Name (Optional)"
                            value={q46Name}
                            onChange={(e) => setQ46Name(e.target.value)}
                            className="px-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                          />
                          <input
                            type="text"
                            placeholder="Organization / Group (Optional)"
                            value={q46Org}
                            onChange={(e) => setQ46Org(e.target.value)}
                            className="px-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                          />
                          <input
                            type="email"
                            placeholder="Email Address (Optional)"
                            value={q46Email}
                            onChange={(e) => setQ46Email(e.target.value)}
                            className="px-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number (Optional)"
                            value={q46Phone}
                            onChange={(e) => setQ46Phone(e.target.value)}
                            className="px-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                          />
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* Modal Navigation Buttons */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
                {currentSection >= 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentSection < totalSections ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="gold-gradient-btn text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                  >
                    <span>Next Section ({currentSection + 1}/{totalSections})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="gold-gradient-btn text-slate-950 font-black px-8 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E5A93C]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Professional Survey</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
