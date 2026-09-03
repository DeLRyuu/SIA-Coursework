import React, { useMemo, useState } from "react";
import BurgerCard from "./BurgerCard";
import CategoryFilter, { CategoryOption } from "./CategoryFilter";
import ProductModal from "./ProductModal";
import { burgers } from "../data/burgers";
import { Burger } from "../types";

export default function MainScreen(): JSX.Element {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("All");
  const [selectedBurger, setSelectedBurger] = useState<Burger | null>(null);

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const filteredBurgers = useMemo(
    () =>
      selectedCategory === "All"
        ? burgers
        : burgers.filter((burger) => burger.category === selectedCategory),
    [selectedCategory]
  );

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
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

        <section className="burger-grid">
          {filteredBurgers.map((b) => (
            <BurgerCard
              key={b.id}
              {...b}
              onQuantityChange={handleQuantityChange}
              onImageClick={setSelectedBurger}
            />
          ))}
        </section>

        {filteredBurgers.length === 0 && (
          <p className="no-results">No burgers found in this category.</p>
        )}
      </div>

      <ProductModal burger={selectedBurger} onClose={() => setSelectedBurger(null)} />
    </main>
  );
}
