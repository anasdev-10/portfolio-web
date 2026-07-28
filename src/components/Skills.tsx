'use client';

import { useEffect, useRef, useState } from 'react';
import { Code2, Brain, Server, Wrench } from 'lucide-react';
import type { Skills as SkillsType } from '@/lib/types';

interface SkillsProps {
  skills: SkillsType;
}

const categories = [
  {
    key: 'languages' as keyof SkillsType,
    label: 'Languages',
    Icon: Code2,
    color: 'cyan',
    description: 'Core programming languages',
    borderColor: 'border-cyan-500/30',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    chipBg: 'bg-cyan-500/8 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-500/20',
  },
  {
    key: 'ml_ai' as keyof SkillsType,
    label: 'ML / AI Stack',
    Icon: Brain,
    color: 'pink',
    description: 'Machine learning & AI frameworks',
    borderColor: 'border-pink-500/30',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400',
    chipBg: 'bg-pink-500/8 border-pink-500/20 text-pink-300 hover:bg-pink-500/20 hover:border-pink-500/50 hover:shadow-pink-500/20',
  },
  {
    key: 'backend' as keyof SkillsType,
    label: 'Backend & Databases',
    Icon: Server,
    color: 'violet',
    description: 'APIs, databases & infrastructure',
    borderColor: 'border-violet-500/30',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    chipBg: 'bg-violet-500/8 border-violet-500/20 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 hover:shadow-violet-500/20',
  },
  {
    key: 'tools' as keyof SkillsType,
    label: 'Tools & Platforms',
    Icon: Wrench,
    color: 'amber',
    description: 'DevOps, scraping & deployment',
    borderColor: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    chipBg: 'bg-amber-500/8 border-amber-500/20 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/20',
  },
];

export default function Skills({ skills }: SkillsProps) {
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

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-pink-400 font-mono text-sm uppercase tracking-widest mb-3">// tech stack</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 section-heading">
            Skills &amp; Technologies
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Full-stack AI/ML capability — from data pipelines to production deployment.
          </p>
        </div>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, catIdx) => {
            const items = skills[cat.key] as string[];
            return (
              <div
                key={cat.key}
                className={`card-neon p-6 ${cat.borderColor} transition-all duration-700`}
                style={{
                  transitionDelay: `${catIdx * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-lg ${cat.iconBg}`}>
                    <cat.Icon size={18} className={cat.iconColor} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{cat.label}</h3>
                    <p className="text-xs text-slate-500">{cat.description}</p>
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 stagger">
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 cursor-default hover:shadow-lg font-mono ${cat.chipBg}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Count badge */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className={`text-xs font-mono ${cat.iconColor} opacity-70`}>
                    {items.length} technologies
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
