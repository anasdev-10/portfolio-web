'use client';

import { Code2, Brain, Server, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
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

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-28 px-6 relative bg-brand-bg">
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
        </motion.div>

        {/* Skill cards grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => {
            const items = skills[cat.key] as string[];
            return (
              <motion.div
                key={cat.key}
                variants={itemVariants}
                className="card-graphite p-6"
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
                <div className="flex flex-wrap gap-2">
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
