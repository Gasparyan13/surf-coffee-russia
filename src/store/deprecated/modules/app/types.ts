import { EnterpriseDto } from '@rtkApi/modules/__generated__/control_panel'
import { PrincipalViewDto } from '@rtkApi/modules/__generated__/principal'

import { ROLES } from '../../../../common/constants'

export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_USER_ROLES = 'SET_USER_ROLES'
export const SET_AUTH_TOKEN_INFO = 'SET_AUTH_TOKEN_INFO'

export type Role = keyof typeof ROLES
export type RolesConfig = Record<Role, EnterpriseDto[]>
export type AuthTokenInfo = {
  exp: number
  iat: number
  sub: string
}

export type AppState = {
  userInfo: PrincipalViewDto | null
  roles: RolesConfig | null
  authTokenInfo: AuthTokenInfo | null
}

export type SetUserInfo = {
  type: typeof SET_USER_INFO
  payload: PrincipalViewDto | null
}

export type SetUserRoles = {
  type: typeof SET_USER_ROLES
  payload: RolesConfig | null
}

export type SetAuthTokenInfo = {
  type: typeof SET_AUTH_TOKEN_INFO
  payload: AuthTokenInfo | null
}

export type ActivitiesActionTypes =
  | SetUserInfo
  | SetUserRoles
  | SetAuthTokenInfo
