import React from "react";
import { ShoppingCart } from "lucide-react";

interface NavbarProps {
  onOpenPromo: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenPromo, onOpenCart, cartCount }: NavbarProps): JSX.Element {
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

      <button
        className="navbar-cart"
        onClick={onOpenCart}
        aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
      >
        <ShoppingCart size={22} color="#1f2937" />
        {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
      </button>
    </header>
  );
}
