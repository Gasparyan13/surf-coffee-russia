import React, { useCallback } from 'react'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

import * as T from './ConfirmationDialog.types'
import { CANCEL_ADDING_EMPLOYEE_TITLE } from './constants/messages'

export const ConfirmationDialog: React.FC<T.Props> = ({
  isOpen,
  reset,
  setShowConfirmationDialog,
  setShowShiftDialog,
}) => {
  const handleApproveCloseDialog = useCallback(() => {
    setShowConfirmationDialog(false)
    reset()
  }, [])

  const handleCloseConfirm = useCallback(() => {
    setShowConfirmationDialog(false)
    setShowShiftDialog(true)
  }, [])

  const successApprove: ButtonProps = {
    onClick: handleApproveCloseDialog,
    text: 'Да',
    isVisible: true,
  }

  const cancelApprove: ButtonProps = {
    onClick: handleCloseConfirm,
    text: 'Нет',
    isVisible: true,
    color: 'secondary',
  }
  return (
    <Dialog
      cancelButton={cancelApprove}
      isOpen={isOpen}
      successButton={successApprove}
      title={CANCEL_ADDING_EMPLOYEE_TITLE}
      onClose={handleApproveCloseDialog}
    />
  )
}
