import React from "react";
import Navbar from "./components/Navbar";
import BurgerCard from "./components/burgercard";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-8 max-w-xs">
        <BurgerCard
          name="Crispy Chicken"
          desc="Chicken breast, chilli sauce, tomatoes, pickles, coleslaw"
          price="৳99.15"
          rating={5}
          img="https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80"
        />
      </div>
    </div>
  );
}