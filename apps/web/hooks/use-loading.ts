import { useState, useEffect } from "react";

// Generic hook for query loading states
export function useQueryLoading(
  queries: Array<{ isLoading: boolean; isFetching?: boolean }>,
) {
  const isLoading = queries.some(
    (query) => query.isLoading || (query.isFetching ?? false),
  );
  return { isLoading };
}

// Hook for single query loading
export function useSingleQueryLoading(query: {
  isLoading: boolean;
  isFetching?: boolean;
}) {
  return { isLoading: query.isLoading || (query.isFetching ?? false) };
}

// Hook for multiple query loading with custom logic
export function useMultipleQueryLoading(
  queries: Array<{ isLoading: boolean; isFetching?: boolean }>,
  options?: {
    requireAll?: boolean; // If true, all queries must be loaded
    requireAny?: boolean; // If true, any query loading means loading
  },
) {
  const { requireAll = false, requireAny = false } = options || {};

  if (requireAll) {
    const isLoading = queries.every(
      (query) => query.isLoading || (query.isFetching ?? false),
    );
    return { isLoading };
  }

  if (requireAny) {
    const isLoading = queries.some(
      (query) => query.isLoading || query.isFetching,
    );
    return { isLoading };
  }

  // Default: any query loading means loading
  const isLoading = queries.some(
    (query) => query.isLoading || (query.isFetching ?? false),
  );
  return { isLoading };
}

// Legacy hooks for backward compatibility
export function useLoading(initialDelay = 0) {
  const [isLoading, setIsLoading] = useState(initialDelay > 0);

  useEffect(() => {
    if (initialDelay > 0) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, initialDelay);

      return () => clearTimeout(timer);
    }
  }, [initialDelay]);

  return {
    isLoading,
    setIsLoading,
  };
}

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading, setIsLoading };
}
