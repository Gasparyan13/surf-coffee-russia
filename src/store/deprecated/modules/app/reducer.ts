import { Reducer } from '@reduxjs/toolkit'

import {
  ActivitiesActionTypes,
  AppState,
  SET_AUTH_TOKEN_INFO,
  SET_USER_INFO,
  SET_USER_ROLES,
} from './types'

const initialState: AppState = {
  userInfo: null,
  roles: null,
  authTokenInfo: null,
}

export const app: Reducer<AppState, ActivitiesActionTypes> = (
  state = initialState,
  action,
): AppState => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      }

    case SET_USER_ROLES:
      return {
        ...state,
        roles: action.payload,
      }

    case SET_AUTH_TOKEN_INFO:
      return {
        ...state,
        authTokenInfo: action.payload,
      }

    default:
      return state
  }
}
