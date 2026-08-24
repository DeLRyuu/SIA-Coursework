import { Link } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing">
      <div className="landing__overlay" />
      <div className="landing__content container">
        <div className="landing__intro">
          <p className="landing__eyebrow">Summit & Co. Venues</p>
          <h1 className="landing__title display">Conference<br />Expense Planner</h1>
          <p className="landing__tagline">Plan your next major event with us.</p>
          <Link to="/plan" className="landing__cta">Get Started</Link>
        </div>
        <div className="landing__about">
          <p>Welcome to Summit & Co., your trusted partner in simplifying
             event budgeting...</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage