'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Send, ArrowRight } from 'lucide-react';
import type { Personal } from '@/lib/types';

interface ContactProps {
  personal: Personal;
  onOpenChat: () => void;
}

export default function Contact({ personal, onOpenChat }: ContactProps) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
    <section id="contact" ref={sectionRef} className="py-28 px-6 relative bg-brand-bg">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Heading */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
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
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {contactLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className={`card-graphite p-6 block group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
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
            </a>
          ))}
        </div>

        {/* Chat CTA */}
        <div
          className={`text-center transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block card-graphite p-8">
            <p className="text-brand-text text-lg mb-2 font-semibold">Not sure where to start?</p>
            <p className="text-brand-muted mb-8 text-sm">
              Chat with Anas Assistant — it knows everything about my projects, skills, and availability.
            </p>
            <button
              onClick={onOpenChat}
              className="btn-outline inline-flex items-center gap-2"
            >
              <Send size={16} />
              Open Anas Assistant
            </button>
          </div>
        </div>

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
