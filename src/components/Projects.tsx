'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, MessageCircle, ExternalLink, Filter } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectsProps {
  projects: Project[];
  onAskAbout: (msg: string) => void;
}

export default function Projects({ projects, onAskAbout }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Build unique filter tags from all project tech stacks
  const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.techStack))).slice(0, 10)];

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.techStack.includes(activeFilter));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Color accent cycling per project
  const accentColors = [
    { border: 'hover:border-cyan-500/60', glow: 'hover:shadow-cyan-500/15', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' },
    { border: 'hover:border-pink-500/60', glow: 'hover:shadow-pink-500/15', badge: 'bg-pink-500/10 text-pink-400 border-pink-500/30' },
    { border: 'hover:border-violet-500/60', glow: 'hover:shadow-violet-500/15', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30' },
    { border: 'hover:border-amber-500/60', glow: 'hover:shadow-amber-500/15', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-3">// featured work</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 section-heading">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Production systems built from concept to scale. Each project demonstrates real-world problem-solving with measurable impact.
          </p>
        </div>

        {/* Filter Bar */}
        <div
          className={`flex flex-wrap gap-2 justify-center mb-12 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-1 text-slate-500 mr-2">
            <Filter size={14} />
            <span className="text-xs">Filter:</span>
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 font-mono ${
                activeFilter === tag
                  ? 'bg-cyan-500 border-cyan-400 text-black font-semibold shadow-lg shadow-cyan-500/30'
                  : 'bg-transparent border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, idx) => {
            const accent = accentColors[idx % accentColors.length];
            return (
              <div
                key={project.id}
                className={`card-neon p-8 group cursor-default transition-all duration-500 hover:shadow-2xl ${accent.border} ${accent.glow} ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${200 + idx * 100}ms` }}
              >
                {/* Top: Title + Duration */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      {idx === 0 && (
                        <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs rounded-full font-mono">
                          FYP Lead
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium" style={{ color: idx % 2 === 0 ? '#00d4ff' : idx % 3 === 1 ? '#ff006e' : '#a78bfa' }}>
                      {project.subtitle}
                    </p>
                  </div>
                  {project.duration && (
                    <span className="text-xs text-slate-500 font-mono text-right ml-3 flex-shrink-0">
                      {project.duration}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className={`tech-chip ${accent.badge}`}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <div className="mb-5">
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">Key Results</p>
                  <ul className="space-y-1.5">
                    {project.achievements.slice(0, 3).map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-cyan-400 mt-0.5 flex-shrink-0">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div className="mb-5 px-4 py-3 bg-white/3 border border-white/8 rounded-lg">
                  <p className="text-xs text-slate-500 font-mono mb-1">Impact</p>
                  <p className="text-sm text-slate-200 italic">&quot;{project.impact}&quot;</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-all duration-200 group/link"
                  >
                    <Github size={15} className="group-hover/link:text-cyan-400 transition-colors" />
                    <span>Code</span>
                    <ExternalLink size={11} className="opacity-50" />
                  </a>
                  <button
                    onClick={() => {
                      onAskAbout(`Tell me more about ${project.title}`);
                    }}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-pink-400 transition-all duration-200"
                  >
                    <MessageCircle size={15} />
                    <span>Ask Assistant</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p>No projects match this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
