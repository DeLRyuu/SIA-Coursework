import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import ProductSelection from './pages/ProductSelection.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plan" element={<ProductSelection />} />
    </Routes>
  )
}

export default App