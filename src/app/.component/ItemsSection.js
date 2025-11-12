'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';
import api from '../lib/api';
import PriceSlidebar from "@/app/.component/PriceSlidebar";
import useStoreData from '../lib/useStoreData';
import { useRouter, useSearchParams } from 'next/navigation';

const ItemsSection = ({  onClose }) => {
  const [activeFilters, setActiveFilters] = useState(true);
  const [category, setCategory] = useState(true);
  const [price, setPrice] = useState(true);
  const [tag, setTags] = useState(true);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiTags, setApiTags] = useState([]);
  const { minPrice, maxPrice, showProduct, select, filter,setSelect ,setFilter, setMinPrice, setMaxPrice, minVal, maxVal, setMinVal, setMaxVal,setShowProduct } = useStoreData();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categoryLoading, setCategoryLoading] = useState(true);
  const [tagLoading, setTagLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [apiPricesFetched, setApiPricesFetched] = useState(false);
  const isInitialMount = useRef(true);

  // Static default values - never changes
  const defaultValues = useRef({
    filter: null,
    showProduct: "12",
    select: "date,desc",
  });

  // Fetch min/max prices from API and set defaults ONCE
  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const response = await api.get("/products?per_page=100&orderby=price&order=asc");
        const products = response.data;
        if (products.length > 0) {
          const prices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          
          setMinVal(min);
          setMaxVal(max);
          
          // Only set min/max price if NOT coming from URL
          const urlMinPrice = searchParams.get("min-price");
          const urlMaxPrice = searchParams.get("max-price");
          
          if (!urlMinPrice) setMinPrice(min);
          if (!urlMaxPrice) setMaxPrice(max);
          
          setApiPricesFetched(true);
        }
      } catch (e) {
        console.log("Error fetching price range:", e.message);
        setApiPricesFetched(true);
      }
    };
    fetchPriceRange();
  }, []);

  // Sync Zustand with URL params on mount - ONLY ONCE
  useEffect(() => {
    const productCata = searchParams.get("product-cata");
    const min_price = searchParams.get("min-price");
    const max_price = searchParams.get("max-price");
    const per_page = searchParams.get("per_page");
    const orderby = searchParams.get("orderby");
    const order = searchParams.get("order");

    if (productCata) setFilter(parseInt(productCata));
    if (min_price) setMinPrice(parseInt(min_price));
    if (max_price) setMaxPrice(parseInt(max_price));
    if (per_page) useStoreData.getState().setShowProduct(per_page);
    if (orderby && order) useStoreData.getState().setSelect(`${orderby},${order}`);
  }, []);

  // Track applied filters
  useEffect(() => {
    if (!apiPricesFetched) return;
    
    const filters = [];
    
    if (filter && filter !== defaultValues.current.filter) {
      const categoryName = apiCategories.find(cat => cat.id === filter)?.name || `Category ${filter}`;
      filters.push({ type: 'category', value: filter, label: categoryName });
    }
    
    if (minPrice !== minVal) {
      filters.push({ type: 'minPrice', value: minPrice, label: `Min: Rs ${minPrice}` });
    }
    
    if (maxPrice !== maxVal) {
      filters.push({ type: 'maxPrice', value: maxPrice, label: `Max: Rs ${maxPrice}` });
    }
    
    if (showProduct !== defaultValues.current.showProduct) {
      filters.push({ type: 'showProduct', value: showProduct, label: `Show ${showProduct}` });
    }
    
    if (select !== defaultValues.current.select) {
      const selectLabel = select === "popularity,desc" ? "Popularity" : select === "rating,desc" ? "Rating" : select === "price,desc" ? "Price: High to Low" : select === "price,asc" ? "Price: Low to High" : "Default";
      filters.push({ type: 'select', value: select, label: selectLabel });
    }
    
    setAppliedFilters(filters);
  }, [filter, minPrice, maxPrice, showProduct, select, apiCategories, minVal, maxVal, apiPricesFetched]);

  // Update URL with filters - only after API prices are fetched
  useEffect(() => {
    if (!apiPricesFetched) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentParams = new URLSearchParams(searchParams.toString());
    const newParams = new URLSearchParams();
    
    if (filter && filter !== defaultValues.current.filter) newParams.append("product-cata", filter);
    if (minPrice !== minVal) newParams.append("min-price", minPrice);
    if (maxPrice !== maxVal) newParams.append("max-price", maxPrice);
    if (showProduct !== defaultValues.current.showProduct) newParams.append("per_page", showProduct);
    if (select !== defaultValues.current.select) {
      const [orderby, order] = select.split(",");
      newParams.append("orderby", orderby);
      if (order) newParams.append("order", order);
    }

    const currentQuery = currentParams.toString();
    const newQuery = newParams.toString();
    
    if (currentQuery !== newQuery) {
      const url = newQuery ? `/shop?${newQuery}` : "/shop";
      router.replace(url);
    }
  }, [minPrice, maxPrice, filter, showProduct, select, apiPricesFetched, minVal, maxVal]);

  const getApiCategories = async () => {
    try {
      const response = await api.get("/products/categories?per_page=100");
      setApiCategories(response.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setCategoryLoading(false);
    }
  };

  const getApiTags = async () => {
    try {
      const response = await api.get("/products/tags?per_page=100");
      setApiTags(response.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setTagLoading(false);
    }
  };

  useEffect(() => {
    getApiCategories();
    getApiTags();
  }, []);

  const removeFilter = (filterType) => {
    if (onClose) onClose();
    switch (filterType) {
      case 'category':
        setFilter(null);
        break;
      case 'minPrice':
        setMinPrice(minVal);
        break;
      case 'maxPrice':
        setMaxPrice(maxVal);
        break;
      case 'showProduct':
        setShowProduct('12')
        break;
      case 'select':
        setSelect('date,desc')
        break;
    }
  };

  const resetAllFilters = () => {
    if (onClose) onClose();
    setFilter(null);
    setMinPrice(minVal);
    setMaxPrice(maxVal);
  };

  const handleCategoryClick = (categoryId) => {
    setFilter(categoryId);
    if (onClose) onClose();
  };

  const handleTagClick = (tagId) => {
    router.push(`/shop?tag=${tagId}`);
    if (onClose) onClose();
  };

  return (
    <div className='grid [&>*]:border-gray-100'>
      {appliedFilters.length > 0 && (
        <>
          <div className='grid my-1 py-2 border-b-2 cursor-pointer' onClick={() => setActiveFilters(!activeFilters)}>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-[20px] text-gray-900'>Active Filters</p>
              <ChevronDown className={`text-[14px] text-gray-400 ${activeFilters ? "rotate-0" : "rotate-180"} transition-all duration-150`} />
            </div>
          </div>
          <div className={`overflow-hidden transition-all duration-500 ease-out ${activeFilters ? "max-h-96 opacity-100 my-2" : "h-0 opacity-0"}`}>
            <div className='flex flex-wrap gap-2 px-3'>
              {appliedFilters.map((filter, index) => (
                <button key={index} onClick={() => removeFilter(filter.type)} className="flex items-center gap-2 border-2 rounded-3xl border-blue-300 bg-blue-50 px-3 py-1 text-center text-blue-600 hover:bg-blue-100 hover:border-blue-400 duration-150 cursor-pointer">
                  {filter.label}
                  <X size={14} className='text-blue-600' />
                </button>
              ))}
              <button onClick={resetAllFilters} className="flex items-center gap-2 border-2 rounded-3xl border-red-300 bg-red-50 px-3 py-1 text-center text-red-600 hover:bg-red-100 hover:border-red-400 duration-150 cursor-pointer">
                Reset All
                <X size={14} className='text-red-600' />
              </button>
            </div>
          </div>
        </>
      )}

      <div className='grid my-1 py-2 border-b-2 cursor-pointer' onClick={() => setCategory(!category)}>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-[20px] text-gray-900'>Category</p>
          <ChevronDown className={`text-[14px] text-gray-400 ${category ? "rotate-0" : "rotate-180"} transition-all duration-150`} />
        </div>
      </div>
      <ul className={`grid gap-2 [&>li:hover]:text-black overflow-hidden transition-all duration-500 ease-out ${category ? "max-h-96 opacity-100 [&>*]:px-3 my-2" : "h-0 opacity-0"}`}>
        {categoryLoading ? (
          <div className="grid [&>*]:border-gray-100 animate-pulse">
            <div className="grid my-1 py-2 border-b-2">
              <div className="space-y-3">
                {[114, 101, 92, 127, 90, 81, 122, 105, 122, 119, 86, 105].map((width, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded" style={{ width: `${width}px` }}></div>
                    </div>
                    <div className="h-4 w-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {apiCategories.map((value) => (
              <li key={value.id} onClick={() => handleCategoryClick(value.id)} className={`flex items-center justify-between text-gray-600 cursor-pointer ${filter === value.id ? 'text-blue-600 font-semibold' : ''}`}>
                <ChevronDown size={15} className='text-[5px] -rotate-90' />
                <p>{value.name}</p>
                <span>({value.count})</span>
              </li>
            ))}
          </>
        )}
      </ul>

      <div className='grid my-1 py-2 border-b-2 cursor-pointer' onClick={() => setPrice(!price)}>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-[20px] text-gray-900'>Price</p>
          <ChevronDown className={`text-[14px] text-gray-400 ${price ? "rotate-0" : "rotate-180"} transition-all duration-150`} />
        </div>
      </div>
      <div className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out ${price ? "max-h-96 opacity-100 px-2 py-4" : "h-0 opacity-0"}`}>
        <PriceSlidebar />
      </div>

      <div className='grid my-1 py-2 border-b-2 cursor-pointer' onClick={() => setTags(!tag)}>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-[20px] text-gray-900'>Tag</p>
          <ChevronDown className={`text-[14px] text-gray-400 ${tag ? "rotate-0" : "rotate-180"} transition-all duration-150`} />
        </div>
      </div>
      <div className={`[&>*]:hover:text-black transition-all duration-400 ease-in-out ${tag ? "max-h-[600px] opacity-100" : "h-0 opacity-0"}`}>
        {tagLoading ? (
          <div className="grid [&>*]:border-gray-100 animate-pulse">
            <div className="flex flex-wrap gap-2">
              {[100, 70, 80, 60, 90, 75].map((width, i) => (
                <div key={i} className="h-9 bg-gray-200 rounded-full" style={{ width: `${width}px` }}></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {apiTags.map((value) => (
              <button key={value.id} onClick={() => handleTagClick(value.id)} className="m-1 border-2 rounded-3xl border-gray-300 px-3 py-1 text-center text-gray-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 duration-150 cursor-pointer">
                {value.name}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsSection;