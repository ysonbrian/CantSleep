import create from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useData = create((set) => ({
  writingList: null,
  setWritingList: (writingList) => set({ writingList }),
}));
