import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../services/productService";

// Thunks

/**
 * Thunk to fetch a list of products.
 */
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ filters, pagination }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await productService.getProducts(token, {
        ...filters,
        page: pagination.page,
        size: pagination.size,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to fetch detailed data for a specific product.
 */
export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const product = await productService.getProductById(token, productId);
      if (!product) {
        return rejectWithValue("Product not found");
      }

      let breadcrumbs = [];
      if (product.categoryId) {
        const path = [];
        let currentCategoryId = product.categoryId;
        while (currentCategoryId && currentCategoryId !== 0) {
          const category = await productService.getCategoryById(
            token,
            currentCategoryId,
          );
          path.unshift(category);
          currentCategoryId = category.parentId;
        }
        breadcrumbs = path;
      }

      let relatedProducts = [];
      if (product.categoryId) {
        const response = await productService.getProducts(token, {
          categoryId: product.categoryId,
          page: 0,
          size: 7, // Fetch a few extra to filter out the current product
        });
        if (response && response.products) {
          relatedProducts = response.products
            .filter((p) => p.id !== product.id)
            .slice(0, 6);
        }
      }

      return { product, breadcrumbs, relatedProducts };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to fetch a product image as a blob.
 * This thunk does NOT store the blob in Redux state to keep it serializable.
 * Instead, it returns the blob for the component to handle (e.g., creating Object URL).
 */
export const fetchProductImage = createAsyncThunk(
  "product/fetchProductImage",
  async (imageId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const blob = await productService.getImageBlob(token, imageId);
      // We return the blob here. It will be available in the action payload in components
      // if we use .unwrap().
      // However, redux-toolkit might warn about non-serializable payload.
      // We are suppressing these warnings in store configuration.
      return blob;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  products: [],
  pagination: { page: 0, size: 20, totalPages: 1 },
  selectedProductData: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product Data
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProductData = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // fetchProductImage is not handled in the reducer because we don't store blobs in state.
  },
});

export default productSlice.reducer;
