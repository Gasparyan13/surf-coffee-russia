import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
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

import { getCommonMaxDate, getCommonMinDate } from '@utils'

import {
  getExpensesData,
  getServerErrorMessage,
} from '@pages/CreateOperations/utils/getters'

import {
  usePostFinancialWaybillsMutation,
  usePutFinancialWaybillsMutation,
  WaybillCreateDto,
  WaybillUpdateDto,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { RefType } from '../../../containers/Main/Main.types'
import { useEditOperationFormData } from '../../../hooks/useEditOperationFormData'
import { useFileUpload } from '../../../hooks/useFileUpload'
import { itemsNamesValue } from '../FormPlannedOperation/constants/defaultValues'
import { FormContractorInput } from '../components/FormContractorInput'
import { FormDateInput } from '../components/FormDateInput'
import { FormElController } from '../components/FormElController'
import { FormExpenses } from '../components/FormExpenses'
import { FormFileAttachmentInput } from '../components/FormFileAttachmentInput'
import { FormToggleButtonGroup } from '../components/FormToggleButtonGroup'
import { TOGGLE_BUTTON_PRESETS } from '../components/FormToggleButtonGroup/constants'
import { EPurchaseSale } from '../components/FormToggleButtonGroup/enums'
import * as Styled from './FormWaybill.styled'
import * as T from './FormWaybill.types'
import { defaultValues } from './constants/defaultValues'
import { FormFieldKey } from './constants/enums'
import {
  ERROR_MESSAGE_ADD_WAYBILL,
  ERROR_MESSAGE_EDIT_WAYBILL,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_WAYBILL,
  SUCCESS_EDIT_WAYBILL,
} from './constants/messages/sucess'
import { schema } from './constants/schema'
import { TEST_ID_WAYBILL_NUMBER } from './constants/testIds'
import { getCleanedExpenses } from './utils/getters'

export const FormWaybill = forwardRef<RefType, T.Props>(
  ({ onComplete, editOperationId, onDisabled }, ref) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)
    const maxDate = getCommonMaxDate()
    const minDate = getCommonMinDate()

    const [apiPostFinancialWaybill] = usePostFinancialWaybillsMutation()
    const [apiEditFinancialWaybill] = usePutFinancialWaybillsMutation()

    const {
      handleSubmit: onSubmit,
      control,
      formState: { errors, isDirty, isSubmitted },
      setError,
      clearErrors,
      trigger,
      watch,
      setValue,
      reset,
    } = useForm<T.CreateWaybillForm>({
      defaultValues,
      resolver: yupResolver(schema),
    })

    const {
      isPurchase: isPurchaseField,
      expenses: expensesField,
      deliveryDate: deliveryDateField,
      document: documentField,
    } = watch()

    const {
      isApiDocument: canViewFile,
      handleOpenFileInNewTab,
      handleUploadDocument,
      handleWatchApiDocument,
    } = useFileUpload({
      currentFile: documentField,
    })

    const { isLoading } = useEditOperationFormData({
      editOperationId,
      onDisabled,
      onFormDataLoadComplete: (formData, documentInfo) => {
        const { document } = formData
        if (documentInfo && document) {
          handleWatchApiDocument({ file: document, info: documentInfo })
        }

        reset(
          {
            isPurchase: formData.isPurchase,
            contractor: formData.contractor,
            waybillNumber: formData.operationNumber,
            waybillDate: formData.operationDate,
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

    const handleSubmit = useCallback(
      onSubmit(async (formData: T.CreateWaybillForm) => {
        const {
          document,
          waybillDate,
          deliveryDate,
          contractor,
          isPurchase: submitIsPurchase,
          expenses: dirtyExpenses,
          waybillNumber,
        } = formData
        if (!enterpriseId) return

        try {
          const fileUploadData = await handleUploadDocument({
            documentType: 'WAYBILL',
            document: document!,
          })

          const commonDtoFields: WaybillCreateDto | WaybillUpdateDto = {
            enterpriseId,
            waybillNumber,
            expenses: getExpensesData(dirtyExpenses, isPurchaseField),
            contractorId: contractor!.id!,
            waybillDate: DateHelper.toServerDateFormat(waybillDate!),
            deliveryDate: DateHelper.toServerDateFormat(deliveryDate!),
            document: fileUploadData,
            isPurchase: submitIsPurchase === EPurchaseSale.Purchase,
          }

          if (editOperationId) {
            await apiEditFinancialWaybill({
              waybillUpdateDto: {
                ...commonDtoFields,
                id: editOperationId,
              },
            }).unwrap()
          } else {
            await apiPostFinancialWaybill({
              waybillCreateDto: {
                ...commonDtoFields,
              },
            }).unwrap()
          }

          onComplete(PATHS.financialReports.pnl)
          toast.success(
            editOperationId ? SUCCESS_EDIT_WAYBILL : SUCCESS_ADD_WAYBILL,
          )
        } catch (e) {
          toast.error(
            getServerErrorMessage(
              e as ServerError,
              editOperationId
                ? ERROR_MESSAGE_EDIT_WAYBILL
                : ERROR_MESSAGE_ADD_WAYBILL,
            ),
          )
        }
      }),
      [handleUploadDocument],
    )

    const handleTabChange = useCallback(
      (
        event: React.SyntheticEvent,
        newValue: string,
        callBack: (arg: string) => void,
      ) => {
        const isClearNameField = newValue === EPurchaseSale.Sale

        const newExpenses = getCleanedExpenses(
          expensesField,
          isClearNameField,
          clearErrors,
        )
        setValue('expenses', newExpenses)
        callBack(newValue)
      },
      [clearErrors, expensesField, setValue],
    )

    useImperativeHandle(
      ref,
      () => ({
        onSubmit: handleSubmit,
        isDirty,
      }),
      [handleSubmit, isDirty],
    )

    useLayoutEffect(() => {
      if (deliveryDateField && isSubmitted) trigger(FormFieldKey.WAYBILL_DATE)
    }, [deliveryDateField])

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
              hasAdditionalFieldsCapitalAssets
              clearErrors={clearErrors}
              control={control}
              hasPrimeCostInput={isPurchaseField === EPurchaseSale.Sale}
              isPurchase={isPurchaseField === EPurchaseSale.Purchase}
              itemsNames={itemsNamesValue}
              name={FormFieldKey.EXPENSES}
              operationType={EOperationsType.Waybill}
              trigger={trigger}
            />
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormContractorInput
                control={control}
                errors={errors}
                name={FormFieldKey.CONTRACTOR}
              />
              <FormElController
                control={control}
                name={FormFieldKey.WAYBILL_NUMBER}>
                <TextField
                  {...makeInputError(FormFieldKey.WAYBILL_NUMBER, errors)}
                  inputProps={{
                    ...createTestId(TEST_ID_WAYBILL_NUMBER),
                  }}
                  labelText="Номер накладной"
                />
              </FormElController>
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormDateInput
                control={control}
                helperText={errors[FormFieldKey.WAYBILL_DATE]?.message}
                labelText="Дата накладной"
                maxDate={maxDate}
                minDate={minDate}
                name={FormFieldKey.WAYBILL_DATE}
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
