import { useNavigate } from "react-router-dom";
import { formatPrice, formatCategory, getStockStatus } from "../utils/helpers";
import StockStepper from "./StockStepper";
import ProductActionMenu from "./ProductActionMenu";

function ProductCard({
  product,
  selectedCategory,
  onUpdateStock,
  onEditProduct,
  onDeleteProduct,
}) {
  const navigate = useNavigate();
  const { id, image, name, category, price, quantity } = product;

  const stockStatus = getStockStatus(quantity);
  const stockValue = price * quantity;

  const handleCardBodyClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={`product-card ${
        stockStatus.isOut
          ? "card-out-of-stock"
          : stockStatus.isLow
          ? "card-low-stock"
          : ""
      }`}
    >
      {/* Clickable Card Body (not footer) navigates to detail page */}
      <div
        className="product-card-body-clickable"
        onClick={handleCardBodyClick}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCardBodyClick();
          }
        }}
        aria-label={`View details for ${name}`}
      >
        <div className="product-image-wrap">
          <img
            className="product-image"
            src={image}
            alt=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://dummyjson.com/image/400x300?text=No+Image";
            }}
          />
        </div>

        <div className="product-body">
          <h3 className="product-name">{name}</h3>

          {/* Category line shown ONLY when "All" / "All gadgets" is selected */}
          {selectedCategory === "All" && (
            <span className="product-category-text">
              {formatCategory(category)}
            </span>
          )}

          {/* Stock status shown ONCE as status dot + text + number */}
          <div className="card-stock-status-line">
            <span className={`status-indicator status-${stockStatus.type}`}>
              <span
                className={`status-dot ${stockStatus.dotClass}`}
                aria-hidden="true"
              />
              <span>{stockStatus.text}</span>
            </span>
          </div>

          {/* Price: medium weight, smaller visual weight than name */}
          <div className="card-pricing-block">
            <span className="product-price">{formatPrice(price)}</span>
            <span className="product-stock-value-text">
              Stock value: {formatPrice(stockValue)}
            </span>
          </div>
        </div>
      </div>

      {/* Product Card Footer (Stock stepper + ⋯ menu) pushed to bottom */}
      <div className="product-card-footer">
        <StockStepper
          quantity={quantity}
          onUpdateStock={(newQty) => onUpdateStock(id, newQty)}
        />
        <ProductActionMenu
          onEdit={() => onEditProduct(product)}
          onDelete={() => onDeleteProduct(product)}
        />
      </div>
    </div>
  );
}

export default ProductCard;
