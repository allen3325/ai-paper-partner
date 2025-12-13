import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '@/contexts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal, ModalButtons } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { FileText, MessageCircle, Calendar, Plus } from 'lucide-react';
import type { Project } from '@/types';

const ICON_OPTIONS = ['🧠', '🤖', '👁️', '🔬', '📚', '💡', '🎯', '⚡'];

function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const { switchProject } = useProject();

  const handleClick = () => {
    switchProject(project.id);
    navigate('/chat');
  };

  return (
    <Card hover onClick={handleClick}>
      <div className="flex items-start gap-3.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-xl flex-shrink-0">
          {project.icon}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-900 mb-1">{project.name}</div>
          <div className="text-[13px] text-gray-400 leading-relaxed">{project.description}</div>
        </div>
      </div>
      <div className="flex gap-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <FileText className="w-3.5 h-3.5 text-gray-400" />
          <span>{project.paperCount} 篇論文</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
          <span>{project.chatCount} 次對話</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>{project.lastUpdated}</span>
        </div>
      </div>
    </Card>
  );
}

function CreateProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { createProject } = useProject();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🧠');

  const handleCreate = () => {
    if (!name.trim()) {
      alert('請輸入 Project 名稱');
      return;
    }

    createProject({
      name,
      description,
      icon: selectedIcon,
      paperCount: 0,
      chatCount: 0,
      lastUpdated: '剛剛',
    });

    setName('');
    setDescription('');
    setSelectedIcon('🧠');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="新增 Project">
      <div className="space-y-5">
        <Input label="Project 名稱" value={name} onChange={(e) => setName(e.target.value)} />

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">描述（選填）</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="簡單描述這個 project 的用途..."
            className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-gray-50 min-h-[80px] focus:outline-none focus:bg-white focus:border-gray-300"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">圖示</label>
          <div className="flex gap-2.5 flex-wrap">
            {ICON_OPTIONS.map((icon) => (
              <button
                key={icon}
                onClick={() => setSelectedIcon(icon)}
                className={`w-10 h-10 text-xl rounded-lg border-2 transition-all ${
                  selectedIcon === icon
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ModalButtons onCancel={onClose} onConfirm={handleCreate} confirmText="建立" />
    </Modal>
  );
}

export function ProjectsPage() {
  const { projects } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AppLayout title="所有 Projects">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900">所有 Projects</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" />
            新增 Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AppLayout>
  );
}
