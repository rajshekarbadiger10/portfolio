'use client';

import { ButtonHTMLAttributes, MouseEvent } from 'react';
import { cn } from '@/components/ui/utils';

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'primary' | 'secondary';
};

export function MagneticButton({ tone = 'primary', className, children, ...props }: MagneticButtonProps) {
  const handleMove = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.style.transform = 'translate3d(0,0,0)';
  };

  const palette =
    tone === 'primary'
      ? 'bg-red text-white shadow-[0_0_0_1px_rgba(255,42,42,0.3)] hover:shadow-[0_0_30px_rgba(255,42,42,0.28)]'
      : 'bg-white/5 text-white border border-white/10 hover:border-red/40';

  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        palette,
        className
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}