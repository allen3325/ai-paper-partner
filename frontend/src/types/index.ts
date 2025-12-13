// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  paperCount: number;
  chatCount: number;
  lastUpdated: string;
}

// Paper Types
export interface Paper {
  id: string;
  title: string;
  authors: string;
  date: string;
  pages: number;
  status: 'processing' | 'indexed' | 'failed';
  projectId: string;
}

// Message Types
export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Settings Types
export interface ModelSettings {
  systemPrompt: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  responseLanguage: string;
}

export interface RAGSettings {
  retrievalCount: number;
  similarityThreshold: number;
}

export interface Settings {
  model: ModelSettings;
  rag: RAGSettings;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
