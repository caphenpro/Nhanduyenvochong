import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { ChatbotView } from './components/ChatbotView';
import { AncientLibraryView } from './components/AncientLibraryView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { AIChatbotModal } from './components/AIChatbotModal';
import { ApiKeySettingsModal } from './components/ApiKeySettingsModal';
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { CoupleAnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [currentCoupleResult, setCurrentCoupleResult] = useState<CoupleAnalysisResult | null>(null);
  const [isModalChatOpen, setIsModalChatOpen] = useState<boolean>(false);
  const [isApiKeySettingsOpen, setIsApiKeySettingsOpen] = useState<boolean>(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIChat={() => setIsModalChatOpen(true)}
        onOpenApiKeySettings={() => setIsApiKeySettingsOpen(true)}
        onOpenVersionModal={() => setIsVersionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'chat' && (
          <ChatbotView
            currentCoupleResult={currentCoupleResult}
            onOpenApiKeySettings={() => setIsApiKeySettingsOpen(true)}
          />
        )}

        {activeTab === 'library' && <AncientLibraryView />}

        {activeTab === 'about' && (
          <AboutView onOpenVersionModal={() => setIsVersionModalOpen(true)} />
        )}
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

      {/* Global Version History & Changelog Modal */}
      <VersionHistoryModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
      />

      {/* Footer (displayed on non-chat pages or at bottom) */}
      {activeTab !== 'chat' && (
        <Footer onOpenVersionModal={() => setIsVersionModalOpen(true)} />
      )}
    </div>
  );
}
