import createApiClient from "./apiClient";

/**
 * Service for address-related operations.
 */
export const addressService = {
  /**
   * Retrieves all addresses for the authenticated user.
   * @param {string} token - The authentication token.
   * @returns {Promise<Array>} List of addresses.
   */
  async getAddresses(token) {
    const apiClient = createApiClient(token);
    const response = await apiClient.get("/api/v1/addresses");
    return response.data;
  },

  /**
   * Creates a new address for the authenticated user.
   * @param {string} token - The authentication token.
   * @param {Object} addressData - The address data.
   * @returns {Promise<Object>} The created address.
   */
  async createAddress(token, addressData) {
    const apiClient = createApiClient(token);
    const response = await apiClient.post("/api/v1/addresses", addressData);
    return response.data;
  },

  /**
   * Updates an existing address.
   * @param {string} token - The authentication token.
   * @param {string|number} addressId - The ID of the address to update.
   * @param {Object} addressData - The new address data.
   * @returns {Promise<Object>} The updated address.
   */
  async updateAddress(token, addressId, addressData) {
    const apiClient = createApiClient(token);
    const response = await apiClient.put(
      `/api/v1/addresses/${addressId}`,
      addressData,
    );
    return response.data;
  },

  /**
   * Deletes an address.
   * @param {string} token - The authentication token.
   * @param {string|number} addressId - The ID of the address to delete.
   * @returns {Promise<void>}
   */
  async deleteAddress(token, addressId) {
    const apiClient = createApiClient(token);
    await apiClient.delete(`/api/v1/addresses/${addressId}`);
  },
};
