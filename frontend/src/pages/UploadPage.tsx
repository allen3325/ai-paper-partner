import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Upload } from 'lucide-react';

function UploadZone() {
  const handleClick = () => {
    alert('選擇 PDF 檔案上傳（Mock 示意）');
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-200 cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all"
    >
      <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center">
        <Upload className="w-7 h-7 text-white" />
      </div>
      <div className="text-base font-semibold text-slate-900 mb-2">
        Drop PDF files here or click to browse
      </div>
      <div className="text-[13px] text-gray-400">Supports PDF format, max file size 50MB</div>
    </div>
  );
}

export function UploadPage() {
  return (
    <AppLayout title="上傳論文">
      <div className="max-w-2xl mx-auto">
        <UploadZone />

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Recent Uploads</h2>
          <div className="grid gap-4">
            <Card>
              <div className="font-semibold text-slate-900 mb-2">Processing...</div>
              <div className="text-xs text-gray-400 mb-1.5">transformer_paper.pdf</div>
              <div className="text-xs text-gray-400 mb-3">2 minutes ago</div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
