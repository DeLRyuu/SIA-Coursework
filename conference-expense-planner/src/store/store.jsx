import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './roomsSlice.jsx'
import addonsReducer from './addonsSlice.jsx'
import mealsReducer from './mealsSlice.jsx'

export const store = configureStore({
  reducer: { rooms: roomsReducer, addons: addonsReducer, meals: mealsReducer },
})