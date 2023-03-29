import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { ServerError } from '@common/types/Errors'
import { getServerErrorStatus } from '@common/utils/getServerErrorStatus'

import { ERROR_MESSAGE_MOVE_TO_THE_NEXT_STEP } from '@pages/WelcomePage/components/SpotConfiguration/constants/messages'

import {
  SpotWizardContextViewDto,
  useLazyGetSpotConfigWizardContextQuery,
  usePutSpotConfigWizardContextMutation,
  usePostSpotConfigWizardContextMutation,
} from '@rtkApi/modules/__generated__/spot_config'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { SpotConfiguration } from '../../components'
import { SpotConfigurationProvider } from '../SpotConfigurationCtx'

export const SpotConfigurationContainer: React.FC = () => {
  const [wizardContext, setWizardContext] = useState<SpotWizardContextViewDto>()
  const enterpriseId = useSelector(getManagerCurrentProjectId)

  const [apiRequestCreateConfig, { isLoading: isLoadingCreateConfig }] =
    usePostSpotConfigWizardContextMutation()

  const [apiRequestUpdateConfig, { isLoading: isLoadingUpdateConfig }] =
    usePutSpotConfigWizardContextMutation()

  const [apiRequestGetConfig, { isLoading: isLoadingGetConfig }] =
    useLazyGetSpotConfigWizardContextQuery()

  const handleGoNext = useCallback(
    async (arg: SpotWizardContextViewDto) => {
      const { stepName } = arg
      try {
        if (stepName === 'SHIFTS' && !arg.id) {
          const data = await apiRequestCreateConfig({
            spotWizardContextCreateDto: arg,
          }).unwrap()

          setWizardContext(data)
        }
        if (arg.id) {
          const data = await apiRequestUpdateConfig({
            spotWizardContextUpdateDto: arg,
          }).unwrap()
          setWizardContext(data)
        }
      } catch (error) {
        toast.error(ERROR_MESSAGE_MOVE_TO_THE_NEXT_STEP)
      }
    },
    [apiRequestCreateConfig, apiRequestUpdateConfig],
  )

  useEffect(() => {
    let mounted = true

    const fetchContext = async () => {
      try {
        const data = await apiRequestGetConfig({
          enterpriseId: enterpriseId as number,
        }).unwrap()

        if (mounted) {
          if (data && Object.keys(data).length) {
            setWizardContext(data)
          } else {
            setWizardContext({ enterpriseId, stepName: 'WORKING_HOURS' })
          }
        }
      } catch (error) {
        const status = getServerErrorStatus(error as ServerError)
        if (status === 404 && mounted)
          setWizardContext({ stepName: 'WORKING_HOURS', enterpriseId })
      }
    }

    fetchContext()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <SpotConfigurationProvider
      value={{
        wizardContext: wizardContext as SpotWizardContextViewDto,
        onGoNext: handleGoNext,
        isLoading:
          isLoadingCreateConfig || isLoadingUpdateConfig || isLoadingGetConfig,
      }}>
      <SpotConfiguration />
    </SpotConfigurationProvider>
  )
}
