'use client';

import { QueryClient } from '@tanstack/react-query';

// Create a client with default configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that data remains fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Time in milliseconds that inactive queries will remain in cache
      gcTime: 10 * 60 * 1000, // 10 minutes
      // Retry failed requests up to 3 times
      retry: 3,
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus (disabled for production-like behavior)
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
  },
});

// Cache key constants for type safety and consistency
export const queryKeys = {
  // Drug-related queries
  drugs: ['drugs'] as const,
  drugsList: (params: { page?: number; limit?: number; condition?: string; search?: string }) => 
    ['drugs', 'list', params] as const,
  conditions: ['conditions'] as const,
  topDrugs: (condition?: string) => ['topDrugs', condition] as const,
  
  // Health check
  health: ['health'] as const,
} as const;

// Helper function to invalidate related queries
export const invalidateQueries = (key: keyof typeof queryKeys) => {
  return queryClient.invalidateQueries({ queryKey: [key] });
};
