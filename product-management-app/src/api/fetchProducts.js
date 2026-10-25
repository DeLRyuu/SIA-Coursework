// Fetches gadget products from DummyJSON and maps them into our product shape.
const BASE_URL = "https://dummyjson.com/products/category";

// Change this array to change the store's theme.
export const CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
];

const PER_CATEGORY = 6;

// API fields -> our fields (title -> name, thumbnail -> image, stock -> quantity)
const mapProduct = (p) => ({
  id: p.id,
  image: p.thumbnail,
  images: p.images,
  name: p.title,
  category: p.category,
  description: p.description,
  specification: [p.brand, p.warrantyInformation, p.shippingInformation]
    .filter(Boolean)
    .join(" | "),
  rating: p.rating,
  price: p.price,
  quantity: p.stock,
  inCart: false,
});

async function fetchCategory(slug) {
  const res = await fetch(`${BASE_URL}/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to load ${slug} (status ${res.status})`);
  }
  const data = await res.json();
  return data.products.slice(0, PER_CATEGORY).map(mapProduct);
}

// Loads every category in parallel and combines them into one array.
export async function fetchProducts() {
  const results = await Promise.all(CATEGORIES.map(fetchCategory));
  return results.flat();
}
