import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatPrice, formatCategory, getStockStatus } from "../utils/helpers";
import StockStepper from "../components/StockStepper";

function ProductDetailPage({
  products = [],
  onUpdateStock,
  onOpenEditModal,
  onOpenDeleteDialog,
}) {
  const { id } = useParams();

  // Find product by id
  const product = products.find((p) => String(p.id) === String(id));

  // Determine available gallery images belonging strictly to this product
  const galleryImages = product
    ? Array.from(
        new Set(
          (product.images && product.images.length > 0
            ? product.images
            : [product.image]
          ).filter(Boolean)
        )
      )
    : [];

  const [selectedImage, setSelectedImage] = useState(null);
  const [prevId, setPrevId] = useState(id);

  if (prevId !== id) {
    setPrevId(id);
    setSelectedImage(null);
  }

  if (!product) {
    return (
      <div className="product-detail-empty">
        <Link to="/" className="btn-back">
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Back to products</span>
        </Link>
        <div className="detail-not-found-card">
          <h2>Product not found</h2>
          <p>We could not find a product with ID #{id}.</p>
          <Link
            to="/"
            className="btn btn-primary-action"
            style={{ display: "inline-block", width: "auto", marginTop: "14px" }}
          >
            Return to inventory
          </Link>
        </div>
      </div>
    );
  }

  const {
    image,
    name,
    category,
    description,
    specification,
    rating,
    price,
    quantity,
  } = product;

  const activeImage = selectedImage || galleryImages[0] || image || "";
  const stockStatus = getStockStatus(quantity);
  const inventoryValue = price * quantity;

  // Specification parsed into small chips
  const specChips = specification
    ? specification
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="product-detail-page">
      <div className="detail-navigation">
        <Link to="/" className="btn-back">
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Back to products</span>
        </Link>
      </div>

      <div className="detail-card">
        {/* Gallery column (Left) */}
        <div className="detail-gallery">
          <div className="detail-main-image-wrap">
            <img
              className="detail-main-image"
              src={activeImage}
              alt={name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://dummyjson.com/image/400x300?text=No+Image";
              }}
            />
          </div>

          {galleryImages.length > 1 && (
            <div className="detail-thumbnails" aria-label="Product thumbnails">
              {galleryImages.map((imgUrl, index) => (
                <button
                  key={index}
                  type="button"
                  className={`thumbnail-btn ${
                    activeImage === imgUrl ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(imgUrl)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${name} preview ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://dummyjson.com/image/400x300?text=Thumbnail";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & Management panel column (Right) */}
        <div className="detail-info">
          <div className="detail-header-row">
            <span className="detail-category">{formatCategory(category)}</span>

            {/* Read-only neutral rating badge (no orange stars) */}
            {rating != null && (
              <span className="detail-rating-neutral">
                ★ {typeof rating === "number" ? rating.toFixed(1) : rating}
              </span>
            )}
          </div>

          <h2 className="detail-title">{name}</h2>

          <div className="detail-price-box">
            <span className="detail-price">{formatPrice(price)}</span>

            {/* Stock status indicator dot + text + number */}
            <div className="detail-stock-indicator">
              <span className={`status-indicator status-${stockStatus.type}`}>
                <span
                  className={`status-dot ${stockStatus.dotClass}`}
                  aria-hidden="true"
                />
                <span>{stockStatus.text}</span>
              </span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Description</h3>
            <p className="detail-description">
              {description || "No description provided."}
            </p>
          </div>

          {specChips.length > 0 && (
            <div className="detail-section">
              <h3>Specification</h3>
              <div className="spec-chips">
                {specChips.map((chip, idx) => (
                  <span key={idx} className="spec-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Management Panel: Stock stepper, Inventory value, Edit & Delete buttons */}
          <div className="detail-management-panel">
            <div className="detail-management-metrics">
              <div className="detail-stepper-block">
                <span className="detail-panel-label">Stock level</span>
                <StockStepper
                  quantity={quantity}
                  onUpdateStock={(newQty) => onUpdateStock(product.id, newQty)}
                />
              </div>

              <div className="detail-inventory-value-block">
                <span className="detail-panel-label">Inventory value</span>
                <span className="detail-inventory-value">
                  {formatPrice(inventoryValue)}
                </span>
              </div>
            </div>

            <div className="detail-actions-row">
              <button
                type="button"
                className="btn btn-secondary btn-edit-detail"
                onClick={() => onOpenEditModal(product)}
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
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>Edit product</span>
              </button>

              <button
                type="button"
                className="btn btn-danger-outline btn-delete-detail"
                onClick={() => onOpenDeleteDialog(product)}
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
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <span>Delete product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
