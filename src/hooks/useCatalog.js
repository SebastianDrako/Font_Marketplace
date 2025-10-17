import { useState, useEffect, useCallback } from "react";
import { productService } from "../services/productService";

export const useCatalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({ q: "", categoryId: "" });

  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await productService.getCategoriesTree();
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsData = await productService.getProducts({
        ...filters,
        ...pagination,
      });
      setProducts(productsData.products);
      setPagination((prev) => ({
        ...prev,
        totalPages: productsData.totalPages,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 0 })); // Reset to first page on filter change
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return {
    products,
    categories,
    loading,
    error,
    pagination,
    filters,
    handleFilterChange,
    handlePageChange,
  };
};
