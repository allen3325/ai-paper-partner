import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl p-6 border border-gray-200',
        hover &&
          'cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
