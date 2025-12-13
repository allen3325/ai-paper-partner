import { createContext, useContext, useState, ReactNode } from 'react';
import type { Project } from '@/types';

interface ProjectContextType {
  currentProject: Project | null;
  projects: Project[];
  switchProject: (id: string) => void;
  createProject: (project: Omit<Project, 'id'>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mock initial data
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Deep Learning Research',
    description: '研究深度學習相關論文',
    icon: '🧠',
    paperCount: 4,
    chatCount: 23,
    lastUpdated: '2 天前',
  },
  {
    id: '2',
    name: 'NLP & Transformers',
    description: '自然語言處理與 Transformer 架構',
    icon: '🤖',
    paperCount: 7,
    chatCount: 45,
    lastUpdated: '5 天前',
  },
  {
    id: '3',
    name: 'Computer Vision',
    description: '影像辨識與物件偵測研究',
    icon: '👁️',
    paperCount: 5,
    chatCount: 12,
    lastUpdated: '1 週前',
  },
  {
    id: '4',
    name: 'Reinforcement Learning',
    description: '強化學習演算法與應用',
    icon: '🔬',
    paperCount: 3,
    chatCount: 8,
    lastUpdated: '2 週前',
  },
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [currentProject, setCurrentProject] = useState<Project | null>(MOCK_PROJECTS[0]);

  const switchProject = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setCurrentProject(project);
    }
  };

  const createProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    setProjects([newProject, ...projects]);
    setCurrentProject(newProject);
  };

  return (
    <ProjectContext.Provider value={{ currentProject, projects, switchProject, createProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
