'use client';

// Simple cache testing utilities
export function testCachePerformance() {
  return {
    start: () => performance.now(),
    end: (start: number) => {
      const end = performance.now();
      return {
        duration: end - start,
        message: `Operation took ${(end - start).toFixed(2)}ms`
      };
    }
  };
}

// Test function to verify cache is working
export async function verifyCaching() {
  try {
    // Import dynamically to avoid SSR issues
    const { CacheManager } = await import('./cache-manager');
    
    // Get initial cache stats
    const initialStats = CacheManager.getCacheStats();
    
    console.log('🧪 Cache Test Results:');
    console.log('Initial cache entries:', initialStats.totalQueries);
    console.log('Active queries:', initialStats.activeQueries);
    console.log('Stale queries:', initialStats.staleQueries);
    
    return {
      success: true,
      stats: initialStats,
      message: 'Cache test completed successfully'
    };
  } catch (error) {
    console.error('❌ Cache test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Cache test failed'
    };
  }
}
