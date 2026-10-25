import { useState, useRef, useEffect } from "react";
import { formatCategory } from "../utils/helpers";

function ProductFormModal({
  product = null, // null for Add mode, or product object for Edit mode
  categories = [],
  onSubmit,
  onClose,
}) {
  const isEditMode = Boolean(product);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Form fields
  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || "");
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [price, setPrice] = useState(product?.price != null ? String(product.price) : "");
  const [quantity, setQuantity] = useState(product?.quantity != null ? String(product.quantity) : "");
  const [description, setDescription] = useState(product?.description || "");

  // Image handling
  const [imageUrl, setImageUrl] = useState(
    product?.image && !product.image.startsWith("data:") ? product.image : ""
  );
  const [uploadedDataUrl, setUploadedDataUrl] = useState(
    product?.image && product.image.startsWith("data:") ? product.image : ""
  );
  const [uploadFileName, setUploadFileName] = useState(
    product?.image && product.image.startsWith("data:") ? "Current image" : ""
  );

  // Specification chips
  const [specChips, setSpecChips] = useState(() => {
    if (!product?.specification) return [];
    return product.specification
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  });
  const [specInput, setSpecInput] = useState("");

  // Error states
  const [errors, setErrors] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);

  const availableCategories = categories.filter((c) => c !== "All");

  // Determine active preview image
  const previewImage = uploadedDataUrl || imageUrl || "";

  // Focus trapping and Esc handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Image Upload Handlers
  const handleFileProcess = (file) => {
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Use a PNG, JPG or WEBP file",
      }));
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        image: "Image is larger than 2 MB",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedDataUrl(reader.result);
      setUploadFileName(file.name);
      setErrors((prev) => ({ ...prev, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (imageUrl) return; // disabled if URL is filled

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemovePhoto = () => {
    setUploadedDataUrl("");
    setUploadFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Specification chip handlers
  const handleAddChip = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = specInput.trim();
      if (trimmed && !specChips.includes(trimmed)) {
        setSpecChips((prev) => [...prev, trimmed]);
        setSpecInput("");
        if (errors.specification) {
          setErrors((prev) => ({ ...prev, specification: "" }));
        }
      }
    }
  };

  const handleRemoveChip = (chipToRemove) => {
    setSpecChips((prev) => prev.filter((chip) => chip !== chipToRemove));
  };

  const validate = () => {
    const errs = {};

    if (!name.trim()) {
      errs.name = "Product name is required.";
    }

    const finalCategory = isNewCategory ? newCategoryName.trim() : category;
    if (!finalCategory) {
      errs.category = "Category is required.";
    }

    if (!price.trim()) {
      errs.price = "Price is required.";
    } else {
      const p = Number(price);
      if (isNaN(p) || p <= 0) {
        errs.price = "Price must be greater than 0.";
      }
    }

    if (!quantity.trim()) {
      errs.quantity = "Stock quantity is required.";
    } else {
      const q = Number(quantity);
      if (isNaN(q) || q < 0 || !Number.isInteger(q)) {
        errs.quantity = "Quantity must be a whole number 0 or greater.";
      }
    }

    if (!imageUrl.trim() && !uploadedDataUrl) {
      errs.image = "Add an image URL or upload a photo";
    }

    if (!description.trim()) {
      errs.description = "Description is required.";
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const finalImage = uploadedDataUrl || imageUrl.trim();
    const finalCategory = (isNewCategory ? newCategoryName.trim() : category)
      .toLowerCase()
      .replace(/\s+/g, "-");

    const productPayload = {
      id: product?.id || Date.now(),
      name: name.trim(),
      category: finalCategory,
      price: Number(price),
      quantity: Number(quantity),
      image: finalImage,
      images: [finalImage],
      rating: product?.rating || 4.5,
      description: description.trim(),
      specification: specChips.join(" | "),
    };

    onSubmit(productPayload);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        ref={modalRef}
        className="modal-dialog-thick"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="product-modal-title">
            {isEditMode ? "Edit product" : "Add product"}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
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
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Product Name */}
            <div className="form-group form-group-full">
              <label htmlFor="form-name">Product name</label>
              <input
                id="form-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Sony WH-1000XM5"
                className={errors.name ? "input-error" : ""}
                autoFocus
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="form-category">Category</label>
              <select
                id="form-category"
                value={isNewCategory ? "__new__" : category}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "__new__") {
                    setIsNewCategory(true);
                  } else {
                    setIsNewCategory(false);
                    setCategory(val);
                  }
                  if (errors.category) {
                    setErrors((prev) => ({ ...prev, category: "" }));
                  }
                }}
                className={`form-select ${errors.category ? "input-error" : ""}`}
              >
                <option value="">Select category</option>
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {formatCategory(cat)}
                  </option>
                ))}
                <option value="__new__">New category…</option>
              </select>

              {isNewCategory && (
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    if (errors.category) {
                      setErrors((prev) => ({ ...prev, category: "" }));
                    }
                  }}
                  placeholder="New category name"
                  className={`input-custom-category ${
                    errors.category ? "input-error" : ""
                  }`}
                />
              )}
              {errors.category && (
                <span className="field-error">{errors.category}</span>
              )}
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="form-price">Price (USD)</label>
              <input
                id="form-price"
                type="number"
                step="0.01"
                min="0.01"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
                }}
                placeholder="399.99"
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <span className="field-error">{errors.price}</span>}
            </div>

            {/* Stock Quantity */}
            <div className="form-group">
              <label htmlFor="form-quantity">Stock quantity</label>
              <input
                id="form-quantity"
                type="number"
                min="0"
                step="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (errors.quantity) {
                    setErrors((prev) => ({ ...prev, quantity: "" }));
                  }
                }}
                placeholder="15"
                className={errors.quantity ? "input-error" : ""}
              />
              {errors.quantity && (
                <span className="field-error">{errors.quantity}</span>
              )}
            </div>

            {/* Specifications Chip Input */}
            <div className="form-group">
              <label htmlFor="form-spec">Specification</label>
              <input
                id="form-spec"
                type="text"
                value={specInput}
                onChange={(e) => setSpecInput(e.target.value)}
                onKeyDown={handleAddChip}
                placeholder="Type and press Enter (e.g. 1 year warranty)"
              />
              {specChips.length > 0 && (
                <div className="modal-spec-chips">
                  {specChips.map((chip) => (
                    <span key={chip} className="modal-chip">
                      <span>{chip}</span>
                      <button
                        type="button"
                        className="chip-remove-btn"
                        onClick={() => handleRemoveChip(chip)}
                        aria-label={`Remove ${chip}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Image Section */}
            <div className="form-group form-group-full image-section-box">
              <label>Product image</label>
              <div className="image-inputs-wrapper">
                <div className="image-controls-side">
                  {/* Image URL Input */}
                  <div className="image-url-field">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        if (errors.image) {
                          setErrors((prev) => ({ ...prev, image: "" }));
                        }
                      }}
                      placeholder="https://images.example.com/photo.jpg"
                      disabled={Boolean(uploadedDataUrl)}
                      className={errors.image ? "input-error" : ""}
                    />
                    {uploadedDataUrl && (
                      <span className="field-hint">
                        Remove the photo to use a URL
                      </span>
                    )}
                  </div>

                  <div className="image-or-divider">
                    <span>or</span>
                  </div>

                  {/* Upload a photo drop zone */}
                  <div
                    className={`photo-dropzone ${
                      isDragOver ? "drag-over" : ""
                    } ${imageUrl ? "disabled-dropzone" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (!imageUrl) setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => {
                      if (!imageUrl && !uploadedDataUrl) {
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      disabled={Boolean(imageUrl)}
                    />

                    {uploadedDataUrl ? (
                      <div className="file-chosen-info">
                        <span className="chosen-filename">
                          {uploadFileName || "Photo uploaded"}
                        </span>
                        <button
                          type="button"
                          className="btn-remove-photo"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePhoto();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="dropzone-prompt">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>
                          {imageUrl
                            ? "Clear the URL to upload a photo"
                            : "Upload a photo (PNG, JPG, WEBP up to 2 MB)"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 96x96 Live Preview */}
                <div className="image-preview-side">
                  <div className="live-preview-box">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://dummyjson.com/image/96x96?text=Invalid";
                        }}
                      />
                    ) : (
                      <span className="preview-placeholder">96 × 96</span>
                    )}
                  </div>
                </div>
              </div>
              {errors.image && (
                <span className="field-error">{errors.image}</span>
              )}
            </div>

            {/* Description */}
            <div className="form-group form-group-full">
              <label htmlFor="form-desc">Short description</label>
              <textarea
                id="form-desc"
                rows="2"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) {
                    setErrors((prev) => ({ ...prev, description: "" }));
                  }
                }}
                placeholder="High-resolution digital audio display and wireless active noise cancellation."
                className={errors.description ? "input-error" : ""}
              />
              {errors.description && (
                <span className="field-error">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary-action">
              {isEditMode ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
