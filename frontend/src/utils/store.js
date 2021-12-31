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

export const useNftData = create((set) => ({
  nftList: null,
  setNftList: (nftList) => set({ nftList }),
}));

export const useClickedItem = create((set) => ({
  clickedItem: null,
  setClickedItem: (clickedItem) => set({ clickedItem }),
}));

export const useMyNftList = create((set) => ({
  myNftList: null,
  setMyNftList: (myNftList) => set({ myNftList }),
}));

export const useRandomImages = create((set) => ({
  img: null,
  setImg: (img) => set({ img }),
}));
