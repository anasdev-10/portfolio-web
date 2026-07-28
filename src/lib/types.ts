export interface Social {
  github: string;
  linkedin: string;
  email: string;
}

export interface Personal {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  tagline: string;
  socials: Social;
}

export interface Skills {
  languages: string[];
  ml_ai: string[];
  backend: string[];
  tools: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  duration?: string;
  techStack: string[];
  achievements: string[];
  impact: string;
  github: string;
  learnings?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  keyResponsibilities?: string[];
}

export interface Education {
  degree: string;
  school: string;
  duration: string;
  coursework: string;
  notable?: string;
}

export interface FutureGoals {
  focus: string;
  interests: string[];
}

export interface AssistantKnowledge {
  personality: string;
  keyMessages: string[];
  commonQuestions: Record<string, string>;
}

export interface PortfolioData {
  personal: Personal;
  skills: Skills;
  projects: Project[];
  experience: Experience;
  education: Education;
  futureGoals?: FutureGoals;
  assistantKnowledge?: AssistantKnowledge;
}
