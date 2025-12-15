import createApiClient from "./apiClient";

/**
 * Service for coupon-related operations.
 */
export const couponService = {
  /**
   * Retrieves all coupons.
   * @param {string} token - The authentication token.
   * @returns {Promise<Array>} List of coupons.
   */
  async getCoupons(token) {
    const apiClient = createApiClient(token);
    const response = await apiClient.get("/api/v1/coupons");
    return response.data;
  },

  /**
   * Creates a new coupon.
   * @param {string} token - The authentication token.
   * @param {Object} couponData - The coupon data.
   * @returns {Promise<Object>} The created coupon.
   */
  async createCoupon(token, couponData) {
    const apiClient = createApiClient(token);
    const response = await apiClient.post("/api/v1/coupons", couponData);
    return response.data;
  },

  /**
   * Updates an existing coupon.
   * @param {string} token - The authentication token.
   * @param {string|number} couponId - The ID of the coupon to update.
   * @param {Object} couponData - The new coupon data.
   * @returns {Promise<Object>} The updated coupon.
   */
  async updateCoupon(token, couponId, couponData) {
    const apiClient = createApiClient(token);
    const response = await apiClient.put(
      `/api/v1/coupons/${couponId}`,
      couponData,
    );
    return response.data;
  },

  /**
   * Validates a coupon code.
   * @param {string} token - The authentication token.
   * @param {string} code - The coupon code.
   * @returns {Promise<Object>} The validation result.
   */
  async validateCoupon(token, code) {
    const apiClient = createApiClient(token);
    const response = await apiClient.get(
      `/api/v1/coupons/validate?code=${code}`,
    );
    return response.data;
  },
};
