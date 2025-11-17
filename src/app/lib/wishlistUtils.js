// lib/wishlistUtils.js or utils/wishlistUtils.js

/**
 * Get all wishlist items from localStorage
 * @returns {Array} Array of wishlist items with {id}
 */
export const getWishlistItems = () => {
  try {
    const wishlistData = localStorage.getItem("wishlist");
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch (error) {
    console.error("Error reading wishlist from localStorage:", error);
    return [];
  }
};

/**
 * Get array of wishlist product IDs
 * @returns {Array} Array of product IDs
 */
export const getWishlistIds = () => {
  const wishlistItems = getWishlistItems();
  return wishlistItems.map((item) => item.id);
};

/**
 * Add product to wishlist
 * @param {number|string} productId - The product ID to add
 * @returns {Object} Result object with {success, message, wishlistItems, isAdded}
 */
export const addToWishlist = (productId) => {
  try {
    const existingData = getWishlistItems();
    const exists = existingData.some((item) => item.id === productId);

    if (exists) {
      return {
        success: false,
        message: "Product already in wishlist",
        wishlistItems: existingData,
        isAdded: false,
      };
    }

    const updatedData = [...existingData, { id: productId }];
    localStorage.setItem("wishlist", JSON.stringify(updatedData));
    return {
      success: true,
      message: "Product added to wishlist successfully",
      wishlistItems: updatedData,
      isAdded: true,
    };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return {
      success: false,
      message: "Failed to add product to wishlist",
      wishlistItems: getWishlistItems(),
      isAdded: false,
    };
  }
};

/**
 * Remove product from wishlist
 * @param {number|string} productId - The product ID to remove
 * @returns {Object} Result object with {success, message, wishlistItems, isRemoved}
 */
export const removeFromWishlist = (productId) => {
  try {
    const existingData = getWishlistItems();
    const updatedData = existingData.filter((item) => item.id !== productId);
    
    if (updatedData.length === existingData.length) {
      return {
        success: false,
        message: "Product not found in wishlist",
        wishlistItems: existingData,
        isRemoved: false,
      };
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedData));
    return {
      success: true,
      message: "Product removed from wishlist",
      wishlistItems: updatedData,
      isRemoved: true,
    };
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return {
      success: false,
      message: "Failed to remove product from wishlist",
      wishlistItems: getWishlistItems(),
      isRemoved: false,
    };
  }
};

/**
 * Toggle product in wishlist (add if not exists, remove if exists)
 * @param {number|string} productId - The product ID to toggle
 * @returns {Object} Result object with {success, message, wishlistItems, isAdded}
 */
export const toggleWishlist = (productId) => {
  const wishlistItems = getWishlistItems();
  const exists = wishlistItems.some((item) => item.id === productId);

  if (exists) {
    const result = removeFromWishlist(productId);
    return { ...result, isAdded: false };
  } else {
    const result = addToWishlist(productId);
    return { ...result, isAdded: true };
  }
};

/**
 * Clear entire wishlist
 * @returns {Object} Result object with {success, message}
 */
export const clearWishlist = () => {
  try {
    localStorage.removeItem("wishlist");
    return {
      success: true,
      message: "Wishlist cleared successfully",
      wishlistItems: [],
    };
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    return {
      success: false,
      message: "Failed to clear wishlist",
      wishlistItems: getWishlistItems(),
    };
  }
};

/**
 * Check if product is in wishlist
 * @param {number|string} productId - The product ID to check
 * @returns {boolean} True if product is in wishlist
 */
export const isInWishlist = (productId) => {
  const wishlistItems = getWishlistItems();
  return wishlistItems.some((item) => item.id === productId);
};

/**
 * Get wishlist items count
 * @returns {number} Number of items in wishlist
 */
export const getWishlistCount = () => {
  return getWishlistItems().length;
};