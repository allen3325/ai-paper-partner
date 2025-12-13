import type { Project, Paper, Message, Settings } from '@/types';

/**
 * Service Layer with Mock APIs
 * TODO: Replace with actual API calls when backend is ready
 */

// Chat Service
export const chatService = {
  sendMessage: async (message: string): Promise<Message> => {
    console.log('Mock API: Sending message', message);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          role: 'ai',
          content: 'This is a mock response from the AI assistant.',
          timestamp: new Date(),
        });
      }, 1000);
    });
  },
};

// Project Service
export const projectService = {
  createProject: async (
    data: Omit<Project, 'id'>
  ): Promise<{ success: boolean; project: Project }> => {
    console.log('Mock API: Creating project', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject: Project = {
          ...data,
          id: Date.now().toString(),
        };
        resolve({ success: true, project: newProject });
      }, 500);
    });
  },

  getProjects: async (): Promise<Project[]> => {
    console.log('Mock API: Fetching projects');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },

  deleteProject: async (id: string): Promise<{ success: boolean }> => {
    console.log('Mock API: Deleting project', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};

// Paper Service
export const paperService = {
  uploadPaper: async (file: File): Promise<{ success: boolean; paper: Paper }> => {
    console.log('Mock API: Uploading paper', file.name);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPaper: Paper = {
          id: Date.now().toString(),
          title: file.name.replace('.pdf', ''),
          authors: 'Unknown',
          date: new Date().toISOString().split('T')[0],
          pages: 0,
          status: 'processing',
          projectId: '1',
        };
        resolve({ success: true, paper: newPaper });
      }, 1000);
    });
  },

  getPapers: async (projectId: string): Promise<Paper[]> => {
    console.log('Mock API: Fetching papers for project', projectId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },

  deletePaper: async (id: string): Promise<{ success: boolean }> => {
    console.log('Mock API: Deleting paper', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};

// Settings Service
export const settingsService = {
  getSettings: async (): Promise<Settings> => {
    console.log('Mock API: Fetching settings');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          model: {
            systemPrompt:
              'You are a professional AI research assistant, skilled at understanding and analyzing academic papers.',
            temperature: 0.7,
            topP: 0.9,
            maxTokens: 2048,
            responseLanguage: 'English',
          },
          rag: {
            retrievalCount: 5,
            similarityThreshold: 0.7,
          },
        });
      }, 500);
    });
  },

  saveSettings: async (settings: Settings): Promise<{ success: boolean }> => {
    console.log('Mock API: Saving settings', settings);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};
