// The API prices are in USD. To show pesos instead, change CURRENCY to "PHP"
// and LOCALE to "en-PH" (note: the numbers themselves are not converted).
const LOCALE = "en-US";
const CURRENCY = "USD";

export const formatPrice = (amount) =>
  amount.toLocaleString(LOCALE, { style: "currency", currency: CURRENCY });

// Subtotal for a single product
export const calculateSubtotal = (product) => product.price * product.quantity;

// "mobile-accessories" -> "Mobile Accessories"
export const formatCategory = (slug) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Stock status formatting helper:
// > 20: "In stock · 25" (green dot)
// 1–20: "Low stock · 19" (amber dot)
// 0: "Out of stock" (red dot)
export const getStockStatus = (quantity) => {
  if (quantity === 0) {
    return {
      text: "Out of stock",
      type: "out",
      dotClass: "dot-red",
      isLow: false,
      isOut: true,
    };
  }
  if (quantity <= 20) {
    return {
      text: `Low stock · ${quantity}`,
      type: "low",
      dotClass: "dot-amber",
      isLow: true,
      isOut: false,
    };
  }
  return {
    text: `In stock · ${quantity}`,
    type: "ok",
    dotClass: "dot-green",
    isLow: false,
    isOut: false,
  };
};
