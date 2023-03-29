import React, { memo, useCallback } from 'react'
import { UseFormReset } from 'react-hook-form'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton/DialogButton.types'

import { useWorkerEmployeeIdCtx } from '../../containers/WorkersEmployeeCtx'
import { AddEmployeeForm } from './DialogAddEmployee.types'

type Props = {
  openEditConfirm: boolean
  setOpenEditConfirm: React.Dispatch<React.SetStateAction<boolean>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
  openEditModal: boolean
  reset: UseFormReset<AddEmployeeForm>
}

export const ApproveCancelDialog: React.FC<Props> = memo(
  ({
    openEditConfirm,
    setOpenEditConfirm,
    setOpenEditModal,
    openEditModal,
    reset,
  }) => {
    const { employeeId, setEmployeeId } = useWorkerEmployeeIdCtx()

    const handleApproveCloseEditConfirm = useCallback(() => {
      setOpenEditModal(false)
      setOpenEditConfirm(false)
      setEmployeeId(0)
      reset()
    }, [employeeId, openEditModal])

    const handleCloseEditConfirm = useCallback(() => {
      setOpenEditConfirm(false)
      setOpenEditModal(true)
    }, [])

    const successApprove: ButtonProps = {
      onClick: handleApproveCloseEditConfirm,
      text: 'Да',
      isVisible: true,
    }

    const cancelApprove: ButtonProps = {
      onClick: handleCloseEditConfirm,
      text: 'Нет',
      isVisible: true,
      color: 'secondary',
    }

    return (
      <Dialog
        cancelButton={cancelApprove}
        isOpen={openEditConfirm}
        successButton={successApprove}
        title="Вы действительно хотите отменить редактирование сотрудника?"
        onClose={handleCloseEditConfirm}
      />
    )
  },
)
