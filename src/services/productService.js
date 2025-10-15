import apiClient from './apiClient';

/**
 * Obtiene los datos de un producto específico desde la API.
 * @param {string | number} productId El ID del producto a obtener.
 * @returns {Promise<object>} El objeto del producto.
 */
export const getProductById = async (productId) => {
  console.log(`[productService] getProductById: Recibido productId: ${productId}`);
  try {
    const response = await apiClient.get(`/api/v1/products/${productId}`);
    console.log('[productService] getProductById: Respuesta de API exitosa:', response.data);
    return response.data;
  } catch (error) {
    console.error(`[productService] getProductById: Error en la petición para productId ${productId}:`, error);
    throw new Error('No se pudo obtener la información del producto.');
  }
};

/**
 * Obtiene los datos de una categoría específica desde la API.
 * @param {string | number} categoryId El ID de la categoría a obtener.
 * @returns {Promise<object>} El objeto de la categoría.
 */
export const getCategoryById = async (categoryId) => {
  console.log(`[productService] getCategoryById: Recibido categoryId: ${categoryId}`);
  try {
    const response = await apiClient.get(`/api/v1/categories/byid/${categoryId}`);
    console.log('[productService] getCategoryById: Respuesta de API exitosa:', response.data);
    return response.data;
  } catch (error) {
    console.error(`[productService] getCategoryById: Error en la petición para categoryId ${categoryId}:`, error);
    throw new Error('No se pudo obtener la información de la categoría.');
  }
};

/**
 * Obtiene una lista de productos, opcionalmente filtrada por categoría.
 * @param {number} categoryId El ID de la categoría para filtrar.
 * @param {number} page El número de página a obtener.
 * @param {number} size El tamaño de la página.
 * @returns {Promise<Array>} Una lista de productos.
 */
export const getProductsByCategory = async (categoryId, page = 0, size = 20) => {
  console.log(`[productService] getProductsByCategory: categoryId=${categoryId}, page=${page}, size=${size}`);
  try {
    const response = await apiClient.get('/api/v1/products', {
      params: { categoryId, page, size }
    });
    console.log('[productService] getProductsByCategory: Respuesta de API exitosa:', response.data);
    return response.data.products; // Devuelve solo el array de productos
  } catch (error) {
    console.error(`[productService] getProductsByCategory: Error en la petición:`, error);
    // No lanzamos un error aquí para no detener el proceso de búsqueda de relacionados
    return []; // Devolvemos un array vacío en caso de error
  }
};

/**
 * Obtiene los datos binarios (blob) de una imagen protegida.
 * @param {string | number} imageId El ID de la imagen a obtener.
 * @returns {Promise<Blob>} El blob de la imagen.
 */
export const getImageBlob = async (imageId) => {
  try {
    const response = await apiClient.get(`/api/v1/images/${imageId}`, {
      responseType: 'blob', // ¡Esta es la clave!
    });
    return response.data;
  } catch (error) {
    console.error(`[productService] getImageBlob: Error fetching image blob with ID ${imageId}:`, error);
    throw error;
  }
};
