import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={cn(
          'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 transition-all',
          'focus:outline-none focus:bg-white focus:border-gray-300',
          className
        )}
        {...props}
      />
    </div>
  );
}
