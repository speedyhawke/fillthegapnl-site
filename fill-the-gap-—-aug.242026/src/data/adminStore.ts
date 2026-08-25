// Central Store & Analytics Engine for Fill the Gap Admin Dashboard
export interface VisitRecord {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  userAgent: string;
  device: 'desktop' | 'mobile' | 'tablet';
}

export interface CommunitySurveyResponse {
  id: string;
  submittedAt: string;
  // Section 1
  q1: string; // Connection to NL
  q1Other?: string;
  q2: string; // Region/Town
  q2Other?: string;
  q3: string; // Age group
  q4: string; // Household
  q5: string; // Someone to turn to
  // Section 2
  q6: string; // Needed help in past 5 yrs
  q7: string[]; // Types of help needed
  q7Other?: string;
  q8: string; // Difficulty figuring out where to go
  q9: string; // How many places contacted
  q10: string; // Referred without getting help
  q11: string; // Difficulty figuring out who is responsible
  // Section 3
  q12: string[]; // Barriers experienced
  q12Other?: string;
  q13: string[]; // Top 3 biggest barriers
  q13Other?: string;
  q14: string; // Given up trying to get help
  q15?: string; // Written reason for giving up
  // Section 4
  q16?: string; // How easy to find accurate info
  q17?: string[]; // Where look for info
  q17Other?: string;
  q18?: string; // Found outdated/confusing info online
  q19?: string[]; // What would make finding help easier
  q19Other?: string;
  // Section 5
  q20?: string; // Service seemed like it should help but didn't fit
  q21?: string[]; // What made it a poor fit
  q21Other?: string;
  q22?: string; // Needed help with something not fitting neatly
  q23?: string; // Describe what happened
  // Section 6
  q24?: number | null; // Importance of someone in your corner (1-5)
  q25?: string[]; // What happens to people without someone in corner
  q25Other?: string;
  q26?: string; // Have you been that person for someone else
  q27?: string[]; // What kinds of things you helped with
  q27Other?: string;
  q28?: string; // How difficult to figure out what to do for that person
  // Section 7
  q29?: string[]; // Kinds of support making a difference
  q29Other?: string;
  q30?: string; // One thing easier (written)
  q31?: string; // Problem not talked about enough (written)
  q32?: string; // Small change big difference (written)
  // Section 8
  q33?: string[]; // Areas deserving more attention (up to 5)
  q33Other?: string;
  q34?: string; // Most urgent priority area
  q35?: string; // Why important (written)
  // Section 9
  q36?: string; // Focus on learning about first (written)
  q37?: string[]; // What would make you trust FTG
  q37Other?: string;
  q38?: string; // What would make you NOT trust FTG (written)
  q39?: string[]; // Deciding what programs to work on
  q39Other?: string;
  // Section 10
  q40?: string; // Experience recognizing a gap (written)
  q41?: string; // Wish someone had told you (written)
  q42?: string; // Wish existed when needed help (written)
  // Section 11
  q43?: string; // Anything else FTG should know (written)
  q44?: string; // Interested in hearing research results (Yes/No)
  q45?: string; // Preferred channel to hear results
  q45Other?: string;
  q46?: string; // Optional email address
}

export interface ProfessionalSurveyResponse {
  id: string;
  submittedAt: string;
  
  // Section 1 — Professional Background (Q1–Q4)
  q1?: string; // General field (Select one)
  q1Other?: string;
  q2?: string; // How long worked in field (Select one)
  q3?: string; // Role description (Select one)
  q3Other?: string;
  q4?: string; // Geographic area primarily served (Select one)
  q4Other?: string;

  // Section 2 — What You See (Q5–Q9)
  q5?: string[]; // Most common areas where people seek help (Multi)
  q5Other?: string;
  q6?: string[]; // Areas creating greatest challenges (Up to 5)
  q6Other?: string;
  q7?: string; // ONE area deserving most attention (Select one)
  q7Other?: string;
  q8?: string; // Frequency encounter people who don't know where to turn (Select one)
  q9?: string; // Frequency encounter people needing multiple services (Select one)

  // Section 3 — Barriers (Q10–Q13)
  q10?: string[]; // Barriers most commonly preventing people from accessing help (Multi)
  q10Other?: string;
  q11?: string[]; // Top three barriers with greatest impact (Up to 3)
  q11Other?: string;
  q12?: string; // How often see people give up because process too difficult (Select one)
  q13?: string[]; // What usually causes people to give up (Multi)
  q13Other?: string;

