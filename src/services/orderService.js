import createApiClient from "./apiClient";

/**
 * Service for order-related operations.
 */
export const orderService = {
  /**
   * Creates a new order.
   * @param {string} token - The authentication token.
   * @param {Object} orderDetails - The details of the order to create.
   * @returns {Promise<Object>} The created order.
   */
  async createOrder(token, orderDetails) {
    const apiClient = createApiClient(token);
    const response = await apiClient.post("/api/v1/orders", orderDetails);
    return response.data;
  },

  /**
   * Retrieves all orders for the authenticated user.
   * @param {string} token - The authentication token.
   * @returns {Promise<Array>} List of user orders.
   */
  async getMyOrders(token) {
    const apiClient = createApiClient(token);
    const response = await apiClient.get("/api/v1/orders/my-orders");
    return response.data;
  },

  /**
   * Retries payment for a specific order.
   * @param {string} token - The authentication token.
   * @param {string|number} orderId - The ID of the order.
   * @returns {Promise<Object>} The response data.
   */
  async retryPayment(token, orderId) {
    const apiClient = createApiClient(token);
    const response = await apiClient.post(
      `/api/v1/orders/${orderId}/retry-payment`,
    );
    return response.data;
  },
};
