import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  numberOfPeople: 1,
  selected: { breakfast: false, highTea: false, lunch: false, dinner: false },
}

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setNumberOfPeople: (state, action) => {
      const value = Number(action.payload)
      state.numberOfPeople = Number.isFinite(value) && value > 0 ? value : 1
    },
    toggleMeal: (state, action) => {
      state.selected[action.payload] = !state.selected[action.payload]
    },
  },
})

export const { setNumberOfPeople, toggleMeal } = mealsSlice.actions
export default mealsSlice.reducer