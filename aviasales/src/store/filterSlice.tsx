import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  all: boolean
  noStops: boolean
  oneStop: boolean
  twoStops: boolean
  threeStops: boolean
}

const initialState: FilterState = {
  all: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter(state, action: PayloadAction<{ option: keyof FilterState }>) {
      const { option } = action.payload

      if (option === 'all') {
        state.all = !state.all
        state.noStops = state.all
        state.oneStop = state.all
        state.twoStops = state.all
        state.threeStops = state.all
      } else {
        state[option] = !state[option]
        state.all = false

        const filters = ['noStops', 'oneStop', 'twoStops', 'threeStops'] as const
        const allSelected = filters.every((filter) => state[filter])

        if (allSelected) {
          state.all = true
        }
      }
    },
  },
})

export const { toggleFilter } = filterSlice.actions
export default filterSlice.reducer
