'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import type { Personal } from '@/lib/types';

interface NavigationProps {
  personal: Personal;
}

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation({ personal }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['projects', 'skills', 'about', 'contact'];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0e27]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-2xl font-black tracking-tight"
        >
          <span className="text-shimmer">Anas</span>
          <span className="text-white/30 text-sm font-normal ml-2 hidden sm:inline">AI Engineer</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm font-medium transition-all duration-200 relative group ${
                activeSection === link.href.replace('#', '')
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Social icons desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${personal.socials.email}`}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 bg-[#0a0e27]/95 backdrop-blur-md border-b border-cyan-500/20 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-all duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-4 px-4 pt-3 border-t border-slate-700/50 mt-2">
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
              <Github size={18} />
            </a>
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personal.socials.email}`} className="text-slate-400 hover:text-cyan-400 transition">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
