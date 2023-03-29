import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { pr } from '@common/common.styled'
import { FormRowLayout } from '@common/components/FormRowLayout'
import { PATHS } from '@common/constants'
import { ServerError } from '@common/types/Errors'
import { EOperationsType } from '@common/types/Operations'

import { DateHelper, makeInputError } from '@helpers'

import { useScrollToError } from '@hooks'

import { TextField } from '@uiKit'

import { getCommonMaxDate, getCommonMinDate } from '@utils/getDate'

import { useAddContractorWorker } from '@pages/CreateOperations/hooks/useAddContractorWorker'
import { useUpdateExpenseBudgetItem } from '@pages/CreateOperations/hooks/useUpdateExpenseBudgetItem/useUpdateExpenseBudgetItem'
import {
  getExpensesData,
  getServerErrorMessage,
} from '@pages/CreateOperations/utils/getters'

import {
  ServiceActCreateDto,
  ServiceActUpdateDto,
  usePostFinancialServiceActsMutation,
  usePutFinancialServiceActsMutation,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { RefType } from '../../../containers/Main/Main.types'
import { useEditOperationFormData } from '../../../hooks/useEditOperationFormData'
import { useFileUpload } from '../../../hooks/useFileUpload'
import { FormContractorField } from '../components/FormContractorField'
import { FormDateInput } from '../components/FormDateInput'
import { FormElController } from '../components/FormElController'
import { ExpensesItemFieldKey, FormExpenses } from '../components/FormExpenses'
import { FormFileAttachmentInput } from '../components/FormFileAttachmentInput'
import { FormToggleButtonGroup } from '../components/FormToggleButtonGroup'
import { TOGGLE_BUTTON_PRESETS } from '../components/FormToggleButtonGroup/constants'
import { EPurchaseSale } from '../components/FormToggleButtonGroup/enums'
import * as Styled from './FormAct.styled'
import * as T from './FormAct.types'
import { defaultValues } from './constants/defaultValues'
import { FormFieldKey } from './constants/enums'
import {
  ERROR_MESSAGE_ADD_ACT,
  ERROR_MESSAGE_EDIT_ACT,
} from './constants/messages/errors'
import { SUCCESS_ADD_ACT, SUCCESS_EDIT_ACT } from './constants/messages/sucess'
import { schema } from './constants/schema'
import { TEST_ID_ACT_NUMBER } from './constants/testIds'

export const FormAct = forwardRef<RefType, T.Props>(
  ({ onComplete, editOperationId, onDisabled }, ref) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)

    const maxDate = getCommonMaxDate()
    const minDate = getCommonMinDate()

    const [apiPostFinancialAct] = usePostFinancialServiceActsMutation()
    const [apiEditFinancialAct] = usePutFinancialServiceActsMutation()

    const {
      handleSubmit: onSubmit,
      control,
      formState: { errors, isDirty },
      setError,
      clearErrors,
      reset,
      watch,
      setValue,
      trigger,
    } = useForm<T.CreateActForm>({
      defaultValues,
      resolver: yupResolver(schema),
    })

    const isPurchaseField = watch(
      FormFieldKey.IS_PURCHASE,
    ) as T.CreateActForm['isPurchase']
    const expensesField = watch(
      FormFieldKey.EXPENSES,
    ) as T.CreateActForm['expenses']
    const documentField = watch(
      FormFieldKey.DOCUMENT,
    ) as T.CreateActForm['document']

    const {
      isApiDocument: canViewFile,
      handleOpenFileInNewTab,
      handleUploadDocument,
      handleWatchApiDocument,
    } = useFileUpload({
      currentFile: documentField,
    })

    const { handleTabChange } = useUpdateExpenseBudgetItem<T.CreateActForm>({
      expenses: expensesField,
      setValue,
    })

    const { isLoading } = useEditOperationFormData({
      editOperationId,
      onDisabled,
      onFormDataLoadComplete: (formData, documentInfo) => {
        if (documentInfo && formData.document) {
          handleWatchApiDocument({
            file: formData.document,
            info: documentInfo,
          })
        }

        reset(
          {
            isPurchase: formData.isPurchase,
            contractor: formData.contractor,
            actNumber: formData.operationNumber,
            actDate: formData.operationDate,
            deliveryDate: formData.receiveDate,
            expenses: formData.expenses,
            document: formData.document,
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
      isPurchaseOrWriteOff: isPurchaseField,
      resetField: resetContractorField,
    })

    const handleSubmit = useCallback(
      onSubmit(async (formData: T.CreateActForm) => {
        const {
          document,
          actDate,
          deliveryDate,
          contractor,
          isPurchase: newIsPurchase,
          expenses: dirtyExpenses,
          actNumber,
        } = formData
        if (!enterpriseId) return

        try {
          const fileUploadData = await handleUploadDocument({
            documentType: 'ACT',
            document: document!,
          })

          const commonDtoFields: ServiceActCreateDto | ServiceActUpdateDto = {
            enterpriseId,
            actNumber,
            expenses: getExpensesData(dirtyExpenses, newIsPurchase),
            contractorId: Number(contractor!.id!),
            actDate: DateHelper.toServerDateFormat(actDate!),
            deliveryDate: DateHelper.toServerDateFormat(deliveryDate!),
            document: fileUploadData,
            isPurchase: newIsPurchase === EPurchaseSale.Purchase,
          }

          if (editOperationId) {
            await apiEditFinancialAct({
              serviceActUpdateDto: {
                ...commonDtoFields,
                id: editOperationId,
              },
            }).unwrap()
          } else {
            await apiPostFinancialAct({
              serviceActCreateDto: {
                ...commonDtoFields,
              },
            }).unwrap()
          }

          onComplete([
            PATHS.financialReports.pnl,
            PATHS.financialReports.balance,
          ])
          toast.success(editOperationId ? SUCCESS_EDIT_ACT : SUCCESS_ADD_ACT)
        } catch (e) {
          toast.error(
            getServerErrorMessage(
              e as ServerError,
              editOperationId ? ERROR_MESSAGE_EDIT_ACT : ERROR_MESSAGE_ADD_ACT,
            ),
          )
        }
      }),
      [handleUploadDocument],
    )

    useImperativeHandle(
      ref,
      () => ({
        onSubmit: handleSubmit,
        isDirty,
      }),
      [handleSubmit, isDirty],
    )

    if (isLoading) return <AppLoader />

    return (
      <Styled.Root>
        <FormToggleButtonGroup
          control={control}
          disabled={!!editOperationId}
          name={FormFieldKey.IS_PURCHASE}
          options={TOGGLE_BUTTON_PRESETS.purchaseSale}
          onChange={handleTabChange}
        />
        <Grid container css={pr(5)} spacing={4}>
          <Grid item xs={12}>
            <FormExpenses
              hasExcludedBudgetItems
              control={control}
              hasPrimeCostInput={isPurchaseField === EPurchaseSale.Sale}
              isPurchase={isPurchaseField === EPurchaseSale.Purchase}
              itemsNames={{
                [ExpensesItemFieldKey.NAME]: {
                  placeholder: 'Например, обслуживание ПО',
                  label: 'Наименование услуги',
                },
              }}
              name={FormFieldKey.EXPENSES}
              operationType={EOperationsType.ServiceAct}
              trigger={trigger}
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
                name={FormFieldKey.ACT_NUMBER}>
                <TextField
                  {...makeInputError(FormFieldKey.ACT_NUMBER, errors)}
                  inputProps={{
                    ...createTestId(TEST_ID_ACT_NUMBER),
                  }}
                  labelText="Номер акта"
                />
              </FormElController>
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormDateInput
                control={control}
                helperText={errors[FormFieldKey.ACT_DATE]?.message}
                labelText="Дата акта"
                maxDate={maxDate}
                minDate={minDate}
                name={FormFieldKey.ACT_DATE}
              />
              <FormDateInput
                control={control}
                helperText={errors[FormFieldKey.DELIVERY_DATE]?.message}
                labelText="Дата поставки (поступления)"
                maxDate={maxDate}
                minDate={minDate}
                name={FormFieldKey.DELIVERY_DATE}
              />
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <Controller
                control={control}
                name={FormFieldKey.DOCUMENT}
                render={({
                  field: { name, value, onChange },
                  fieldState: { error },
                }) => (
                  <FormFileAttachmentInput
                    canViewFile={!!canViewFile}
                    clearErrors={clearErrors}
                    hasError={!!error}
                    name={name}
                    setAttachmentError={setError}
                    value={value}
                    onChange={onChange}
                    onViewFile={handleOpenFileInNewTab}
                  />
                )}
              />
            </FormRowLayout>
          </Grid>
        </Grid>
      </Styled.Root>
    )
  },
)
