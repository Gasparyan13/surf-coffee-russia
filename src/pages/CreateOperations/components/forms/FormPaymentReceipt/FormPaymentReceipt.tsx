import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { pr } from '@common/common.styled'
import { FormRowLayout } from '@common/components/FormRowLayout'
import { ServerError } from '@common/types/Errors'
import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import { useScrollToError } from '@hooks'

import { getCommonMinDate } from '@utils'

import {
  getExpensesData,
  getServerErrorMessage,
} from '@pages/CreateOperations/utils/getters'

import {
  ReceiptCreateDto,
  ReceiptExpenseCreateDto,
  ReceiptUpdateDto,
  usePostFinancialReceiptsMutation,
  usePutFinancialReceiptsMutation,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { RefType } from '../../../containers/Main/Main.types'
import { useEditOperationFormData } from '../../../hooks/useEditOperationFormData'
import { useFileUpload } from '../../../hooks/useFileUpload'
import { FormContractorInput } from '../components/FormContractorInput'
import { FormDateInput } from '../components/FormDateInput'
import { FormExpenses } from '../components/FormExpenses'
import { FormFileAttachmentInput } from '../components/FormFileAttachmentInput'
import * as Styled from './FormPaymentReceipt.styled'
import * as T from './FormPaymentReceipt.types'
import { defaultValues } from './constants/defaultValues'
import { FormFieldKey } from './constants/enums'
import {
  ERROR_MESSAGE_ADD_PAYMENT_RECEIPT,
  ERROR_MESSAGE_EDIT_PAYMENT_RECEIPT,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_PAYMENT_RECEIPT,
  SUCCESS_EDIT_PAYMENT_RECEIPT,
} from './constants/messages/sucess'
import { schema } from './constants/schema'

export const FormPaymentReceipt = forwardRef<RefType, T.Props>(
  ({ onComplete, editOperationId, onDisabled }, ref) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)

    const [apiPostFinancialReceipt] = usePostFinancialReceiptsMutation()
    const [apiEditFinancialReceipt] = usePutFinancialReceiptsMutation()

    const {
      handleSubmit: onSubmit,
      control,
      formState: { errors, isDirty },
      setError,
      clearErrors,
      reset,
      watch,
    } = useForm<T.CreatePaymentReceiptForm>({
      defaultValues,
      resolver: yupResolver(schema),
    })

    const documentField = watch(
      FormFieldKey.DOCUMENT,
    ) as T.CreatePaymentReceiptForm['document']

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
        if (documentInfo && formData.document) {
          handleWatchApiDocument({
            file: formData.document,
            info: documentInfo,
          })
        }

        reset(
          {
            contractor: formData.contractor,
            documentDate: formData.operationDate,
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
      onSubmit(async (formData: T.CreatePaymentReceiptForm) => {
        const { document, documentDate, contractor, expenses } = formData
        if (!enterpriseId) return

        try {
          const fileUploadData = await handleUploadDocument({
            documentType: 'CHECK',
            document: document!,
          })

          const commonDtoFields: ReceiptCreateDto | ReceiptUpdateDto = {
            enterpriseId,
            expenses: getExpensesData(expenses) as ReceiptExpenseCreateDto[],
            contractorId: contractor!.id!,
            receiptDate: DateHelper.toServerDateFormat(documentDate!),
            document: fileUploadData,
          }

          if (editOperationId) {
            await apiEditFinancialReceipt({
              receiptUpdateDto: {
                ...commonDtoFields,
                id: editOperationId,
              },
            }).unwrap()
          } else {
            await apiPostFinancialReceipt({
              receiptCreateDto: {
                ...commonDtoFields,
              },
            }).unwrap()
          }

          onComplete([
            PATHS.financialReports.pnl,
            PATHS.financialReports.cashFlow,
          ])
          toast.success(
            editOperationId
              ? SUCCESS_EDIT_PAYMENT_RECEIPT
              : SUCCESS_ADD_PAYMENT_RECEIPT,
          )
        } catch (e) {
          toast.error(
            getServerErrorMessage(
              e as ServerError,
              editOperationId
                ? ERROR_MESSAGE_EDIT_PAYMENT_RECEIPT
                : ERROR_MESSAGE_ADD_PAYMENT_RECEIPT,
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
        <Grid container css={pr(5)} spacing={4}>
          <Grid item xs={12}>
            <FormExpenses
              isPurchase // Чек это всегда покупка
              control={control}
              name={FormFieldKey.EXPENSES}
              operationType={EOperationsType.Receipt}
            />
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <FormContractorInput
                control={control}
                errors={errors}
                name={FormFieldKey.CONTRACTOR}
              />
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
          <Grid item xs={12}>
            <FormRowLayout>
              <FormDateInput
                control={control}
                helperText={errors[FormFieldKey.DOCUMENT_DATE]?.message}
                labelText="Дата документа"
                maxDate={new Date()}
                minDate={getCommonMinDate()}
                name={FormFieldKey.DOCUMENT_DATE}
              />
            </FormRowLayout>
          </Grid>
        </Grid>
      </Styled.Root>
    )
  },
)
