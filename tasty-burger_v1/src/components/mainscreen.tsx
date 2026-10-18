import React, { useState } from "react";
import BurgerCard from "./BurgerCard";
import { Burger } from "../types";

const burgers: Burger[] = [
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    desc: "Chicken breast, chilli sauce, tomatoes, pickles, coleslaw",
    price: "৳99.15",
    rating: 5,
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
  },
  {
    id: "ultimate-bacon",
    name: "Ultimate Bacon",
    desc: "House patty, cheddar cheese, bacon, onion, mustard",
    price: "৳99.32",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
  },
  {
    id: "black-sheep",
    name: "Black Sheep",
    desc: "American cheese, tomato relish, avocado, lettuce, red onion",
    price: "৳69.15",
    rating: 4,
    img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
  },
  {
    id: "vegan-burger",
    name: "Vegan Burger",
    desc: "House patty, cheddar cheese, bacon, onion, mustard",
    price: "৳99.25",
    rating: 3.5,
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",
  },
];

export default function MainScreen(): JSX.Element {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

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

      <section className="burger-grid">
        {burgers.map((b) => (
          <BurgerCard key={b.id} {...b} onQuantityChange={handleQuantityChange} />
        ))}
      </section>
    </main>
  );
}