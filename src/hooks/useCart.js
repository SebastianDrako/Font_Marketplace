import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  addToCart as addToCartAction,
  updateCartItem as updateCartItemAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  applyCoupon as applyCouponAction,
  removeCoupon as removeCouponAction,
} from "../redux/cartSlice";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

/**
 * Custom hook to manage cart state and actions.
 *
 * @returns {Object} An object containing cart state and functions.
 * @property {Object|null} cart - The current cart object.
 * @property {Array} items - The list of items in the cart.
 * @property {boolean} loading - Whether a cart action is in progress.
 * @property {string|null} error - Error message, if any.
 * @property {Function} getCart - Function to refresh the cart.
 * @property {Function} addToCart - Function to add an item to the cart.
 * @property {Function} updateCartItem - Function to update an item's quantity.
 * @property {Function} removeFromCart - Function to remove an item from the cart.
 * @property {Function} clearCart - Function to clear the cart.
 * @property {Function} applyCoupon - Function to apply a coupon.
 * @property {Function} removeCoupon - Function to remove a coupon.
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [isAuthenticated, dispatch]);

  const addToCart = (productId, quantity) => {
    return dispatch(addToCartAction({ productId, quantity }));
  };

  const updateCartItem = (itemId, quantity) => {
    return dispatch(updateCartItemAction({ itemId, quantity }));
  };

  const removeFromCart = (itemId) => {
    return dispatch(removeFromCartAction(itemId));
  };

  const clearCart = () => {
    return dispatch(clearCartAction());
  };

  const applyCoupon = (couponCode) => {
    return dispatch(applyCouponAction(couponCode));
  };

  const removeCoupon = () => {
    return dispatch(removeCouponAction());
  };

  return {
    cart,
    items: cart?.items || [],
    loading,
    error,
    getCart: () => dispatch(getCart()),
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  };
};
