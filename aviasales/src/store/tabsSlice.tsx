import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 'cheapest'

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab(_state, action: PayloadAction<string>) {
      return action.payload
    },
  },
})

export const { setActiveTab } = tabsSlice.actions
export default tabsSlice.reducer
