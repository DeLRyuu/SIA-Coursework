import { formatPrice } from "../utils/helpers";

function StatStrip({
  products = [],
  isLowStockFilterActive,
  onToggleLowStockFilter,
  onOpenAddModal,
}) {
  // Inventory value = sum of price * quantity across all products
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  // Total inventory units in stock
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);

  // Low stock products count (stock <= 20)
  const lowStockCount = products.filter((p) => p.quantity <= 20).length;

  return (
    <section className="stat-panel-top" aria-label="Inventory metrics">
      {/* Top figures row */}
      <div className="stat-strip-row">
        <div className="stat-item">
          <span className="stat-label">Products</span>
          <span className="stat-value">{products.length}</span>
        </div>

        <div className="stat-divider" aria-hidden="true" />

        <div className="stat-item">
          <span className="stat-label">Units</span>
          <span className="stat-value">{totalUnits}</span>
        </div>

        <div className="stat-divider" aria-hidden="true" />

        {/* Low stock metric: clickable to toggle low stock filter */}
        <button
          type="button"
          className={`stat-item stat-item-interactive ${
            isLowStockFilterActive ? "stat-item-active" : ""
          }`}
          onClick={onToggleLowStockFilter}
          title="Click to filter low stock items"
          aria-pressed={isLowStockFilterActive}
        >
          <span className="stat-label">Low stock</span>
          <span
            className={`stat-value ${
              lowStockCount > 0 ? "stat-value-amber" : ""
            }`}
          >
            {lowStockCount}
          </span>
        </button>

        <div className="stat-divider" aria-hidden="true" />

        <div className="stat-item stat-item-highlight">
          <span className="stat-label">Inventory value</span>
          <span className="stat-value stat-value-large">
            {formatPrice(inventoryValue)}
          </span>
        </div>
      </div>

      {/* Thin divider & Bottom action row */}
      <div className="stat-panel-divider" aria-hidden="true" />

      <div className="stat-panel-bottom-row">
        <div className="stat-panel-status">
          {isLowStockFilterActive && (
            <span className="filter-active-pill">
              <span>Filtered by: Low stock (≤ 20 units)</span>
              <button
                type="button"
                className="btn-clear-pill"
                onClick={onToggleLowStockFilter}
                aria-label="Remove low stock filter"
              >
                ×
              </button>
            </span>
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary-action btn-add-panel"
          onClick={onOpenAddModal}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add product</span>
        </button>
      </div>
    </section>
  );
}

export default StatStrip;

