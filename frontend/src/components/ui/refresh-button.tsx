'use client';

import { Button } from './button';
import { RotateCcw } from 'lucide-react';
import { useInvalidateCache } from '@/hooks/use-api';
import { useState } from 'react';

interface RefreshButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onRefresh?: () => void;
}

export function RefreshButton({ 
  variant = 'outline', 
  size = 'sm', 
  className = '',
  onRefresh 
}: RefreshButtonProps) {
  const { invalidateTopDrugs, invalidateConditions } = useInvalidateCache();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Invalidate caches
      await Promise.all([
        invalidateTopDrugs(),
        invalidateConditions(),
      ]);
      
      // Call custom refresh handler if provided
      if (onRefresh) {
        onRefresh();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      <RotateCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Refreshing...' : 'Refresh'}
    </Button>
  );
}
