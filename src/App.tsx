import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ChatbotView } from './components/ChatbotView';
import { CoupleLookupView } from './components/CoupleLookupView';
import { AncientLibraryView } from './components/AncientLibraryView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { AIChatbotModal } from './components/AIChatbotModal';
import { ApiKeySettingsModal } from './components/ApiKeySettingsModal';
import { CoupleAnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [currentCoupleResult, setCurrentCoupleResult] = useState<CoupleAnalysisResult | null>(null);
  const [isModalChatOpen, setIsModalChatOpen] = useState<boolean>(false);
  const [isApiKeySettingsOpen, setIsApiKeySettingsOpen] = useState<boolean>(false);

  const handleSelectCoupleForChat = (result: CoupleAnalysisResult) => {
    setCurrentCoupleResult(result);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIChat={() => setIsModalChatOpen(true)}
        onOpenApiKeySettings={() => setIsApiKeySettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'chat' && (
          <ChatbotView
            currentCoupleResult={currentCoupleResult}
            onNavigateToLookup={() => setActiveTab('lookup')}
            onOpenApiKeySettings={() => setIsApiKeySettingsOpen(true)}
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

      {/* Floating AI Chatbot Modal (Accessible across all views) */}
      <AIChatbotModal
        currentCoupleResult={currentCoupleResult}
        isOpen={isModalChatOpen}
        onOpen={() => setIsModalChatOpen(true)}
        onClose={() => setIsModalChatOpen(false)}
      />

      {/* Global API Key Settings Modal */}
      <ApiKeySettingsModal
        isOpen={isApiKeySettingsOpen}
        onClose={() => setIsApiKeySettingsOpen(false)}
      />

      {/* Footer (displayed on non-chat pages or at bottom) */}
      {activeTab !== 'chat' && <Footer />}
    </div>
  );
}

