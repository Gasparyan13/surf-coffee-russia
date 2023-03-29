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
  TransactionCreateDto,
  TransactionUpdateDto,
  usePostFinancialTransactionsMutation,
  usePutFinancialTransactionsMutation,
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
import * as Styled from './FormTransaction.styled'
import * as T from './FormTransaction.types'
import { defaultValues } from './constants/defaultValues'
import { FormFieldKey } from './constants/enums'
import {
  ERROR_MESSAGE_ADD_TRANSACTION,
  ERROR_MESSAGE_EDIT_TRANSACTION,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_TRANSACTION,
  SUCCESS_EDIT_TRANSACTION,
} from './constants/messages/sucess'
import { schema } from './constants/schema'
import {
  TEST_ID_ACCOUNT_NUMBER,
  TEST_ID_WARRANT_NUMBER,
} from './constants/testIds'

export const FormTransaction = forwardRef<RefType, T.Props>(
  ({ onComplete, editOperationId, onDisabled }, ref) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)

    const [apiPostFinancialTransaction] = usePostFinancialTransactionsMutation()
    const [apiEditFinancialTransaction] = usePutFinancialTransactionsMutation()

    const {
      handleSubmit: onSubmit,
      control,
      formState: { errors, isDirty },
      watch,
      setValue,
      reset,
    } = useForm<T.CreateTransactionForm>({
      defaultValues,
      resolver: yupResolver(schema),
    })
    const isWriteOffField = watch(
      FormFieldKey.IS_WRITE_OFF,
    ) as T.CreateTransactionForm['isWriteOff']
    const expensesField = watch(
      FormFieldKey.EXPENSES,
    ) as T.CreateTransactionForm['expenses']

    const { handleTabChange } =
      useUpdateExpenseBudgetItem<T.CreateTransactionForm>({
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
            transactionNumber: formData.operationNumber,
            transactionDate: formData.operationDate,
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
      onSubmit(async (formValues: T.CreateTransactionForm) => {
        const {
          transactionDate,
          isWriteOff: newIsWriteOff,
          contractor,
          expenses: dirtyExpenses,
          accountNumber,
          transactionNumber,
          paymentPurpose,
        } = formValues

        if (!enterpriseId || !contractor) return

        const { id: contractorId } = contractor
        if (!contractorId) return

        try {
          const commonDtoFields: TransactionCreateDto | TransactionUpdateDto = {
            enterpriseId,
            expenses: getExpensesData(dirtyExpenses),
            contractorId: Number(contractorId),
            accountNumber,
            transactionNumber,
            paymentPurpose,
            transactionDate: DateHelper.toServerDateFormat(transactionDate!),
            isWriteOff: newIsWriteOff === EWriteOffReceipt.WriteOff,
          }

          if (editOperationId) {
            await apiEditFinancialTransaction({
              transactionUpdateDto: {
                ...commonDtoFields,
                id: editOperationId,
              },
            }).unwrap()
          } else {
            await apiPostFinancialTransaction({
              transactionCreateDto: {
                ...commonDtoFields,
              },
            }).unwrap()
          }

          onComplete(PATHS.financialReports.cashFlow)
          toast.success(
            editOperationId
              ? SUCCESS_EDIT_TRANSACTION
              : SUCCESS_ADD_TRANSACTION,
          )
        } catch (e) {
          toast.error(
            getServerErrorMessage(
              e as ServerError,
              editOperationId
                ? ERROR_MESSAGE_EDIT_TRANSACTION
                : ERROR_MESSAGE_ADD_TRANSACTION,
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
              operationType={EOperationsType.Transaction}
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
                name={FormFieldKey.TRANSACTION_NUMBER}>
                <TextField
                  {...makeInputError(FormFieldKey.TRANSACTION_NUMBER, errors)}
                  inputProps={{
                    ...createTestId(TEST_ID_WARRANT_NUMBER),
                  }}
                  labelText="Номер транзакции"
                />
              </FormElController>
              <FormDateInput
                disableFuture
                control={control}
                helperText={errors[FormFieldKey.TRANSACTION_DATE]?.message}
                labelText="Дата транзакции"
                maxDate={new Date()}
                minDate={getCommonMinDate()}
                name={FormFieldKey.TRANSACTION_DATE}
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
