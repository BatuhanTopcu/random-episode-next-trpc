import create from "zustand";

type popupState = {
  showUserInfo: boolean;
  setShowUserInfo: (to: boolean) => void;
};

const usePopupStore = create<popupState>()((set) => ({
  showUserInfo: false,
  setShowUserInfo: (to) => set(() => ({ showUserInfo: to })),
}));

export default usePopupStore;
