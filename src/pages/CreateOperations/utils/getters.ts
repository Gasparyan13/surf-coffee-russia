import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

import { ServerError } from '@common/types/Errors'

import {
  ERROR_MESSAGE_500,
  ERROR_SOMETHING_WENT_WRONG,
  YEAR_MONTH_FORMAT,
} from '@constants'

import { DateHelper } from '@helpers'

import { getServerErrorStatus } from '@utils'

import { ExpensesValue } from '../components/forms/components/FormExpenses/FormExpenses.types'
import { EPurchaseSale } from '../components/forms/components/FormToggleButtonGroup/enums'
import { idPayrollBudgetItems } from '../constants/constants'
import { SERVER_ERROR_FILE_WRONG } from '../constants/messages/error'

export type Error400 = {
  data:
    | string
    | {
        details: string[]
      }
}

export const getFileUploadServerError = (
  error: FetchBaseQueryError | SerializedError,
): string | undefined => {
  if (error) {
    if (
      'data' in error &&
      typeof error.data === 'string' &&
      error.data.includes('upload')
    ) {
      return SERVER_ERROR_FILE_WRONG
    }

    if ('message' in error) {
      return error.message
    }
  }
}

export const getServerErrorMessage = (
  error: ServerError,
  serverError = ERROR_MESSAGE_500,
): string => {
  if (error instanceof Error) {
    return error.message
  }

  const uploadErrorMessage = getFileUploadServerError(error)

  if (uploadErrorMessage) return uploadErrorMessage

  const status = getServerErrorStatus(error)

  if (status === 500) {
    return serverError
  }

  if (status === 400) {
    const error400 = error as Error400

    if ('data' in error400) {
      if (typeof error400.data === 'object' && 'details' in error400.data)
        return error400.data.details.join('. ')
      if (typeof error400.data === 'string') return error400.data
    }
  }

  return ERROR_SOMETHING_WENT_WRONG
}

export type FormattedExpense = {
  id?: number
  name: string
  budgetItemId: number
  amount: number
  isCapitalAssets: boolean
  primeCost?: number
  usagePeriod?: string
  usageStartDate?: string
}

export const getExpensesData = (
  dirtyExpenses: ExpensesValue[],
  isPurchase?: string,
): FormattedExpense[] =>
  dirtyExpenses.map(
    ({
      id,
      commissioningDate,
      periodOfUse,
      budgetItem,
      amount,
      primeCost,
      name,
    }) => {
      const returnExpense: FormattedExpense = {
        name,
        budgetItemId: budgetItem!.id!,
        amount: Number(amount),
        isCapitalAssets: budgetItem?.isCapitalAssets as boolean,
      }

      // add "id" to expense item for form edit mode
      // "id" is a "number" only in form edit mode, so filter out our internal "string" "id" for the new expense item
      if (typeof id === 'number') {
        returnExpense.id = id
      }
      if (primeCost) {
        returnExpense.primeCost = Number(primeCost)
      }

      if (
        isPurchase === EPurchaseSale.Purchase &&
        budgetItem?.isCapitalAssets
      ) {
        returnExpense.usagePeriod = periodOfUse
        if (commissioningDate)
          returnExpense.usageStartDate = DateHelper.toFormat(
            commissioningDate,
            YEAR_MONTH_FORMAT,
          )
      }

      return { ...returnExpense }
    },
  )

export const getIsIdPayrollBudgetItem = (id: number) => idPayrollBudgetItems[id]
