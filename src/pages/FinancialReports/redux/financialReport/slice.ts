import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SliceState } from './types'

const initialState: SliceState = {
  lastReportReqArgs: null,
  search: {
    pnl: '',
    cashFlow: '',
  },
}

const financialReportSlice = createSlice({
  name: 'financialReport',
  initialState,
  reducers: {
    setFinancialReportReqArgs: (
      state,
      action: PayloadAction<SliceState['lastReportReqArgs']>,
    ) => {
      state.lastReportReqArgs = action.payload
    },
    setSearch: (
      state,
      action: PayloadAction<Partial<SliceState['search']>>,
    ) => {
      state.search = {
        ...state.search,
        ...action.payload,
      }
    },
  },
})

export const financialReportReducer = financialReportSlice.reducer
export const { setFinancialReportReqArgs, setSearch } =
  financialReportSlice.actions
