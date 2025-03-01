// src/stores/userStore.ts
import { create } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  // Add additional fields as needed
}

interface UserState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
}));

export default useUserStore;
