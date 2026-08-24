import { useState } from 'react'
import DetailsModal from './DetailsModal.jsx'
import './Navbar.css'

function Navbar() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <header className="navbar">
        <a href="#venue" className="navbar-brand">Conference Planner</a>
        <nav>
          <a href="#venue">Venues</a>
          <a href="#addons">Add-ons</a>
          <a href="#meals">Catering</a>
          <button type="button" onClick={() => setShowModal(true)}>
            Show Details
          </button>
        </nav>
      </header>

      {showModal && <DetailsModal onClose={() => setShowModal(false)} />}
    </>
  )
}

export default Navbar