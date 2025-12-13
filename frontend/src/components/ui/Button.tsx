import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'small';
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const baseStyles =
    'font-semibold transition-all duration-150 rounded-lg flex items-center gap-2 cursor-pointer';

  const variants = {
    primary:
      'px-5 py-2.5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)]',
    secondary:
      'px-5 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300',
    small:
      'px-3 py-1.5 text-xs bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
