// src/components/Navbar.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import DetailsModal from './DetailsModal.jsx'
import './Navbar.css'

function Navbar() {
  const [showDetails, setShowDetails] = useState(false)
  // showDetails starts as false (modal closed)

  return (
    <>
      <header className="navbar">
        <Link to="/">Conference Expense Planner</Link>

        <nav>
          <a href="#venue">Venue</a>
          <a href="#addons">Add-ons</a>
          <a href="#meals">Meals</a>
        </nav>

        <button type="button" onClick={() => setShowDetails(true)}>
          Show Details
        </button>
      </header>

      {/* only render the modal when showDetails is true */}
      {showDetails && <DetailsModal onClose={() => setShowDetails(false)} />}
    </>
  )
}

export default Navbar