import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { ServerError } from '@common/types/Errors'

import { VALUE_TO_START_SEARCHING } from '@constants'

import { DateHelper } from '@helpers'

import { useLocationQuery } from '@hooks'

import { getServerErrorMessage } from '@pages/CreateOperations/utils/getters'

import {
  OperationGeneralView,
  useLazyGetFinancialOperationsGeneralViewQuery,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { OperationsTable } from '../OperationsTable'
import * as Styled from './OperationsReport.styled'
import { OperationsReportUrlSearchParams } from './constants/urlSearchParams'
import { getFilteredOperations } from './utils/getters'

export const OperationsReport: React.FC = () => {
  const [operations, setOperations] = useState<OperationGeneralView[]>([])
  const enterpriseId = useSelector(getManagerCurrentProjectId)

  const { get } = useLocationQuery()

  const startDate = get(OperationsReportUrlSearchParams.startDate)
  const endDate = get(OperationsReportUrlSearchParams.endDate)
  const search = get(OperationsReportUrlSearchParams.search)
  const articleId = get(OperationsReportUrlSearchParams.articleId)
  const contractorId = get(OperationsReportUrlSearchParams.contractorId)
  const maxAmount = get(OperationsReportUrlSearchParams.maxAmount)
  const minAmount = get(OperationsReportUrlSearchParams.minAmount)
  const operationKind = get(OperationsReportUrlSearchParams.operationKind)
  const operationType = get(OperationsReportUrlSearchParams.operationType)

  const isStartSearching = !!search && search.length >= VALUE_TO_START_SEARCHING

  const [
    apiGetOperations,
    { data: dataOperations, isLoading: isLoadingOperations },
  ] = useLazyGetFinancialOperationsGeneralViewQuery()

  useEffect(() => {
    const getOperationsData = async () => {
      try {
        if (enterpriseId && startDate && endDate)
          await apiGetOperations({
            dateFrom: DateHelper.formatClientDateToServer(startDate),
            dateTo: DateHelper.formatClientDateToServer(endDate),
            budgetItemId: articleId || undefined,
            amountFrom: minAmount || undefined,
            amountTo: maxAmount || undefined,
            contractorId: contractorId || undefined,
            operationKind: operationKind || undefined,
            operationType: operationType || undefined,
          }).unwrap()
      } catch (e) {
        toast.error(getServerErrorMessage(e as ServerError))
      }
    }

    getOperationsData()
  }, [
    enterpriseId,
    startDate,
    endDate,
    apiGetOperations,
    articleId,
    minAmount,
    maxAmount,
    contractorId,
    operationKind,
    operationType,
  ])

  useEffect(() => {
    if (dataOperations) {
      if (isStartSearching) {
        setOperations(getFilteredOperations(dataOperations, search))
      } else {
        setOperations(dataOperations)
      }
    }
  }, [dataOperations, isStartSearching, search])

  if (isLoadingOperations) {
    return <AppLoader />
  }

  return (
    <Styled.Root>
      <OperationsTable
        rows={operations}
        searchValue={isStartSearching ? search : ''}
      />
    </Styled.Root>
  )
}
