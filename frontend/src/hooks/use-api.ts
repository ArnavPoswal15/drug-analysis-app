'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import { queryKeys } from '@/lib/query-client';

// Hook for fetching drugs with pagination and filters
export function useDrugs(params: {
  page?: number;
  limit?: number;
  condition?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: queryKeys.drugsList(params),
    queryFn: () => apiClient.getDrugs(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for drug listings
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching conditions (static data, longer cache)
export function useConditions() {
  return useQuery({
    queryKey: queryKeys.conditions,
    queryFn: () => apiClient.getConditions(),
    staleTime: 30 * 60 * 1000, // 30 minutes - conditions rarely change
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

// Hook for fetching top drugs (with condition-specific caching)
export function useTopDrugs(condition?: string) {
  return useQuery({
    queryKey: queryKeys.topDrugs(condition),
    queryFn: () => apiClient.getTopDrugs(condition),
    staleTime: 10 * 60 * 1000, // 10 minutes for top drugs
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
}

// Hook for health check
export function useHealthCheck() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => apiClient.healthCheck(),
    staleTime: 30 * 1000, // 30 seconds for health check
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

// Hook for manual cache invalidation
export function useInvalidateCache() {
  const queryClient = useQueryClient();
  
  return {
    invalidateDrugs: () => queryClient.invalidateQueries({ queryKey: queryKeys.drugs }),
    invalidateConditions: () => queryClient.invalidateQueries({ queryKey: queryKeys.conditions }),
    invalidateTopDrugs: () => queryClient.invalidateQueries({ queryKey: queryKeys.topDrugs() }),
    invalidateHealth: () => queryClient.invalidateQueries({ queryKey: queryKeys.health }),
    invalidateAll: () => queryClient.clear(),
  };
}

// Prefetch hook for optimistic data loading
export function usePrefetchData() {
  const queryClient = useQueryClient();
  
  const prefetchDrugs = (params: Parameters<typeof apiClient.getDrugs>[0]) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.drugsList(params),
      queryFn: () => apiClient.getDrugs(params),
      staleTime: 2 * 60 * 1000,
    });
  };
  
  const prefetchTopDrugs = (condition?: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.topDrugs(condition),
      queryFn: () => apiClient.getTopDrugs(condition),
      staleTime: 10 * 60 * 1000,
    });
  };
  
  return { prefetchDrugs, prefetchTopDrugs };
}
