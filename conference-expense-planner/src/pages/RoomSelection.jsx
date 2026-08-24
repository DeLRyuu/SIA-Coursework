import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import rooms from '../data/rooms.jsx'
import addons from '../data/addons.jsx'
import meals from '../data/meals.jsx'
import { incrementRoom, decrementRoom } from '../store/roomsSlice.jsx'
import Counter from '../components/Counter.jsx'
import DetailsModal from '../components/DetailsModal.jsx'
import './Section.css'

function RoomSelection() {
  const dispatch = useDispatch()
  const roomQuantities = useSelector((state) => state.rooms)
  const addonQuantities = useSelector((state) => state.addons)
  const mealsState = useSelector((state) => state.meals)
  
  const [showModal, setShowModal] = useState(false)

  // Subtotal Calculations
  const roomSubtotal = rooms.reduce((sum, r) => sum + r.price * (roomQuantities[r.id] || 0), 0)
  const addonSubtotal = addons.reduce((sum, a) => sum + a.price * (addonQuantities[a.id] || 0), 0)
  const mealSubtotal = meals.reduce(
    (sum, m) => sum + (mealsState.selected[m.id] ? m.price * mealsState.numberOfPeople : 0),
    0
  )
  const grandTotal = roomSubtotal + addonSubtotal + mealSubtotal
  const selectedRoomsCount = Object.values(roomQuantities).reduce((acc, curr) => acc + curr, 0)

  return (
    <>
      <div id="venue">
        <header className="dashboard-header">
          <div className="dashboard-header__intro">
            <span className="dashboard-header__eyebrow">VENUE PLANNING</span>
            <h1 className="dashboard-header__title">Choose your space</h1>
            <p className="dashboard-header__subtitle">
              Select venue options, hardware extras, and catering choices for your event.
            </p>
          </div>

          <div className="dashboard-header__estimate-card">
            <span className="estimate-card__label">Estimated Budget</span>
            <span className="estimate-card__value">${grandTotal.toLocaleString()}</span>
          </div>
        </header>

        <section className="section">
          <div className="section-title-wrap">
            <h2>Available Venues</h2>
            <span className="section-title-wrap__count">{rooms.length} Spaces Available</span>
          </div>

          <div className="card-grid">
            {rooms.map((room) => {
              const qty = roomQuantities[room.id] || 0
              const isSelected = qty > 0

              return (
                <div 
                  className={`product-card ${isSelected ? 'product-card--selected' : ''}`} 
                  key={room.id}
                >
                  {isSelected && <div className="product-card__badge">SELECTED</div>}
                  
                  <div className="product-card__image-container">
                    <img src={room.image} alt={room.name} />
                  </div>

                  <div className="product-card__content">
                    <h3 className="product-card__title">{room.name}</h3>
                    <div className="product-card__capacity">
                      <span>Capacity: {room.capacity} attendees</span>
                    </div>

                    <div className="product-card__price-row">
                      <span className="product-card__price">${room.price.toLocaleString()}</span>
                      <span className="product-card__unit">per room</span>
                    </div>

                    <Counter
                      quantity={qty}
                      onIncrement={() => dispatch(incrementRoom(room.id))}
                      onDecrement={() => dispatch(decrementRoom(room.id))}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="section__subtotal">
            <span>Venue Subtotal ({selectedRoomsCount} {selectedRoomsCount === 1 ? 'room' : 'rooms'}):</span>
            <span className="section__subtotal-amount">${roomSubtotal.toLocaleString()}</span>
          </div>
        </section>

        {/* Sticky Running Summary Bar */}
        <div className="sticky-subtotal-bar">
          <div className="sticky-subtotal-bar__inner">
            <div className="sticky-subtotal-bar__info">
              <span className="sticky-subtotal-bar__label">TOTAL ESTIMATE</span>
              <span className="sticky-subtotal-bar__meta">
                {selectedRoomsCount} {selectedRoomsCount === 1 ? 'room' : 'rooms'} selected
              </span>
            </div>

            <div className="sticky-subtotal-bar__action">
              <span className="sticky-subtotal-bar__amount">${grandTotal.toLocaleString()}</span>
              <button 
                type="button" 
                className="sticky-subtotal-bar__btn" 
                onClick={() => setShowModal(true)}
              >
                View Summary →
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <DetailsModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default RoomSelection