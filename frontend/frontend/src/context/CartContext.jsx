import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 👉 Load saved cart on page load
  useEffect(() => {
    const saved = localStorage.getItem("cartItems");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // 👉 Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // 👉 Add item to cart
  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  // 👉 Remove item by ID
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
