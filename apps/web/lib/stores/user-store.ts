import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICurrentUser, IResponse, ResponseStateEnum } from "@launchq/core";

interface UserState {
  user: ICurrentUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  setUser: (user: ICurrentUser | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isInitialized: false,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (isInitialized) => set({ isInitialized }),
      clearUser: () => set({ user: null, isInitialized: false }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
        isInitialized: state.isInitialized,
      }),
    },
  ),
);

// Helper hook to get user from API response
// export const useUserFromResponse = (response: IResponse) => {
//   const user =
//     response?.data?.state === ResponseStateEnum.SUCCESS
//       ? (response.data as any).data
//       : null;
//   return user;
// };
