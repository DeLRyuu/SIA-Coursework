import React from "react";
import { Heart, Star } from "lucide-react";

function Stars({ rating }) {
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

export default function BurgerCard({ name, desc, price, rating, img }) {
  return (
    <div className="burger-card">
      <div className="burger-card-image">
        <img src={img} alt={name} />
      </div>
      <div className="burger-card-body">
        <div className="burger-card-top">
          <Stars rating={rating} />
          <Heart size={18} color="#9ca3af" />
        </div>
        <h3 className="burger-card-name">{name}</h3>
        <p className="burger-card-desc">{desc}</p>
        <span className="burger-card-price">{price}</span>
      </div>
    </div>
  );
}