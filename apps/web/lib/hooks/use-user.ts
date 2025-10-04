import { useEffect } from "react";
import { useGetAuthUser } from "@/lib/api";
import { useUserStore } from "@/lib/stores/user-store";
import { ICurrentUser, ResponseStateEnum } from "@launchq/core";

// This hook should only be used once at the app level to initialize user data
export const useUserInitializer = () => {
  const { setUser, setLoading, setInitialized } = useUserStore();
  const authUserQuery = useGetAuthUser();

  // Update store when query data changes
  useEffect(() => {
    if (authUserQuery.data?.data.state === ResponseStateEnum.SUCCESS) {
      const userData = authUserQuery.data.data as any;
      setUser(userData);
      setInitialized(true);
    }
    setLoading(authUserQuery.isLoading);
  }, [
    authUserQuery.data,
    authUserQuery.isLoading,
    setUser,
    setLoading,
    setInitialized,
  ]);

  // Handle errors
  useEffect(() => {
    if (authUserQuery.error) {
      setUser(null);
      setInitialized(true);
    }
  }, [authUserQuery.error, setUser, setInitialized]);

  return authUserQuery;
};

// Hook for components that only need user data (no API calls)
export const useUser = () => {
  const { user, isLoading, isInitialized } = useUserStore();
  return { user, isLoading, isInitialized };
};

// Hook for components that only need user data (no loading states)
export const useUserData = () => {
  const { user } = useUserStore();
  return user;
};
