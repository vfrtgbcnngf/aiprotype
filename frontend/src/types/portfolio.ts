export interface Skill {
  name: string;
  level: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  metrics: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  skills: Skill[];
  projects: Project[];
}