  // Section 4 — Referrals and Navigation (Q14–Q18)
  q14?: string; // How often refer people to other services (Select one)
  q15?: string; // How often encounter difficulty finding referral (Select one)
  q16?: string[]; // What makes referrals difficult (Multi)
  q16Other?: string;
  q17?: string; // Referred to service that couldn't meet needs (Select one)
  q18?: string; // What tends to happen in those situations (Optional written)

  // Section 5 — Gaps Between Services (Q19–Q22)
  q19?: string; // Situations where needs fall between existing services (Select one)
  q20?: string[]; // Situations most likely to fall between services (Multi)
  q20Other?: string;
  q21?: string; // Regularly encounter needs without service/referral (Select one)
  q22?: string; // General type of need (Optional written)

  // Section 6 — Information (Q23–Q25)
  q23?: string; // Ease of finding accurate resource information (Select one)
  q24?: string; // Encounter outdated/confusing info (Select one)
  q25?: string[]; // What would make resource info easier to use (Multi)
  q25Other?: string;

  // Section 7 — What Is Working? (Q26–Q29)
  q26?: string; // Services/organizations working well (Optional written)
  q27?: string; // What makes those approaches successful (Optional written)
  q28?: string; // Existing resources more should know about (Yes/No/Not sure)
  q29?: string; // Describe type of resource or service (Optional written)

  // Section 8 — Opportunities (Q30–Q33)
  q30?: string[]; // Opportunities for improvement (Multi)
  q30Other?: string;
  q31?: string; // One small change that could make meaningful difference (Optional written)
  q32?: string; // One problem frequently overlooked (Optional written)
  q33?: string; // One barrier you would remove (Optional written)

  // Section 9 — Fill The Gap (Q34–Q38)
  q34?: string; // What should new initiative research before deciding (Optional written)
  q35?: string[]; // What would make comfortable working alongside/referring (Multi)
  q35Other?: string;
  q36?: string; // What would concern you about a new organization (Optional written)
  q37?: string; // Areas FTG should NOT try to duplicate (Optional written)
  q38?: string; // Recommendations before doing anything (Optional written)

  // Section 10 — Your Professional Perspective (Q39–Q42)
  q39?: string; // What wish general public understood (Optional written)
  q40?: string; // What wish organizations understood (Optional written)
  q41?: string; // What wish policymakers/decision-makers understood (Optional written)
  q42?: string; // What people most often misunderstand about challenges (Optional written)

  // Section 11 — Final Thoughts (Q43)
  q43?: string; // Anything else FTG should know (Optional written)

  // Optional Follow-Up (Q44–Q46)
  q44?: string; // Willing to provide additional info / participate in conversation (Yes/No/Maybe)
  q45?: string; // Preferred contact method (Email, Phone, Other, Prefer not)
  q45Other?: string;
  q46Name?: string; // Optional Name
  q46Org?: string; // Optional Org
  q46Email?: string; // Optional Email
  q46Phone?: string; // Optional Phone

  // Legacy fallback fields for backward compatibility
  q29Name?: string;
  q29Title?: string;
  q29Org?: string;
  q29Email?: string;
  q29Phone?: string;
  orgName?: string;
  role?: string;
  sector?: string;
  barriers?: string[];
  frequencyFallingThrough?: string;
  referralFailureReason?: string;
  mostNeededSupport?: string;
  partnershipInterest?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  additionalComments?: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  method: 'e-Transfer' | 'Cash' | 'Cheque' | 'Online Pledge' | 'In-Person Event' | 'Corporate/Sponsor';
  notes?: string;
  isAnonymous: boolean;
  status: 'Received' | 'Pledged' | 'Verified';
}

export interface ContactMessageRecord {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
}

export interface AdminCredentials {
  username: string;
  passwordHash: string; // stored credentials
  updatedAt: string;
}

const STORAGE_KEYS = {
  VISITS: 'ftg_site_visits_v2',
  COMMUNITY_SURVEYS: 'ftg_community_surveys_v2',
  PROFESSIONAL_SURVEYS: 'ftg_professional_surveys_v2',
  DONATIONS: 'ftg_donations_records_v2',
  CONTACT_MESSAGES: 'ftg_contact_messages_v1',
  CREDENTIALS: 'ftg_admin_credentials_v1',
  AUTH_SESSION: 'ftg_admin_session_v1',
  EXCLUDE_OWN_VISITS: 'ftg_exclude_admin_visits_v1',
  CLEAN_WIPE_FLAG: 'ftg_stats_zeroed_flag_v2',
  CUSTOM_MASCOT_IMAGE: 'ftg_custom_puffin_image_v1',
};

