import React, { useCallback, useMemo, useRef, useState } from 'react'

import { WARNING_DATA_LOSS } from '@common/constants'

import { useLocationQuery } from '@hooks'

import { Dialog, Drawer } from '@uiKit'

import { getEmptyFiltersArray } from '@pages/Operations/utils/getters'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import { FiltersForm } from '../FiltersForm'
import { Filters } from '../FiltersForm/FiltersForm.types'
import * as T from './FiltersDrawer.types'

export const FiltersDrawer: React.FC<T.Props> = ({ open, onClose }) => {
  const [openConfirm, setOpenConfirm] = useState(false)
  const formRef = useRef<T.FiltersFormRefType>(null)

  const { get, set } = useLocationQuery()

  const articleId = get(OperationsReportUrlSearchParams.articleId)
  const articleName = get(OperationsReportUrlSearchParams.articleName)
  const contractorId = get(OperationsReportUrlSearchParams.contractorId)
  const contractorName = get(OperationsReportUrlSearchParams.contractorName)
  const maxAmount = get(OperationsReportUrlSearchParams.maxAmount)
  const minAmount = get(OperationsReportUrlSearchParams.minAmount)
  const operationKind = get(OperationsReportUrlSearchParams.operationKind)
  const operationType = get(OperationsReportUrlSearchParams.operationType)

  const formUrlValues = useMemo(
    () =>
      ({
        amount: {
          max: maxAmount || undefined,
          min: minAmount || undefined,
        },
        operationKind,
        operationType,
        article: articleId ? { id: +articleId, name: articleName! } : null,
        contractor: contractorId
          ? { id: +contractorId, alias: contractorName! }
          : null,
      } as Filters),
    [
      articleId,
      articleName,
      contractorId,
      contractorName,
      maxAmount,
      minAmount,
      operationKind,
      operationType,
    ],
  )

  const handleResetFilters = useCallback(() => {
    set(getEmptyFiltersArray())
    onClose()
  }, [onClose, set])

  const handleCloseConfirmDialog = useCallback(() => setOpenConfirm(false), [])

  const handleOpenConfirmDialog = useCallback(() => {
    if (formRef.current?.isDirty) {
      setOpenConfirm(true)
    } else {
      onClose()
    }
  }, [onClose])

  const handleCancelChangesAndCloseDrawer = useCallback(() => {
    onClose()
    setOpenConfirm(false)
  }, [onClose])

  const handleSubmit = useCallback(() => {
    formRef.current?.onSubmit()
  }, [])

  const handleApplyFilters = useCallback(
    async (data: Filters) => {
      set([
        {
          key: OperationsReportUrlSearchParams.operationType,
          value: data.operationType || null,
        },
        {
          key: OperationsReportUrlSearchParams.operationKind,
          value: data.operationKind || null,
        },
        {
          key: OperationsReportUrlSearchParams.contractorId,
          value: data.contractor?.id || null,
        },
        {
          key: OperationsReportUrlSearchParams.contractorName,
          value: data.contractor?.alias || null,
        },
        {
          key: OperationsReportUrlSearchParams.articleId,
          value: data.article?.id || null,
        },
        {
          key: OperationsReportUrlSearchParams.articleName,
          value: data.article?.name || null,
        },
        {
          key: OperationsReportUrlSearchParams.minAmount,
          value: data.amount.min || null,
        },
        {
          key: OperationsReportUrlSearchParams.maxAmount,
          value: data.amount.max || null,
        },
      ])

      onClose()
    },
    [onClose, set],
  )

  return (
    <>
      <Drawer
        footerProps={{
          cancelButtonProps: {
            onClick: handleResetFilters,
            children: 'Сбросить',
          },
          successButtonProps: {
            onClick: handleSubmit,
            children: 'Применить',
          },
        }}
        headerProps={{
          title: 'Фильтры',
          closeButtonProps: {
            onClick: handleOpenConfirmDialog,
          },
        }}
        open={open}
        onClose={handleOpenConfirmDialog}>
        <FiltersForm
          ref={formRef}
          initialValues={formUrlValues}
          onComplete={handleApplyFilters}
        />
      </Drawer>
      <Dialog
        cancelButton={{
          onClick: handleCloseConfirmDialog,
          isVisible: true,
          text: 'Отменить',
          color: 'secondary',
        }}
        isOpen={openConfirm}
        successButton={{
          onClick: handleCancelChangesAndCloseDrawer,
          text: 'Закрыть',
        }}
        title={WARNING_DATA_LOSS}
        onClose={handleCloseConfirmDialog}
      />
    </>
  )
}
