import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MainScreen from "./components/MainScreen";
import PromoModal from "./components/PromoModal";
import CartSidebar from "./components/CartSidebar";
import Toast, { ToastData } from "./components/Toast";
import { CategoryOption } from "./components/CategoryFilter";
import { burgers } from "./data/burgers";
import { Burger, CartItem } from "./types";

export default function App(): JSX.Element {
  const [showPromo, setShowPromo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (message: string) => {
    setToast((prev) => ({ key: (prev?.key ?? 0) + 1, message }));
  };

  // Sets a cart line to an absolute quantity, adding or removing the item as needed.
  // Used by both the card's inline stepper and the cart sidebar's stepper.
  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.burger.id !== id));
      return;
    }

    const existing = cart.find((item) => item.burger.id === id);
    if (existing) {
      setCart((prev) =>
        prev.map((item) => (item.burger.id === id ? { ...item, quantity } : item))
      );
      return;
    }

    const burger = burgers.find((b) => b.id === id);
    if (!burger) return;
    setCart((prev) => [...prev, { burger, quantity }]);
    showToast(`Added ${burger.name} to your cart`);
  };

  // Used by the product modal's explicit "Add to Cart" button, which adds
  // on top of whatever quantity is already in the cart for that burger.
  const handleAddToCart = (burger: Burger, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.burger.id === burger.id);
      if (existing) {
        return prev.map((item) =>
          item.burger.id === burger.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { burger, quantity }];
    });
    showToast(`Added ${burger.name} to your cart`);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Navbar
        onOpenPromo={() => setShowPromo(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />
      <MainScreen
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBurger={selectedBurger}
        onSelectBurger={setSelectedBurger}
        cart={cart}
        onQuantityChange={updateCartQuantity}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />
      <PromoModal isOpen={showPromo} onClose={() => setShowPromo(false)} />
      <CartSidebar
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={updateCartQuantity}
        onRemove={(id) => updateCartQuantity(id, 0)}
      />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
