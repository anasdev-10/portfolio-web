'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Target, Download, CheckCircle } from 'lucide-react';
import type { Experience, Education, FutureGoals } from '@/lib/types';

interface AboutProps {
  experience: Experience;
  education: Education;
  futureGoals?: FutureGoals;
}

export default function About({ experience, education, futureGoals }: AboutProps) {
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
    <section id="about" ref={sectionRef} className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/3 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-violet-400 font-mono text-sm uppercase tracking-widest mb-3">// background</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 section-heading">About Me</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            AI Engineer building production systems that solve real problems — not just demos.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-12">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-pink-500/30 to-violet-500/20" />

          {/* Education */}
          <div
            className={`relative flex flex-col md:flex-row md:items-start gap-6 mb-10 transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-pink-500 border-2 border-[#0a0e27] shadow-lg shadow-pink-500/50 z-10 mt-1" />

            {/* Date label */}
            <div className="hidden md:block w-1/2 pr-12 text-right pt-1">
              <span className="text-pink-400 font-mono text-sm">{education.duration}</span>
            </div>

            {/* Card */}
            <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12">
              <div className="card-neon p-6 hover:border-pink-500/50 hover:shadow-pink-500/15">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <GraduationCap size={18} className="text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{education.degree}</h3>
                    <p className="text-pink-400 text-sm">{education.school}</p>
                    <p className="text-slate-500 text-xs font-mono md:hidden">{education.duration}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <span className="text-slate-300 font-medium">Coursework: </span>
                  {education.coursework}
                </p>
                {education.notable && (
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-pink-400" />
                    <span className="text-slate-300">{education.notable}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div
            className={`relative flex flex-col md:flex-row md:items-start gap-6 mb-10 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-cyan-500 border-2 border-[#0a0e27] shadow-lg shadow-cyan-500/50 z-10 mt-1" />

            {/* Card on left for alternating */}
            <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12">
              <div className="card-neon p-6 hover:border-cyan-500/50 hover:shadow-cyan-500/15">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Briefcase size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{experience.title}</h3>
                    <p className="text-cyan-400 text-sm">{experience.company} · {experience.location}</p>
                    <p className="text-slate-500 text-xs font-mono">{experience.duration}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">{experience.description}</p>
                {experience.keyResponsibilities && (
                  <ul className="space-y-1.5">
                    {experience.keyResponsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-cyan-400 mt-0.5 flex-shrink-0">▸</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Date label right */}
            <div className="hidden md:block w-1/2 pl-12 pt-1">
              <span className="text-cyan-400 font-mono text-sm">{experience.duration}</span>
            </div>
          </div>

          {/* Future / Goals */}
          {futureGoals && (
            <div
              className={`relative flex flex-col md:flex-row md:items-start gap-6 transition-all duration-700 delay-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-violet-500 border-2 border-[#0a0e27] shadow-lg shadow-violet-500/50 z-10 mt-1 animate-glow-pulse" />

              <div className="hidden md:block w-1/2 pr-12 text-right pt-1">
                <span className="text-violet-400 font-mono text-sm">Now → Future</span>
              </div>

              <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12">
                <div className="card-neon p-6 hover:border-violet-500/50 hover:shadow-violet-500/15">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <Target size={18} className="text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">What&apos;s Next</h3>
                      <p className="text-violet-400 text-sm">{futureGoals.focus}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {futureGoals.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs rounded-full font-mono"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resume Download */}
        <div
          className={`text-center transition-all duration-700 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block glass rounded-2xl p-8 border border-cyan-500/20">
            <p className="text-slate-300 mb-2 text-lg font-semibold">Want the full picture?</p>
            <p className="text-slate-500 text-sm mb-6">Download my resume for complete details on projects, experience, and skills.</p>
            <a
              href="/Muhammad_Anas_Resume.pdf"
              download="Muhammad_Anas_Resume.pdf"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
