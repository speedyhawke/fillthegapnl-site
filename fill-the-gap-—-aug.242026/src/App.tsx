import React, { useState, useEffect } from 'react';
import { Navbar, NavTabId } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { WhatWeDoView } from './components/WhatWeDoView';
import { WhatWeHelpWithView } from './components/WhatWeHelpWithView';
import { ProfessionalsView } from './components/ProfessionalsView';
import { WhyIStartedView } from './components/WhyIStartedView';
import { GetInvolvedView } from './components/GetInvolvedView';
import { DonateView } from './components/DonateView';
import { ContactView } from './components/ContactView';
import { CommunitySurveyModal } from './components/CommunitySurveyModal';
import { ProfessionalSurveyModal } from './components/ProfessionalSurveyModal';
import { LegalModal, LegalModalType } from './components/LegalModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminStore } from './data/adminStore';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      return path.includes('/admin') || hash.includes('#admin') || search.includes('admin=true');
    }
    return false;
  });
  const [isSurveyOpen, setIsSurveyOpen] = useState<boolean>(false);
  const [isProfessionalSurveyOpen, setIsProfessionalSurveyOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  // Initialize and track visits & URL routing
  useEffect(() => {
    // If opening directly on admin route, mark this device as admin to exclude visits
    if (isAdminRoute) {
      AdminStore.setExcludeOwnVisits(true);
    } else {
      AdminStore.recordVisit(`/${activeTab}`);
    }

    // Listen for browser history & hash changes
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const inAdmin = path.includes('/admin') || hash.includes('#admin') || search.includes('admin=true');
      if (inAdmin) {
        AdminStore.setExcludeOwnVisits(true);
      }
      setIsAdminRoute(inAdmin);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync scroll to top on tab change
  const handleTabChange = (tab: NavTabId) => {
    setActiveTab(tab);
    if (!isAdminRoute) {
      AdminStore.recordVisit(`/${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    AdminStore.setExcludeOwnVisits(true);
    setIsAdminRoute(true);
    try {
      window.history.pushState({}, '', '/admin');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    setIsAdminRoute(false);
    try {
      window.history.pushState({}, '', '/');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing admin route (/admin or fillthegapnl.ca/admin)
  if (isAdminRoute) {
    return <AdminDashboard onExit={handleExitAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-stone-900 selection:bg-amber-300 selection:text-slate-950">
      
      {/* Top Navigation Bar: Visible desktop tabs in exact requested order */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenSurvey={() => setIsSurveyOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToDonate={() => handleTabChange('donate')}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
            onNavigateToWhatWeDo={() => handleTabChange('what-we-do')}
            onNavigateToWhatWeHelpWith={() => handleTabChange('what-we-help-with')}
            onNavigateToAbout={() => handleTabChange('about')}
            onNavigateToWhyIStarted={() => handleTabChange('why-i-started')}
            onNavigateToContact={() => handleTabChange('contact')}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {activeTab === 'what-we-do' && (
          <WhatWeDoView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onNavigateToWhatWeHelpWith={() => handleTabChange('what-we-help-with')}
          />
        )}

        {activeTab === 'what-we-help-with' && (
          <WhatWeHelpWithView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToContact={() => handleTabChange('contact')}
            onNavigateToDonate={() => handleTabChange('donate')}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {activeTab === 'professionals' && (
          <ProfessionalsView
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToCommunitySurvey={() => setIsSurveyOpen(true)}
            onNavigateToWhatWeDo={() => handleTabChange('what-we-do')}
          />
        )}

        {activeTab === 'why-i-started' && (
          <WhyIStartedView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {activeTab === 'get-involved' && (
          <GetInvolvedView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
            onNavigateToDonate={() => handleTabChange('donate')}
          />
        )}

        {activeTab === 'donate' && (
          <DonateView
            onOpenSurvey={() => setIsSurveyOpen(true)}
            onNavigateToGetInvolved={() => handleTabChange('get-involved')}
          />
        )}

        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Interactive Community Survey Modal */}
      <CommunitySurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
      />

      {/* Interactive Professional / Frontline Survey Modal */}
      <ProfessionalSurveyModal
        isOpen={isProfessionalSurveyOpen}
        onClose={() => setIsProfessionalSurveyOpen(false)}
      />

      {/* Privacy / Terms / Accessibility Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Footer with Transparency Notice & Quick Links */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenSurvey={() => setIsSurveyOpen(true)}
        onOpenProfessionalSurvey={() => setIsProfessionalSurveyOpen(true)}
        onOpenLegalModal={(type) => setLegalModalType(type)}
        onOpenAdmin={handleOpenAdmin}
      />
    </div>
  );
}
