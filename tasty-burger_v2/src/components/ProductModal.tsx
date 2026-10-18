import React, { useEffect, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Burger } from "../types";
import { Stars } from "./BurgerCard";

interface ProductModalProps {
  burger: Burger | null;
  onClose: () => void;
  onAddToCart: (burger: Burger, quantity: number) => void;
}

export default function ProductModal({ burger, onClose, onAddToCart }: ProductModalProps): JSX.Element | null {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset quantity whenever a new burger is opened, and lock page scroll while open.
  useEffect(() => {
    if (burger) {
      setQuantity(1);
      setJustAdded(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [burger]);

  if (!burger) return null;

  const updateQuantity = (next: number) => {
    setQuantity(Math.max(1, next));
  };

  const handleAddToCart = () => {
    onAddToCart(burger, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={burger.name}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="product-modal-image">
          <img src={burger.img} alt={burger.name} />
        </div>

        <div className="product-modal-body">
          <Stars rating={burger.rating} />
          <h2 className="product-modal-name">{burger.name}</h2>
          <p className="product-modal-desc">{burger.desc}</p>
          <span className="product-modal-category">{burger.category}</span>

          <div className="product-modal-footer">
            <span className="burger-card-price">{burger.price}</span>

            <div className="quantity-control">
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(quantity - 1)}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            className={`add-to-cart-btn ${justAdded ? "added" : ""}`}
            type="button"
            onClick={handleAddToCart}
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
