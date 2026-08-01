'use client';

import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Personal } from '@/lib/types';
import MagneticButton from './MagneticButton';

interface HeroProps {
  personal: Personal;
  onOpenChat: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 } 
  },
};

export default function Hero({ personal, onOpenChat }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg pt-20">
      
      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">

        {/* ── LEFT COLUMN: Text content ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-brand-muted text-lg md:text-xl font-medium mb-3">
            Hi, I&apos;m
          </motion.p>
          
          {/* Name */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
            <span className="text-brand-text block">Muhammad</span>
            <span className="text-brand-primary block">Anas</span>
          </motion.h1>

          {/* Title */}
          <motion.p variants={itemVariants} className="text-xl md:text-2xl font-medium mb-6 text-brand-text">
            {personal.title} &amp; ML Engineer
          </motion.p>

          {/* Bio */}
          <motion.p variants={itemVariants} className="text-brand-muted leading-relaxed mb-6 max-w-lg text-base">
            {personal.bio}
          </motion.p>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="text-brand-primary font-medium mb-10 text-lg">
            &quot;{personal.tagline}&quot;
          </motion.p>

          {/* Buttons Row 1 */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-6">
            <MagneticButton>
              <a
                href="/Muhammad_Anas_Resume.pdf"
                download="Muhammad_Anas_Resume.pdf"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline inline-flex items-center gap-2"
              >
                View My Work <ArrowRight size={18} />
              </button>
            </MagneticButton>
            
            <MagneticButton>
              <button
                onClick={onOpenChat}
                className="btn-outline"
              >
                Contact Me
              </button>
            </MagneticButton>
          </motion.div>

          {/* Social Links Row 2 */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            {[
              { href: personal.socials.github, Icon: Github, label: 'GitHub' },
              { href: personal.socials.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${personal.socials.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <MagneticButton key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-brand-border bg-[#111214] hover:bg-[#1A1B1E] hover:border-[rgba(255,255,255,0.15)] text-brand-muted hover:text-brand-text group"
                >
                  <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: Photo area ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex justify-center md:justify-end items-center relative"
        >
          <div className="relative flex items-center justify-center w-full max-w-[500px] aspect-square">
            
            {/* Outer Circular Grid */}
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
                  src="/avatar.jpeg"
                  alt="Muhammad Anas"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top"
                  priority
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
            </div>
            
            {/* Tiny blue node accents */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(59,130,246,0.8)] z-20" />

          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-widest text-brand-dim uppercase font-mono">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-dim to-transparent" />
      </motion.div>
    </section>
  );
}
