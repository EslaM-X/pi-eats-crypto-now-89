
import React from 'react';
import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
  width?: string;
  height?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

const AdPlaceholder = ({
  width = '300px',
  height = '250px',
  variant = 'square',
  className
}: AdPlaceholderProps) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center bg-muted/30 rounded-md overflow-hidden",
        className
      )}
      style={{ width, height }}
    >
      <p className="text-muted-foreground/70 font-medium">
        Advertisement
      </p>
    </div>
  );
};

export default AdPlaceholder;
