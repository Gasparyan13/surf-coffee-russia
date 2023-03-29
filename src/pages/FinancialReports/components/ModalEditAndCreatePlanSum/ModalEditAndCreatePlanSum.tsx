import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { mt } from '@common/common.styled'
import { MuiModal } from '@common/newUi/MuiModal/MuiModal'
import { ServerError } from '@common/types/Errors'

import {
  ERROR_NO_ACCESS_MESSAGE,
  ERROR_VALIDATION_MESSAGE,
  PATHS,
} from '@constants'

import { DateHelper } from '@helpers'

import { useTriggerInputFocus } from '@hooks'

import { CurrencyField, FormLabel } from '@uiKit'

import { getLastDayOfMonth, getServerErrorStatus } from '@utils'

import {
  DeleteFinancialPlanAdjustmentsApiArg,
  PlanAdjustmentCreateDto,
  useLazyGetFinancialPlanAdjustmentsQuery,
} from '@rtkApi/modules/__generated__/financial'
import {
  useDeleteFinancialPlanAdjustmentsMutation,
  usePostFinancialPlanAdjustmentsMutation,
} from '@rtkApi/modules/enhancements/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { patchButtonSumCSS } from './ModalEditAndCreatePlanSum.styled'
import * as T from './ModalEditAndCreatePlanSum.types'
import { defaultValues, schema } from './constants/form'
import { ERROR_MESSAGE_AMOUNT_ADJUSTMENT } from './constants/messages'

export const ModalEditAndCreatePlanSum: React.FC<T.Props> = ({
  open,
  onClose,
  date,
  budgetItemId,
  title,
  budgetItemName,
}) => {
  const { inputRef, triggerInputRef } = useTriggerInputFocus()
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<T.PatchSumData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const enterpriseId = useSelector(getManagerCurrentProjectId) as number

  const [apiCreateAdjustment] = usePostFinancialPlanAdjustmentsMutation()
  const [apiGetAdjustment, { data: getDataAdjustment }] =
    useLazyGetFinancialPlanAdjustmentsQuery()
  const [apiDeleteAdjustment] = useDeleteFinancialPlanAdjustmentsMutation()

  useEffect(() => {
    if (budgetItemId && date && open) {
      const newOnlyDate = DateHelper.toServerDateFormat(DateHelper.toDate(date))

      apiGetAdjustment({
        enterpriseId: enterpriseId as number,
        date: newOnlyDate,
        budgetItemId,
      })
    }
  }, [date, budgetItemId, open])

  useEffect(() => {
    if (getDataAdjustment) {
      if (String(getDataAdjustment?.money) !== '0.00') {
        setValue('sum', `${getDataAdjustment?.money ?? ''}`)

        triggerInputRef()
      }
    }
  }, [getDataAdjustment])

  const handlePatchSum = handleSubmit(async (data: T.PatchSumData) => {
    if (!budgetItemId || !enterpriseId) return

    const { sum } = data
    const newDate = DateHelper.toDate(date)
    const year = String(newDate.getFullYear())
    const month = String(newDate.getMonth() + 1).padStart(2, '0')
    const lastDay = String(
      getLastDayOfMonth(newDate.getFullYear(), newDate.getMonth()),
    )
    const money = Number(sum?.split(' ').join(''))
    const planDate = `${year}-${month}-${lastDay}`
    const planAdjustmentCreateDto: PlanAdjustmentCreateDto = {
      enterpriseId,
      budgetItemId,
      money,
      planDate,
    }
    const deleteAdjustments: DeleteFinancialPlanAdjustmentsApiArg = {
      enterpriseId,
      date: planDate,
      budgetItemId,
    }
    if (
      (!money && getDataAdjustment?.money) ||
      (money === 0 && getDataAdjustment?.money)
    ) {
      try {
        await apiDeleteAdjustment(deleteAdjustments).unwrap()
        onClose()
      } catch (error) {
        const status = getServerErrorStatus(error as ServerError)

        if (status === 409) {
          toast.error(ERROR_MESSAGE_AMOUNT_ADJUSTMENT)
        }
        if (status === 403) {
          toast.error(ERROR_NO_ACCESS_MESSAGE)
        }
      }
    }

    if (money) {
      try {
        await apiCreateAdjustment({ planAdjustmentCreateDto }).unwrap()
        onClose()
      } catch (error) {
        const status = getServerErrorStatus(error as ServerError)

        if (status === 409) {
          toast.error(ERROR_VALIDATION_MESSAGE)
        }
        if (status === 403) {
          toast.error(ERROR_NO_ACCESS_MESSAGE)
        }
      }
    }
  })

  return (
    <MuiModal
      iconBack={false}
      open={Boolean(open)}
      title={`Плановая сумма за ${title}`}
      onClose={onClose}>
      <form onSubmit={handlePatchSum}>
        <Grid container>
          <Grid item xs={12}>
            <Grid item css={mt(24)}>
              <FormLabel disabled text="Статья">
                <Controller
                  control={control}
                  name="expenseType"
                  render={() => (
                    <TextField
                      disabled
                      fullWidth
                      placeholder=""
                      value={budgetItemName}
                      variant="outlined"
                    />
                  )}
                />
              </FormLabel>
            </Grid>
            <Grid item css={mt(20)}>
              <FormLabel text="Сумма">
                <Controller
                  control={control}
                  name="sum"
                  render={({ field: { value, onChange } }) => (
                    <CurrencyField
                      fullWidth
                      error={!!errors?.sum}
                      helperText={errors?.sum && errors.sum?.message}
                      inputProps={{
                        ref: inputRef,
                      }}
                      name={`${PATHS.financialReports.main}.modal.planAdjustments.sum`}
                      placeholder="Например, 100 000 000"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </FormLabel>
            </Grid>
            <Grid item css={mt(40)}>
              <Button css={patchButtonSumCSS} type="submit">
                Добавить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MuiModal>
  )
}
