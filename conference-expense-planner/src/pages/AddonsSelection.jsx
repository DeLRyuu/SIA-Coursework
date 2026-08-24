import { useDispatch, useSelector } from 'react-redux'
import addons from '../data/addons.jsx'
import { incrementAddon, decrementAddon } from '../store/addonsSlice.jsx'
import Counter from '../components/Counter.jsx'
import './Section.css'

function AddonsSelection() {
  const dispatch = useDispatch()
  const quantities = useSelector((state) => state.addons)

  const subtotal = addons.reduce(
    (sum, addon) => sum + addon.price * quantities[addon.id],
    0,
  )

  return (
    <section id="addons" className="section">
      <h2>Add-ons Selection</h2>

      <div className="card-grid">
        {addons.map((addon) => (
          <div className="product-card" key={addon.id}>
            <img src={addon.image} alt={addon.name} />
            <h3>{addon.name}</h3>
            <p>${addon.price}</p>
            <Counter
              quantity={quantities[addon.id]}
              onIncrement={() => dispatch(incrementAddon(addon.id))}
              onDecrement={() => dispatch(decrementAddon(addon.id))}
            />
          </div>
        ))}
      </div>

      <div className="section__subtotal">
        Total Cost: ${subtotal.toLocaleString()}
      </div>
    </section>
  )
}

export default AddonsSelection