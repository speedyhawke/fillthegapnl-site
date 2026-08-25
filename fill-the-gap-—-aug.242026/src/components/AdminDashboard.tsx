import React, { useState, useEffect, useMemo } from 'react';
import { PuffinMascot } from './PuffinMascot';
import {
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  Users,
  Briefcase,
  Heart,
  Globe,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Search,
  Filter,
  RefreshCw,
  Sliders,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  LayoutGrid,
  ListOrdered,
  Layers,
  TableProperties,
  Camera,
  Upload,
  Mail,
  Inbox,
  Send,
  MessageCircle
} from 'lucide-react';
import {
  AdminStore,
  CommunitySurveyResponse,
  ProfessionalSurveyResponse,
  DonationRecord,
  VisitRecord,
  ContactMessageRecord
} from '../data/adminStore';
import { CommunityQuestionsTallyGrid } from './CommunityQuestionsTallyGrid';
import { ProfessionalQuestionsTallyGrid } from './ProfessionalQuestionsTallyGrid';

interface AdminDashboardProps {
  onExit: () => void;
}

type AdminTab =
  | 'overview'
  | 'community'
  | 'professional'
  | 'donations'
  | 'messages'
  | 'written'
  | 'traffic'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    AdminStore.isSessionAuthenticated()
  );
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [surveyDisplayMode, setSurveyDisplayMode] = useState<'condensed' | 'detailed'>('condensed');

  // Data state
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [communitySurveys, setCommunitySurveys] = useState<CommunitySurveyResponse[]>([]);
  const [professionalSurveys, setProfessionalSurveys] = useState<ProfessionalSurveyResponse[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessageRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Contact Messages Filter State
  const [messageSearchQuery, setMessageSearchQuery] = useState<string>('');
  const [messageStatusFilter, setMessageStatusFilter] = useState<'all' | 'Unread' | 'Read' | 'Replied' | 'Archived'>('all');
  const [messageReasonFilter, setMessageReasonFilter] = useState<string>('all');

  // Self-visit exclusion state
  const [excludeOwnVisits, setExcludeOwnVisitsState] = useState<boolean>(() => AdminStore.isExcludeOwnVisitsEnabled());

  // New Donation Modal State
  const [isAddDonationOpen, setIsAddDonationOpen] = useState<boolean>(false);
  const [newDonorName, setNewDonorName] = useState<string>('');
  const [newAmount, setNewAmount] = useState<string>('');
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newMethod, setNewMethod] = useState<DonationRecord['method']>('e-Transfer');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newIsAnonymous, setNewIsAnonymous] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<DonationRecord['status']>('Verified');

  // Change Credentials State
  const [editUsername, setEditUsername] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');
  const [editConfirmPassword, setEditConfirmPassword] = useState<string>('');
  const [credsSuccess, setCredsSuccess] = useState<string>('');
  const [credsError, setCredsError] = useState<string>('');

  // Load latest data
  const refreshData = () => {
    setVisits(AdminStore.getVisits());
    setCommunitySurveys(AdminStore.getCommunitySurveys());
    setProfessionalSurveys(AdminStore.getProfessionalSurveys());
    setDonations(AdminStore.getDonations());
    setContactMessages(AdminStore.getContactMessages());
  };

  useEffect(() => {
    refreshData();
    const creds = AdminStore.getCredentials();
    setEditUsername(creds.username);
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginUsername || !loginPassword) {
      setLoginError('Please enter both username and password.');
      return;
    }

    const success = AdminStore.login(loginUsername, loginPassword);
    if (success) {
      AdminStore.setExcludeOwnVisits(true);
      setExcludeOwnVisitsState(true);
      setIsAuthenticated(true);
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    AdminStore.logout();
    setIsAuthenticated(false);
  };

  // Handle Adding Donation
  const handleSaveDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    AdminStore.addDonation({
      donorName: newIsAnonymous ? 'Anonymous Supporter' : newDonorName.trim() || 'Anonymous Supporter',
      amount: parsedAmount,
      date: new Date(newDate).toISOString(),
      method: newMethod,
      notes: newNotes.trim(),
      isAnonymous: newIsAnonymous,
      status: newStatus,
    });

    setNewDonorName('');
    setNewAmount('');
    setNewNotes('');
    setNewIsAnonymous(false);
    setIsAddDonationOpen(false);
    refreshData();
  };

  // Handle Credential Change
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredsError('');
    setCredsSuccess('');

    if (!editUsername.trim()) {
      setCredsError('Username cannot be empty.');
      return;
    }
    if (editPassword.length < 4) {
      setCredsError('Password must be at least 4 characters.');
      return;
    }
    if (editPassword !== editConfirmPassword) {
      setCredsError('Passwords do not match.');
      return;
    }

    AdminStore.setCredentials(editUsername, editPassword);
    setCredsSuccess('Admin credentials updated successfully! Use your new details next time you log in.');
    setEditPassword('');
    setEditConfirmPassword('');
  };

  // CSV Exporter
  const exportToCSV = (type: 'community' | 'professional' | 'donations' | 'traffic' | 'messages') => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `fillthegap_${type}_${new Date().toISOString().split('T')[0]}.csv`;

    if (type === 'donations') {
      headers = ['ID', 'Donor Name', 'Amount ($CAD)', 'Date', 'Payment Method', 'Status', 'Notes', 'Anonymous'];
      rows = donations.map((d) => [
        d.id,
        `"${d.donorName.replace(/"/g, '""')}"`,
        d.amount.toFixed(2),
        d.date,
        d.method,
        d.status,
        `"${(d.notes || '').replace(/"/g, '""')}"`,
        d.isAnonymous ? 'Yes' : 'No',
      ]);
    } else if (type === 'messages') {
      headers = ['ID', 'Date', 'Name', 'Email', 'Reason', 'Status', 'Message'];
      rows = contactMessages.map((m) => [
        m.id,
        m.submittedAt,
        `"${m.name.replace(/"/g, '""')}"`,
        `"${m.email.replace(/"/g, '""')}"`,
        `"${m.reason.replace(/"/g, '""')}"`,
        m.status,
        `"${m.message.replace(/"/g, '""')}"`,
      ]);
    } else if (type === 'community') {
      headers = ['ID', 'Date', 'Region', 'Connection', 'Age Group', 'Household', 'Needed Help (Past 5 Yrs)', 'Types of Help Needed', 'Top Barriers', 'Gave Up', 'Reason Given Up', 'Comments'];
      rows = communitySurveys.map((c) => [
        c.id,
        c.submittedAt,
        `"${c.q2 || ''}"`,
        `"${c.q1 || ''}"`,
        `"${c.q3 || ''}"`,
        `"${c.q4 || ''}"`,
        c.q6 || '',
        `"${(c.q7 || []).join('; ')}"`,
        `"${(c.q13 || []).join('; ')}"`,
        c.q14 || '',
        `"${(c.q15 || '').replace(/"/g, '""')}"`,
        `"${(c.q22 || '').replace(/"/g, '""')}"`,
      ]);
    } else if (type === 'professional') {
      headers = ['ID', 'Date', 'Organization', 'Role', 'Sector', 'Frequency Falling Through', 'Observed Barriers', 'Referral Failure Details', 'Most Needed Support', 'Contact Person', 'Email', 'Phone'];
      rows = professionalSurveys.map((p) => [
        p.id,
        p.submittedAt,
        `"${p.orgName || ''}"`,
        `"${p.role || ''}"`,
        `"${p.sector || ''}"`,
        `"${p.frequencyFallingThrough || ''}"`,
        `"${(p.barriers || []).join('; ')}"`,
        `"${(p.referralFailureReason || '').replace(/"/g, '""')}"`,
        `"${(p.mostNeededSupport || '').replace(/"/g, '""')}"`,
        `"${p.contactName || ''}"`,
        `"${p.contactEmail || ''}"`,
        `"${p.contactPhone || ''}"`,
      ]);
    } else if (type === 'traffic') {
      headers = ['ID', 'Timestamp', 'Path', 'Referrer', 'Device', 'User Agent'];
      rows = visits.map((v) => [
        v.id,
        v.timestamp,
        `"${v.path}"`,
        `"${v.referrer}"`,
        v.device,
        `"${v.userAgent.replace(/"/g, '""')}"`,
      ]);
    }

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Aggregated Stats
  const totalVisits = visits.length;
  const totalCommunity = communitySurveys.length;
  const totalProfessional = professionalSurveys.length;
  const totalMessages = contactMessages.length;
  const unreadMessagesCount = contactMessages.filter((m) => m.status === 'Unread').length;
  const totalDonationsAmount = useMemo(
    () => donations.reduce((sum, d) => sum + d.amount, 0),
    [donations]
  );
  const avgDonation = donations.length > 0 ? totalDonationsAmount / donations.length : 0;

  // Helper to aggregate multi-choice arrays
  const aggregateMultiChoice = (items: string[][]): Record<string, number> => {
    const counts: Record<string, number> = {};
    items.forEach((list) => {
      if (Array.isArray(list)) {
        list.forEach((item) => {
          if (item) counts[item] = (counts[item] || 0) + 1;
        });
      }
    });
    return counts;
  };

  // Helper to aggregate single-choice strings
  const aggregateSingleChoice = (items: (string | undefined)[]): Record<string, number> => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      if (item) counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
  };

  // If NOT authenticated, show the Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070a11] text-white flex flex-col items-center justify-center p-4 relative selection:bg-amber-400 selection:text-slate-950">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-md w-full relative z-10 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white p-1 border-2 border-[#E5A93C] shadow-xl shadow-amber-500/20 mx-auto flex items-center justify-center overflow-hidden">
              <PuffinMascot className="w-full h-full object-contain" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-[#E5A93C]/50 text-[#F3BA4F] text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Fill The Gap • Admin Portal</span>
            </div>

            <h1
              className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Executive Dashboard
            </h1>
            <p className="text-xs text-stone-400">
              Private access for survey analytics, real-time counters & donation tracking.
            </p>
          </div>

          {/* Login Form Box */}
          <div className="civic-card bg-[#0e1422] border-2 border-[#E5A93C]/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-left">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Username
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E5A93C]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E5A93C] via-[#F3BA4F] to-[#D4972B] hover:brightness-105 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg border border-amber-300 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Log In to Dashboard</span>
              </button>
            </form>
          </div>

          <div className="text-center">
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED ADMIN DASHBOARD VIEW
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c1220]/95 backdrop-blur-md border-b border-[#E5A93C]/40 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Left Zone: Brand & URL */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 border-2 border-[#E5A93C] shadow-md shrink-0 flex items-center justify-center overflow-hidden">
              <PuffinMascot className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white uppercase tracking-tight">
                  FILL THE GAP
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[#F3BA4F] text-[10px] font-black uppercase tracking-wider border border-[#E5A93C]/40">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono">
                fillthegapnl.ca/admin • Live St. John's Analytics
              </p>
            </div>
          </div>

          {/* Right Zone: Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAddDonationOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-105 flex items-center gap-1.5 shadow-md border border-amber-300 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Donation</span>
            </button>

            <button
              onClick={() => exportToCSV(activeTab === 'donations' ? 'donations' : activeTab === 'professional' ? 'professional' : activeTab === 'traffic' ? 'traffic' : activeTab === 'messages' ? 'messages' : 'community')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export Current View Data to CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#F3BA4F]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={refreshData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 font-bold text-xs border border-red-800/60 flex items-center gap-1.5 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="bg-[#0b0f1a] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center overflow-x-auto gap-1 sm:gap-2 py-2.5 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'traffic', label: `Visits (${totalVisits})`, icon: Globe },
            { id: 'community', label: `Community Surveys (${totalCommunity})`, icon: Users },
            { id: 'professional', label: `Professional Surveys (${totalProfessional})`, icon: Briefcase },
            { id: 'donations', label: `Donations ($${totalDonationsAmount.toLocaleString()})`, icon: Heart },
            { 
              id: 'messages', 
              label: unreadMessagesCount > 0 ? `Messages (${totalMessages}) • ${unreadMessagesCount} New` : `Messages (${totalMessages})`, 
              icon: Mail,
              hasUnread: unreadMessagesCount > 0 
            },
            { id: 'written', label: 'Written Responses', icon: MessageSquare },
            { id: 'settings', label: 'Settings & Security', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E5A93C] text-slate-950 font-black shadow-md border border-amber-300'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ================================================================= */}
        {/* TAB 1: OVERVIEW & EXECUTIVE SUMMARY */}
        {/* ================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Giving Together Mascot Banner & Brand Artwork Manager */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#111827] via-[#0e1526] to-[#151c2e] border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 border-2 border-amber-400 shadow-xl shrink-0 flex items-center justify-center overflow-hidden group relative">
                  <PuffinMascot className="w-full h-full object-contain" />
                  <label
                    title="Change Mascot Image"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-amber-300 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-6 h-6" />
                    <input
                      type="file"
                      accept="image/*,.jfif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              AdminStore.setCustomMascotImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-1.5 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
                    <Heart className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Giving Together • Atlantic Puffin Mascot</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    Mascot & Brand Artwork Manager
                  </h2>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    The Atlantic Puffin mascot wears a purple <em>"Fill the Gap for Charity"</em> t-shirt and camo boots alongside the wooden donation box. Upload or replace this image here to synchronize it across the entire public site and admin portal.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 z-10 shrink-0">
                <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-xs font-black text-slate-950 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 border border-amber-300 transition-transform active:scale-95">
                  <Upload className="w-4 h-4" />
                  <span>Upload Image (.jfif / .png / .jpg)</span>
                  <input
                    type="file"
                    accept="image/*,.jfif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            AdminStore.setCustomMascotImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    AdminStore.clearCustomMascotImage();
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-stone-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>

            {/* Top 5 Metric Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Card 1: Website Visits */}
              <div
                onClick={() => setActiveTab('traffic')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-slate-700/80 hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Website Visits</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalVisits}
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Real-time visitor logs</span>
                </p>
              </div>

              {/* Card 2: Community Surveys */}
              <div
                onClick={() => setActiveTab('community')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-slate-700/80 hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Community</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalCommunity}
                </div>
                <p className="text-[11px] text-amber-300 font-semibold">
                  11 sections tracked
                </p>
              </div>

              {/* Card 3: Professional Surveys */}
              <div
                onClick={() => setActiveTab('professional')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-slate-700/80 hover:border-[#E5A93C] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Frontline Agency</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {totalProfessional}
                </div>
                <p className="text-[11px] text-sky-400 font-semibold">
                  Caseworker voices
                </p>
              </div>

              {/* Card 4: Total Donations */}
              <div
                onClick={() => setActiveTab('donations')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-[#E5A93C]/80 hover:border-[#F3BA4F] transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Donations</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#F3BA4F] tracking-tight">
                  ${totalDonationsAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-slate-300 font-semibold">
                  {donations.length} records
                </p>
              </div>

              {/* Card 5: Contact Messages */}
              <div
                onClick={() => setActiveTab('messages')}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101827] border-2 border-indigo-500/60 hover:border-indigo-400 transition-all cursor-pointer shadow-lg space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase">
                  <span>Contact Inquiries</span>
                  <div className="w-8 h-8 rounded-xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center border border-indigo-700/60 group-hover:bg-indigo-900 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
                  <span>{totalMessages}</span>
                  {unreadMessagesCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                      {unreadMessagesCount} new
                    </span>
                  )}
                </div>
                <p className={`text-[11px] font-semibold ${unreadMessagesCount > 0 ? 'text-amber-300' : 'text-slate-400'}`}>
                  {unreadMessagesCount > 0 ? `${unreadMessagesCount} unread message${unreadMessagesCount > 1 ? 's' : ''}` : 'All inquiries caught up'}
                </p>
              </div>

            </div>

            {/* Middle Grid: Top Gaps & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Top Systemic Barriers Radar */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Top Identified Barriers (Community Survey)</span>
                    </h2>
                    <p className="text-xs text-stone-400">
                      Highest ranked systemic friction points reported by Newfoundland & Labrador respondents.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('community')}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3 pt-1">
                  {Object.keys(aggregateMultiChoice(communitySurveys.map((c) => [...(c.q12 || []), ...(c.q13 || [])]))).length === 0 ? (
                    <div className="text-xs text-stone-400 italic p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
                      No community survey responses submitted yet. System is live and ready for public data collection.
                    </div>
                  ) : (
                    Object.entries(
                      aggregateMultiChoice(communitySurveys.map((c) => [...(c.q12 || []), ...(c.q13 || [])]))
                    )
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 6)
                      .map(([barrier, count], idx) => {
                        const percentage = totalCommunity > 0 ? Math.round((count / (totalCommunity * 2)) * 100) : 0;
                        return (
                          <div key={barrier} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-slate-200">
                                {idx + 1}. {barrier}
                              </span>
                              <span className="text-amber-400 font-mono">{count} votes</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                                style={{ width: `${Math.min(100, Math.max(12, percentage * 2))}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

              {/* Recent Community Voices Snippets */}
              <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>Latest Written Feedback</span>
                    </h2>
                    <button
                      onClick={() => setActiveTab('written')}
                      className="text-xs font-bold text-amber-400 hover:underline"
                    >
                      See all
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    {communitySurveys.filter((c) => c.q15 || c.q22).length === 0 ? (
                      <div className="text-xs text-stone-400 italic p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
                        No written feedback submitted yet.
                      </div>
                    ) : (
                      communitySurveys
                        .filter((c) => c.q15 || c.q22)
                        .slice(0, 2)
                        .map((c) => (
                          <div key={c.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-stone-400">
                              <span className="font-bold text-amber-300">{c.q2 || 'NL Resident'}</span>
                              <span>{new Date(c.submittedAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-200 italic line-clamp-3">
                              "{c.q15 || c.q22}"
                            </p>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('written')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Fill-in-the-Blank Explorer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Quick Condensed Questions Matrix Preview */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <TableProperties className="w-4 h-4 text-amber-400" />
                    <span>Condensed Question Tally (Quick Scan)</span>
                  </h2>
                  <p className="text-xs text-stone-400">
                    Condensed tallies of key multiple-choice questions with numbers and percentages.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('community')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Tally Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                
                {/* Micro Card: Geography */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-amber-400">Q2. Region</span>
                    <span>{totalCommunity} responses</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {Object.entries(aggregateSingleChoice(communitySurveys.map((c) => c.q2)))
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([opt, count]) => (
                        <div key={opt} className="flex justify-between text-[11px]">
                          <span className="text-slate-300 truncate">{opt}</span>
                          <span className="text-amber-400 font-mono font-bold">{count} ({totalCommunity > 0 ? Math.round((count/totalCommunity)*100) : 0}%)</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Micro Card: Needed Help */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-amber-400">Q6. Needed Help</span>
                    <span>Past 5 Yrs</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {['Yes', 'No', 'Prefer not to say'].map((ans) => {
                      const count = communitySurveys.filter((c) => c.q6 === ans).length;
                      return (
                        <div key={ans} className="flex justify-between text-[11px]">
                          <span className={ans === 'Yes' ? 'text-amber-300 font-bold' : 'text-slate-300'}>{ans}</span>
                          <span className="text-amber-400 font-mono font-bold">{count} ({totalCommunity > 0 ? Math.round((count/totalCommunity)*100) : 0}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Micro Card: Gave Up */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-red-400">Q14. Gave Up</span>
                    <span>System Friction</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {['Yes', 'No', 'Maybe'].map((ans) => {
                      const count = communitySurveys.filter((c) => c.q14 === ans).length;
                      return (
                        <div key={ans} className="flex justify-between text-[11px]">
                          <span className={ans === 'Yes' ? 'text-red-400 font-bold' : 'text-slate-300'}>{ans}</span>
                          <span className="text-stone-300 font-mono font-bold">{count} ({totalCommunity > 0 ? Math.round((count/totalCommunity)*100) : 0}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Micro Card: Frontline Cracks */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase border-b border-slate-800 pb-1">
                    <span className="text-sky-400">Frontline Gaps</span>
                    <span>{totalProfessional} agencies</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.frequencyFallingThrough)))
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([opt, count]) => (
                        <div key={opt} className="flex justify-between text-[11px]">
                          <span className="text-slate-300 truncate">{opt}</span>
                          <span className="text-sky-300 font-mono font-bold">{count} ({totalProfessional > 0 ? Math.round((count/totalProfessional)*100) : 0}%)</span>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Row: Recent Donations Table Preview */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#E5A93C]" />
                    <span>Recent Donations & Pledges</span>
                  </h2>
                  <p className="text-xs text-stone-400">
                    Money donated to date with donor name, date, method and status.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddDonationOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => setActiveTab('donations')}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    View All
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Donor Name</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Payment Method</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {donations.slice(0, 5).map((d) => (
                      <tr key={d.id} className="hover:bg-slate-900/50">
                        <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>{d.donorName}</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-black text-[#F3BA4F]">
                          ${d.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-stone-300 font-mono">
                          {new Date(d.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3 text-stone-300">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                            {d.method}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            d.status === 'Verified' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60' : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-stone-400 italic max-w-xs truncate">
                          {d.notes || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Row 2: Recent Contact Inquiries Preview */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>Recent Contact Inquiries</span>
                    {unreadMessagesCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        {unreadMessagesCount} Unread
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-stone-400">
                    Direct inquiries, gap reports, and partner requests submitted via the Contact form.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>View All Messages ({totalMessages})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-2">
                  <Mail className="w-8 h-8 text-stone-500 mx-auto" />
                  <p className="text-xs font-bold text-stone-300">No contact messages received yet</p>
                  <p className="text-[11px] text-stone-500">
                    When visitors fill out the Contact Us form on the website, their messages will appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contactMessages.slice(0, 4).map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        msg.status === 'Unread'
                          ? 'bg-gradient-to-br from-[#131c33] to-[#0e1422] border-amber-400/50 shadow-md'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-white text-xs">{msg.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              msg.status === 'Unread'
                                ? 'bg-amber-400 text-slate-950'
                                : msg.status === 'Replied'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-stone-300'
                            }`}>
                              {msg.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 font-mono">{msg.email}</p>
                        </div>

                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-semibold shrink-0">
                          {msg.reason}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 line-clamp-2 italic bg-slate-950/50 p-2 rounded-lg border border-slate-800/80 mb-3">
                        "{msg.message}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/60">
                        <span className="text-stone-400 font-mono text-[10px]">
                          {new Date(msg.submittedAt).toLocaleDateString()} {new Date(msg.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Fill the Gap NL — ${msg.reason}`)}`}
                            onClick={() => {
                              AdminStore.updateContactMessageStatus(msg.id, 'Replied');
                              refreshData();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] flex items-center gap-1 transition-colors"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply</span>
                          </a>
                          <button
                            onClick={() => setActiveTab('messages')}
                            className="text-stone-400 hover:text-white font-bold text-[10px]"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: WEBSITE VISITS & TRAFFIC */}
        {/* ================================================================= */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Website Visits & Traffic Counter
                </h2>
                <p className="text-xs text-stone-400">
                  Detailed analytics of real visitor traffic across fillthegapnl.ca pages.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    if (confirm('Clear all recorded website visits and reset the visitor counter to 0? Surveys, donations, and contact messages will be preserved.')) {
                      AdminStore.clearVisits();
                      refreshData();
                      alert('Website visit counter and traffic activity log have been reset to 0.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-stone-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset visitor counter to 0"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reset Visits to 0</span>
                </button>

                <button
                  onClick={() => exportToCSV('traffic')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#F3BA4F]" />
                  <span>Export Traffic Log (CSV)</span>
                </button>
              </div>
            </div>

            {/* Admin Self-Visit Exclusion Banner */}
            <div className="p-4 rounded-2xl bg-[#0b1329] border border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-700/60 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Admin Self-Visit Filter
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      excludeOwnVisits
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                        : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                    }`}>
                      {excludeOwnVisits ? 'Active — You are Excluded' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300">
                    {excludeOwnVisits
                      ? 'Your browsing activity on fillthegapnl.ca from this browser/device is automatically ignored and will not increase the visitor counter.'
                      : 'Self-visit filtering is currently disabled; your browsing activity will be counted in visitor metrics.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0">
                <button
                  onClick={() => {
                    const next = !excludeOwnVisits;
                    AdminStore.setExcludeOwnVisits(next);
                    setExcludeOwnVisitsState(next);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    excludeOwnVisits
                      ? 'bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 border-emerald-600'
                      : 'bg-slate-800 hover:bg-slate-700 text-stone-300 border-slate-600'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>{excludeOwnVisits ? 'Exclude My Visits (Enabled)' : 'Include My Visits'}</span>
                </button>
              </div>
            </div>

            {/* Traffic Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Total Hits / Pageviews</span>
                <div className="text-3xl font-black text-white font-mono">{totalVisits}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Mobile Traffic Share</span>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {totalVisits > 0
                    ? Math.round((visits.filter((v) => v.device === 'mobile').length / totalVisits) * 100)
                    : 0}%
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Top Traffic Source</span>
                <div className="text-xl font-black text-emerald-400 truncate">
                  {Object.entries(aggregateSingleChoice(visits.map((v) => v.referrer))).sort(([, a], [, b]) => b - a)[0]?.[0] || 'Direct Visit'}
                </div>
              </div>
            </div>

            {/* Visits Log Table */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Recent Visitor Activity Log
              </h3>
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-[#0e1422] border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                    <tr className="py-2">
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Page / Path</th>
                      <th className="py-2.5 px-3">Referrer</th>
                      <th className="py-2.5 px-3">Device</th>
                      <th className="py-2.5 px-3">User Agent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {visits.slice(0, 50).map((v) => (
                      <tr key={v.id} className="hover:bg-slate-900/60">
                        <td className="py-2.5 px-3 text-stone-300">
                          {new Date(v.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-amber-300 font-bold">{v.path}</td>
                        <td className="py-2.5 px-3 text-stone-300">{v.referrer}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            v.device === 'mobile' ? 'bg-indigo-950 text-indigo-300' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {v.device}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-stone-500 text-[11px] truncate max-w-xs font-sans">
                          {v.userAgent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: COMMUNITY SURVEY MULTIPLE-CHOICE RESULTS */}
        {/* ================================================================= */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                  <Users className="w-6 h-6 text-[#E5A93C]" />
                  <span>Community Survey Results ({totalCommunity} Submissions)</span>
                </h2>
                <p className="text-xs text-stone-400">
                  Multiple-choice tallies and question breakdowns across all sections of the community survey.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSurveyDisplayMode('condensed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'condensed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Condensed Tally Sheet of All Questions and Numbers"
                  >
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Condensed Tally</span>
                  </button>
                  <button
                    onClick={() => setSurveyDisplayMode('detailed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'detailed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Detailed Visual Bar Chart View"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Detailed Charts</span>
                  </button>
                </div>

                <button
                  onClick={() => exportToCSV('community')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#F3BA4F]" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* CONDENSED TALLY SHEET MODE (Small charts of questions with numbers side by side) */}
            {surveyDisplayMode === 'condensed' ? (
              <div className="space-y-6">
                
                {/* Quick Notice */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <div className="flex items-center gap-2">
                    <TableProperties className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Condensed Matrix View:</strong> Showing all survey questions and the exact response count and percentage beside each answer option.
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-300">
                    Total Responses: {totalCommunity}
                  </span>
                </div>

                {/* Dense Grid of Question Tally Cards for all Q1 to Q46 */}
                <CommunityQuestionsTallyGrid
                  communitySurveys={communitySurveys}
                  totalCommunity={totalCommunity}
                  aggregateSingleChoice={aggregateSingleChoice}
                  aggregateMultiChoice={aggregateMultiChoice}
                />

                {/* Individual Community Survey Submissions Log (Sorted Newest First) */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">
                        Individual Survey Submissions Log
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Sorted by newest survey completed first (Total: {communitySurveys.length})
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[#F3BA4F] text-[10px] font-bold uppercase font-mono">
                      Newest First
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Date / Time Completed</th>
                          <th className="py-2.5 px-3">Region / Town</th>
                          <th className="py-2.5 px-3">Age</th>
                          <th className="py-2.5 px-3">Household</th>
                          <th className="py-2.5 px-3">Needed Help</th>
                          <th className="py-2.5 px-3">Gave Up</th>
                          <th className="py-2.5 px-3">Key Barriers Reported</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {communitySurveys.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-900/60">
                            <td className="py-3 px-3 font-mono text-stone-200 whitespace-nowrap">
                              {new Date(c.submittedAt).toLocaleDateString()} {new Date(c.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3 px-3 font-bold text-amber-300">
                              {c.q2 || 'NL Resident'}
                            </td>
                            <td className="py-3 px-3 text-stone-300">{c.q3 || '—'}</td>
                            <td className="py-3 px-3 text-stone-400">{c.q4 || '—'}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q6 === 'Yes' ? 'bg-amber-950 text-amber-300 border border-amber-800/60' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q6 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q14 === 'Yes' ? 'bg-red-950 text-red-300 border border-red-800/60' : c.q14 === 'No' ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q14 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-stone-300 max-w-xs truncate">
                              {(c.q13 && c.q13.length > 0 ? c.q13 : c.q12 || []).slice(0, 2).join(', ') || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              /* DETAILED GRAPH CARDS VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Question 2: Geography / Region */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 2</span>
                    <h3 className="text-sm font-black text-white uppercase">Area of Newfoundland & Labrador</h3>
                  </div>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(communitySurveys.map((c) => c.q2)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([area, count]) => {
                        const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                        return (
                          <div key={area} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{area}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Question 3: Age Distribution */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 3</span>
                    <h3 className="text-sm font-black text-white uppercase">Age Group Distribution</h3>
                  </div>
                  <div className="space-y-2.5">
                    {['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+', 'Prefer not to say'].map((age) => {
                      const count = communitySurveys.filter((c) => c.q3 === age).length;
                      const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                      return (
                        <div key={age} className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-200">{age}</span>
                            <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-sky-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Question 7: Types of Help Needed */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 7</span>
                    <h3 className="text-sm font-black text-white uppercase">Types of Support Needed</h3>
                  </div>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {Object.entries(aggregateMultiChoice(communitySurveys.map((c) => c.q7 || [])))
                      .sort(([, a], [, b]) => b - a)
                      .map(([type, count]) => {
                        const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                        return (
                          <div key={type} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{type}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Question 14: Gave up trying to get help */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 14</span>
                    <h3 className="text-sm font-black text-white uppercase">Gave Up Due to Overwhelming Process</h3>
                  </div>
                  <div className="space-y-2.5">
                    {['Yes', 'No', 'Maybe', 'Prefer not to say'].map((ans) => {
                      const count = communitySurveys.filter((c) => c.q14 === ans).length;
                      const pct = totalCommunity > 0 ? Math.round((count / totalCommunity) * 100) : 0;
                      return (
                        <div key={ans} className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-200">{ans}</span>
                            <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${ans === 'Yes' ? 'bg-red-400' : ans === 'No' ? 'bg-emerald-400' : 'bg-slate-400'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Question 13: Top 3 Biggest Problems */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Question 13</span>
                    <h3 className="text-sm font-black text-white uppercase">Ranked Top 3 Biggest Community Barriers</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {Object.entries(aggregateMultiChoice(communitySurveys.map((c) => c.q13 || [])))
                      .sort(([, a], [, b]) => b - a)
                      .map(([barrier, count], idx) => (
                        <div key={barrier} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">
                            {idx + 1}. {barrier}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-400/20 text-[#F3BA4F] font-mono font-bold">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Individual Community Survey Submissions Log */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">
                        Individual Survey Submissions Log
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Sorted by newest survey completed first (Total: {communitySurveys.length})
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-[#F3BA4F] text-[10px] font-bold uppercase font-mono">
                      Newest First
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Date / Time Completed</th>
                          <th className="py-2.5 px-3">Region / Town</th>
                          <th className="py-2.5 px-3">Age</th>
                          <th className="py-2.5 px-3">Household</th>
                          <th className="py-2.5 px-3">Needed Help</th>
                          <th className="py-2.5 px-3">Gave Up</th>
                          <th className="py-2.5 px-3">Key Barriers Reported</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {communitySurveys.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-900/60">
                            <td className="py-3 px-3 font-mono text-stone-200 whitespace-nowrap">
                              {new Date(c.submittedAt).toLocaleDateString()} {new Date(c.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="py-3 px-3 font-bold text-amber-300">
                              {c.q2 || 'NL Resident'}
                            </td>
                            <td className="py-3 px-3 text-stone-300">{c.q3 || '—'}</td>
                            <td className="py-3 px-3 text-stone-400">{c.q4 || '—'}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q6 === 'Yes' ? 'bg-amber-950 text-amber-300 border border-amber-800/60' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q6 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.q14 === 'Yes' ? 'bg-red-950 text-red-300 border border-red-800/60' : c.q14 === 'No' ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
                                {c.q14 || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-stone-300 max-w-xs truncate">
                              {(c.q13 && c.q13.length > 0 ? c.q13 : c.q12 || []).slice(0, 2).join(', ') || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: PROFESSIONAL & FRONTLINE SURVEY RESULTS */}
        {/* ================================================================= */}
        {activeTab === 'professional' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                  <Briefcase className="w-6 h-6 text-[#E5A93C]" />
                  <span>Frontline & Professional Survey Results ({totalProfessional} Submissions)</span>
                </h2>
                <p className="text-xs text-stone-400">
                  Insights and question tallies from caseworkers, non-profit directors, and healthcare workers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setSurveyDisplayMode('condensed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'condensed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Condensed Tally Sheet of Questions and Numbers"
                  >
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Condensed Tally</span>
                  </button>
                  <button
                    onClick={() => setSurveyDisplayMode('detailed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      surveyDisplayMode === 'detailed'
                        ? 'bg-[#E5A93C] text-slate-950 shadow-xs'
                        : 'text-stone-400 hover:text-white'
                    }`}
                    title="Detailed Visual Bar Chart View"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Detailed Charts</span>
                  </button>
                </div>

                <button
                  onClick={() => exportToCSV('professional')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#F3BA4F]" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
              </div>
            </div>

            {/* CONDENSED TALLY SHEET MODE */}
            {surveyDisplayMode === 'condensed' ? (
              <div className="space-y-6">
                
                {/* Notice */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                  <div className="flex items-center gap-2">
                    <TableProperties className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong>Condensed Matrix View:</strong> Showing frontline questions and the exact response count and percentage beside each answer option.
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-300">
                    Total Agencies: {totalProfessional}
                  </span>
                </div>

                {/* Dense Grid of Questions for Professional Surveys */}
                <ProfessionalQuestionsTallyGrid
                  professionalSurveys={professionalSurveys}
                  totalProfessional={totalProfessional}
                  aggregateSingleChoice={aggregateSingleChoice}
                  aggregateMultiChoice={aggregateMultiChoice}
                />

                {/* Agency Contacts Table */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Partner Agency Registry & Contact List
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Organization</th>
                          <th className="py-2.5 px-3">Contact Person</th>
                          <th className="py-2.5 px-3">Email</th>
                          <th className="py-2.5 px-3">Phone</th>
                          <th className="py-2.5 px-3">Sector</th>
                          <th className="py-2.5 px-3">Partnership Interest</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {professionalSurveys.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-900/60">
                            <td className="py-3 px-3 font-bold text-white">{p.q1 || p.orgName || 'Anonymous Agency'}</td>
                            <td className="py-3 px-3 text-stone-200">{p.q29Name || p.contactName || 'Anonymous Staff'}</td>
                            <td className="py-3 px-3 font-mono text-amber-300">{p.q29Email || p.contactEmail || '—'}</td>
                            <td className="py-3 px-3 font-mono text-stone-400">{p.q29Phone || p.contactPhone || '—'}</td>
                            <td className="py-3 px-3 text-stone-300">{p.q4 || p.sector || '—'}</td>
                            <td className="py-3 px-3 text-emerald-400 font-bold">{p.q27 || p.partnershipInterest || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ) : (
              /* DETAILED CARDS VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Sector Breakdown */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Frontline Sectors Represented
                  </h3>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.sector)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([sector, count]) => {
                        const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                        return (
                          <div key={sector} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{sector}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Roles Breakdown */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Professional Roles & Positions
                  </h3>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.role)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([role, count]) => {
                        const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                        return (
                          <div key={role} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{role}</span>
                              <span className="text-amber-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-sky-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Frontline Observed Barriers */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Systemic Barriers Observed on the Ground
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {Object.entries(aggregateMultiChoice(professionalSurveys.map((p) => p.barriers || [])))
                      .sort(([, a], [, b]) => b - a)
                      .map(([barrier, count], idx) => (
                        <div key={barrier} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">
                            {idx + 1}. {barrier}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-sky-400/20 text-sky-300 font-mono font-bold">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Frequency Falling Through Cracks */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    How Often Clients Fall Between Mandates
                  </h3>
                  <div className="space-y-2.5">
                    {['Daily', 'Several times a week', 'Weekly', 'Monthly', 'Rarely'].map((freq) => {
                      const count = professionalSurveys.filter((p) => p.frequencyFallingThrough === freq).length;
                      const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                      return (
                        <div key={freq} className="space-y-1 text-xs">
                          <div className="flex justify-between font-bold">
                            <span className="text-slate-200">{freq}</span>
                            <span className="text-red-400 font-mono">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-red-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Partnership & Collaboration Readiness */}
                <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Interest in Collaborating with FTG
                  </h3>
                  <div className="space-y-2.5">
                    {Object.entries(aggregateSingleChoice(professionalSurveys.map((p) => p.partnershipInterest)))
                      .sort(([, a], [, b]) => b - a)
                      .map(([interest, count]) => {
                        const pct = totalProfessional > 0 ? Math.round((count / totalProfessional) * 100) : 0;
                        return (
                          <div key={interest} className="space-y-1 text-xs">
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-200">{interest}</span>
                              <span className="text-emerald-400 font-mono">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Agency Contacts Table */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                    Partner Agency Registry & Contact List
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Organization</th>
                          <th className="py-2.5 px-3">Contact Person</th>
                          <th className="py-2.5 px-3">Email</th>
                          <th className="py-2.5 px-3">Phone</th>
                          <th className="py-2.5 px-3">Sector</th>
                          <th className="py-2.5 px-3">Partnership Interest</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {professionalSurveys.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-900/60">
                            <td className="py-3 px-3 font-bold text-white">{p.q1 || p.orgName || 'Anonymous Agency'}</td>
                            <td className="py-3 px-3 text-stone-200">{p.q29Name || p.contactName || 'Anonymous Staff'}</td>
                            <td className="py-3 px-3 font-mono text-amber-300">{p.q29Email || p.contactEmail || '—'}</td>
                            <td className="py-3 px-3 font-mono text-stone-400">{p.q29Phone || p.contactPhone || '—'}</td>
                            <td className="py-3 px-3 text-stone-300">{p.q4 || p.sector || '—'}</td>
                            <td className="py-3 px-3 text-emerald-400 font-bold">{p.q27 || p.partnershipInterest || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: DONATIONS & FINANCIAL LEDGER */}
        {/* ================================================================= */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Donations & Financial Ledger
                </h2>
                <p className="text-xs text-stone-400">
                  Complete register of money donated, donor names, dates, payment channels, and notes.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddDonationOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Record New Donation</span>
                </button>
                <button
                  onClick={() => exportToCSV('donations')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#F3BA4F]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e1422] border-2 border-[#E5A93C] space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Total Money Donated</span>
                <div className="text-3xl font-black text-[#F3BA4F] font-mono">
                  ${totalDonationsAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Total Donors</span>
                <div className="text-3xl font-black text-white font-mono">{donations.length}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Average Contribution</span>
                <div className="text-3xl font-black text-emerald-400 font-mono">${avgDonation.toFixed(2)}</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Verified In Bank</span>
                <div className="text-3xl font-black text-sky-400 font-mono">
                  ${donations.filter((d) => d.status === 'Verified').reduce((acc, d) => acc + d.amount, 0).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Full Donations Table */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Donation Transactions Log
                </h3>
                <span className="text-xs text-stone-400">{donations.length} records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-stone-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Donor Name</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Payment Method</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Notes & Dedication</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-900/60">
                        <td className="py-3 px-3 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                            <span>{d.donorName}</span>
                            {d.isAnonymous && (
                              <span className="text-[10px] text-stone-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                Anon
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono font-black text-[#F3BA4F] text-sm">
                          ${d.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 font-mono text-stone-300">
                          {new Date(d.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-stone-300 font-medium">
                            {d.method}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => {
                              const nextStatus = d.status === 'Verified' ? 'Received' : d.status === 'Received' ? 'Pledged' : 'Verified';
                              AdminStore.updateDonationStatus(d.id, nextStatus);
                              refreshData();
                            }}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                              d.status === 'Verified'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
                                : d.status === 'Received'
                                ? 'bg-blue-950 text-blue-300 border border-blue-700/60 hover:bg-blue-900'
                                : 'bg-amber-950 text-amber-300 border border-amber-700/60 hover:bg-amber-900'
                            }`}
                            title="Click to cycle status: Verified -> Received -> Pledged"
                          >
                            {d.status} ↻
                          </button>
                        </td>
                        <td className="py-3 px-3 text-stone-300 italic max-w-sm">
                          {d.notes || '—'}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Delete donation from ${d.donorName} ($${d.amount})?`)) {
                                AdminStore.deleteDonation(d.id);
                                refreshData();
                              }
                            }}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB: CONTACT INQUIRIES & DIRECT MESSAGES */}
        {/* ================================================================= */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Contact Inquiries & Direct Messages
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-mono text-xs font-bold">
                    {contactMessages.length} Total
                  </span>
                  {unreadMessagesCount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                      {unreadMessagesCount} Unread
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-400">
                  Messages submitted by community members, agency staff, partners, and volunteers through the public Contact page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => exportToCSV('messages')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export Messages CSV</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="p-4 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by sender name, email, reason, or message content..."
                    value={messageSearchQuery}
                    onChange={(e) => setMessageSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                {/* Reason Filter */}
                <div className="w-full md:w-56">
                  <select
                    value={messageReasonFilter}
                    onChange={(e) => setMessageReasonFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                  >
                    <option value="all">All Inquiry Reasons</option>
                    <option value="Question">Question</option>
                    <option value="Know about a gap">Know about a gap</option>
                    <option value="Know about a resource">Know about a resource</option>
                    <option value="Want to get involved">Want to get involved</option>
                    <option value="Interested in partnering">Interested in partnering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: `All (${contactMessages.length})` },
                    { id: 'Unread', label: `Unread (${contactMessages.filter(m => m.status === 'Unread').length})` },
                    { id: 'Read', label: `Read (${contactMessages.filter(m => m.status === 'Read').length})` },
                    { id: 'Replied', label: `Replied (${contactMessages.filter(m => m.status === 'Replied').length})` },
                  ].map((statusTab) => (
                    <button
                      key={statusTab.id}
                      onClick={() => setMessageStatusFilter(statusTab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        messageStatusFilter === statusTab.id
                          ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                          : 'bg-slate-900/90 text-stone-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {statusTab.label}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-stone-400 font-mono">
                  Showing {
                    contactMessages.filter((m) => {
                      const matchSearch =
                        !messageSearchQuery ||
                        m.name.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                        m.email.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                        m.message.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                        m.reason.toLowerCase().includes(messageSearchQuery.toLowerCase());
                      const matchStatus = messageStatusFilter === 'all' || m.status === messageStatusFilter;
                      const matchReason = messageReasonFilter === 'all' || m.reason === messageReasonFilter;
                      return matchSearch && matchStatus && matchReason;
                    }).length
                  } of {contactMessages.length} messages
                </div>
              </div>
            </div>

            {/* Messages Feed */}
            {contactMessages.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0e1422] border border-slate-800 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-stone-500">
                  <Inbox className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-white uppercase">No Contact Messages Yet</h3>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    When visitors, community members, or agency partners submit inquiries through the public Contact page, they will be archived and displayed here in real time.
                  </p>
                </div>
              </div>
            ) : (
              (() => {
                const filtered = contactMessages.filter((m) => {
                  const matchSearch =
                    !messageSearchQuery ||
                    m.name.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                    m.email.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                    m.message.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
                    m.reason.toLowerCase().includes(messageSearchQuery.toLowerCase());
                  const matchStatus = messageStatusFilter === 'all' || m.status === messageStatusFilter;
                  const matchReason = messageReasonFilter === 'all' || m.reason === messageReasonFilter;
                  return matchSearch && matchStatus && matchReason;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-12 rounded-3xl bg-[#0e1422] border border-slate-800 text-center space-y-3">
                      <Search className="w-8 h-8 text-stone-500 mx-auto" />
                      <h3 className="text-sm font-black text-white uppercase">No Messages Matching Your Filter</h3>
                      <p className="text-xs text-stone-400">
                        Try resetting your search query or status filter to see all messages.
                      </p>
                      <button
                        onClick={() => {
                          setMessageSearchQuery('');
                          setMessageStatusFilter('all');
                          setMessageReasonFilter('all');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400 transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {filtered.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                          msg.status === 'Unread'
                            ? 'bg-gradient-to-br from-[#121b30] via-[#0f1627] to-[#0c1220] border-amber-400/60 shadow-xl ring-1 ring-amber-400/20'
                            : 'bg-[#0e1422] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Message Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800/80 pb-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-base font-black text-white">{msg.name}</span>
                              
                              {/* Reason Badge */}
                              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                msg.reason === 'Know about a gap'
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                                  : msg.reason === 'Know about a resource'
                                  ? 'bg-sky-950/80 text-sky-300 border-sky-800/60'
                                  : msg.reason === 'Want to get involved' || msg.reason === 'Interested in partnering'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60'
                              }`}>
                                {msg.reason}
                              </span>

                              {/* Status Tag */}
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                msg.status === 'Unread'
                                  ? 'bg-amber-400 text-slate-950 font-black'
                                  : msg.status === 'Replied'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                  : 'bg-slate-800 text-stone-300 border border-slate-700'
                              }`}>
                                {msg.status}
                              </span>
                            </div>

                            {/* Email & Copy */}
                            <div className="flex items-center gap-2 text-xs text-stone-300 font-mono">
                              <Mail className="w-3.5 h-3.5 text-stone-400" />
                              <a
                                href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Fill the Gap NL — ${msg.reason}`)}`}
                                className="text-amber-400 hover:underline"
                              >
                                {msg.email}
                              </a>
                              <button
                                onClick={() => copyText(msg.email, msg.id + '-email')}
                                className="p-1 rounded hover:bg-slate-800 text-stone-400 hover:text-white transition-colors"
                                title="Copy Email Address"
                              >
                                {copiedId === msg.id + '-email' ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Timestamp & Status Controls */}
                          <div className="flex flex-wrap items-center gap-2 sm:self-start">
                            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-mono">
                              <Clock className="w-3.5 h-3.5 text-stone-500" />
                              <span>{new Date(msg.submittedAt).toLocaleDateString()} at {new Date(msg.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>

                            {/* Quick status cycle button */}
                            <button
                              onClick={() => {
                                const nextStatus =
                                  msg.status === 'Unread'
                                    ? 'Read'
                                    : msg.status === 'Read'
                                    ? 'Replied'
                                    : 'Unread';
                                AdminStore.updateContactMessageStatus(msg.id, nextStatus);
                                refreshData();
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-stone-300 border border-slate-700 transition-colors"
                              title="Click to toggle status"
                            >
                              Status: {msg.status} ↻
                            </button>

                            {/* Delete Message */}
                            <button
                              onClick={() => {
                                if (confirm(`Delete contact message from ${msg.name}?`)) {
                                  AdminStore.deleteContactMessage(msg.id);
                                  refreshData();
                                }
                              }}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                              title="Delete this message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Message Body */}
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                            Message Content:
                          </div>
                          <div className="p-4 rounded-2xl bg-[#090d17] border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                            {msg.message}
                          </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: Fill the Gap NL — ${msg.reason}`)}`}
                              onClick={() => {
                                AdminStore.updateContactMessageStatus(msg.id, 'Replied');
                                refreshData();
                              }}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md border border-amber-300 transition-transform active:scale-95"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Reply via Email ({msg.email})</span>
                            </a>

                            {msg.status !== 'Replied' && (
                              <button
                                onClick={() => {
                                  AdminStore.updateContactMessageStatus(msg.id, 'Replied');
                                  refreshData();
                                }}
                                className="px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-bold text-xs border border-emerald-700/60 flex items-center gap-1.5 transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Mark as Replied</span>
                              </button>
                            )}

                            {msg.status === 'Unread' ? (
                              <button
                                onClick={() => {
                                  AdminStore.updateContactMessageStatus(msg.id, 'Read');
                                  refreshData();
                                }}
                                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-300 font-bold text-xs border border-slate-700 transition-colors"
                              >
                                Mark as Read
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  AdminStore.updateContactMessageStatus(msg.id, 'Unread');
                                  refreshData();
                                }}
                                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-300 font-bold text-xs border border-slate-700 transition-colors"
                              >
                                Mark as Unread
                              </button>
                            )}
                          </div>

                          <div className="text-[10px] text-stone-400 font-mono">
                            ID: {msg.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 6: FILL IN THE BLANK & WRITTEN RESPONSES EXPLORER */}
        {/* ================================================================= */}
        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Written & Fill-In-The-Blank Responses
                </h2>
                <p className="text-xs text-stone-400">
                  Open-ended comments, lived experiences, barriers described, and suggestions from respondents.
                </p>
              </div>
              
              {/* Search filter */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search in written responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Response Cards Feed */}
            <div className="space-y-4">
              
              {/* 1. Community Survey "Reason for Giving Up" (Q15) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Community Survey • Question 15: Reasons Given Up Trying to Get Help
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {communitySurveys
                    .filter((c) => c.q15 && c.q15.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((c) => (
                      <div key={c.id + '-q15'} className="p-4 bg-[#0e1422] border border-slate-800 rounded-2xl space-y-2 relative group">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {c.q2 || 'NL Resident'} • Age: {c.q3 || 'Not specified'}
                          </span>
                          <span className="font-mono">{new Date(c.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          "{c.q15}"
                        </p>
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => copyText(c.q15 || '', c.id + '-q15')}
                            className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedId === c.id + '-q15' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === c.id + '-q15' ? 'Copied' : 'Copy Quote'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 2. Community Survey Closing Suggestions (Q22) */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Community Survey • Suggestions & What Would Make Things Better
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {communitySurveys
                    .filter((c) => c.q22 && c.q22.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((c) => (
                      <div key={c.id + '-q22'} className="p-4 bg-[#0e1422] border border-slate-800 rounded-2xl space-y-2 relative group">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {c.q2 || 'NL Resident'}
                          </span>
                          <span className="font-mono">{new Date(c.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          "{c.q22}"
                        </p>
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => copyText(c.q22 || '', c.id + '-q22')}
                            className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedId === c.id + '-q22' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === c.id + '-q22' ? 'Copied' : 'Copy Quote'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 3. Frontline Professional Feedback */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-sky-300">
                    Professional Survey • Frontline Bottlenecks & Needed Emergency Relief
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {professionalSurveys
                    .filter((p) =>
                      (p.referralFailureReason || p.mostNeededSupport || p.additionalComments || '').toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((p) => (
                      <div key={p.id} className="p-4 bg-[#0e1422] border border-slate-800 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between text-[11px] text-stone-400 border-b border-slate-800 pb-2">
                          <div>
                            <span className="font-bold text-white block">{p.orgName}</span>
                            <span className="text-[10px] text-amber-300">{p.role} • {p.sector}</span>
                          </div>
                          <span className="font-mono">{new Date(p.submittedAt).toLocaleDateString()}</span>
                        </div>

                        {p.referralFailureReason && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-red-300">Why referrals fail:</span>
                            <p className="text-xs text-slate-300 italic">"{p.referralFailureReason}"</p>
                          </div>
                        )}

                        {p.mostNeededSupport && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-emerald-300">Most needed support:</span>
                            <p className="text-xs text-slate-300 italic">"{p.mostNeededSupport}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 7: SETTINGS & SECURITY */}
        {/* ================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Admin Settings & Security Credentials
              </h2>
              <p className="text-xs text-stone-400">
                Manage your dashboard login username, password, and persistent data backups.
              </p>
            </div>

            {/* Credentials Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1422] border-2 border-[#E5A93C]/60 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-[#F3BA4F] flex items-center justify-center border border-[#E5A93C]/40">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white uppercase">
                    Update Dashboard Credentials
                  </h3>
                  <p className="text-xs text-stone-400">
                    Change the username and password used to access <code className="text-amber-300 font-mono">/admin</code>.
                  </p>
                </div>
              </div>

              {credsSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{credsSuccess}</span>
                </div>
              )}

              {credsError && (
                <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{credsError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-300">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase text-slate-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase text-slate-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-type new password"
                      value={editConfirmPassword}
                      onChange={(e) => setEditConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md border border-amber-300 cursor-pointer"
                >
                  Save New Credentials
                </button>
              </form>
            </div>

            {/* Mascot Photo Management */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Atlantic Puffin Mascot Artwork
                </h3>
              </div>
              <p className="text-xs text-stone-400">
                Upload and synchronize the high-resolution Puffin Mascot artwork (e.g. Gemini rendered image) across the entire website navigation, hero cards, donation page, and admin portal.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <div className="w-24 h-24 rounded-2xl bg-white p-2 border-2 border-amber-400/80 shadow-lg shrink-0 flex items-center justify-center overflow-hidden">
                  <PuffinMascot className="w-full h-full object-contain" />
                </div>

                <div className="space-y-2 flex-1 w-full">
                  <div className="flex flex-wrap gap-2">
                    <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-xs font-black text-slate-950 flex items-center gap-2 cursor-pointer shadow-md">
                      <Download className="w-4 h-4 rotate-180" />
                      <span>Upload Mascot Image</span>
                      <input
                        type="file"
                        accept="image/*,.jfif"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                AdminStore.setCustomMascotImage(reader.result);
                                alert('Mascot image uploaded and updated across the entire website!');
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Reset mascot image to default?')) {
                          AdminStore.clearCustomMascotImage();
                          alert('Mascot reset to default.');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-stone-300 border border-slate-700 flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-stone-400" />
                      <span>Reset to Default</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Supports JPG, PNG, WEBP, and JFIF images.
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Self-Visit Privacy & Tracking */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Admin Self-Visit Exclusion & Privacy
                </h3>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Ensure that your own testing, site edits, and administrator preview sessions do not artificially inflate the public website visitor counter.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Exclude My Device From Visitor Count</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        excludeOwnVisits
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                      }`}>
                        {excludeOwnVisits ? 'Active (Self-Visits Blocked)' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      When active, browsing pages on this browser will not increment the visit counter or generate logs.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const next = !excludeOwnVisits;
                      AdminStore.setExcludeOwnVisits(next);
                      setExcludeOwnVisitsState(next);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border shrink-0 ${
                      excludeOwnVisits
                        ? 'bg-emerald-900/70 hover:bg-emerald-900 text-emerald-200 border-emerald-600'
                        : 'bg-slate-800 hover:bg-slate-700 text-stone-300 border-slate-700'
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>{excludeOwnVisits ? 'Self-Exclusion Enabled' : 'Enable Exclusion'}</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-[11px] text-stone-400">
                    Want to reset just the visitor counter without touching surveys or donations?
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset only the website visit counter and traffic activity log to 0? All surveys, donations, and messages will remain intact.')) {
                        AdminStore.clearVisits();
                        refreshData();
                        alert('Visitor logs and traffic counter have been reset to 0.');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <RefreshCw className="w-3 h-3 text-amber-400" />
                    <span>Reset Visitor Counter to 0</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Data Management & Backup */}
            <div className="p-6 rounded-3xl bg-[#0e1422] border border-slate-800 space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Data Backup & System Maintenance
              </h3>
              <p className="text-xs text-stone-400">
                Download a complete JSON database backup (including visits, surveys, donations, and contact messages) or clear all analytics to 0.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const jsonStr = AdminStore.exportAllDataAsJSON();
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `fillthegap_backup_${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Full JSON Backup</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to wipe all visits, surveys, donations, and contact messages to 0 for a clean launch?')) {
                      AdminStore.resetToZero();
                      refreshData();
                      alert('All stats, survey submissions, donation records, and contact messages have been wiped to 0.');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 text-xs font-bold text-red-200 border border-red-800/80 flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-red-400" />
                  <span>Wipe All Stats & Messages to 0</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* =================================================================== */}
      {/* RECORD DONATION MODAL */}
      {/* =================================================================== */}
      {isAddDonationOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border-2 border-[#E5A93C] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-white animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#E5A93C]" />
                <h3 className="text-lg font-black uppercase text-white">Record New Donation</h3>
              </div>
              <button
                onClick={() => setIsAddDonationOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDonation} className="space-y-4 text-xs">
              
              {/* Anonymous toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAnon"
                  checked={newIsAnonymous}
                  onChange={(e) => setNewIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-400"
                />
                <label htmlFor="isAnon" className="font-bold text-slate-200">
                  Record as Anonymous Donor
                </label>
              </div>

              {!newIsAnonymous && (
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Donor Name</label>
                  <input
                    type="text"
                    required={!newIsAnonymous}
                    placeholder="e.g. John Doe / St. John's Community Group"
                    value={newDonorName}
                    onChange={(e) => setNewDonorName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Amount ($ CAD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="100.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Date</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Payment Method</label>
                  <select
                    value={newMethod}
                    onChange={(e) => setNewMethod(e.target.value as DonationRecord['method'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="e-Transfer">e-Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Online Pledge">Online Pledge</option>
                    <option value="In-Person Event">In-Person Event</option>
                    <option value="Corporate/Sponsor">Corporate/Sponsor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300 uppercase">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as DonationRecord['status'])}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Verified">Verified in Bank</option>
                    <option value="Received">Received (Pending Deposit)</option>
                    <option value="Pledged">Pledged (Future Transfer)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-300 uppercase">Notes & Purpose</label>
                <textarea
                  rows={2}
                  placeholder="e.g. In honour of community outreach initiative"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDonationOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-stone-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black uppercase tracking-wider"
                >
                  Save Donation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
