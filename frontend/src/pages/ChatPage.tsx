import { useState } from 'react';
import { useChat } from '@/contexts';
import { AppLayout } from '@/components/layout/AppLayout';
import { cn } from '@/utils';
import { X } from 'lucide-react';

function MessageBubble({ message }: { message: { role: 'user' | 'ai'; content: string } }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-4 mb-6', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-semibold tracking-wide flex-shrink-0',
          isUser
            ? 'bg-gradient-to-br from-[#f093fb] to-[#f5576c]'
            : 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
        )}
      >
        {isUser ? 'YOU' : 'AI'}
      </div>
      <div
        className={cn(
          'max-w-[65%] px-4 py-3.5 rounded-xl text-sm leading-relaxed',
          isUser
            ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white'
            : 'bg-gray-50 text-gray-700'
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function ContextTags() {
  const { selectedPapers, removePaper } = useChat();

  if (selectedPapers.length === 0) return null;

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {selectedPapers.map((paper) => (
        <div
          key={paper}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-xs font-medium text-gray-700"
        >
          {paper}
          <X
            className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => removePaper(paper)}
          />
        </div>
      ))}
    </div>
  );
}

function ChatInput() {
  const { sendMessage, isTyping } = useChat();
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-5 border-t border-gray-100 bg-white">
      <ContextTags />
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50 transition-all focus:bg-white focus:border-gray-300"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={isTyping}
          className="px-6 py-3 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold text-sm hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTyping ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export function ChatPage() {
  const { messages } = useChat();

  return (
    <AppLayout title="聊天對話">
      <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        <ChatInput />
      </div>
    </AppLayout>
  );
}
