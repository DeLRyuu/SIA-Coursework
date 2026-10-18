export type BurgerCategory =
  | "Chicken"
  | "Beef"
  | "Bacon"
  | "Vegan"
  | "Specials";

export interface Burger {
  id: string;
  name: string;
  desc: string;
  price: string;
  rating: number;
  img: string;
  category: BurgerCategory;
}

export interface CartItem {
  burger: Burger;
  quantity: number;
}

export interface CartItem {
  burger: Burger;
  quantity: number;
}
