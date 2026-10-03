# Tasty Burger

A burger ordering app made with React, TypeScript and Vite.

## Versions

- **V1 (Lab 04):** layout and design only (navbar, hero section, burger cards).
- **V2 (Pre Final Activity):** adds the working features listed below.

## Features (V2)

- Burger menu shown as a grid of cards, each with a rating, description and price
- Filter burgers by category: All, Chicken, Beef, Bacon, Vegan, Specials
- Search burgers by name or description
- Click a burger image to open a product modal with a quantity selector and an Add to Cart button
- Quantity stepper on each card that adds the burger to the cart
- Cart sidebar where you can change quantities, remove items and see the total
- Cart badge in the navbar showing the number of items
- Favorite button (heart) on each burger
- Toast message when a burger is added to the cart
- Promo popup when the logo is clicked

## Tech Used

- React + TypeScript
- Vite
- lucide-react (icons)
- Plain CSS

## Project Structure

```
src/
├── components/   Navbar, MainScreen, BurgerCard, CategoryFilter,
│                 SearchBar, ProductModal, CartSidebar, PromoModal, Toast
├── data/         burgers.ts
├── utils/        currency.ts
├── types.ts
└── App.tsx
```

## How to Run

```bash
npm install
npm run dev
```

## Author

[Whindell B. Doroja] - [BSIT - 3D]