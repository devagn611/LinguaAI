import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, showCount, maxLength, value, ...props }, ref) => {
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-lg border border-white/10 bg-[#0a0a0a] text-white',
              'placeholder:text-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-[#ffa500] focus:border-transparent',
              'transition-all duration-200 resize-none',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            maxLength={maxLength}
            value={value}
            {...props}
          />
          {showCount && maxLength && (
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {charCount} / {maxLength}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
