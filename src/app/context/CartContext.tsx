"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  Id:number;
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, updatedFields: Partial<CartItem>) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Load cart from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cart");
        setCart(storedCart ? JSON.parse(storedCart) : []);
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // ✅ Add to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // ✅ Remove from cart and update localStorage
  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Ensure it updates storage
      return updatedCart;
    });
  };

  // ✅ Update cart item
  const updateCartItem = (id: string, updatedFields: Partial<CartItem>) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  // ✅ Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Ensure it updates storage
      return updatedCart;
    });
  };

  // ✅ Clear cart after payment
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeFromCart, updateCartItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
