import React from "react";
import { Heart, Star } from "lucide-react";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function BurgerCard({ name, desc, price, rating, img }) {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-44 w-full overflow-hidden">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Stars rating={rating} />
          <Heart size={18} className="text-gray-400" />
        </div>
        <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed">{desc}</p>
        <span className="inline-block bg-amber-800 text-white text-xs font-semibold px-3 py-1.5 rounded">
          {price}
        </span>
      </div>
    </div>
  );
}