import React from "react";
import { ShoppingCart } from "lucide-react";

export default function Navbar({ onOpenPromo }) {
  return (
    <header className="navbar">
      <button className="navbar-logo" onClick={onOpenPromo} aria-label="Tasty Burger">
        <img
          src="https://www.tastypoint.shop/assets/logo-DynS4IW4.png"
          alt="Tasty Burger logo"
        />
      </button>

      <nav className="navbar-links">
        <a href="#">ABOUT</a>
        <a href="#">OUR MENU</a>
        <a href="#">SHOP</a>
        <a href="#">CONTACT</a>
      </nav>

      <div className="navbar-cart">
        <ShoppingCart size={22} color="#1f2937" />
        <span className="navbar-cart-badge">2</span>
      </div>
    </header>
  );
}