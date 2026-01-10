import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "mini_ecommerce_cart";

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(loadCart); 

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const found = prev.find((it) => it.id === product.id);
            if (found) {
                return prev.map((it) =>
                    it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((it) => it.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        const q = Number(quantity);
        if (!Number.isFinite(q) || q < 1) return;
        setCartItems((prev) =>
            prev.map((it) => (it.id === productId ? { ...it, quantity: q } : it))
        );
    };

    const clearCart = () => setCartItems([]);

    const total = useMemo(() => {
        return cartItems.reduce((acc, it) => acc + Number(it.price) * it.quantity, 0);
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
