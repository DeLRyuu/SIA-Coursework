import './Counter.css'

function Counter({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="counter">
      <button type="button" onClick={onDecrement}>−</button>
      <span>{quantity}</span>
      <button type="button" onClick={onIncrement}>+</button>
    </div>
  )
}

export default Counter