import React from "react";
import { Heart, Star, Minus, Plus } from "lucide-react";
import { Burger } from "../types";

interface StarsProps {
  rating: number;
}

export function Stars({ rating }: StarsProps): JSX.Element {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? "star filled" : "star"}
          fill={i <= Math.round(rating) ? "#fbbf24" : "none"}
        />
      ))}
    </div>
  );
}

interface BurgerCardProps extends Burger {
  quantity: number;
  favorited: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
  onToggleFavorite: (id: string) => void;
  onImageClick?: (burger: Burger) => void;
}

export default function BurgerCard(props: BurgerCardProps): JSX.Element {
  const {
    id,
    name,
    desc,
    price,
    rating,
    img,
    quantity,
    favorited,
    onQuantityChange,
    onToggleFavorite,
    onImageClick,
  } = props;

  const updateQuantity = (next: number) => {
    onQuantityChange(id, Math.max(0, next));
  };

  return (
    <div className="burger-card">
      <button
        type="button"
        className="burger-card-image"
        onClick={() => onImageClick?.(props)}
        aria-label={`View details for ${name}`}
      >
        <img src={img} alt={name} />
      </button>
      <div className="burger-card-body">
        <div className="burger-card-top">
          <Stars rating={rating} />
          <button
            className={`favorite-btn ${favorited ? "favorited" : ""}`}
            onClick={() => onToggleFavorite(id)}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={18} fill={favorited ? "#dc2626" : "none"} color={favorited ? "#dc2626" : "#9ca3af"} />
          </button>
        </div>
        <h3 className="burger-card-name">{name}</h3>
        <p className="burger-card-desc">{desc}</p>

        <div className="burger-card-footer">
          <span className="burger-card-price">{price}</span>

          <div className="quantity-control">
            <button
              className="quantity-btn"
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity === 0}
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
      </div>
    </div>
  );
}
