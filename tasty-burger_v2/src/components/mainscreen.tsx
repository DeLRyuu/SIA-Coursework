import React, { useMemo } from "react";
import BurgerCard from "./BurgerCard";
import CategoryFilter, { CategoryOption } from "./CategoryFilter";
import SearchBar from "./SearchBar";
import ProductModal from "./ProductModal";
import { burgers } from "../data/burgers";
import { Burger, CartItem } from "../types";

interface MainScreenProps {
  selectedCategory: CategoryOption;
  onSelectCategory: (category: CategoryOption) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedBurger: Burger | null;
  onSelectBurger: (burger: Burger | null) => void;
  cart: CartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (burger: Burger, quantity: number) => void;
}

export default function MainScreen({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  selectedBurger,
  onSelectBurger,
  cart,
  onQuantityChange,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: MainScreenProps): JSX.Element {
  const filteredBurgers = useMemo(() => {
    const byCategory =
      selectedCategory === "All"
        ? burgers
        : burgers.filter((burger) => burger.category === selectedCategory);

    const term = searchTerm.trim().toLowerCase();
    if (!term) return byCategory;

    return byCategory.filter(
      (burger) =>
        burger.name.toLowerCase().includes(term) ||
        burger.desc.toLowerCase().includes(term)
    );
  }, [selectedCategory, searchTerm]);

  const quantityFor = (id: string) => cart.find((item) => item.burger.id === id)?.quantity ?? 0;

  return (
    <main>
      <section className="hero">
        <h1 className="hero-title">OUR CRAZY BURGERS</h1>
        <p className="hero-text">
          Get ready for a wild ride of flavors! Our crazy burgers are loaded
          with juicy patties, bold toppings, and irresistible sauces, all
          stacked on a perfectly toasted bun. Whether you like it cheesy, or
          extra meaty, we've got a burger that will blow your mind!
        </p>
      </section>

      <div className="menu-container">
        <div className="menu-controls">
          <CategoryFilter selected={selectedCategory} onSelect={onSelectCategory} />
          <SearchBar value={searchTerm} onChange={onSearchChange} />
        </div>

        <section className="burger-grid">
          {filteredBurgers.map((b) => (
            <BurgerCard
              key={b.id}
              {...b}
              quantity={quantityFor(b.id)}
              favorited={favorites.has(b.id)}
              onQuantityChange={onQuantityChange}
              onToggleFavorite={onToggleFavorite}
              onImageClick={onSelectBurger}
            />
          ))}
        </section>

        {filteredBurgers.length === 0 && (
          <p className="no-results">No burgers found.</p>
        )}
      </div>

      <ProductModal
        burger={selectedBurger}
        onClose={() => onSelectBurger(null)}
        onAddToCart={onAddToCart}
      />
    </main>
  );
}
