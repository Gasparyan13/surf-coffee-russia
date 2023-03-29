import { useLayoutEffect } from 'react'
import { toast } from 'react-toastify'

import { logout } from '@helpers'

import { useLazyGetControlPanelEnterprisesByIdQuery } from '@rtkApi/modules/__generated__/control_panel'
import { useLazyGetEnterpriseRolesQuery } from '@rtkApi/modules/__generated__/enterprise_roles'
import { useLazyGetPrincipalQuery } from '@rtkApi/modules/__generated__/principal'

import { setRoles, setUserInfo } from '@store/deprecated/modules/app/actions'
import { RolesConfig } from '@store/deprecated/modules/app/types'
import { useAppDispatch } from '@store/rootConfig'

export const useGetAuthState = () => {
  const dispatch = useAppDispatch()

  const [apiGetPrincipal] = useLazyGetPrincipalQuery()
  const [apiGetEnterpriseRoles] = useLazyGetEnterpriseRolesQuery()
  const [apiGetControlPanelEnterprisesById] =
    useLazyGetControlPanelEnterprisesByIdQuery()

  useLayoutEffect(() => {
    let mounted = true
    const fetchUserInfo = async () => {
      try {
        const data = await apiGetPrincipal().unwrap()

        if (mounted) {
          dispatch(setUserInfo(data))
        }
        return data.id
      } catch (e) {
        toast.error('Ошибка получения данных пользователя')
        logout()
      }
    }

    const fetchRoles = async () => {
      try {
        const employeeId = await fetchUserInfo()

        if (employeeId) {
          const { manager, barista } = await apiGetEnterpriseRoles({
            employeeId,
          }).unwrap()

          const roles: RolesConfig = {
            admin: [],
            manager: [],
            barista: [],
          }

          const managerProjectsPromises = (manager || []).map((id) =>
            apiGetControlPanelEnterprisesById({ id }).unwrap(),
          )
          const baristaProjectsPromises = (barista || []).map((id) =>
            apiGetControlPanelEnterprisesById({ id }).unwrap(),
          )

          const managerProjects = await Promise.all(managerProjectsPromises)
          const baristaProjects = await Promise.all(baristaProjectsPromises)

          if (managerProjects.length) roles.manager = managerProjects
          if (baristaProjects.length) roles.barista = baristaProjects

          if (mounted) {
            dispatch(setRoles(roles))
          }
        }
      } catch (e) {
        toast.error('Ошибка получения ресторанов')
      }
    }

    fetchRoles()

    return () => {
      mounted = false
    }
  }, [])
}
