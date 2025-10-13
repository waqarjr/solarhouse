import { create } from "zustand";

const useStoreData = create((set) => ({
  cart: false,
  toggleCart: () => set((state) => ({ cart: !state.cart })),
}));

export default useStoreData;
