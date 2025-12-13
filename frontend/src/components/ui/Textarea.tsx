import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        className={cn(
          'w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-gray-50 transition-all',
          'focus:outline-none focus:bg-white focus:border-gray-300',
          'min-h-[120px] font-mono resize-y leading-relaxed',
          className
        )}
        {...props}
      />
    </div>
  );
}
