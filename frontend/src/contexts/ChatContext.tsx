import { createContext, useContext, useState, ReactNode } from 'react';
import type { Message } from '@/types';

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  selectedPapers: string[];
  sendMessage: (content: string) => Promise<void>;
  removePaper: (paperId: string) => void;
  addPaper: (paperId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock initial messages
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    content:
      "Hello! I'm your AI research assistant. Upload papers and I'll help you understand and analyze them.",
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you explain the main contributions of this paper?',
    timestamp: new Date(),
  },
  {
    id: '3',
    role: 'ai',
    content: `Based on "Attention is All You Need", the main contributions include:

1. Introduced the Transformer architecture, entirely based on attention mechanisms
2. Eliminates recurrent neural networks and convolutional layers
3. Enables parallel processing, significantly improving training efficiency
4. Achieved SOTA performance on machine translation tasks`,
    timestamp: new Date(),
  },
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPapers, setSelectedPapers] = useState<string[]>([
    'Attention is All You Need',
    'BERT: Pre-training...',
  ]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'This is a mock response from the AI assistant.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const removePaper = (paperId: string) => {
    setSelectedPapers((prev) => prev.filter((id) => id !== paperId));
  };

  const addPaper = (paperId: string) => {
    setSelectedPapers((prev) => [...prev, paperId]);
  };

  return (
    <ChatContext.Provider
      value={{ messages, isTyping, selectedPapers, sendMessage, removePaper, addPaper }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
