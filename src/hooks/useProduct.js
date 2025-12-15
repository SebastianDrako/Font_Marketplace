import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductData } from "../redux/productSlice";

/**
 * Custom hook to fetch and provide data for a single product.
 *
 * @param {string|number} productId - The ID of the product to fetch.
 * @returns {Object} An object containing product data.
 * @property {Object|undefined} product - The product details.
 * @property {Array} breadcrumbs - The category path for breadcrumbs.
 * @property {Array} relatedProducts - A list of related products.
 * @property {boolean} loading - Whether the product data is loading.
 * @property {string|null} error - Error message, if any.
 */
export const useProduct = (productId) => {
  const dispatch = useDispatch();
  const { selectedProductData, loading, error } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductData(productId));
    }
  }, [productId, dispatch]);

  return {
    product: selectedProductData?.product,
    breadcrumbs: selectedProductData?.breadcrumbs || [],
    relatedProducts: selectedProductData?.relatedProducts || [],
    loading,
    error,
  };
};
