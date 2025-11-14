'use client'
import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/app/lib/api";

const SearchBox = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef(null);
  const router = useRouter();

  // Debounced search - waits 500ms after user stops typing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setHasSearched(true);
      
      try {
        const response = await api.get(`/products?search=${searchQuery}&per_page=12`);
        setSearchResults(response.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); 

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openSearch,]);

  const handleClose = () => {
    setOpenSearch(false);
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleProductClick = (slug) => {
    router.push(`/product/${slug}`);
    handleClose();
  };

  return (
    <>
      {/* Search Icon Button */}
      <button className="flex items-center justify-center gap-3 hover:text-blue-600 cursor-pointer transition-all" onClick={() => setOpenSearch(true)}>
        <Search  />
      </button>

      <div className={`fixed inset-0 z-50 bg-white transition-transform duration-500 ease-in-out ${openSearch ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="h-full flex flex-col">
          <div className=" px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Search Products</h2>
                <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button> 
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for products..." className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg" autoFocus />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto">
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20">
                  <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 animate-spin mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">Searching for products...</p>
                </div>
              )}

              {!loading && hasSearched && searchResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-semibold text-base sm:text-lg mb-2">No products found</p>
                  <p className="text-gray-600 text-sm sm:text-base">Try searching with different keywords</p>
                </div>
              )}

              {!loading && !hasSearched && !searchQuery && (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-semibold text-base sm:text-lg mb-2">Start searching</p>
                  <p className="text-gray-600 text-sm sm:text-base text-center px-4">Type in the search box to find products</p>
                </div>
              )}

              {!loading && searchResults.length > 0 && (
                <div>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {searchResults.map((product) => (
                      <div key={product.id} onClick={() => handleProductClick(product.slug)} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                          <Image src={product.images[0]?.src || "/image1.jpg"} alt={product.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-3 sm:p-4">
                          <h3 className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-blue-600 font-bold text-sm sm:text-base lg:text-lg">
                            Rs {product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;