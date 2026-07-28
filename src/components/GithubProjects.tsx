'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Star, GitFork, ExternalLink, Code2, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  fork: boolean;
  updated_at: string;
}

interface GithubProjectsProps {
  username: string;
  featuredProjects: Project[];
}

export default function GithubProjects({ username, featuredProjects }: GithubProjectsProps) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: GithubRepo[] = await res.json();
        
        // Extract github URLs from featured projects to exclude them
        const featuredUrls = featuredProjects.map(p => p.github.toLowerCase());
        const featuredNames = featuredProjects.map(p => p.title.toLowerCase());
        
        const filtered = data.filter(repo => 
          !repo.fork && // Don't show forks
          repo.description && // Must have a description
          !featuredUrls.includes(repo.html_url.toLowerCase()) && // Exclude already featured by URL
          !featuredNames.includes(repo.name.toLowerCase()) // Exclude already featured by name
        );
        
        // Take top 6 most recently updated original repos
        setRepos(filtered.slice(0, 6));
      } catch (error) {
        console.error('Error fetching github repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, featuredProjects]);

  if (loading || repos.length === 0) {
    // Only show if we actually fetched something or are loading
    return null;
  }

  return (
    <section ref={sectionRef} className="py-16 px-6 relative border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className={`flex items-center justify-between mb-10 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Github size={24} className="text-slate-400" />
              Other Open Source Work
            </h3>
            <p className="text-slate-400 text-sm">Smaller projects, scripts, and experiments directly from GitHub.</p>
          </div>
          <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all text-sm font-medium"
          >
            View GitHub Profile <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, idx) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block card-neon p-6 group transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${100 + idx * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <Github size={20} className="text-indigo-400 group-hover:text-cyan-400 transition-colors" />
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  )}
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">{repo.name}</h4>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10">{repo.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                  <span className="text-xs text-slate-300 font-medium">{repo.language || 'Code'}</span>
                </div>
                <span className="text-xs text-slate-500 group-hover:text-white transition-colors flex items-center gap-1">
                  View <ArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
           <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all text-sm font-medium"
          >
            View GitHub Profile <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// Helper for language colors
function getLanguageColor(lang: string) {
  const colors: Record<string, string> = {
    Python: '#3572A5',
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Jupyter: '#DA5B0B',
    'C++': '#f34b7d',
    C: '#555555',
    Shell: '#89e051',
    Go: '#00ADD8',
    Rust: '#dea584'
  };
  return colors[lang] || '#a855f7';
}
