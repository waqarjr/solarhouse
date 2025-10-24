import { create } from "zustand";

const useStoreData = create((set) => ({
  cart: false,
  toggleCart: () => set((state) => ({ cart: !state.cart })),
  
  minVal: 0,
  maxVal: 100000,
  minGap: 1000,
  minPrice: 10000,
  maxPrice: 90000,
  showProduct :"12",
  select : 'date,desc',
  filter : null,
  
  setMinPrice: (minPrice) => set({ minPrice }),

  setMaxPrice: (maxPrice) => set({ maxPrice }),
  
  setShowProduct : (value) => set({ showProduct: value }),
  
  setSelect : (value ) => set({select : value}),

  setFilter :(value ) => set( {filter : value} ),
  
  payment  : "cod",
  setPayment  : (value) => set({payment : value}),

}));

export default useStoreData;

// ?product-cata=75&min-price=96292&max-price=361883&per_page=15&orderby=date

// https://solarhouse.pk/wp-json/wc/v3/products?category=75&min_price=10000&max_price=90000&per_page=12&orderby=date&order=desc