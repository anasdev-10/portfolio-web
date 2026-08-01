'use client';

import { Github, Linkedin, Mail, Send, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Personal } from '@/lib/types';
import MagneticButton from './MagneticButton';

interface ContactProps {
  personal: Personal;
  onOpenChat: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 } 
  },
};

export default function Contact({ personal, onOpenChat }: ContactProps) {
  const contactLinks = [
    {
      label: 'Email',
      value: personal.socials.email,
      href: `mailto:${personal.socials.email}`,
      Icon: Mail,
      description: 'Best for project inquiries & consulting',
    },
    {
      label: 'LinkedIn',
      value: 'muhammad-anas10',
      href: personal.socials.linkedin,
      Icon: Linkedin,
      description: 'Connect for opportunities & networking',
    },
    {
      label: 'GitHub',
      value: 'anasdev-10',
      href: personal.socials.github,
      Icon: Github,
      description: 'Explore all projects & source code',
    },
  ];

  return (
    <section id="contact" className="py-28 px-6 relative bg-brand-bg">
      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <p className="text-brand-primary font-mono text-sm uppercase tracking-widest">// get in touch</p>
            <div className="h-px bg-brand-border flex-grow max-w-[200px]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text">
              Let&apos;s Build Together
            </h2>
            <p className="text-brand-muted max-w-sm text-sm">
              Whether it&apos;s a full-time role, consulting project, or just a chat about AI — I&apos;m always open to the right conversation.
            </p>
          </div>
        </motion.div>

        {/* Contact cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-5 mb-16"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              variants={itemVariants}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="card-graphite p-6 block group"
            >
              <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-brand-border w-fit mb-5 group-hover:bg-brand-primary group-hover:border-brand-primary transition-colors duration-300">
                <link.Icon size={20} className="text-brand-text" />
              </div>
              <h3 className="font-semibold text-brand-text mb-1 text-lg">{link.label}</h3>
              <p className="font-mono text-sm mb-3 text-brand-primary">{link.value}</p>
              <p className="text-brand-dim text-xs">{link.description}</p>
              <div className="flex items-center gap-1 mt-5 text-xs font-medium text-brand-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Open</span>
                <ArrowRight size={12} />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Chat CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="text-center"
        >
          <div className="inline-block card-graphite p-8">
            <p className="text-brand-text text-lg mb-2 font-semibold">Not sure where to start?</p>
            <p className="text-brand-muted mb-8 text-sm">
              Chat with Anas Assistant — it knows everything about my projects, skills, and availability.
            </p>
            <MagneticButton>
              <button
                onClick={onOpenChat}
                className="btn-outline inline-flex items-center gap-2"
              >
                <Send size={16} />
                Open Anas Assistant
              </button>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-brand-border text-center flex flex-col items-center gap-4">
          <p className="text-brand-dim text-xs font-mono">
            © 2026 Muhammad Anas
          </p>
        </div>
      </div>
    </section>
  );
}
