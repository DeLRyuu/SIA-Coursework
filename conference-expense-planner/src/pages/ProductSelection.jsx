import Navbar from '../components/Navbar.jsx'
import RoomSelection from './RoomSelection.jsx'
import AddonsSelection from './AddonsSelection.jsx'
import MealsSelection from './MealsSelection.jsx'

function ProductSelection() {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <RoomSelection />
      <AddonsSelection />
      <MealsSelection />
    </div>
  )
}

export default ProductSelection