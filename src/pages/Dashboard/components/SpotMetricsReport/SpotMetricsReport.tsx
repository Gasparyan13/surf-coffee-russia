import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { ServerError } from '@common/types/Errors'

import { ERROR_MESSAGE_500, ERROR_NO_ACCESS_MESSAGE } from '@constants'

import { getServerErrorStatus } from '@utils'

import { useLazyGetMetricForecastQuery } from '@rtkApi/modules/__generated__/metric'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { SpotMetricsCard } from '../SpotMetricsCard'
import { SpotMetricsTable } from '../SpotMetricsTable'
import * as Styled from './SpotMetricsReport.styled'

export const SpotMetricsReport: React.FC = () => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)

  const [
    apiGetMetricsData,
    { data: metricsData, isLoading: isLoadingMetrics },
  ] = useLazyGetMetricForecastQuery()

  const renderErrorText = (error: ServerError) => {
    const status = getServerErrorStatus(error)

    if (!status) return

    if (status === 403) {
      toast.error(ERROR_NO_ACCESS_MESSAGE)
    }

    if (status === 500) {
      toast.error(ERROR_MESSAGE_500)
    }
  }

  useEffect(() => {
    const getMetricsData = async () => {
      try {
        if (enterpriseId) await apiGetMetricsData({ enterpriseId }).unwrap()
      } catch (e) {
        renderErrorText(e as ServerError)
      }
    }

    getMetricsData()
  }, [enterpriseId])

  if (isLoadingMetrics) {
    return <AppLoader />
  }

  return (
    <Styled.Root>
      <SpotMetricsCard metricsData={metricsData}>
        {metricsData && (
          <SpotMetricsTable
            date={metricsData.month!}
            rows={metricsData.metrics!}
          />
        )}
      </SpotMetricsCard>
    </Styled.Root>
  )
}
