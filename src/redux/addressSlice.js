import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addressService } from "../services/addressService";

// Thunks

/**
 * Thunk to fetch user addresses.
 */
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await addressService.getAddresses(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to create a new address.
 */
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (addressData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await addressService.createAddress(token, addressData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to update an existing address.
 */
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, addressData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await addressService.updateAddress(
        token,
        addressId,
        addressData,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

/**
 * Thunk to delete an address.
 */
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await addressService.deleteAddress(token, addressId);
      return addressId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  operationLoading: false, // For create/update/delete operations
  operationError: null,
  operationSuccess: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetOperationStatus: (state) => {
      state.operationLoading = false;
      state.operationError = null;
      state.operationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Address
      .addCase(createAddress.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess = false;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.addresses.push(action.payload);
        state.operationSuccess = true;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess = false;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.operationLoading = false;
        const index = state.addresses.findIndex(
          (a) => a.id === action.payload.id,
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        state.operationSuccess = true;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess = false;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.addresses = state.addresses.filter(
          (a) => a.id !== action.payload,
        );
        state.operationSuccess = true;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export const { resetOperationStatus } = addressSlice.actions;

export default addressSlice.reducer;
