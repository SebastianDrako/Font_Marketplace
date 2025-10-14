import React, { useReducer, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from '../hooks/useAuth.jsx';
import { cartService } from '../services/cartService.js';

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
    console.log('Cart action:', action.type, 'Payload:', action.payload);
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product, quantity } = action.payload;
            const existingItem = state.find(item => item.id === product.id);

            if (existingItem) {
                return state.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...state, { ...product, quantity: quantity }];
            }
        }
        case 'REMOVE_FROM_CART': {
            const { productId } = action.payload;
            return state.filter(item => item.id !== productId);
        }
        case 'DECREMENT_QUANTITY': {
            const { productId } = action.payload;
            const existingItem = state.find(item => item.id === productId);

            if (existingItem.quantity === 1) {
                return state.filter(item => item.id !== productId);
            } else {
                return state.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        }
        case 'CLEAR_CART': {
            return [];
        }
        case 'SET_CART': {
            return action.payload.cart;
        }
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const initialState = [];
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    const fetchCart = async () => {
        if (isAuthenticated) {
            try {
                const response = await cartService.getCart();
                console.log('Cart fetched from API:', response.data);
                const cartData = response.data.items.map(item => ({
                    id: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    lineTotal: item.lineTotal, // Añadir lineTotal
                    itemId: item.id
                }));
                dispatch({ type: 'SET_CART', payload: { cart: cartData } });
            } catch (error) {
                console.error('Error fetching cart:', error);
                // Si falla (ej. 404), asegurar que el carrito local esté vacío
                dispatch({ type: 'SET_CART', payload: { cart: [] } });
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log('Cart fetched from localStorage:', localCart);
            dispatch({ type: 'SET_CART', payload: { cart: localCart } });
        }
    };

    useEffect(() => {
        fetchCart();
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isAuthenticated]);

    const addToCart = async (product, quantity) => {
        if (isAuthenticated) {
            try {
                const existingItem = cart.find(item => item.id === product.id);
                let response;
                if (existingItem) {
                    response = await cartService.updateCartItem(existingItem.itemId, existingItem.quantity + quantity);
                    console.log('Cart item updated:', response.data);
                } else {
                    response = await cartService.addToCart(product.id, quantity);
                    console.log('Product added to cart:', response.data);
                }
                await fetchCart(); // Refrescar el carrito desde el backend
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        } else {
            dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
        }
    };

    const removeFromCart = async (productId) => {
        if (isAuthenticated) {
            try {
                const itemToRemove = cart.find(item => item.id === productId);
                if (itemToRemove) {
                    const response = await cartService.removeFromCart(itemToRemove.itemId);
                    console.log('Item removed from cart:', response.data);
                    await fetchCart();
                }
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        } else {
            dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
        }
    };

    const decrementQuantity = async (productId) => {
        if (isAuthenticated) {
            try {
                const existingItem = cart.find(item => item.id === productId);
                if (existingItem) {
                    let response;
                    if (existingItem.quantity > 1) {
                        response = await cartService.updateCartItem(existingItem.itemId, existingItem.quantity - 1);
                        console.log('Cart item decremented:', response.data);
                    } else {
                        response = await cartService.removeFromCart(existingItem.itemId);
                        console.log('Cart item removed on decrement:', response.data);
                    }
                    await fetchCart();
                }
            } catch (error) {
                console.error('Error decrementing cart item:', error);
            }
        } else {
            dispatch({ type: 'DECREMENT_QUANTITY', payload: { productId } });
        }
    };

    const clearCart = async () => {
        if (isAuthenticated) {
            try {
                const response = await cartService.clearCart();
                console.log('Cart cleared:', response.data);
                await fetchCart();
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
        } else {
            dispatch({ type: 'CLEAR_CART' });
        }
    };



    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;