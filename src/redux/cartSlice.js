import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../services/cartService";

// Async Thunks

/**
 * Thunk to fetch the cart.
 */
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      // cartService.getCart now returns response.data directly
      const data = await cartService.getCart(token);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null; // Cart is empty, not an error
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const createCartActionThunk = (type, serviceCall) => {
  return createAsyncThunk(
    type,
    async (payload, { dispatch, getState, rejectWithValue }) => {
      try {
        const token = getState().auth.token;
        await serviceCall(token, payload);
        dispatch(getCart());
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    },
  );
};

/**
 * Thunk to add an item to the cart.
 */
export const addToCart = createCartActionThunk(
  "cart/addToCart",
  (token, payload) =>
    cartService.addToCart(token, payload.productId, payload.quantity),
);

/**
 * Thunk to update a cart item's quantity.
 */
export const updateCartItem = createCartActionThunk(
  "cart/updateCartItem",
  (token, payload) =>
    cartService.updateCartItem(token, payload.itemId, payload.quantity),
);

/**
 * Thunk to remove an item from the cart.
 */
export const removeFromCart = createCartActionThunk(
  "cart/removeFromCart",
  (token, itemId) => cartService.removeFromCart(token, itemId),
);

/**
 * Thunk to clear the cart.
 */
export const clearCart = createCartActionThunk("cart/clearCart", (token) =>
  cartService.clearCart(token),
);

/**
 * Thunk to apply a coupon.
 */
export const applyCoupon = createCartActionThunk(
  "cart/applyCoupon",
  (token, couponCode) => cartService.applyCoupon(token, couponCode),
);

/**
 * Thunk to remove a coupon.
 */
export const removeCoupon = createCartActionThunk(
  "cart/removeCoupon",
  (token) => cartService.removeCoupon(token),
);

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
