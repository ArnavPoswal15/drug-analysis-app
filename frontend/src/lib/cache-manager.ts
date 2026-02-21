'use client';

import { queryClient } from './query-client';
import { queryKeys } from './query-client';

// Cache management utilities
export class CacheManager {
  // Invalidate specific cache entries
  static invalidateDrugs() {
    queryClient.invalidateQueries({ queryKey: queryKeys.drugs });
  }

  static invalidateConditions() {
    queryClient.invalidateQueries({ queryKey: queryKeys.conditions });
  }

  static invalidateTopDrugs(condition?: string) {
    if (condition) {
      queryClient.invalidateQueries({ queryKey: queryKeys.topDrugs(condition) });
    } else {
      queryClient.invalidateQueries({ queryKey: queryKeys.topDrugs() });
    }
  }

  static invalidateHealth() {
    queryClient.invalidateQueries({ queryKey: queryKeys.health });
  }

  // Invalidate all drug-related caches
  static invalidateAllDrugData() {
    this.invalidateDrugs();
    this.invalidateConditions();
    this.invalidateTopDrugs();
  }

  // Clear all caches
  static clearAll() {
    queryClient.clear();
  }

  // Prefetch data for better UX
  static async prefetchDrugs(params: Parameters<typeof queryKeys.drugsList>[0]) {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.drugsList(params),
      queryFn: async () => {
        const { apiClient } = await import('./api');
        return apiClient.getDrugs(params);
      },
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  }

  static async prefetchTopDrugs(condition?: string) {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.topDrugs(condition),
      queryFn: async () => {
        const { apiClient } = await import('./api');
        return apiClient.getTopDrugs(condition);
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  }

  // Get cache data without fetching (if available)
  static getCachedData<T>(queryKey: unknown[]): T | undefined {
    return queryClient.getQueryData<T>(queryKey);
  }

  // Set cache data manually (useful for optimistic updates)
  static setCachedData<T>(queryKey: unknown[], data: T) {
    queryClient.setQueryData(queryKey, data);
  }

  // Remove specific cache entry
  static removeCachedData(queryKey: unknown[]) {
    queryClient.removeQueries({ queryKey });
  }

  // Get cache statistics for debugging
  static getCacheStats() {
    const cache = queryClient.getQueryCache();
    const queries = cache.getAll();
    
    return {
      totalQueries: queries.length,
      activeQueries: queries.filter(q => q.state.fetchStatus !== 'idle').length,
      staleQueries: queries.filter(q => q.isStale()).length,
      queries: queries.map(q => ({
        queryKey: q.queryKey,
        isStale: q.isStale(),
        isFetching: q.state.fetchStatus === 'fetching',
        dataUpdatedAt: q.state.dataUpdatedAt,
      })),
    };
  }
}

// Export individual methods for convenience
export const {
  invalidateDrugs,
  invalidateConditions,
  invalidateTopDrugs,
  invalidateHealth,
  invalidateAllDrugData,
  clearAll,
  prefetchDrugs,
  prefetchTopDrugs,
  getCachedData,
  setCachedData,
  removeCachedData,
  getCacheStats,
} = CacheManager;
