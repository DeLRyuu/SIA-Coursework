import { useSelector } from 'react-redux'
import rooms from '../data/rooms.jsx'
import addons from '../data/addons.jsx'
import meals from '../data/meals.jsx'
import './DetailsModal.css'

function DetailsModal({ onClose }) {
  const roomQuantities = useSelector((state) => state.rooms)
  const addonQuantities = useSelector((state) => state.addons)
  const mealsState = useSelector((state) => state.meals)

  const roomRows = rooms
    .filter((room) => roomQuantities[room.id] > 0)
    .map((room) => ({
      name: `${room.name} (Capacity:${room.capacity})`,
      unitCost: room.price,
      quantityLabel: roomQuantities[room.id],
      total: room.price * roomQuantities[room.id],
    }))

  const addonRows = addons
    .filter((addon) => addonQuantities[addon.id] > 0)
    .map((addon) => ({
      name: addon.name,
      unitCost: addon.price,
      quantityLabel: addonQuantities[addon.id],
      total: addon.price * addonQuantities[addon.id],
    }))

  const mealRows = meals
    .filter((meal) => mealsState.selected[meal.id])
    .map((meal) => ({
      name: meal.name,
      unitCost: meal.price,
      quantityLabel: `For ${mealsState.numberOfPeople} people`,
      total: meal.price * mealsState.numberOfPeople,
    }))

  const allRows = [...roomRows, ...addonRows, ...mealRows]
  const grandTotal = allRows.reduce((sum, row) => sum + row.total, 0)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-header__title">TOTAL COST FOR THE EVENT</span>
            <div className="modal-header__total">${grandTotal.toLocaleString()}</div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        {allRows.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem 0' }}>
            No items selected yet.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>${row.unitCost.toLocaleString()}</td>
                  <td>{row.quantityLabel}</td>
                  <td>${row.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default DetailsModal