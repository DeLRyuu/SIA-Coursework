import { useState } from "react";

function StockStepper({ quantity, onUpdateStock, disabled = false }) {
  const [val, setVal] = useState(quantity);
  const [prevQuantity, setPrevQuantity] = useState(quantity);
  const [isEditing, setIsEditing] = useState(false);

  // Synchronize state when prop quantity changes without calling setState in an effect
  if (prevQuantity !== quantity) {
    setPrevQuantity(quantity);
    setVal(quantity);
  }

  const handleDecrease = (e) => {
    e.stopPropagation();
    const next = Math.max(0, val - 1);
    setVal(next);
    onUpdateStock(next);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    const next = val + 1;
    setVal(next);
    onUpdateStock(next);
  };

  const handleCommit = () => {
    setIsEditing(false);
    const parsed = parseInt(String(val), 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateStock(parsed);
    } else {
      setVal(quantity); // revert
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    } else if (e.key === "Escape") {
      setVal(quantity);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="stock-stepper-control"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="btn-stepper-step"
        onClick={handleDecrease}
        disabled={disabled || val <= 0}
        aria-label="Decrease stock by 1"
      >
        −
      </button>

      {isEditing ? (
        <input
          type="number"
          min="0"
          className="stepper-type-input"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={handleKeyDown}
          autoFocus
          aria-label="Stock quantity input"
        />
      ) : (
        <button
          type="button"
          className="stepper-display-btn"
          onClick={() => setIsEditing(true)}
          title="Click to type stock value"
          aria-label={`Stock: ${val}. Click to edit value.`}
        >
          {val}
        </button>
      )}

      <button
        type="button"
        className="btn-stepper-step"
        onClick={handleIncrease}
        disabled={disabled}
        aria-label="Increase stock by 1"
      >
        +
      </button>
    </div>
  );
}

export default StockStepper;

