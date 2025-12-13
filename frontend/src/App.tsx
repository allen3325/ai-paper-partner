import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider, ChatProvider } from '@/contexts';
import { ChatPage, ProjectsPage, UploadPage, PapersPage, SettingsPage } from '@/pages';

function App() {
  return (
    <ProjectProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/papers" element={<PapersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </ChatProvider>
    </ProjectProvider>
  );
}

export default App;
