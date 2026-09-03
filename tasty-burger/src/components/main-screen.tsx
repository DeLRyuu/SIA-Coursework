import React from "react";
import BurgerCard from "./BurgerCard";

const burgers = [
  {
    name: "Crispy Chicken",
    desc: "Chicken breast, chilli sauce, tomatoes, pickles, coleslaw",
    price: "৳99.15",
    rating: 5,
    img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
  },
  {
    name: "Ultimate Bacon",
    desc: "House patty, cheddar cheese, bacon, onion, mustard",
    price: "৳99.32",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
  },
  {
    name: "Black Sheep",
    desc: "American cheese, tomato relish, avocado, lettuce, red onion",
    price: "৳69.15",
    rating: 4,
    img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
  },
  {
    name: "Vegan Burger",
    desc: "House patty, cheddar cheese, bacon, onion, mustard",
    price: "৳99.25",
    rating: 3.5,
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",
  },
];

export default function MainScreen() {
  return (
    <main className="bg-white font-sans">
      <section className="text-center max-w-2xl mx-auto pt-14 pb-10 px-6">
        <h1 className="text-red-600 font-extrabold text-4xl md:text-5xl tracking-wide mb-4">
          OUR CRAZY BURGERS
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Get ready for a wild ride of flavors! Our crazy burgers are loaded
          with juicy patties, bold toppings, and irresistible sauces, all
          stacked on a perfectly toasted bun. Whether you like it cheesy, or
          extra meaty, we've got a burger that will blow your mind!
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-6 md:px-16 pb-16">
        {burgers.map((b) => (
          <BurgerCard key={b.name} {...b} />
        ))}
      </section>
    </main>
  );
}