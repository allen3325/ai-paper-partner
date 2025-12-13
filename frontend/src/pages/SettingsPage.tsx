import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

function SliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  const displayValue = step < 1 ? (value / 10).toFixed(1) : value;

  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full bg-gray-200 appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4.5
            [&::-webkit-slider-thumb]:h-4.5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-gradient-to-br
            [&::-webkit-slider-thumb]:from-[#667eea]
            [&::-webkit-slider-thumb]:to-[#764ba2]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-4.5
            [&::-moz-range-thumb]:h-4.5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-gradient-to-br
            [&::-moz-range-thumb]:from-[#667eea]
            [&::-moz-range-thumb]:to-[#764ba2]
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <span className="min-w-[45px] text-center font-semibold text-slate-900 text-sm">
          {displayValue}
        </span>
      </div>
      {hint && <div className="text-xs text-gray-400 mt-1.5">{hint}</div>}
    </div>
  );
}

export function SettingsPage() {
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a professional AI research assistant, skilled at understanding and analyzing academic papers. Please answer user questions in a clear and concise manner, citing specific content from papers when necessary.'
  );
  const [temperature, setTemperature] = useState(7);
  const [topP, setTopP] = useState(9);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [language, setLanguage] = useState('English');
  const [retrievalCount, setRetrievalCount] = useState(5);
  const [similarity, setSimilarity] = useState(7);

  const handleSave = () => {
    alert('設定已儲存！（Mock 示意）');
  };

  return (
    <AppLayout title="模型設定">
      <div className="max-w-3xl">
        <Card className="mb-4">
          <h2 className="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-gray-100">
            System Prompt
          </h2>
          <Textarea
            label="Custom System Prompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </Card>

        <Card className="mb-4">
          <h2 className="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-gray-100">
            Model Parameters
          </h2>

          <SliderControl
            label="Temperature"
            value={temperature}
            onChange={setTemperature}
            max={20}
            step={1}
            hint="Lower values produce more deterministic outputs, higher values are more creative"
          />

          <SliderControl label="Top P" value={topP} onChange={setTopP} max={10} step={1} />

          <div className="mb-5">
            <Input
              label="Max Tokens"
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Response Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:bg-white focus:border-gray-300"
            >
              <option>English</option>
              <option>繁體中文</option>
              <option>Auto-detect</option>
            </select>
          </div>
        </Card>

        <Card className="mb-4">
          <h2 className="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-gray-100">
            RAG Configuration
          </h2>

          <div className="mb-5">
            <Input
              label="Number of Retrieved Documents"
              type="number"
              value={retrievalCount}
              onChange={(e) => setRetrievalCount(Number(e.target.value))}
            />
            <div className="text-xs text-gray-400 mt-1.5">
              Number of relevant passages retrieved from papers per query
            </div>
          </div>

          <SliderControl
            label="Similarity Threshold"
            value={similarity}
            onChange={setSimilarity}
            max={10}
            step={1}
          />
        </Card>

        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </AppLayout>
  );
}
