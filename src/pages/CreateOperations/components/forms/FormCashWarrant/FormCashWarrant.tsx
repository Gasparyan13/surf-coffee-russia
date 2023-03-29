import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid/Grid'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { pr } from '@common/common.styled'
import { FormRowLayout } from '@common/components/FormRowLayout'
import { ServerError } from '@common/types/Errors'
import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { DateHelper, makeInputError } from '@helpers'

import { useScrollToError } from '@hooks'

import { TextField } from '@uiKit'

import { getCommonMinDate } from '@utils'

import { useAddContractorWorker } from '@pages/CreateOperations/hooks/useAddContractorWorker'
import { useUpdateExpenseBudgetItem } from '@pages/CreateOperations/hooks/useUpdateExpenseBudgetItem/useUpdateExpenseBudgetItem'
import {
  getExpensesData,
  getServerErrorMessage,
} from '@pages/CreateOperations/utils/getters'

import {
  CashOrderCreateDto,
  CashOrderUpdateDto,
  usePostFinancialCashOrdersMutation,
  usePutFinancialCashOrdersMutation,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { RefType } from '../../../containers/Main/Main.types'
import { useEditOperationFormData } from '../../../hooks/useEditOperationFormData/useEditOperationFormData'
import { FormContractorField } from '../components/FormContractorField'
import { FormDateInput } from '../components/FormDateInput'
import { FormElController } from '../components/FormElController'
import { FormExpenses } from '../components/FormExpenses'
import { FormToggleButtonGroup } from '../components/FormToggleButtonGroup'
import { TOGGLE_BUTTON_PRESETS } from '../components/FormToggleButtonGroup/constants'
import { EWriteOffReceipt } from '../components/FormToggleButtonGroup/enums'
import * as Styled from './FormCashWarrant.styled'
import * as T from './FormCashWarrant.types'
import { defaultValues } from './constants/defaultValues'
import { FormFieldKey } from './constants/enums'
import {
  ERROR_MESSAGE_ADD_CASH_WARRANT,
  ERROR_MESSAGE_EDIT_CASH_WARRANT,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_CASH_WARRANT,
  SUCCESS_EDIT_CASH_WARRANT,
} from './constants/messages/sucess'
import { schema } from './constants/schema'
import {
  TEST_ID_ACCOUNT_NUMBER,
  TEST_ID_WARRANT_NUMBER,
} from './constants/testIds'

export const FormCashWarrant = forwardRef<RefType, T.Props>(
  ({ onComplete, editOperationId, onDisabled }, ref) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)

    const [apiPostFinancialCashOrders] = usePostFinancialCashOrdersMutation()
    const [apiEditFinancialCashOrders] = usePutFinancialCashOrdersMutation()

    const {
      handleSubmit: onSubmit,
      control,
      formState: { errors, isDirty },
      reset,
      watch,
      setValue,
    } = useForm<T.CreateCashWarrantForm>({
      defaultValues,
      resolver: yupResolver(schema),
    })

    const isWriteOffField = watch(
      FormFieldKey.IS_WRITE_OFF,
    ) as T.CreateCashWarrantForm['isWriteOff']
    const expensesField = watch(
      FormFieldKey.EXPENSES,
    ) as T.CreateCashWarrantForm['expenses']

    const { handleTabChange } =
      useUpdateExpenseBudgetItem<T.CreateCashWarrantForm>({
        expenses: expensesField,
        setValue,
      })

    const { isLoading } = useEditOperationFormData({
      editOperationId,
      onDisabled,
      onFormDataLoadComplete: (formData) => {
        reset(
          {
            isWriteOff: formData.isWriteOff,
            contractor: formData.contractor,
            accountNumber: formData.accountNumber,
            cashOrderNumber: formData.operationNumber,
            cashOrderDate: formData.operationDate,
            paymentPurpose: formData.paymentPurpose,
            expenses: formData.expenses,
          },
          {
            keepDirty: false,
            keepValues: false,
          },
        )
      },
    })

    useScrollToError(errors)

    const resetContractorField = useCallback(() => {
      if (isDirty) setValue('contractor', null)
    }, [setValue, isDirty])

    const isAddContractorWorker = useAddContractorWorker({
      budgetItemId: expensesField[0].budgetItem?.id,
      isPurchaseOrWriteOff: isWriteOffField,
      resetField: resetContractorField,
    })

    const handleSubmit = useCallback(
      onSubmit(async (formValues: T.CreateCashWarrantForm) => {
        const {
          cashOrderDate,
          isWriteOff: newIsWriteOff,
          contractor,
          expenses: newExpenses,
          accountNumber,
          cashOrderNumber,
          paymentPurpose,
        } = formValues

        if (!enterpriseId || !contractor) return
        const { id: contractorId } = contractor
        if (!contractorId) return

        try {
          const commonDtoFields: CashOrderCreateDto | CashOrderUpdateDto = {
            enterpriseId,
            expenses: getExpensesData(newExpenses),
            contractorId: Number(contractorId),
            accountNumber,
            cashOrderNumber,
            paymentPurpose,
            cashOrderDate: DateHelper.toServerDateFormat(cashOrderDate!),
            isWriteOff: newIsWriteOff === EWriteOffReceipt.WriteOff,
          }

          if (editOperationId) {
            await apiEditFinancialCashOrders({
              cashOrderUpdateDto: {
                ...commonDtoFields,
                id: editOperationId,
              },
            }).unwrap()
          } else {
            await apiPostFinancialCashOrders({
              cashOrderCreateDto: {
                ...commonDtoFields,
              },
            }).unwrap()
          }

          onComplete([
            PATHS.financialReports.balance,
            PATHS.financialReports.cashFlow,
          ])
          toast.success(
            editOperationId
              ? SUCCESS_EDIT_CASH_WARRANT
              : SUCCESS_ADD_CASH_WARRANT,
          )
        } catch (e) {
          toast.error(
            getServerErrorMessage(
              e as ServerError,
              editOperationId
                ? ERROR_MESSAGE_EDIT_CASH_WARRANT
                : ERROR_MESSAGE_ADD_CASH_WARRANT,
            ),
          )
        }
      }),
      [],
    )

    useImperativeHandle(ref, () => ({
      onSubmit: handleSubmit,
      isDirty,
    }))

    if (isLoading) return <AppLoader />

    return (
      <Styled.Root>
        <FormToggleButtonGroup
          control={control}
          disabled={!!editOperationId}
          name={FormFieldKey.IS_WRITE_OFF}
          options={TOGGLE_BUTTON_PRESETS.writeOffReceipt}
          onChange={handleTabChange}
        />
        <Grid container css={pr(5)} spacing={4}>
          <Grid item xs={12}>
            <FormExpenses
              hasExcludedBudgetItems
              control={control}
              isPurchase={isWriteOffField === EWriteOffReceipt.WriteOff}
              name={FormFieldKey.EXPENSES}
              operationType={EOperationsType.CashOrders}
            />
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormContractorField
                control={control}
                errors={errors}
                isAddContractorWorker={isAddContractorWorker}
                name={FormFieldKey.CONTRACTOR}
              />
              <FormElController
                control={control}
                name={FormFieldKey.ACCOUNT_NUMBER}>
                <TextField
                  {...makeInputError(FormFieldKey.ACCOUNT_NUMBER, errors)}
                  inputProps={{
                    ...createTestId(TEST_ID_ACCOUNT_NUMBER),
                  }}
                  labelText="Номер счёта"
                />
              </FormElController>
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormElController
                control={control}
                name={FormFieldKey.CASH_ORDER_NUMBER}>
                <TextField
                  {...makeInputError(FormFieldKey.CASH_ORDER_NUMBER, errors)}
                  inputProps={{
                    ...createTestId(TEST_ID_WARRANT_NUMBER),
                  }}
                  labelText="Номер кассового ордера"
                />
              </FormElController>
              <FormDateInput
                disableFuture
                control={control}
                helperText={errors[FormFieldKey.CASH_ORDER_DATE]?.message}
                labelText="Дата кассового ордера"
                maxDate={new Date()}
                minDate={getCommonMinDate()}
                name={FormFieldKey.CASH_ORDER_DATE}
              />
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormElController
                control={control}
                name={FormFieldKey.PAYMENT_PURPOSE}>
                <TextField
                  {...makeInputError(FormFieldKey.PAYMENT_PURPOSE, errors)}
                  labelText="Назначение платежа"
                  placeholder="Например, дополнительный взнос"
                />
              </FormElController>
            </FormRowLayout>
          </Grid>
        </Grid>
      </Styled.Root>
    )
  },
)
