import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { couponService } from "../services/couponService";

// Thunks

/**
 * Thunk to fetch all coupons (admin).
 */
export const fetchCoupons = createAsyncThunk(
  "coupon/fetchCoupons",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await couponService.getCoupons(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to create a new coupon.
 */
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await couponService.createCoupon(token, couponData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to update an existing coupon.
 */
export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async ({ couponId, couponData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await couponService.updateCoupon(
        token,
        couponId,
        couponData,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to validate a coupon.
 */
export const validateCoupon = createAsyncThunk(
  "coupon/validateCoupon",
  async (code, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await couponService.validateCoupon(token, code);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  coupons: [],
  loading: false,
  error: null,
  operationLoading: false,
  operationError: null,
  operationSuccess: false,
  validCoupon: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetOperationStatus: (state) => {
      state.operationLoading = false;
      state.operationError = null;
      state.operationSuccess = false;
    },
    resetValidCoupon: (state) => {
      state.validCoupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Coupons
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Coupon
      .addCase(createCoupon.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess = false;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.coupons.push(action.payload);
        state.operationSuccess = true;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      // Update Coupon
      .addCase(updateCoupon.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess = false;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.operationLoading = false;
        const index = state.coupons.findIndex(
          (c) => c.id === action.payload.id,
        );
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
        state.operationSuccess = true;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      // Validate Coupon
      .addCase(validateCoupon.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.validCoupon = action.payload;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export const { resetOperationStatus, resetValidCoupon } = couponSlice.actions;

export default couponSlice.reducer;
