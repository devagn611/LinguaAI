import React from 'react';
import { Languages } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-base' },
    md: { icon: 'w-10 h-10', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Languages className={`${icon} text-[#ffa500] flex-shrink-0`} />
      {showText && (
        <span className={`${text} font-bold text-white`}>LinguaAI</span>
      )}
    </div>
  );
}
