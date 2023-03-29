import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { createOperationReducer } from '@pages/CreateOperations/redux/createOperation/slice'
import { financialReportReducer } from '@pages/FinancialReports/redux/financialReport/slice'

import { emptySplitApi } from '@rtkApi/core/emptyApi'

import { rootReducer } from './deprecated/reducers/rootReducer'

const combinedReducer = combineReducers({
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  createOperation: createOperationReducer,
  financialReport: financialReportReducer,
  ...rootReducer,
})

const reducer: typeof combinedReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return combinedReducer(state, action)
}

export type RootState = ReturnType<typeof reducer>

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(emptySplitApi.middleware),
  })

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
