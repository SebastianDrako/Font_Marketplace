import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { productService } from "../services/productService";

// Helper function to find category by name in a tree
const findCategoryByName = (categories, name) => {
  for (const category of categories) {
    if (category.name.toLowerCase() === name.toLowerCase()) {
      return category;
    }
    if (category.children && category.children.length > 0) {
      const found = findCategoryByName(category.children, name);
      if (found) return found;
    }
  }
  return null;
};

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
  const location = useLocation();

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
        page: pagination.page,
        size: pagination.size,
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
  }, [filters, pagination.page, pagination.size]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryName = params.get("category");

    if (categoryName && categories.length > 0) {
      const category = findCategoryByName(categories, categoryName);
      if (category) {
        setFilters((prev) => ({ ...prev, categoryId: category.id }));
      }
    }
  }, [location.search, categories]);

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
