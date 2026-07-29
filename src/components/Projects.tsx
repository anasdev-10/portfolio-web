'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, MessageCircle, ExternalLink, Filter, ArrowRight } from 'lucide-react';
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

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 relative bg-brand-bg">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Heading */}
        <div
          className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-4 mb-4">
            <p className="text-brand-primary font-mono text-sm uppercase tracking-widest">// featured work</p>
            <div className="h-px bg-brand-border flex-grow max-w-[200px]" />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text">
              Featured Projects
            </h2>
            <p className="text-brand-muted max-w-sm text-sm">
              Production systems built from concept to scale. Each project demonstrates real-world problem-solving with measurable impact.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          className={`flex flex-wrap gap-2 mb-12 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-1 text-brand-dim mr-2">
            <Filter size={14} />
            <span className="text-xs font-mono">Filter:</span>
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 font-mono ${
                activeFilter === tag
                  ? 'bg-brand-text border-brand-text text-brand-bg'
                  : 'bg-transparent border-brand-border text-brand-muted hover:border-[rgba(255,255,255,0.2)] hover:text-brand-text'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, idx) => {
            return (
              <div
                key={project.id}
                className={`card-graphite p-8 group flex flex-col justify-between cursor-default ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
              >
                <div>
                  {/* Top: Title + Duration */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-brand-text group-hover:text-brand-primary transition-colors duration-300 flex items-center gap-2">
                          {project.title}
                          {/* Animated Arrow on Hover */}
                          <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </h3>
                        {idx === 0 && (
                          <span className="px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] uppercase rounded-full font-mono">
                            FYP Lead
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-brand-muted">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-brand-dim text-sm leading-relaxed mb-6">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <p className="text-xs text-brand-dim font-mono uppercase tracking-wider mb-3">Key Results</p>
                    <ul className="space-y-2">
                      {project.achievements.slice(0, 3).map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-brand-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-border mt-1.5 flex-shrink-0 group-hover:bg-brand-primary/50 transition-colors" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div className="mb-8 px-4 py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl">
                    <p className="text-[10px] text-brand-dim font-mono uppercase tracking-wider mb-1">Impact</p>
                    <p className="text-sm text-brand-muted italic">&quot;{project.impact}&quot;</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-brand-border mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-text transition-colors duration-200"
                  >
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                  <button
                    onClick={() => {
                      onAskAbout(`Tell me more about ${project.title}`);
                    }}
                    className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-primary transition-colors duration-200"
                  >
                    <MessageCircle size={16} />
                    <span>Ask Assistant</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-brand-dim border border-brand-border border-dashed rounded-2xl">
            <p className="font-mono">No projects match this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
