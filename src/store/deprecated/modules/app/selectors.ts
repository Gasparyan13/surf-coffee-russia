import { createSelector } from 'reselect'

import { PrincipalViewDto } from '@rtkApi/modules/__generated__/principal'

import { ROLES } from '../../../../common/constants'
import { RootState } from '../../../rootConfig'
import { AuthTokenInfo, Role, RolesConfig } from './types'

export const getUserInfo = (state: RootState): PrincipalViewDto | null =>
  state.app.userInfo

export const getAuthTokenInfo = (state: RootState): AuthTokenInfo | null =>
  state.app.authTokenInfo

export const getUserId = createSelector(
  [getUserInfo],
  (userInfo) => userInfo?.id,
)
export const getAppRoles = (state: RootState): RolesConfig | null =>
  state.app.roles

export const getIsManager = createSelector(
  [getAppRoles],
  (appRoles) =>
    appRoles && Object.keys(appRoles)?.some((role) => role === ROLES.manager),
)
export const getIsBarista = createSelector(
  [getAppRoles],
  (appRoles) =>
    appRoles && Object.keys(appRoles)?.some((role) => role === ROLES.barista),
)
export const getUserScopes = createSelector(
  [getAppRoles],
  (appRoles) => appRoles && (Object.keys(appRoles) as Role[]),
)

export const getManagerProjects = createSelector(
  [getAppRoles],
  (appRoles) => appRoles?.manager,
)
export const getBaristaProjects = createSelector(
  [getAppRoles],
  (appRoles) => appRoles?.barista,
)

export const getManagerCurrentProject = createSelector(
  [getManagerProjects],
  (managerProjects) => managerProjects?.[0],
)
export const getManagerCurrentProjectId = createSelector(
  [getManagerCurrentProject],
  (project) => project?.id,
)
export const getManagerCurrentProjectName = createSelector(
  [getManagerCurrentProject],
  (project) => project?.name,
)

export const getRolesProjects = createSelector(
  [getManagerProjects, getBaristaProjects],
  (managerProjects, baristaProjects) => [
    ...(managerProjects || []),
    ...(baristaProjects || []),
  ],
)
export const getUserName = createSelector(
  [getUserInfo],
  (userInfo) => userInfo?.name,
)
export const getUserFullName = createSelector([getUserInfo], (userInfo) =>
  userInfo
    ? `${userInfo?.surname} ${userInfo?.name} ${userInfo?.mid_name}`
    : ``,
)
