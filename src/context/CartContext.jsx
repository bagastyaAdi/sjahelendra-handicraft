import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            // Check if product already in cart
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                // If we want quantity, we'd update it here. 
                // For now, let's just keep it simple as requested "convert wishlist to cart"
                // But I'll add a quantity field just in case it's needed for checkout logic later.
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: (item.quantity || 1) + 1 } 
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) => prev.map(item => 
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isInCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
