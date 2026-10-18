import React from "react";
import { BurgerCategory } from "../types";

export type CategoryOption = BurgerCategory | "All";

const CATEGORIES: CategoryOption[] = [
  "All",
  "Chicken",
  "Beef",
  "Bacon",
  "Vegan",
  "Specials",
];

interface CategoryFilterProps {
  selected: CategoryOption;
  onSelect: (category: CategoryOption) => void;
}

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps): JSX.Element {
  return (
    <div className="category-filter" role="tablist" aria-label="Burger categories">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={selected === category}
          className={`category-pill ${selected === category ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
