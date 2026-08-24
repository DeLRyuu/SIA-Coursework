import { useDispatch, useSelector } from 'react-redux'
import rooms from '../data/rooms.jsx'
import { incrementRoom, decrementRoom } from '../store/roomsSlice.jsx'
import Counter from '../components/Counter.jsx'
import './Section.css'

function RoomSelection() {
  const dispatch = useDispatch()
  const quantities = useSelector((state) => state.rooms)

  const subtotal = rooms.reduce(
    (sum, room) => sum + room.price * quantities[room.id],
    0,
  )

  return (
    <section id="venue" className="section">
      <h2>Venue Room Selection</h2>

      <div className="card-grid">
        {rooms.map((room) => (
          <div className="product-card" key={room.id}>
            <img src={room.image} alt={room.name} />
            <h3>{room.name} (Capacity:{room.capacity})</h3>
            <p>${room.price}</p>
            <Counter
              quantity={quantities[room.id]}
              onIncrement={() => dispatch(incrementRoom(room.id))}
              onDecrement={() => dispatch(decrementRoom(room.id))}
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

export default RoomSelection