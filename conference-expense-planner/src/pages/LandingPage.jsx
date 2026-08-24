import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

const BG_IMAGE_URL = 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80'

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayedText, setDisplayedText] = useState('')

  const fullText = `Welcome to BudgetEase Solutions, your trusted partner in simplifying budget management and financial solutions. At BudgetEase, we understand the importance of effective budget planning and strive to provide intuitive, user-friendly solutions to meet the diverse needs of our clients. With a commitment to efficiency and innovation, we empower individuals and businesses to take control of their finances and achieve their goals with ease. At BudgetEase Solutions, our mission is to make budgeting effortless and accessible for everyone.`

  // Preloader Timer (2.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (isLoading) return

    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 12)

    return () => clearInterval(timer)
  }, [isLoading])

  return (
    <>
      {isLoading && (
        <div className="preloader-screen">
          <div className="custom-loader">
            <div className="loader-ring"></div>
            <div className="loader-ring"></div>
            <div className="loader-core">
              <span className="loader-icon">⏳</span>
            </div>
          </div>
          <p className="preloader-text">Preparing BudgetEase Workspace...</p>
        </div>
      )}

      {/* Conference Hall Unsplash Image Background */}
      <div 
        className={`landing ${!isLoading ? 'landing--loaded' : ''}`}
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      >
        <div className="landing__overlay" />
        <div className="landing__content">
          
          <div className="landing__intro">
            <span className="landing__badge">Corporate Event Solutions</span>
            <h1 className="landing__title display">
              Conference<br />Expense Planner
            </h1>
            <p className="landing__tagline">Plan your next major event with us.</p>
            
            <Link to="/plan" className="landing__cta">
              <span>Get Started</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>

            <div className="landing__features">
              <span>✓ Instant Estimation</span>
              <span>✓ Flexible Venues</span>
              <span>✓ 24/7 Support</span>
            </div>
          </div>

          <div className="landing__about">
            <h2 className="landing__about-heading">About BudgetEase</h2>
            <div className="landing__text-wrapper">
              <p className="landing__typewriter-text">
                {displayedText}
                <span className="typewriter-cursor">|</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default LandingPage