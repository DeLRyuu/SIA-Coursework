// Fallback products, used only if the DummyJSON request fails.
const defaultProducts = [
  {
    id: 121,
    image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp",
    images: ["https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp"],
    name: "iPhone 5s",
    category: "smartphones",
    description: "A classic compact smartphone with a reliable user experience.",
    specification: "Apple | Lifetime warranty | Ships in 1 month",
    rating: 2.83,
    price: 199.99,
    quantity: 25,
    inCart: false,
  },
  {
    id: 123,
    image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
    images: ["https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp"],
    name: "iPhone 13 Pro",
    category: "smartphones",
    description: "A powerful camera system, high-performance chip, and stunning display.",
    specification: "Apple | 3 year warranty | Ships in 2 weeks",
    rating: 4.12,
    price: 1099.99,
    quantity: 56,
    inCart: false,
  },
  {
    id: 133,
    image: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp",
    images: ["https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp"],
    name: "Samsung Galaxy S10",
    category: "smartphones",
    description: "A flagship device with a dynamic AMOLED display and versatile cameras.",
    specification: "Samsung | No warranty | Ships in 2 weeks",
    rating: 3.06,
    price: 699.99,
    quantity: 19,
    inCart: false,
  },
];

export default defaultProducts;
