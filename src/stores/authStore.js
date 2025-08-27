import { create } from 'zustand';

const useAuthStore = create((set) => ({
  authMode: null,
  setAuthMode: (mode) => set({ authMode: mode }),
  resetAuth: () => set({ authMode: null }),
}));

export default useAuthStore;