'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import type { Personal } from '@/lib/types';

interface HeroProps {
  personal: Personal;
  onOpenChat: () => void;
}

export default function Hero({ personal, onOpenChat }: HeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg pt-20">
      
      {/* Extremely faint radial gradient behind everything */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 75% 50%, rgba(255,255,255,0.01) 0%, transparent 40%)' }} />

      {/* Two-column layout */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>

        {/* ── LEFT COLUMN: Text content ── */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
          <p className="text-brand-muted text-lg md:text-xl font-medium mb-3">
            Hi, I&apos;m
          </p>
          
          {/* Name */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
            <span className="text-brand-text block">Muhammad</span>
            <span className="text-brand-primary block">Anas</span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl font-medium mb-6 text-brand-text">
            {personal.title} &amp; ML Engineer
          </p>

          {/* Bio */}
          <p className="text-brand-muted leading-relaxed mb-6 max-w-lg text-base">
            {personal.bio}
          </p>

          {/* Tagline */}
          <p className="text-brand-primary font-medium mb-10 text-lg">
            &quot;{personal.tagline}&quot;
          </p>

          {/* Buttons Row 1 */}
          <div className="flex flex-wrap gap-4 mb-6">
            <a
              href="/Muhammad_Anas_Resume.pdf"
              download="Muhammad_Anas_Resume.pdf"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Download size={18} />
              Download CV
            </a>
            
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline inline-flex items-center gap-2"
            >
              View My Work <ArrowRight size={18} />
            </button>
            
            <button
              onClick={onOpenChat}
              className="btn-outline"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links Row 2 */}
          <div className="flex items-center gap-4">
            {[
              { href: personal.socials.github, Icon: Github, label: 'GitHub' },
              { href: personal.socials.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${personal.socials.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-brand-border bg-[#111214] hover:bg-[#1A1B1E] hover:border-[rgba(255,255,255,0.15)] text-brand-muted hover:text-brand-text group"
              >
                <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Photo area ── */}
        <div className={`flex justify-center md:justify-end items-center relative transition-all duration-1000 delay-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
          
          <div className="relative flex items-center justify-center w-full max-w-[500px] aspect-square">
            
            {/* The Outer Circular Grid (Pure CSS implementation of the reference effect) */}
            <div className="absolute inset-0 rounded-full border border-[rgba(255,255,255,0.03)]" style={{
              backgroundImage: `
                repeating-conic-gradient(from 0deg, transparent 0deg 9deg, rgba(255,255,255,0.03) 9deg 10deg),
                repeating-radial-gradient(circle, transparent 0, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)
              `
            }} />
            
            {/* Middle thin ring */}
            <div className="absolute inset-[15%] rounded-full border border-[rgba(255,255,255,0.05)]" />
            
            {/* Inner frame for the photo */}
            <div className="absolute inset-[25%] rounded-full border border-[rgba(255,255,255,0.1)] bg-[#111214] shadow-2xl overflow-hidden z-10 flex items-center justify-center">
               <Image
                  src="/avatar.png"
                  alt="Muhammad Anas"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top"
                  priority
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            </div>
            
            {/* Tiny blue node accents (top, left, right, bottom) */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-dim animate-pulse">
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Scroll</span>
        <ArrowRight size={14} className="rotate-90 opacity-60" />
      </div>

    </section>
  );
}
