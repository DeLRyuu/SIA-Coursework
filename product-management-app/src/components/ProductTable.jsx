import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, formatCategory, getStockStatus } from "../utils/helpers";
import StockStepper from "./StockStepper";
import ProductActionMenu from "./ProductActionMenu";

function ProductTable({ products, onUpdateStock, onEditProduct, onDeleteProduct }) {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "inventoryValue") {
      aVal = a.price * a.quantity;
      bVal = b.price * b.quantity;
    }

    if (typeof aVal === "string") {
      const cmp = aVal.localeCompare(String(bVal));
      return sortDirection === "asc" ? cmp : -cmp;
    }

    const diff = Number(aVal) - Number(bVal);
    return sortDirection === "asc" ? diff : -diff;
  });

  const getSortIndicator = (field) => {
    if (sortField !== field) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="product-table-wrapper" role="region" aria-label="Inventory table">
      <table className="product-table">
        <thead>
          <tr>
            <th scope="col" className="th-image">Photo</th>
            <th
              scope="col"
              className="th-sortable"
              onClick={() => handleSort("name")}
              aria-sort={
                sortField === "name"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button type="button" className="th-btn">
                <span>Product name</span>
                <span className="sort-arrow">{getSortIndicator("name")}</span>
              </button>
            </th>
            <th scope="col">Category</th>
            <th
              scope="col"
              className="th-sortable"
              onClick={() => handleSort("price")}
              aria-sort={
                sortField === "price"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button type="button" className="th-btn">
                <span>Price</span>
                <span className="sort-arrow">{getSortIndicator("price")}</span>
              </button>
            </th>
            <th
              scope="col"
              className="th-sortable"
              onClick={() => handleSort("quantity")}
              aria-sort={
                sortField === "quantity"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button type="button" className="th-btn">
                <span>Stock status</span>
                <span className="sort-arrow">{getSortIndicator("quantity")}</span>
              </button>
            </th>
            <th
              scope="col"
              className="th-sortable"
              onClick={() => handleSort("inventoryValue")}
              aria-sort={
                sortField === "inventoryValue"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button type="button" className="th-btn">
                <span>Inventory value</span>
                <span className="sort-arrow">
                  {getSortIndicator("inventoryValue")}
                </span>
              </button>
            </th>
            <th scope="col" className="th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => {
            const stockStatus = getStockStatus(product.quantity);
            const itemValue = product.price * product.quantity;

            return (
              <tr key={product.id} className="table-row">
                <td className="td-image">
                  <Link
                    to={`/product/${product.id}`}
                    className="table-image-link"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="table-thumb"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://dummyjson.com/image/40x40?text=?";
                      }}
                    />
                  </Link>
                </td>

                <td className="td-name">
                  <Link
                    to={`/product/${product.id}`}
                    className="table-name-link"
                  >
                    {product.name}
                  </Link>
                </td>

                <td className="td-category">
                  {formatCategory(product.category)}
                </td>

                <td className="td-price">
                  {formatPrice(product.price)}
                </td>

                <td className="td-stock">
                  <span className={`status-indicator status-${stockStatus.type}`}>
                    <span
                      className={`status-dot ${stockStatus.dotClass}`}
                      aria-hidden="true"
                    />
                    <span>{stockStatus.text}</span>
                  </span>
                </td>

                <td className="td-value">
                  {formatPrice(itemValue)}
                </td>

                <td className="td-actions">
                  <div className="table-actions-cell">
                    <StockStepper
                      quantity={product.quantity}
                      onUpdateStock={(newQty) =>
                        onUpdateStock(product.id, newQty)
                      }
                    />
                    <ProductActionMenu
                      onEdit={() => onEditProduct(product)}
                      onDelete={() => onDeleteProduct(product)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;

