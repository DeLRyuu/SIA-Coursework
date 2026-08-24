import { useDispatch, useSelector } from 'react-redux'
import meals from '../data/meals.jsx'
import { setNumberOfPeople, toggleMeal } from '../store/mealsSlice.jsx'
import './Section.css'

function MealsSelection() {
  const dispatch = useDispatch()
  const { numberOfPeople, selected } = useSelector((state) => state.meals)

  const subtotal = meals.reduce(
    (sum, meal) => sum + (selected[meal.id] ? meal.price * numberOfPeople : 0),
    0,
  )

  return (
    <section id="meals" className="section">
      <h2>Meals Selection</h2>

      <div className="meals__people">
        <label htmlFor="numberOfPeople">Number of People:</label>
        <input
          id="numberOfPeople"
          type="number"
          min="1"
          value={numberOfPeople}
          onChange={(e) => dispatch(setNumberOfPeople(e.target.value))}
        />
      </div>

      <div className="meals__grid">
        {meals.map((meal) => (
          <label className="meals__option" key={meal.id}>
            <input
              type="checkbox"
              checked={selected[meal.id]}
              onChange={() => dispatch(toggleMeal(meal.id))}
            />
            <span>{meal.name}</span>
            <span>${meal.price}</span>
          </label>
        ))}
      </div>

      <div className="section__subtotal">
        Total Cost: ${subtotal.toLocaleString()}
      </div>
    </section>
  )
}

export default MealsSelection