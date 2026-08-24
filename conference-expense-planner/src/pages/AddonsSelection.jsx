import { useDispatch, useSelector } from 'react-redux'
import addons from '../data/addons.jsx'
import { incrementAddon, decrementAddon } from '../store/addonsSlice.jsx'
import Counter from '../components/Counter.jsx'
import './Section.css'

function AddonsSelection() {
  const dispatch = useDispatch()
  const quantities = useSelector((state) => state.addons)

  const selectedCount = Object.values(quantities).reduce((acc, curr) => acc + curr, 0)
  const subtotal = addons.reduce(
    (sum, addon) => sum + addon.price * (quantities[addon.id] || 0),
    0,
  )

  return (
    <section id="addons" className="section">
      <div className="section-title-wrap">
        <h2>Add-ons Selection</h2>
        <span className="section-title-wrap__count">{addons.length} Extras Available</span>
      </div>

      <div className="card-grid">
        {addons.map((addon) => {
          const qty = quantities[addon.id] || 0
          const isSelected = qty > 0

          return (
            <div 
              className={`product-card ${isSelected ? 'product-card--selected' : ''}`} 
              key={addon.id}
            >
              {isSelected && <div className="product-card__badge">SELECTED</div>}
              
              <div className="product-card__image-container">
                <img src={addon.image} alt={addon.name} />
              </div>

              <div className="product-card__content">
                <h3 className="product-card__title">{addon.name}</h3>

                <div className="product-card__price-row">
                  <span className="product-card__price">${addon.price.toLocaleString()}</span>
                  <span className="product-card__unit">per item</span>
                </div>

                <Counter
                  quantity={qty}
                  onIncrement={() => dispatch(incrementAddon(addon.id))}
                  onDecrement={() => dispatch(decrementAddon(addon.id))}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="section__subtotal">
        <span>Add-ons Subtotal ({selectedCount} items selected):</span>
        <span className="section__subtotal-amount">${subtotal.toLocaleString()}</span>
      </div>
    </section>
  )
}

export default AddonsSelection