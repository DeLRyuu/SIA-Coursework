import React from "react";
import { ShoppingCart } from "lucide-react";

interface NavbarProps {
  onOpenPromo: () => void;
}

export default function Navbar({ onOpenPromo }: NavbarProps): JSX.Element {
  return (
    <header className="navbar">
      <button className="navbar-logo" onClick={onOpenPromo} aria-label="Tasty Burger">
        <img
          src="https://www.tastypoint.shop/assets/logo-DynS4IW4.png"
          alt="Tasty Burger logo"
        />
      </button>

      <nav className="navbar-links">
        <a className="nav-link" href="#">ABOUT</a>
        <a className="nav-link" href="#">OUR MENU</a>
        <a className="nav-link" href="#">SHOP</a>
        <a className="nav-link" href="#">CONTACT</a>
      </nav>

      <div className="navbar-cart">
        <ShoppingCart size={22} color="#1f2937" />
        <span className="navbar-cart-badge">2</span>
      </div>
    </header>
  );
}
