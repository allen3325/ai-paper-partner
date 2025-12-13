import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MOCK_PAPERS = [
  {
    id: '1',
    title: 'Attention is All You Need',
    authors: 'Vaswani et al.',
    date: '2017-06-12',
    pages: 15,
    status: 'indexed' as const,
  },
  {
    id: '2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: 'Devlin et al.',
    date: '2018-10-11',
    pages: 16,
    status: 'indexed' as const,
  },
  {
    id: '3',
    title: 'GPT-4 Technical Report',
    authors: 'OpenAI',
    date: '2023-03-15',
    pages: 100,
    status: 'indexed' as const,
  },
  {
    id: '4',
    title: 'ResNet: Deep Residual Learning',
    authors: 'He et al.',
    date: '2015-12-10',
    pages: 12,
    status: 'indexed' as const,
  },
];

function PaperCard({ paper }: { paper: (typeof MOCK_PAPERS)[0] }) {
  return (
    <Card hover>
      <div className="font-semibold text-[15px] text-slate-900 mb-2 leading-relaxed">
        {paper.title}
      </div>
      <div className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">{paper.authors}</div>
      <div className="text-xs text-gray-400 mb-1.5">{paper.date}</div>
      <div className="text-xs text-gray-400 mb-4">
        {paper.pages} pages · {paper.status === 'indexed' ? 'Indexed' : 'Processing'}
      </div>
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Button variant="small" onClick={() => alert('開始與此論文對話（Mock 示意）')}>
          Chat
        </Button>
        <Button variant="small" onClick={() => alert('檢視論文（Mock 示意）')}>
          View
        </Button>
        <Button variant="small" onClick={() => alert('刪除論文（Mock 示意）')}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

export function PapersPage() {
  return (
    <AppLayout title="論文管理">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_PAPERS.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </AppLayout>
  );
}
