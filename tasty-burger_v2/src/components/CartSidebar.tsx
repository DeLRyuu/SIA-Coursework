import React from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "../types";
import { formatCurrency, parsePrice } from "../utils/currency";

interface CartSidebarProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartSidebar({
  isOpen,
  items,
  onClose,
  onQuantityChange,
  onRemove,
}: CartSidebarProps): JSX.Element | null {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + parsePrice(item.burger.price) * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside
        className="cart-sidebar"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        <div className="cart-header">
          <h2>YOUR CART</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 && <p className="cart-empty">Your cart is empty.</p>}

          {items.map(({ burger, quantity }) => (
            <div className="cart-item" key={burger.id}>
              <img className="cart-item-img" src={burger.img} alt={burger.name} />
              <div className="cart-item-details">
                <div className="cart-item-top">
                  <span className="cart-item-name">{burger.name}</span>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(burger.id)}
                    aria-label={`Remove ${burger.name} from cart`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="cart-item-footer">
                  <span className="burger-card-price">{burger.price}</span>
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => onQuantityChange(burger.id, quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onQuantityChange(burger.id, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button className="add-to-cart-btn" type="button">
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