// All filler data wiped clean to 0 so the public launch starts completely fresh
const DEFAULT_COMMUNITY_SURVEYS: CommunitySurveyResponse[] = [];
const DEFAULT_PROFESSIONAL_SURVEYS: ProfessionalSurveyResponse[] = [];
const DEFAULT_DONATIONS: DonationRecord[] = [];

// Automatic migration check to clear any legacy demo seeds from previous versions
try {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const isWiped = localStorage.getItem(STORAGE_KEYS.CLEAN_WIPE_FLAG);
    if (!isWiped) {
      localStorage.removeItem('ftg_site_visits_v1');
      localStorage.removeItem('ftg_community_surveys');
      localStorage.removeItem('ftg_professional_surveys_v1');
      localStorage.removeItem('ftg_donations_records_v1');
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.CLEAN_WIPE_FLAG, 'true');
    }
  }
} catch {
  // Safe storage access
}

export class AdminStore {
  // 1. Visit Tracking & Self-Exclusion
  static isExcludeOwnVisitsEnabled(): boolean {
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') return true;
      const stored = localStorage.getItem(STORAGE_KEYS.EXCLUDE_OWN_VISITS);
      if (stored !== null) {
        return stored === 'true';
      }
      // If user is currently in admin session or has visited admin, default to excluding
      if (this.isSessionAuthenticated()) {
        localStorage.setItem(STORAGE_KEYS.EXCLUDE_OWN_VISITS, 'true');
        return true;
      }
      return false;
    } catch {
      return true;
    }
  }

  static setExcludeOwnVisits(enabled: boolean): void {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.EXCLUDE_OWN_VISITS, enabled ? 'true' : 'false');
      }
    } catch {}
  }

  static shouldExcludeCurrentVisit(path: string = ''): boolean {
    try {
      // 1. Check explicit self-exclusion preference
      if (this.isExcludeOwnVisitsEnabled()) {
        return true;
      }

      // 2. Check if admin session is active
      if (this.isSessionAuthenticated()) {
        return true;
      }

      // 3. Check if viewing an admin URL or query param
      if (typeof window !== 'undefined') {
        const currentPath = (path || window.location.pathname || '').toLowerCase();
        const currentHash = (window.location.hash || '').toLowerCase();
        const currentSearch = (window.location.search || '').toLowerCase();
        if (
          currentPath.includes('/admin') ||
          currentHash.includes('#admin') ||
          currentSearch.includes('admin=true')
        ) {
          // Flag this browser as admin so subsequent public page visits are also excluded
          this.setExcludeOwnVisits(true);
          return true;
        }
      }
    } catch {}
    return false;
  }

  static recordVisit(path: string = '/'): void {
    try {
      // Never record visit if the current user is the admin / website owner
      if (this.shouldExcludeCurrentVisit(path)) {
        return;
      }

      const userAgent = navigator.userAgent || '';
      let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
      if (/tablet|ipad/i.test(userAgent)) device = 'tablet';
      else if (/mobile|iphone|android/i.test(userAgent)) device = 'mobile';

      const visit: VisitRecord = {
        id: 'vis-' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        path: path || window.location.pathname,
        referrer: document.referrer || 'Direct Visit',
        userAgent: userAgent.slice(0, 120),
        device,
      };

      const existing = this.getVisits();
      // Keep last 1500 visits to optimize storage
      const updated = [visit, ...existing].slice(0, 1500);
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not record visit:', e);
    }
  }

  static clearVisits(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify([]));
    } catch {}
  }

  static getVisits(): VisitRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify([]));
        return [];
      }
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  // 2. Community Surveys
  static getCommunitySurveys(): CommunitySurveyResponse[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COMMUNITY_SURVEYS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify([]));
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } catch {
      return [];
    }
  }

  static addCommunitySurvey(data: Omit<CommunitySurveyResponse, 'id'>): void {
    try {
      const existing = this.getCommunitySurveys();
      const newRecord: CommunitySurveyResponse = {
        id: 'comm-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
        ...data,
      };
      const updated = [newRecord, ...existing].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to add community survey:', e);
    }
  }

  // 3. Professional Surveys
  static getProfessionalSurveys(): ProfessionalSurveyResponse[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify([]));
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } catch {
      return [];
    }
  }

  static addProfessionalSurvey(data: Omit<ProfessionalSurveyResponse, 'id'>): void {
    try {
      const existing = this.getProfessionalSurveys();
      const newRecord: ProfessionalSurveyResponse = {
        id: 'prof-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
        ...data,
      };
      const updated = [newRecord, ...existing].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to add professional survey:', e);
    }
  }

  // 4. Donations Records
  static getDonations(): DonationRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch {
      return [];
    }
  }

  static addDonation(donation: Omit<DonationRecord, 'id'>): DonationRecord {
    const existing = this.getDonations();
    const newRecord: DonationRecord = {
      id: 'don-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      ...donation,
    };
    const updated = [newRecord, ...existing].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
    return newRecord;
  }

  static deleteDonation(id: string): void {
    const existing = this.getDonations();
    const updated = existing.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
  }

  static updateDonationStatus(id: string, status: 'Received' | 'Pledged' | 'Verified'): void {
    const existing = this.getDonations();
    const updated = existing.map(d => (d.id === id ? { ...d, status } : d));
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
  }

  // 5. Contact Messages (Direct inquiries from Contact page)
  static getContactMessages(): ContactMessageRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify([]));
        return [];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } catch {
      return [];
    }
  }

  static addContactMessage(message: Omit<ContactMessageRecord, 'id' | 'submittedAt' | 'status'> & { status?: ContactMessageRecord['status'] }): ContactMessageRecord {
    const existing = this.getContactMessages();
    const newRecord: ContactMessageRecord = {
      id: 'msg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      submittedAt: new Date().toISOString(),
      status: message.status || 'Unread',
      ...message,
    };
    const updated = [newRecord, ...existing].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
    return newRecord;
  }

  static updateContactMessageStatus(id: string, status: ContactMessageRecord['status']): void {
    const existing = this.getContactMessages();
    const updated = existing.map(m => (m.id === id ? { ...m, status } : m));
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
  }

  static deleteContactMessage(id: string): void {
    const existing = this.getContactMessages();
    const updated = existing.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
  }

  // 6. Authentication & Credentials
  static getCredentials(): AdminCredentials {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    
    // Default initial credentials: Username: "admin", Password: "FillTheGap2026!"
    const defaultCreds: AdminCredentials = {
      username: 'admin',
      passwordHash: 'FillTheGap2026!',
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(defaultCreds));
    return defaultCreds;
  }

  static setCredentials(username: string, passwordPlain: string): void {
    const creds: AdminCredentials = {
      username: username.trim(),
      passwordHash: passwordPlain.trim(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(creds));
  }

  static isSessionAuthenticated(): boolean {
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      return session === 'authenticated_ftg_admin';
    } catch {
      return false;
    }
  }

  static login(username: string, passwordPlain: string): boolean {
    const creds = this.getCredentials();
    if (
      username.trim().toLowerCase() === creds.username.trim().toLowerCase() &&
      passwordPlain.trim() === creds.passwordHash.trim()
    ) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'authenticated_ftg_admin');
      return true;
    }
    return false;
  }

  static logout(): void {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch {}
  }

  // 6. Mascot Image Management
  static getCustomMascotImage(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.CUSTOM_MASCOT_IMAGE) || null;
    } catch {
      return null;
    }
  }

  static setCustomMascotImage(dataUrl: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MASCOT_IMAGE, dataUrl);
      window.dispatchEvent(new Event('ftg_mascot_updated'));
    } catch (e) {
      console.error('Failed to save mascot image:', e);
    }
  }

  static clearCustomMascotImage(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_MASCOT_IMAGE);
      window.dispatchEvent(new Event('ftg_mascot_updated'));
    } catch {}
  }

  // 7. Reset & Data Helpers
  static clearAllUserData(): void {
    localStorage.setItem(STORAGE_KEYS.COMMUNITY_SURVEYS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.PROFESSIONAL_SURVEYS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify([]));
  }

  static resetToZero(): void {
    this.clearAllUserData();
  }

  static exportAllDataAsJSON(): string {
    const payload = {
      exportDate: new Date().toISOString(),
      platform: 'Fill the Gap NL — Community Analytics Platform',
      websiteUrl: 'https://fillthegapnl.ca',
      visitsCount: this.getVisits().length,
      visits: this.getVisits(),
      communitySurveysCount: this.getCommunitySurveys().length,
      communitySurveys: this.getCommunitySurveys(),
      professionalSurveysCount: this.getProfessionalSurveys().length,
      professionalSurveys: this.getProfessionalSurveys(),
      donationsCount: this.getDonations().length,
      totalDonationsAmount: this.getDonations().reduce((acc, d) => acc + d.amount, 0),
      donations: this.getDonations(),
      contactMessagesCount: this.getContactMessages().length,
      contactMessages: this.getContactMessages(),
    };
    return JSON.stringify(payload, null, 2);
  }
}
