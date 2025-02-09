import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTickets } from '../api/ticketApi'
import { Ticket } from '../api/ticketApi'

interface TicketsState {
  items: Ticket[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TicketsState = {
  items: [],
  status: 'idle',
  error: null,
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.items = [...state.items, ...action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTickets.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? null
      })
  },
})

export const { addTickets } = ticketsSlice.actions
export default ticketsSlice.reducer
