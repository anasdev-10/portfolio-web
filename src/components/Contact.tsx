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
      color: 'cyan',
      borderClass: 'border-cyan-500/30 hover:border-cyan-500/70 hover:shadow-cyan-500/15',
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-400',
    },
    {
      label: 'LinkedIn',
      value: 'muhammad-anas10',
      href: personal.socials.linkedin,
      Icon: Linkedin,
      description: 'Connect for opportunities & networking',
      color: 'pink',
      borderClass: 'border-pink-500/30 hover:border-pink-500/70 hover:shadow-pink-500/15',
      iconBg: 'bg-pink-500/10',
      iconColor: 'text-pink-400',
    },
    {
      label: 'GitHub',
      value: 'anasdev-10',
      href: personal.socials.github,
      Icon: Github,
      description: 'Explore all projects & source code',
      color: 'violet',
      borderClass: 'border-violet-500/30 hover:border-violet-500/70 hover:shadow-violet-500/15',
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-400',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-3">// get in touch</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 section-heading">
            Let&apos;s Build Together
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-lg">
            Whether it&apos;s a full-time role, consulting project, or just a chat about AI — I&apos;m always open to the right conversation.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {contactLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className={`card-neon p-6 block group transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${link.borderClass}`}
              style={{ transitionDelay: `${idx * 100}ms`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <div className={`p-3 rounded-xl ${link.iconBg} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <link.Icon size={22} className={link.iconColor} />
              </div>
              <h3 className="font-bold text-white mb-1 text-lg">{link.label}</h3>
              <p className={`font-mono text-sm mb-2 ${link.iconColor}`}>{link.value}</p>
              <p className="text-slate-500 text-xs">{link.description}</p>
              <div className={`flex items-center gap-1 mt-4 text-xs font-medium ${link.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                <span>Open</span>
                <ArrowRight size={12} />
              </div>
            </a>
          ))}
        </div>

        {/* Chat CTA */}
        <div
          className={`text-center transition-all duration-700 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass rounded-2xl p-8 border border-cyan-500/20">
            <p className="text-slate-300 text-lg mb-2 font-semibold">Not sure where to start?</p>
            <p className="text-slate-500 mb-6 text-sm">
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
        <div className="mt-16 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-600 text-sm font-mono">
            © 2026 Muhammad Anas · Built with Next.js &amp; Gemini AI · Lahore, Pakistan
          </p>
        </div>
      </div>
    </section>
  );
}
