import { useState } from "react";
import StatStrip from "../components/StatStrip";
import InventoryToolbar from "../components/InventoryToolbar";
import ProductTable from "../components/ProductTable";
import ProductList from "../components/ProductList";

function HomePage({
  categories = [],
  products = [],
  onUpdateStock,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteDialog,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLowStockFilterActive, setIsLowStockFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table"); // Table is default

  // Combine category filter, low-stock filter, and live name search
  const filteredProducts = products.filter((p) => {
    // 1. Category check
    if (selectedCategory !== "All" && p.category !== selectedCategory) {
      return false;
    }

    // 2. Low stock check
    if (isLowStockFilterActive && p.quantity > 20) {
      return false;
    }

    // 3. Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatches = p.name.toLowerCase().includes(q);
      if (!nameMatches) return false;
    }

    return true;
  });

  return (
    <div className="home-page">
      {/* Visually-hidden h1 for accessibility */}
      <h1 className="sr-only">Inventory</h1>

      {/* Top Panel: Stat Strip with Add product bottom row */}
      <StatStrip
        products={products}
        isLowStockFilterActive={isLowStockFilterActive}
        onToggleLowStockFilter={() =>
          setIsLowStockFilterActive((prev) => !prev)
        }
        onOpenAddModal={onOpenAddModal}
      />

      {/* Category Bar with Tabs, Search, and Table/Grid switcher */}
      <InventoryToolbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Product Display or Empty Search Result */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state-glass">
          {searchQuery.trim() ? (
            <>
              <h3>No gadgets match “{searchQuery}”</h3>
              <button
                type="button"
                className="btn btn-secondary btn-clear-search"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            </>
          ) : isLowStockFilterActive ? (
            <>
              <h3>No low stock gadgets found</h3>
              <p>All gadgets currently have more than 20 units in stock.</p>
              <button
                type="button"
                className="btn btn-secondary btn-clear-search"
                onClick={() => setIsLowStockFilterActive(false)}
              >
                Clear filter
              </button>
            </>
          ) : (
            <>
              <h3>No products in this category</h3>
              <p>Try selecting another category or add a new product above.</p>
            </>
          )}
        </div>
      ) : viewMode === "table" ? (
        <ProductTable
          products={filteredProducts}
          onUpdateStock={onUpdateStock}
          onEditProduct={onOpenEditModal}
          onDeleteProduct={onOpenDeleteDialog}
        />
      ) : (
        <ProductList
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onUpdateStock={onUpdateStock}
          onEditProduct={onOpenEditModal}
          onDeleteProduct={onOpenDeleteDialog}
        />
      )}
    </div>
  );
}

export default HomePage;
