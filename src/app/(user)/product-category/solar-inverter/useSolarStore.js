import { create } from "zustand";

const useSolarStore = create((set) => ({
  cart: false,
  toggleCart: () => set((state) => ({ cart: !state.cart })),
  
  minVal: 160,
  maxVal: 60000,
  minGap: 1000,
  minPrice: 160,
  maxPrice: 60000,
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

export default useSolarStore;