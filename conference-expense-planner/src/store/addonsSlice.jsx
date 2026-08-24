import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wifi: 0,
  projector: 0,
  catering: 0,
  signage: 0,
}

const addonsSlice = createSlice({
  name: 'addons',
  initialState,
  reducers: {
    incrementAddon: (state, action) => {
      state[action.payload] = (state[action.payload] || 0) + 1
    },
    decrementAddon: (state, action) => {
      if ((state[action.payload] || 0) > 0) {
        state[action.payload] -= 1
      }
    },
  },
})

export const { incrementAddon, decrementAddon } = addonsSlice.actions
export default addonsSlice.reducer
