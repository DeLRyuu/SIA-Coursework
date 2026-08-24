// src/store/roomsSlice.jsx
import { createSlice } from '@reduxjs/toolkit'
import rooms from '../data/rooms.jsx'

const initialState = rooms.reduce((acc, room) => {
  acc[room.id] = 0
  return acc
}, {})

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    incrementRoom: (state, action) => { state[action.payload] += 1 },
    decrementRoom: (state, action) => {
      if (state[action.payload] > 0) state[action.payload] -= 1
    },
  },
})

export const { incrementRoom, decrementRoom } = roomsSlice.actions
export default roomsSlice.reducer