import createApiClient from "./apiClient";

/**
 * Service for cart-related operations.
 */
export const cartService = {
  /**
   * Retrieves the current user's cart.
   * @param {string} token - The authentication token.
   * @returns {Promise<Object>} The cart data.
   */
  async getCart(token) {
    const apiClient = createApiClient(token);
    const response = await apiClient.get("/api/v1/cart");
    return response.data;
  },

  /**
   * Adds an item to the cart.
   * @param {string} token - The authentication token.
   * @param {string|number} productId - The ID of the product to add.
   * @param {number} quantity - The quantity to add.
   * @returns {Promise<Object>} The updated cart data.
   */
  async addToCart(token, productId, quantity) {
    const apiClient = createApiClient(token);
    const response = await apiClient.post("/api/v1/cart/items", {
      productId,
      quantity,
    });
    return response.data;
  },

  /**
   * Updates the quantity of an item in the cart.
   * @param {string} token - The authentication token.
   * @param {string|number} itemId - The ID of the cart item.
   * @param {number} quantity - The new quantity.
   * @returns {Promise<Object>} The updated cart data.
   */
  async updateCartItem(token, itemId, quantity) {
    const apiClient = createApiClient(token);
    const response = await apiClient.patch(`/api/v1/cart/items/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  /**
   * Removes an item from the cart.
   * @param {string} token - The authentication token.
   * @param {string|number} itemId - The ID of the cart item to remove.
   * @returns {Promise<void>}
   */
  async removeFromCart(token, itemId) {
    const apiClient = createApiClient(token);
    await apiClient.delete(`/api/v1/cart/items/${itemId}`);
  },

  /**
   * Clears all items from the cart.
   * @param {string} token - The authentication token.
   * @returns {Promise<void>}
   */
  async clearCart(token) {
    const apiClient = createApiClient(token);
    await apiClient.delete("/api/v1/cart/items");
  },

  /**
   * Applies a coupon to the cart.
   * @param {string} token - The authentication token.
   * @param {string} codigo - The coupon code.
   * @returns {Promise<Object>} The updated cart data.
   */
  async applyCoupon(token, codigo) {
    const apiClient = createApiClient(token);
    const response = await apiClient.post("/api/v1/cart/cupon", { codigo });
    return response.data;
  },

  /**
   * Removes the coupon from the cart.
   * @param {string} token - The authentication token.
   * @returns {Promise<Object>} The updated cart data.
   */
  async removeCoupon(token) {
    const apiClient = createApiClient(token);
    // Assuming sending empty code removes it, based on previous implementation
    const response = await apiClient.post("/api/v1/cart/cupon", { codigo: "" });
    return response.data;
  },
};
