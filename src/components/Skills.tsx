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
    description: 'Core programming languages',
  },
  {
    key: 'ml_ai' as keyof SkillsType,
    label: 'ML / AI Stack',
    Icon: Brain,
    description: 'Machine learning & AI frameworks',
  },
  {
    key: 'backend' as keyof SkillsType,
    label: 'Backend & Databases',
    Icon: Server,
    description: 'APIs, databases & infrastructure',
  },
  {
    key: 'tools' as keyof SkillsType,
    label: 'Tools & Platforms',
    Icon: Wrench,
    description: 'DevOps, scraping & deployment',
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
    <section id="skills" ref={sectionRef} className="py-28 px-6 relative bg-brand-bg">
      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Heading */}
        <div
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <p className="text-brand-primary font-mono text-sm uppercase tracking-widest">// tech stack</p>
            <div className="h-px bg-brand-border flex-grow max-w-[200px]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text">
              Skills &amp; Technologies
            </h2>
            <p className="text-brand-muted max-w-sm text-sm">
              Full-stack AI/ML capability — from data pipelines to production deployment.
            </p>
          </div>
        </div>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, catIdx) => {
            const items = skills[cat.key] as string[];
            return (
              <div
                key={cat.key}
                className={`card-graphite p-6 transition-all duration-700`}
                style={{
                  transitionDelay: `${catIdx * 100}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-brand-border">
                    <cat.Icon size={18} className="text-brand-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text text-sm">{cat.label}</h3>
                    <p className="text-xs text-brand-dim">{cat.description}</p>
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 stagger">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="tech-chip"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Count badge */}
                <div className="mt-6 pt-4 border-t border-brand-border">
                  <p className="text-xs font-mono text-brand-dim">
                    <span className="text-brand-primary">{items.length}</span> technologies
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
