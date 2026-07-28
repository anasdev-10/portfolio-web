'use client';

import { useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';
import ChatAssistant from '@/components/ChatAssistant';
import contentData from '../../content.json';
import type { PortfolioData } from '@/lib/types';

const data = contentData as PortfolioData;

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState<string | undefined>(undefined);

  const handleOpenChat = useCallback(() => {
    setChatOpen(true);
    setChatMessage(undefined);
  }, []);

  const handleAskAbout = useCallback((msg: string) => {
    setChatOpen(true);
    setChatMessage(msg);
    // Clear after sending so re-clicks on same card still work
    setTimeout(() => setChatMessage(undefined), 500);
  }, []);

  const handleCloseChat = useCallback(() => {
    setChatOpen(false);
    setChatMessage(undefined);
  }, []);

  return (
    <main className="bg-[#060612] min-h-screen text-white overflow-x-hidden">
      <Navigation personal={data.personal} />

      <Hero personal={data.personal} onOpenChat={handleOpenChat} />

      <Projects projects={data.projects} onAskAbout={handleAskAbout} />

      <Skills skills={data.skills} />

      <About
        experience={data.experience}
        education={data.education}
        futureGoals={data.futureGoals}
      />

      <Contact personal={data.personal} onOpenChat={handleOpenChat} />

      <ChatAssistant
        isOpen={chatOpen}
        onOpen={handleOpenChat}
        onClose={handleCloseChat}
        initialMessage={chatMessage}
      />
    </main>
  );
}
