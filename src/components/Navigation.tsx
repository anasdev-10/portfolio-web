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
          ? 'bg-[#0B0B0C]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xl font-bold tracking-tight text-white flex items-center gap-2"
        >
          Anas
          <span className="text-white/40 text-sm font-normal hidden sm:inline">AI Engineer</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm font-medium transition-colors duration-200 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-white'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social icons desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-white transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${personal.socials.email}`}
            className="text-brand-muted hover:text-white transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition"
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
        <div className="px-6 py-4 bg-[#0B0B0C]/95 backdrop-blur-xl border-b border-white/5 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-4 py-3 text-brand-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-6 px-4 pt-4 border-t border-white/10 mt-2">
            <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-white transition">
              <Github size={18} />
            </a>
            <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-white transition">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${personal.socials.email}`} className="text-brand-muted hover:text-white transition">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
