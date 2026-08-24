import { useDispatch, useSelector } from 'react-redux'
import meals from '../data/meals.jsx'
import { setNumberOfPeople, toggleMeal } from '../store/mealsSlice.jsx'
import './Section.css'

function MealsSelection() {
  const dispatch = useDispatch()
  const { numberOfPeople, selected } = useSelector((state) => state.meals)

  const selectedCount = Object.values(selected).filter(Boolean).length
  const subtotal = meals.reduce(
    (sum, meal) => sum + (selected[meal.id] ? meal.price * numberOfPeople : 0),
    0,
  )

  return (
    <section id="meals" className="section">
      <div className="section-title-wrap">
        <h2>Meals & Catering Selection</h2>
        <span className="section-title-wrap__count">{meals.length} Options Available</span>
      </div>

      <div className="meals__people">
        <label htmlFor="numberOfPeople">Total Attendees:</label>
        <input
          id="numberOfPeople"
          type="number"
          min="1"
          value={numberOfPeople}
          onChange={(e) => dispatch(setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1)))}
        />
      </div>

      <div className="meals__grid">
        {meals.map((meal) => {
          const isSelected = selected[meal.id]
          return (
            <label 
              className={`meals__option ${isSelected ? 'meals__option--active' : ''}`} 
              key={meal.id}
            >
              <div className="meals__checkbox-wrap">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => dispatch(toggleMeal(meal.id))}
                />
                <span className="meals__name">{meal.name}</span>
              </div>
              <span className="meals__price">${meal.price} / person</span>
            </label>
          )
        })}
      </div>

      <div className="section__subtotal">
        <span>Meals Subtotal ({selectedCount} options for {numberOfPeople} attendees):</span>
        <span className="section__subtotal-amount">${subtotal.toLocaleString()}</span>
      </div>
    </section>
  )
}

export default MealsSelection