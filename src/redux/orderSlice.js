import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../services/orderService";

// Thunks

/**
 * Thunk to create a new order.
 */
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderDetails, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await orderService.createOrder(token, orderDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to fetch user's orders.
 */
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await orderService.getMyOrders(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to retry payment for an order.
 */
export const retryPayment = createAsyncThunk(
  "order/retryPayment",
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await orderService.retryPayment(token, orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null,
  operationLoading: false,
  operationError: null,
  operationSuccess: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOperationStatus: (state) => {
      state.operationLoading = false;
      state.operationError = null;
      state.operationSuccess = false;
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.currentOrder = action.payload;
        state.operationSuccess = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      // Fetch My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Retry Payment
      .addCase(retryPayment.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess = false;
      })
      .addCase(retryPayment.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.currentOrder = action.payload; // Assuming retry returns the updated order
        state.operationSuccess = true;
      })
      .addCase(retryPayment.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export const { resetOperationStatus } = orderSlice.actions;

export default orderSlice.reducer;
