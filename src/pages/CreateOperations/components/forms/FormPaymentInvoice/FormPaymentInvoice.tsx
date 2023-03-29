import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { pr } from '@common/common.styled'
import { ServerError } from '@common/types/Errors'
import { EOperationsType } from '@common/types/Operations'

import { FormRowLayout } from '@components/FormRowLayout'

import { DateHelper, makeInputError } from '@helpers'

import { useScrollToError } from '@hooks'

import { TextField } from '@uiKit'

import { getCommonMaxDate, getCommonMinDate } from '@utils'

import { FormDateInput } from '@pages/CreateOperations/components/forms/components/FormDateInput'
import {
  ExpensesItemFieldKey,
  FormExpenses,
} from '@pages/CreateOperations/components/forms/components/FormExpenses'
import { FormFileAttachmentInput } from '@pages/CreateOperations/components/forms/components/FormFileAttachmentInput'
import { EWriteOffReceipt } from '@pages/CreateOperations/components/forms/components/FormToggleButtonGroup/enums'
import { useEditOperationFormData } from '@pages/CreateOperations/hooks/useEditOperationFormData'
import { useFileUpload } from '@pages/CreateOperations/hooks/useFileUpload'
import { useUpdateExpenseBudgetItem } from '@pages/CreateOperations/hooks/useUpdateExpenseBudgetItem/useUpdateExpenseBudgetItem'
import {
  getExpensesData,
  getServerErrorMessage,
} from '@pages/CreateOperations/utils/getters'

