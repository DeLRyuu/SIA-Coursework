import React from "react";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 md:px-16 py-5 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <img
          src="https://www.tastypoint.shop/assets/logo-DynS4IW4.png"
          alt="Tasty Burger logo"
          className="h-9 w-auto"
        />
      </div>

      <nav className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-gray-800">
        <a href="#" className="hover:text-red-600">ABOUT</a>
        <a href="#" className="hover:text-red-600">OUR MENU</a>
        <a href="#" className="hover:text-red-600">SHOP</a>
        <a href="#" className="hover:text-red-600">CONTACT</a>
      </nav>

      <div className="relative">
        <ShoppingCart size={22} className="text-gray-800" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          2
        </span>
      </div>
    </header>
  );
}