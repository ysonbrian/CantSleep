import create from 'zustand';

// 사용자
export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// 글목록
export const useData = create((set) => ({
  writingList: null,
  setWritingList: (writingList) => set({ writingList }),
}));

export const useLoading = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
