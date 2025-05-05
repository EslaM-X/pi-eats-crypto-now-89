
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = false,
  className,
  titleClassName,
  subtitleClassName,
}: SectionTitleProps) {
  return (
    <div className={cn(
      'mb-8',
      centered && 'text-center',
      className
    )}>
      <h2 className={cn(
        'text-2xl md:text-3xl font-bold bg-gradient-to-r from-pi to-orange bg-clip-text text-transparent',
        titleClassName
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-2 text-muted-foreground',
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
