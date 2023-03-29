import { PrincipalViewDto } from '@rtkApi/modules/__generated__/principal'

import {
  ActivitiesActionTypes,
  AuthTokenInfo,
  RolesConfig,
  SET_AUTH_TOKEN_INFO,
  SET_USER_INFO,
  SET_USER_ROLES,
} from './types'

export const setUserInfo = (
  userInfo: PrincipalViewDto | null,
): ActivitiesActionTypes => ({
  type: SET_USER_INFO,
  payload: userInfo,
})

export const setRoles = (roles: RolesConfig | null): ActivitiesActionTypes => ({
  type: SET_USER_ROLES,
  payload: roles,
})

export const setAuthTokenInfo = (
  info: AuthTokenInfo | null,
): ActivitiesActionTypes => ({
  type: SET_AUTH_TOKEN_INFO,
  payload: info,
})
