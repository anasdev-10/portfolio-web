'use client';

import { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';
import MagneticButton from './MagneticButton';

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

export default function GithubProjects({ username, featuredProjects }: GithubProjectsProps) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

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
    return null;
  }

  return (
    <section className="py-16 px-6 relative border-t border-brand-border bg-brand-bg">
      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h3 className="text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
              <Github size={24} className="text-brand-muted" />
              Other Open Source Work
            </h3>
            <p className="text-brand-muted text-sm">Smaller projects, scripts, and experiments directly from GitHub.</p>
          </div>
          <MagneticButton>
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] text-brand-text rounded-lg border border-brand-border transition-all text-sm font-medium"
            >
              View GitHub Profile <ExternalLink size={14} />
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.id}
              variants={itemVariants}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block card-graphite p-6 group"
            >
              <div className="flex justify-between items-start mb-4">
                <Github size={20} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                <div className="flex items-center gap-3 text-xs text-brand-dim font-mono">
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1 group-hover:text-brand-success transition-colors">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  )}
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-brand-text mb-2 group-hover:text-brand-primary transition-colors line-clamp-1">{repo.name}</h4>
              <p className="text-brand-muted text-sm mb-6 line-clamp-2 h-10">{repo.description}</p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-brand-border">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                  <span className="text-xs text-brand-muted font-medium">{repo.language || 'Code'}</span>
                </div>
                <span className="text-xs text-brand-dim group-hover:text-brand-text transition-colors flex items-center gap-1">
                  View <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center sm:hidden">
          <MagneticButton>
            <a 
              href={`https://github.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] text-brand-text rounded-lg border border-brand-border transition-all text-sm font-medium"
            >
              View GitHub Profile <ExternalLink size={14} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function getLanguageColor(lang: string) {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    Rust: '#dea584',
    Go: '#00ADD8',
    'Jupyter Notebook': '#DA5B0B'
  };
  return colors[lang] || '#8b949e';
}
