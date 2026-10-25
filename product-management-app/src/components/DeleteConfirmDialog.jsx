import { useEffect, useRef } from "react";

function DeleteConfirmDialog({ product, onConfirm, onCancel }) {
  const dialogRef = useRef(null);
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    // Focus Cancel button by default to prevent accidental deletion
    cancelBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  if (!product) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div
        ref={dialogRef}
        className="modal-dialog-thick delete-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="delete-dialog-title">Delete {product.name}?</h3>
        <p className="delete-dialog-text">
          This removes {product.quantity} units from inventory.
        </p>

        <div className="dialog-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger-outline"
            onClick={() => onConfirm(product)}
          >
            Delete product
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmDialog;

