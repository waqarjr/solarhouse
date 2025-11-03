'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import axios from 'axios';
import PriceRange from './PriceRange';
import useSolarStore from './useSolarStore';
import { useRouter, useSearchParams } from 'next/navigation';

const Items = ({ isOpen, onClose }) => {
  const [activeFilters, setActiveFilters] = useState(true);
  const [category, setCategory] = useState(true);
  const [price, setPrice] = useState(true);
  const [tag, setTags] = useState(true);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiTags, setApiTags] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [tagLoading, setTagLoading] = useState(true);
  
  const { minPrice, maxPrice, showProduct, select, filter, setFilter, setMinPrice, setMaxPrice, minVal, maxVal, setMinVal, setMaxVal } = useSolarStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState([]);

  const defaultValues = {
    minPrice: minVal,
    maxPrice: maxVal,
    filter: null,
    showProduct: "12",
    select: "date,desc",
  };

  // Fetch min/max prices from API
  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const response = await axios.get("https://solarhouse.pk/wp-json/wc/v3/products?category=74&per_page=100&orderby=price&order=asc", {
          auth: {
            username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5",
            password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97"
          }
        });
        const products = response.data;
        if (products.length > 0) {
          const prices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinVal(min);
          setMaxVal(max);
          setMinPrice(min);
          setMaxPrice(max);
        }
      } catch (e) {
        console.log("Error fetching price range:", e.message);
      }
    };
    fetchPriceRange();
  }, []);

  // Sync Zustand with URL params on mount
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
    if (per_page) useSolarStore.getState().setShowProduct(per_page);
    if (orderby && order) useSolarStore.getState().setSelect(`${orderby},${order}`);
  }, []);

  // Track applied filters
  useEffect(() => {
    const filters = [];
    
    if (filter && filter !== defaultValues.filter) {
      const categoryName = apiCategories.find(cat => cat.id === filter)?.name || `Category ${filter}`;
      filters.push({ type: 'category', value: filter, label: categoryName });
    }
    
    if (minPrice !== defaultValues.minPrice) {
      filters.push({ type: 'minPrice', value: minPrice, label: `Min: Rs ${minPrice}` });
    }
    
    if (maxPrice !== defaultValues.maxPrice) {
      filters.push({ type: 'maxPrice', value: maxPrice, label: `Max: Rs ${maxPrice}` });
    }
    
    setAppliedFilters(filters);
  }, [filter, minPrice, maxPrice, apiCategories]);

  // Update URL with filters
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const newParams = new URLSearchParams();
    
    if (filter && filter !== defaultValues.filter) newParams.append("product-cata", filter);
    if (minPrice !== defaultValues.minPrice) newParams.append("min-price", minPrice);
    if (maxPrice !== defaultValues.maxPrice) newParams.append("max-price", maxPrice);
    if (showProduct !== defaultValues.showProduct) newParams.append("per_page", showProduct);
    if (select !== defaultValues.select) {
      const [orderby, order] = select.split(",");
      newParams.append("orderby", orderby);
      if (order) newParams.append("order", order);
    }

    const currentQuery = currentParams.toString();
    const newQuery = newParams.toString();
    
    if (currentQuery !== newQuery) {
      const url = newQuery ? `/solar-inverter?${newQuery}` : "/solar-inverter";
      router.replace(url);
    }
  }, [minPrice, maxPrice, filter, showProduct, select]);

  const getApiCategories = async () => {
    try {
      const response = await axios.get("https://solarhouse.pk/wp-json/wc/v3/products/categories?parent=74&per_page=100", {
        auth: {
          username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5",
          password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97"
        }
      });
      setApiCategories(response.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setCategoryLoading(false);
    }
  };

  const getApiTags = async () => {
    try {
      const response = await axios.get("https://solarhouse.pk/wp-json/wc/v3/products/tags?per_page=100", {
        auth: {
          username: "ck_99f7a958b70ea5326b2620d11d1ab448903842f5",
          password: "cs_507c77fdcf49ed4b19fd444c23649a09dabffa97"
        }
      });
      const retrieveData = response.data.filter(tag => tag.count > 0);
      setApiTags(retrieveData);
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
        setMinPrice(defaultValues.minPrice);
        break;
      case 'maxPrice':
        setMaxPrice(defaultValues.maxPrice);
        break;
    }
  };

  const resetAllFilters = () => {
    if (onClose) onClose();
    setFilter(null);
    setMinPrice(defaultValues.minPrice);
    setMaxPrice(defaultValues.maxPrice);
  };

  const handleCategoryClick = (categoryId) => {
    setFilter(categoryId);
    if (onClose) onClose();
  };

  const handleTagClick = (tagId) => {
    router.push(`/solar-inverter?tag=${tagId}`);
    if (onClose) onClose();
  };

  return (
    <div className='grid [&>*]:border-gray-100'>
      {/* Active Filters */}
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

      {/* Category */}
      <div className='grid my-1 py-2 border-b-2 cursor-pointer' onClick={() => setCategory(!category)}>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-[20px] text-gray-900'>Category</p>
          <ChevronDown className={`text-[14px] text-gray-400 ${category ? "rotate-0" : "rotate-180"} transition-all duration-150`} />
        </div>
      </div>
      <ul className={`grid gap-2 [&>li:hover]:text-black overflow-hidden transition-all duration-500 ease-out ${category ? "max-h-96 opacity-100 [&>*]:px-3 my-2" : "h-0 opacity-0"}`}>
        {categoryLoading ? (
          <div className="grid animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded" style={{ width: `${Math.random() * 60 + 80}px` }}></div>
                </div>
                <div className="h-4 w-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {apiCategories.map((value) => (
              <li key={value.id} onClick={() => handleCategoryClick(value.id)} className={`flex items-center justify-between text-gray-600 cursor-pointer ${filter === value.id ? 'text-blue-600 font-semibold' : ''}`}>
                <div className='flex items-center'>
                  <ChevronDown size={15} className='text-[5px] -rotate-90' />
                  <p>{value.name}</p>
                </div>
                <span>({value.count})</span>
              </li>
            ))}
          </>
        )}
      </ul>

      {/* Price */}
      <div className='grid my-1 py-2 border-b-2 cursor-pointer' onClick={() => setPrice(!price)}>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-[20px] text-gray-900'>Price</p>
          <ChevronDown className={`text-[14px] text-gray-400 ${price ? "rotate-0" : "rotate-180"} transition-all duration-150`} />
        </div>
      </div>
      <div className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out ${price ? "max-h-96 opacity-100 px-2 py-4" : "h-0 opacity-0"}`}>
        <PriceRange />
      </div>

      {/* Tag */}
      <div className='grid my-1 py-2 border-b-2 cursor-pointer' onClick={() => setTags(!tag)}>
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-[20px] text-gray-900'>Tag</p>
          <ChevronDown className={`text-[14px] text-gray-400 ${tag ? "rotate-0" : "rotate-180"} transition-all duration-150`} />
        </div>
      </div>
      <div className={`[&>*]:hover:text-black transition-all duration-200 ease-in-out ${tag ? "max-h-96 opacity-100" : "h-0 opacity-0"}`}>
        {tagLoading ? (
          <div className="grid animate-pulse">
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
}

export default Items