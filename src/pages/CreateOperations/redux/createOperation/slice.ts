import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SliceState } from './types'

const initialState: SliceState = {
  operationDrawer: null,
}

const createOperationSlice = createSlice({
  name: 'createOperation',
  initialState,
  reducers: {
    setOperationDrawerState: (
      state,
      action: PayloadAction<SliceState['operationDrawer']>,
    ) => {
      state.operationDrawer = action.payload
    },
  },
})

export const createOperationReducer = createOperationSlice.reducer
export const { setOperationDrawerState } = createOperationSlice.actions
