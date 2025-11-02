import { create } from "zustand";

const useStoreData = create((set) => ({
  cart: false,
  toggleCart: () => set((state) => ({ cart: !state.cart })),
  
  minVal: 0,
  maxVal: 100000,
  minGap: 1000,
  minPrice: 10000,
  maxPrice: 90000,
  showProduct: "12",
  select: 'date,desc', 
  filter: null,
  
  setMinVal: (minVal) => set({ minVal }),
  setMaxVal: (maxVal) => set({ maxVal }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setShowProduct: (value) => set({ showProduct: value }),
  setSelect: (value) => set({ select: value }),
  setFilter: (value) => set({ filter: value }),
  
  payment: "cod,Cash on delivery",
  setPayment: (value) => set({ payment: value }),

  user: null,
  valid: false,
  setUser: (userData) => set({ user: userData, valid: true }),
  clearUser: () => set({ valid: false }),
}));

export default useStoreData;