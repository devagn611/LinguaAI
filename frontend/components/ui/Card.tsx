import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-[#1a1a1a] border border-white/5 text-white',
      elevated: 'bg-[#1a1a1a] shadow-lg shadow-black/50 border border-white/5 text-white',
      outlined: 'bg-[#1a1a1a] border-2 border-white/10 text-white',
    };

    const motionProps = hover
      ? {
          whileHover: { y: -4, transition: { duration: 0.2 } },
          transition: { duration: 0.2 },
        }
      : {};

    if (hover) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'rounded-xl p-6 transition-all duration-200',
            variants[variant],
            className
          )}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6 transition-all duration-200',
          variants[variant],
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
