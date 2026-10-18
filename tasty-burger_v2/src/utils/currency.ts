/**
 * Prices in the burger data are stored as display strings (e.g. "৳99.15").
 * These helpers convert between that display format and numeric totals.
 */

export function parsePrice(price: string): number {
  const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

export function formatCurrency(amount: number): string {
  return `৳${amount.toFixed(2)}`;
}
