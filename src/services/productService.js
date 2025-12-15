import createApiClient from "./apiClient";

/**
 * Service for product-related operations.
 */
export const productService = {
  /**
   * Retrieves a product by its ID.
   * @param {string} token - The authentication token.
   * @param {string|number} productId - The ID of the product.
   * @returns {Promise<Object>} The product data.
   */
  async getProductById(token, productId) {
    const apiClient = createApiClient(token);
    console.log(
      `[productService] getProductById: Recibido productId: ${productId}`,
    );
    try {
      const response = await apiClient.get(`/api/v1/products/${productId}`);
      console.log(
        "[productService] getProductById: Respuesta de API exitosa:",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error(
        `[productService] getProductById: Error en la petición para productId ${productId}:`,
        error,
      );
      throw new Error("No se pudo obtener la información del producto.");
    }
  },

  /**
   * Retrieves a category by its ID.
   * @param {string} token - The authentication token.
   * @param {string|number} categoryId - The ID of the category.
   * @returns {Promise<Object>} The category data.
   */
  async getCategoryById(token, categoryId) {
    const apiClient = createApiClient(token);
    console.log(
      `[productService] getCategoryById: Recibido categoryId: ${categoryId}`,
    );
    try {
      const response = await apiClient.get(
        `/api/v1/categories/byid/${categoryId}`,
      );
      console.log(
        "[productService] getCategoryById: Respuesta de API exitosa:",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error(
        `[productService] getCategoryById: Error en la petición para categoryId ${categoryId}:`,
        error,
      );
      throw new Error("No se pudo obtener la información de la categoría.");
    }
  },

  /**
   * Retrieves a list of products based on filters.
   * @param {string} token - The authentication token.
   * @param {Object} params - The query parameters.
   * @param {string} [params.categoryId] - Filter by category ID.
   * @param {string} [params.q] - Search query.
   * @param {number} [params.page] - Page number.
   * @param {number} [params.size] - Page size.
   * @returns {Promise<Object>} The list of products and pagination info.
   */
  async getProducts(token, { categoryId, q, page, size }) {
    const apiClient = createApiClient(token);
    try {
      const params = new URLSearchParams({ page, size });
      if (categoryId) params.append("categoryId", categoryId);
      if (q) params.append("q", q);

      const response = await apiClient.get(
        `/api/v1/products?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        "[productService] getProducts: Error fetching products:",
        error,
      );
      throw new Error("No se pudieron obtener los productos.");
    }
  },

  /**
   * Retrieves the category tree structure.
   * @param {string} token - The authentication token.
   * @returns {Promise<Array>} The category tree.
   */
  async getCategoriesTree(token) {
    const apiClient = createApiClient(token);
    try {
      const response = await apiClient.get("/api/v1/categories/tree");
      return response.data;
    } catch (error) {
      console.error(
        "[productService] getCategoriesTree: Error fetching categories:",
        error,
      );
      throw new Error("No se pudieron obtener las categorías.");
    }
  },

  /**
   * Retrieves an image as a Blob.
   * @param {string} token - The authentication token.
   * @param {string|number} imageId - The ID of the image.
   * @returns {Promise<Blob>} The image data as a Blob.
   */
  async getImageBlob(token, imageId) {
    const apiClient = createApiClient(token);
    try {
      const response = await apiClient.get(`/api/v1/images/${imageId}`, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error(
        `[productService] getImageBlob: Error fetching image blob with ID ${imageId}:`,
        error,
      );
      throw error;
    }
  },
};
