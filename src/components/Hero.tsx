'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import type { Personal } from '@/lib/types';

interface HeroProps {
  personal: Personal;
  onOpenChat: () => void;
}

// Neural Network Canvas Animation
function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }));

    const MAX_DIST = 160;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            // Alternate between purple and cyan tones
            const hue = (i * 7 + j * 3) % 60; // 0-60: cyan to purple range
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(${200 + hue * 2}, 100%, 65%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        const hue = (i * 13) % 60;

        // Outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
        grad.addColorStop(0, `hsla(${200 + hue * 2}, 100%, 70%, ${0.3 * glow})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${200 + hue * 2}, 100%, 75%, ${0.6 + 0.4 * glow})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

export default function Hero({ personal, onOpenChat }: HeroProps) {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = personal.tagline;

  useEffect(() => {
    setVisible(true);
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(delay);
  }, [fullText]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #060612 0%, #0d0a2e 40%, #0a0e1f 70%, #060612 100%)' }}>
      {/* Neural Network */}
      <NeuralNetworkCanvas />

      {/* Deep gradient orbs for color depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,40,255,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)' }} />
      <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,50,255,0.07) 0%, transparent 70%)' }} />

      {/* Two-column layout */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>

        {/* ── LEFT COLUMN: Text content ── */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
          {/* Name */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 leading-tight tracking-tight">
            <span className="text-white">Muhammad </span>
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 50%, #ff006e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Anas</span>
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#a78bfa' }}>
            {personal.title} &amp; ML Engineer
          </p>

          {/* Bio */}
          <p className="text-slate-400 leading-relaxed mb-4 max-w-lg text-base">
            {personal.bio}
          </p>

          {/* Typewriter tagline */}
          <p className="text-sm font-mono mb-8 h-6 cursor-blink" style={{ color: '#00d4ff' }}>
            &quot;{typedText}&quot;
          </p>

          {/* Download CV */}
          <div className="mb-8">
            <a
              href="/Muhammad_Anas_Resume.pdf"
              download="Muhammad_Anas_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)', boxShadow: '0 4px 20px rgba(0,212,255,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,212,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,212,255,0.4)')}
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', boxShadow: '0 4px 20px rgba(168,85,247,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(168,85,247,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(168,85,247,0.4)')}
            >
              View My Work <ArrowRight size={16} />
            </button>
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-300 hover:scale-105"
              style={{ borderColor: 'rgba(0,212,255,0.5)', color: '#00d4ff', background: 'rgba(0,212,255,0.05)' }}
              onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(0,212,255,0.12)'); (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)'); }}
              onMouseLeave={e => { (e.currentTarget.style.background = 'rgba(0,212,255,0.05)'); (e.currentTarget.style.boxShadow = 'none'); }}
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
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
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => { (e.currentTarget.style.background = 'rgba(168,85,247,0.15)'); (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'); }}
                onMouseLeave={e => { (e.currentTarget.style.background = 'rgba(255,255,255,0.05)'); (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'); }}
              >
                <Icon size={17} className="text-slate-300" />
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Photo ── */}
        <div className={`flex justify-center md:justify-end items-center transition-all duration-1000 delay-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
          <div className="relative">
            {/* Background glow blob */}
            <div className="absolute inset-0 rounded-full scale-125 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 60%, rgba(99,40,255,0.35) 0%, rgba(0,212,255,0.1) 50%, transparent 75%)', filter: 'blur(30px)' }} />

            {/* Rotating dashed ring */}
            <div className="absolute inset-[-16px] rounded-full pointer-events-none"
              style={{ border: '1px dashed rgba(168,85,247,0.3)', animation: 'spin 20s linear infinite' }} />
            <div className="absolute inset-[-32px] rounded-full pointer-events-none"
              style={{ border: '1px dashed rgba(0,212,255,0.15)', animation: 'spin 30s linear infinite reverse' }} />

            {/* Photo with gradient border */}
            <div className="relative w-72 h-72 md:w-[360px] md:h-[360px] rounded-full p-[4px]"
              style={{ background: 'linear-gradient(135deg, #a855f7, #00d4ff, #ff006e, #a855f7)', backgroundSize: '300% 300%', animation: 'shimmer 4s linear infinite' }}>
              <div className="w-full h-full rounded-full overflow-hidden"
                style={{ background: '#0d0a2e' }}>
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
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
        <span className="text-[10px] tracking-widest uppercase font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
