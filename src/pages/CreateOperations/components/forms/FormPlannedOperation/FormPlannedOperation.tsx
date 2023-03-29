/* eslint-disable max-lines */
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid/Grid'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { pr } from '@common/common.styled'
import { FormRowLayout } from '@common/components/FormRowLayout'
import { ServerError } from '@common/types/Errors'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import { useScrollToError } from '@hooks'

import { Checkbox } from '@uiKit'

import { CURRENT_DATE as LIMITED_CURRENT_DATE } from '@utils'

import { useAddContractorWorker } from '@pages/CreateOperations/hooks/useAddContractorWorker'
import { getServerErrorMessage } from '@pages/CreateOperations/utils/getters'

import {
  PlannedOperationCreateDto,
  PlannedOperationUpdateDto,
  usePatchFinancialPlannedOperationsMutation,
  usePostFinancialPlannedOperationsMutation,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { RefType } from '../../../containers/Main/Main.types'
import { FormArticleSelect } from '../components/FormArticleSelect'
import { FormContractorField } from '../components/FormContractorField'
import { FormDateInput } from '../components/FormDateInput'
import { FormDenominationInput } from '../components/FormDenominationInput'
import { FormRadioButtonGroup } from '../components/FormRadioButtonGroup'
import { FormSumInput } from '../components/FormSumInput'
import { FormToggleButtonGroup } from '../components/FormToggleButtonGroup'
import { TOGGLE_BUTTON_PRESETS } from '../components/FormToggleButtonGroup/constants'
import { EWriteOffReceipt } from '../components/FormToggleButtonGroup/enums'
import * as Styled from './FormPlannedOperation.styled'
import * as T from './FormPlannedOperation.types'
import { defaultValues } from './constants/defaultValues'
import { FormFieldKey, PaymentType } from './constants/enums'
import {
  ERROR_MESSAGE_ADD_PLANNED_OPERATION,
  ERROR_MESSAGE_EDIT_PLANNED_OPERATION,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_PLANNED_OPERATION,
  SUCCESS_EDIT_PLANNED_OPERATION,
} from './constants/messages/sucess'
import { options } from './constants/options'
import { schema } from './constants/schema'
import { useEditPlannedOperationFormData } from './hooks/useEditPlannedOperationFormData'

export const FormPlannedOperation = forwardRef<RefType, T.Props>(
  ({ onComplete, editOperationId, onDisabled }, ref) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)

    const [apiPostFinancialPlannedOperation] =
      usePostFinancialPlannedOperationsMutation()
    const [apiEditFinancialPlannedOperation] =
      usePatchFinancialPlannedOperationsMutation()

    const {
      handleSubmit: onSubmit,
      control,
      watch,
      setValue,
      formState: { errors, isDirty },
      reset,
    } = useForm<T.CreateFormPlannedOperationForm>({
      defaultValues,
      resolver: yupResolver(schema),
    })

    const isWriteOffField = watch(
      FormFieldKey.IS_WRITE_OFF,
    ) as T.CreateFormPlannedOperationForm['isWriteOff']
    const budgetItemField = watch(
      FormFieldKey.BUDGET_ITEM,
    ) as T.CreateFormPlannedOperationForm['budgetItem']

    useScrollToError(errors)

    const { isLoading } = useEditPlannedOperationFormData({
      editOperationId,
      onDisabled,
      onFormDataLoadComplete: (formData) => {
        reset(formData, {
          keepDirty: false,
          keepValues: false,
        })
      },
    })

    const handleSubmit = useCallback(
      onSubmit(async (formValues: T.CreateFormPlannedOperationForm) => {
        const {
          isWriteOff,
          contractor,
          budgetItem,
          amount,
          name,
          paymentDate,
          receiveDate,
          isService,
          paymentType,
          expensesId,
        } = formValues

        if (!enterpriseId || !contractor) return

        const { id: contractorId } = contractor
        const commonDtoFields:
          | PlannedOperationCreateDto
          | PlannedOperationUpdateDto = {
          enterpriseId,
          isWriteOff: isWriteOff === EWriteOffReceipt.WriteOff,
          expense: {
            budgetItemId: budgetItem?.id as number,
            money: Number(amount),
            name,
          },
          contractorId: Number(contractorId!),
          dateOfPayment: DateHelper.toServerDateFormat(paymentDate!),
          dateOfReceiving: DateHelper.toServerDateFormat(receiveDate!),
          isService,
          isCash: paymentType === PaymentType.Cash,
        }

        try {
          if (editOperationId) {
            await apiEditFinancialPlannedOperation({
              plannedOperationUpdateDto: {
                ...commonDtoFields,
                expense: {
                  ...commonDtoFields.expense,
                  expensesId: expensesId!,
                },
                id: editOperationId,
              },
            }).unwrap()
          } else {
            await apiPostFinancialPlannedOperation({
              plannedOperationCreateDto: { ...commonDtoFields },
            }).unwrap()
          }

          onComplete([
            PATHS.financialReports.pnl,
            PATHS.financialReports.cashFlow,
          ])

          toast.success(
            editOperationId
              ? SUCCESS_EDIT_PLANNED_OPERATION
              : SUCCESS_ADD_PLANNED_OPERATION,
          )
        } catch (e) {
          toast.error(
            getServerErrorMessage(
              e as ServerError,
              editOperationId
                ? ERROR_MESSAGE_EDIT_PLANNED_OPERATION
                : ERROR_MESSAGE_ADD_PLANNED_OPERATION,
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

    const resetContractorField = useCallback(() => {
      if (isDirty) setValue('contractor', null)
    }, [setValue, isDirty])

    const isAddContractorWorker = useAddContractorWorker({
      budgetItemId: budgetItemField?.id,
      isPurchaseOrWriteOff: isWriteOffField,
      resetField: resetContractorField,
    })

    if (isLoading) return <AppLoader />

    return (
      <Styled.Root>
        <FormToggleButtonGroup
          control={control}
          disabled={!!editOperationId}
          name={FormFieldKey.IS_WRITE_OFF}
          options={TOGGLE_BUTTON_PRESETS.writeOffReceipt}
        />

        <Grid container css={pr(5)} spacing={4}>
          <Grid item xs={12}>
            <FormRowLayout>
              <Controller
                control={control}
                name={FormFieldKey.PAYMENT_TYPE}
                render={({
                  field: { onChange, name, value },
                  fieldState: { error },
                }) => (
                  <FormRadioButtonGroup
                    defaultValue={value}
                    error={error?.message}
                    name={name}
                    options={options}
                    onChange={onChange}
                  />
                )}
              />
              <Styled.CheckboxContainer>
                <Controller
                  control={control}
                  name={FormFieldKey.IS_SURVICE}
                  render={({ field: { name, value: checked, onChange } }) => (
                    <Checkbox
                      checked={checked}
                      label="Услуга"
                      name={name}
                      onChange={onChange}
                    />
                  )}
                />
              </Styled.CheckboxContainer>
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <Controller
                control={control}
                name={FormFieldKey.BUDGET_ITEM}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormArticleSelect
                    error={error?.message}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name={FormFieldKey.AMOUNT}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormSumInput
                    error={error?.message}
                    value={value!}
                    onChange={onChange}
                  />
                )}
              />
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormContractorField
                control={control}
                errors={errors}
                isAddContractorWorker={isAddContractorWorker}
                name={FormFieldKey.CONTRACTOR}
              />

              <Controller
                control={control}
                name={FormFieldKey.NAME}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <FormDenominationInput
                    error={error?.message}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormDateInput
                disablePast
                control={control}
                helperText={errors[FormFieldKey.PAYMENT_DATE]?.message}
                labelText="Дата оплаты"
                minDate={LIMITED_CURRENT_DATE}
                name={FormFieldKey.PAYMENT_DATE}
              />
              <FormDateInput
                disablePast
                control={control}
                helperText={errors[FormFieldKey.ACCRUAL_DATE]?.message}
                labelText="Дата начисления"
                minDate={LIMITED_CURRENT_DATE}
                name={FormFieldKey.ACCRUAL_DATE}
              />
            </FormRowLayout>
          </Grid>
        </Grid>
      </Styled.Root>
    )
  },
)
