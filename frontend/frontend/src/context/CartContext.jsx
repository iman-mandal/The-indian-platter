import React, { createContext, useContext, useState } from "react";

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add item to cart
    const addToCart = (item) => {
        setCart((prev) => [...prev, item]);
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((i) => i._id !== id));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for easier usage
export const useCart = () => useContext(CartContext);