import { useRef, useEffect } from "react";
import { formatCategory } from "../utils/helpers";

function InventoryToolbar({
  categories = [],
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}) {
  const searchInputRef = useRef(null);

  // Global "/" key shortcut to focus search input
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Don't trigger if user is already typing in an input, textarea, select, or modal
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
      ) {
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div className="inventory-toolbar-glass">
      {/* Category Tabs on the Left */}
      <div className="category-tabs-group" role="tablist" aria-label="Category tabs">
        {categories.map((category) => {
          const isActive = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`category-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => onSelectCategory(category)}
            >
              <span>{category === "All" ? "All gadgets" : formatCategory(category)}</span>
            </button>
          );
        })}
      </div>

      {/* Right Controls: Search bar + Table/Grid View Switcher */}
      <div className="toolbar-right-controls">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <svg
            className="search-magnifier-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name"
            aria-label="Search by name. Press forward slash to focus"
          />

          {searchQuery ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange("")}
              aria-label="Clear search query"
            >
              ×
            </button>
          ) : (
            <kbd className="search-kbd-hint" aria-hidden="true">
              /
            </kbd>
          )}
        </div>

        {/* Table / Grid Toggle */}
        <div className="view-toggle-group" role="group" aria-label="View mode">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "table" ? "active" : ""}`}
            onClick={() => onViewModeChange("table")}
            aria-label="Table view"
            title="Table view"
            aria-pressed={viewMode === "table"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="3" y1="15" x2="21" y2="15"></line>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>

          <button
            type="button"
            className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
            title="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryToolbar;

