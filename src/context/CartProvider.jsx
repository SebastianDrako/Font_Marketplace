import React, { useReducer, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useAuth } from '../hooks/useAuth.jsx';

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
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
    // Cargar el estado inicial desde localStorage
    const initialState = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    // Guardar el estado en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (!isAuthenticated) {
            clearCart();
        }
    }, [isAuthenticated]);

    const addToCart = (product, quantity) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    };

    const removeFromCart = productId => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    };

    const decrementQuantity = productId => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { productId } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
