// src/components/DetailsModal.jsx
import { useSelector } from 'react-redux'
import rooms from '../data/rooms.jsx'
import addons from '../data/addons.jsx'
import meals from '../data/meals.jsx'
import './DetailsModal.css'

function DetailsModal({ onClose }) {
  const roomQuantities = useSelector((state) => state.rooms)
  const addonQuantities = useSelector((state) => state.addons)
  const mealsState = useSelector((state) => state.meals)

  // Step 1: keep only rooms the user actually picked (quantity > 0)
  // Step 2: reshape each one into a row for the table
  const roomRows = rooms
    .filter((room) => roomQuantities[room.id] > 0)
    .map((room) => ({
      name: `${room.name} (Capacity:${room.capacity})`,
      unitCost: room.price,
      quantityLabel: roomQuantities[room.id],
      total: room.price * roomQuantities[room.id],
    }))

  // same idea for add-ons
  const addonRows = addons
    .filter((addon) => addonQuantities[addon.id] > 0)
    .map((addon) => ({
      name: addon.name,
      unitCost: addon.price,
      quantityLabel: addonQuantities[addon.id],
      total: addon.price * addonQuantities[addon.id],
    }))

  // meals work a little differently: it's not "quantity per item",
  // it's "checked or not", multiplied by numberOfPeople
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
        <button onClick={onClose}>×</button>
        <h2>${grandTotal.toLocaleString()}</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th><th>Unit Cost</th><th>Quantity</th><th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {allRows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>${row.unitCost}</td>
                <td>{row.quantityLabel}</td>
                <td>${row.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailsModal