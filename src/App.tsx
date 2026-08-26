import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ChatbotView } from './components/ChatbotView';
import { CoupleLookupView } from './components/CoupleLookupView';
import { AncientLibraryView } from './components/AncientLibraryView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { CoupleAnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [currentCoupleResult, setCurrentCoupleResult] = useState<CoupleAnalysisResult | null>(null);

  const handleSelectCoupleForChat = (result: CoupleAnalysisResult) => {
    setCurrentCoupleResult(result);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'chat' && (
          <ChatbotView
            currentCoupleResult={currentCoupleResult}
            onNavigateToLookup={() => setActiveTab('lookup')}
          />
        )}

        {activeTab === 'lookup' && (
          <CoupleLookupView
            onSelectCoupleForChat={handleSelectCoupleForChat}
            savedResult={currentCoupleResult}
          />
        )}

        {activeTab === 'library' && <AncientLibraryView />}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Footer (displayed on non-chat pages or at bottom) */}
      {activeTab !== 'chat' && <Footer />}
    </div>
  );
}