import {
  PaymentInvoiceCreateDto,
  PaymentInvoiceUpdateDto,
  usePostFinancialPaymentInvoicesMutation,
  usePutFinancialPaymentInvoicesMutation,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { RefType } from '../../../containers/Main/Main.types'
import { FormContractorInput } from '../components/FormContractorInput'
import { FormElController } from '../components/FormElController'
import { FormToggleButtonGroup } from '../components/FormToggleButtonGroup'
import { TOGGLE_BUTTON_PRESETS } from '../components/FormToggleButtonGroup/constants'
import * as Styled from './FormPaymentInvoice.styled'
import * as T from './FormPaymentInvoice.types'
import { defaultValues } from './constants/defaultValues'
import { FormFieldKey } from './constants/enum'
import {
  ERROR_MESSAGE_ADD_PAYMENT_INVOICE,
  ERROR_MESSAGE_EDIT_PAYMENT_INVOICE,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_PAYMENT_INVOICE,
  SUCCESS_EDIT_PAYMENT_INVOICE,
} from './constants/messages/success'
import { schema } from './constants/schema'
import { TEST_ID_INVOICE_NUMBER } from './constants/testIds'

export const FormPaymentInvoice = forwardRef<RefType, T.Props>(
  ({ onComplete, editOperationId, onDisabled }, ref) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)
    const maxDate = getCommonMaxDate()
    const minDate = getCommonMinDate()

    const {
      handleSubmit: onSubmit,
      control,
      formState: { errors, isDirty },
      setError,
      clearErrors,
      watch,
      reset,
      setValue,
      trigger,
    } = useForm<T.CreatePaymentInvoiceForm>({
      defaultValues,
      resolver: yupResolver(schema),
    })

    const isWriteOffField = watch(
      FormFieldKey.IS_WRITE_OFF,
    ) as T.CreatePaymentInvoiceForm['isWriteOff']
    const expensesField = watch(
      FormFieldKey.EXPENSES,
    ) as T.CreatePaymentInvoiceForm['expenses']
    const documentField = watch(
      FormFieldKey.DOCUMENT,
    ) as T.CreatePaymentInvoiceForm['document']

    const { handleTabChange } =
      useUpdateExpenseBudgetItem<T.CreatePaymentInvoiceForm>({
        expenses: expensesField,
        setValue,
        isClearBudgetItem: false,
      })

    const {
      isApiDocument: canViewFile,
      handleOpenFileInNewTab,
      handleUploadDocument,
      handleWatchApiDocument,
    } = useFileUpload({
      currentFile: documentField,
    })

    const [apiPostPaymentInvoice] = usePostFinancialPaymentInvoicesMutation()
    const [apiEditPaymentInvoice] = usePutFinancialPaymentInvoicesMutation()

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
            isWriteOff: formData.isWriteOff,
            contractor: formData.contractor,
            invoiceNumber: formData.accountNumber,
            invoiceDate: formData.operationDate,
            paymentDate: formData.receiveDate,
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
      onSubmit(async (formData: T.CreatePaymentInvoiceForm) => {
        const {
          document,
          invoiceDate,
          isWriteOff: newIsWriteOff,
          invoiceNumber,
          paymentDate,
          expenses: dirtyExpenses,
          contractor,
        } = formData

        if (!enterpriseId) return

        try {
          const fileUploadData = await handleUploadDocument({
            documentType: 'INVOICE',
            document: document!,
          })

          const commonDtoFields:
            | PaymentInvoiceCreateDto
            | PaymentInvoiceUpdateDto = {
            enterpriseId,
            isWriteOff: newIsWriteOff === EWriteOffReceipt.WriteOff,
            expenses: getExpensesData(dirtyExpenses, newIsWriteOff),
            accountNumber: invoiceNumber,
            contractorId: Number(contractor!.id!),
            invoiceDate: DateHelper.toServerDateFormat(invoiceDate!),
            paymentDate: DateHelper.toServerDateFormat(paymentDate!),
            document: fileUploadData,
          }

          if (editOperationId) {
            await apiEditPaymentInvoice({
              paymentInvoiceUpdateDto: {
                ...commonDtoFields,
                id: editOperationId,
              },
            }).unwrap()
          } else {
            await apiPostPaymentInvoice({
              paymentInvoiceCreateDto: {
                ...commonDtoFields,
              },
            }).unwrap()
          }

          onComplete()

          toast.success(
            editOperationId
              ? SUCCESS_EDIT_PAYMENT_INVOICE
              : SUCCESS_ADD_PAYMENT_INVOICE,
          )
        } catch (e) {
          toast.error(
            getServerErrorMessage(
              e as ServerError,
              editOperationId
                ? ERROR_MESSAGE_EDIT_PAYMENT_INVOICE
                : ERROR_MESSAGE_ADD_PAYMENT_INVOICE,
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
          name={FormFieldKey.IS_WRITE_OFF}
          options={TOGGLE_BUTTON_PRESETS.writeOffReceipt}
          onChange={handleTabChange}
        />
        <Grid container css={pr(5)} spacing={4}>
          <Grid item xs={12}>
            <FormExpenses
              control={control}
              isPurchase={isWriteOffField === EWriteOffReceipt.WriteOff}
              itemsNames={{
                [ExpensesItemFieldKey.NAME]: {
                  placeholder: 'Наименования товара или услуги',
                  label: 'Наименование',
                },
              }}
              name={FormFieldKey.EXPENSES}
              operationType={EOperationsType.PaymentInvoice}
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
                name={FormFieldKey.INVOICE_NUMBER}>
                <TextField
                  {...makeInputError(FormFieldKey.INVOICE_NUMBER, errors)}
                  inputProps={{
                    ...createTestId(TEST_ID_INVOICE_NUMBER),
                  }}
                  labelText="Номер счёта"
                />
              </FormElController>
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormDateInput
                control={control}
                helperText={errors[FormFieldKey.INVOICE_DATE]?.message}
                labelText="Дата счёта"
                maxDate={maxDate}
                minDate={minDate}
                name={FormFieldKey.INVOICE_DATE}
              />
              <FormDateInput
                control={control}
                helperText={errors[FormFieldKey.PAYMENT_DATE]?.message}
                labelText="Дата оплаты счёта"
                maxDate={maxDate}
                minDate={minDate}
                name={FormFieldKey.PAYMENT_DATE}
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
