'use client';

import { GraduationCap, Briefcase, Target, Download, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Experience, Education, FutureGoals } from '@/lib/types';
import MagneticButton from './MagneticButton';

interface AboutProps {
  experience: Experience;
  education: Education;
  futureGoals?: FutureGoals;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function About({ experience, education, futureGoals }: AboutProps) {
  return (
    <section id="about" className="py-28 px-6 relative bg-brand-bg">
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
            <p className="text-brand-primary font-mono text-sm uppercase tracking-widest">// background</p>
            <div className="h-px bg-brand-border flex-grow max-w-[200px]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text">About Me</h2>
            <p className="text-brand-muted max-w-sm text-sm">
              AI Engineer building production systems that solve real problems — not just demos.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mb-16"
        >
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-brand-border" />

          {/* Education */}
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col md:flex-row md:items-start gap-6 mb-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-primary border-4 border-brand-bg z-10 mt-1" />

            {/* Date label */}
            <div className="hidden md:block w-1/2 pr-12 text-right pt-1">
              <span className="text-brand-muted font-mono text-sm">{education.duration}</span>
            </div>

            {/* Card */}
            <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12">
              <div className="card-graphite p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-[rgba(255,255,255,0.03)] border border-brand-border rounded-lg">
                    <GraduationCap size={18} className="text-brand-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text">{education.degree}</h3>
                    <p className="text-brand-muted text-sm">{education.school}</p>
                    <p className="text-brand-dim text-xs font-mono md:hidden mt-1">{education.duration}</p>
                  </div>
                </div>
                <p className="text-brand-dim text-sm leading-relaxed">
                  <span className="text-brand-muted font-medium">Coursework: </span>
                  {education.coursework}
                </p>
                {education.notable && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-brand-primary" />
                    <span className="text-brand-muted">{education.notable}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col md:flex-row md:items-start gap-6 mb-12"
          >
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-text border-4 border-brand-bg z-10 mt-1" />

            {/* Card on left for alternating */}
            <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12">
              <div className="card-graphite p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-[rgba(255,255,255,0.03)] border border-brand-border rounded-lg">
                    <Briefcase size={18} className="text-brand-text" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-text">{experience.title}</h3>
                    <p className="text-brand-muted text-sm">{experience.company} · {experience.location}</p>
                    <p className="text-brand-dim text-xs font-mono mt-1">{experience.duration}</p>
                  </div>
                </div>
                <p className="text-brand-dim text-sm leading-relaxed mb-4">{experience.description}</p>
                {experience.keyResponsibilities && (
                  <ul className="space-y-2">
                    {experience.keyResponsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-border mt-1.5 flex-shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Date label right */}
            <div className="hidden md:block w-1/2 pl-12 pt-1">
              <span className="text-brand-muted font-mono text-sm">{experience.duration}</span>
            </div>
          </motion.div>

          {/* Future / Goals */}
          {futureGoals && (
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col md:flex-row md:items-start gap-6"
            >
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-border border-4 border-brand-bg z-10 mt-1" />

              <div className="hidden md:block w-1/2 pr-12 text-right pt-1">
                <span className="text-brand-muted font-mono text-sm">Now → Future</span>
              </div>

              <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12">
                <div className="card-graphite p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 bg-[rgba(255,255,255,0.03)] border border-brand-border rounded-lg">
                      <Target size={18} className="text-brand-text" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-text">What&apos;s Next</h3>
                      <p className="text-brand-muted text-sm">{futureGoals.focus}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {futureGoals.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="tech-chip"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Resume Download */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={itemVariants}
          className="text-center"
        >
          <div className="inline-block card-graphite p-8 border border-brand-border">
            <p className="text-brand-text mb-2 text-lg font-semibold">Want the full picture?</p>
            <p className="text-brand-muted text-sm mb-6">Download my resume for complete details on projects, experience, and skills.</p>
            <MagneticButton>
              <a
                href="/Muhammad_Anas_Resume.pdf"
                download="Muhammad_Anas_Resume.pdf"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume (PDF)
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
