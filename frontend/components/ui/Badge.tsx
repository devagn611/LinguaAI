import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface BadgeProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  onRemove?: () => void;
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', onRemove, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/10 text-gray-300',
      primary: 'bg-[#ffa500]/20 text-[#ffa500] border border-[#ffa500]/30',
      success: 'bg-green-500/20 text-green-400 border border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      error: 'bg-red-500/20 text-red-400 border border-red-500/30',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 rounded-full hover:bg-black/10 p-0.5 transition-colors"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </motion.div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
