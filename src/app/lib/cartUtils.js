// lib/cartUtils.js or utils/cartUtils.js

/**
 * Get all cart items from localStorage
 * @returns {Array} Array of cart items with {id, qty}
 */
export const getCartItems = () => {
    try {
      const cartData = localStorage.getItem("name");
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  };
  
  /**
   * Add product to cart or increment quantity if already exists
   * @param {number|string} productId - The product ID to add
   * @returns {Object} Result object with {success, message, cartItems}
   */
  export const addToCart = (productId) => {
    try {
      const existingData = getCartItems();
      const existingProduct = existingData.find((item) => item.id === productId);
  
      if (existingProduct) {
        // Product exists, increment quantity
        existingProduct.qty += 1;
        localStorage.setItem("name", JSON.stringify(existingData));
        return {
          success: true,
          message: "Product quantity increased in cart",
          cartItems: existingData,
        };
      } else {
        // Product doesn't exist, add new item
        const updatedData = [...existingData, { id: productId, qty: 1 }];
        localStorage.setItem("name", JSON.stringify(updatedData));
        return {
          success: true,
          message: "Product added to cart successfully",
          cartItems: updatedData,
        };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      return {
        success: false,
        message: "Failed to add product to cart",
        cartItems: getCartItems(),
      };
    }
  };
  
  /**
   * Remove product from cart
   * @param {number|string} productId - The product ID to remove
   * @returns {Object} Result object with {success, message, cartItems}
   */
  export const removeFromCart = (productId) => {
    try {
      const existingData = getCartItems();
      const updatedData = existingData.filter((item) => item.id !== productId);
      localStorage.setItem("name", JSON.stringify(updatedData));
      return {
        success: true,
        message: "Product removed from cart",
        cartItems: updatedData,
      };
    } catch (error) {
      console.error("Error removing from cart:", error);
      return {
        success: false,
        message: "Failed to remove product from cart",
        cartItems: getCartItems(),
      };
    }
  };
  
  /**
   * Update product quantity in cart
   * @param {number|string} productId - The product ID
   * @param {number} quantity - New quantity
   * @returns {Object} Result object with {success, message, cartItems}
   */
  export const updateCartQuantity = (productId, quantity) => {
    try {
      const existingData = getCartItems();
      const product = existingData.find((item) => item.id === productId);
  
      if (product) {
        if (quantity <= 0) {
          return removeFromCart(productId);
        }
        product.qty = quantity;
        localStorage.setItem("name", JSON.stringify(existingData));
        return {
          success: true,
          message: "Cart updated successfully",
          cartItems: existingData,
        };
      }
      return {
        success: false,
        message: "Product not found in cart",
        cartItems: existingData,
      };
    } catch (error) {
      console.error("Error updating cart:", error);
      return {
        success: false,
        message: "Failed to update cart",
        cartItems: getCartItems(),
      };
    }
  };
  
  /**
   * Clear entire cart
   * @returns {Object} Result object with {success, message}
   */
  export const clearCart = () => {
    try {
      localStorage.removeItem("name");
      return {
        success: true,
        message: "Cart cleared successfully",
        cartItems: [],
      };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return {
        success: false,
        message: "Failed to clear cart",
        cartItems: getCartItems(),
      };
    }
  };
  
  /**
   * Get total items count in cart
   * @returns {number} Total number of items
   */
  export const getCartItemsCount = () => {
    const cartItems = getCartItems();
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };
  
  /**
   * Check if product exists in cart
   * @param {number|string} productId - The product ID to check
   * @returns {boolean} True if product is in cart
   */
  export const isInCart = (productId) => {
    const cartItems = getCartItems();
    return cartItems.some((item) => item.id === productId);
  };