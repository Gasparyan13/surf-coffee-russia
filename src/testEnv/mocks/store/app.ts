import { EnterpriseDto } from '@rtkApi/modules/__generated__/control_panel'

import { AppState } from '@store/deprecated/modules/app/types'

export const enterpriseId = 1

export const enterpriseName = 'SURF IS Test'

export const managerEnterpriseConfig: EnterpriseDto = {
  id: enterpriseId,
  name: enterpriseName,
  address: 'address',
  city: {
    id: 0,
    name: 'city',
    region: {
      id: 0,
      name: 'region',
    },
  },
  enterpriseCategory: {
    id: 3,
    name: 'C',
  },
  enterpriseModel: {
    id: 1,
    name: 'enterpriseModel',
  },
  legalEntity: {
    id: 38,
    name: 'legalEntity',
  },
}

export const defaultUserInfo: AppState['userInfo'] = {
  id: 205,
  email: 'testemail@surfis.org',
  name: 'FirstName',
  surname: 'LastName',
  mid_name: undefined,
  phone_number: '72132132132',
}

export const defaultRoles: AppState['roles'] = {
  manager: [managerEnterpriseConfig],
  barista: [],
  admin: [],
}

export const appConfig = ({
  userInfo = defaultUserInfo,
  roles = defaultRoles,
  authTokenInfo = null,
}: Partial<AppState>): AppState => ({ userInfo, roles, authTokenInfo })
