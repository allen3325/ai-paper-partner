import { NavLink } from 'react-router-dom';
import { MessageCircle, Upload, FileText, Settings, Grid3x3 } from 'lucide-react';
import { useProject } from '@/contexts';
import { cn } from '@/utils';

const NAV_ITEMS = [
  { path: '/chat', icon: MessageCircle, label: 'Chat' },
  { path: '/upload', icon: Upload, label: 'Upload' },
  { path: '/papers', icon: FileText, label: 'Papers' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { currentProject, projects, switchProject } = useProject();

  return (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-6 pb-5">
        <div className="text-[15px] font-semibold tracking-tight text-slate-900">AI Paper Partner</div>
      </div>

      <div className="px-6 pb-5 border-b border-gray-100">
        <div
          className="flex items-center gap-2.5 px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all"
          onClick={() => alert('開啟 Project 切換選單（Mock 示意）')}
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex-shrink-0"></span>
          <span className="flex-1 text-[13px] font-semibold text-slate-900">
            {currentProject?.name || 'Select Project'}
          </span>
          <span className="text-[10px] text-gray-400">▼</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-5 py-2.5 mx-0 my-0.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-gray-100 text-slate-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-slate-900'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}

        <div className="h-px bg-gray-100 my-3 mx-6"></div>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-5 py-2.5 mx-0 my-0.5 rounded-lg text-sm font-medium transition-all',
              isActive
                ? 'bg-gray-100 text-slate-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-slate-900'
            )
          }
        >
          <Grid3x3 className="w-5 h-5" />
          Projects
        </NavLink>
      </nav>
    </div>
  );
}
