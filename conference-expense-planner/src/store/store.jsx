import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './roomsSlice'
import addonsReducer from './addonsSlice'
import mealsReducer from './mealsSlice'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    addons: addonsReducer,
    meals: mealsReducer,
  },
})