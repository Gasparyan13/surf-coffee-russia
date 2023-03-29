import React, { memo, useCallback } from 'react'
import { UseFormReset } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { ServerError } from '@common/types/Errors'

import { ERROR_NO_ACCESS_MESSAGE } from '@constants'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

import { getServerErrorStatus } from '@utils'

import { useDeleteEnterpriseWorkersByIdMutation } from '@rtkApi/modules/enhancements/enterprise'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { useWorkerEmployeeIdCtx } from '../../containers/WorkersEmployeeCtx'
import { AddEmployeeForm } from './DialogAddEmployee.types'
import {
  ERROR_MESSAGE_EMPLOYEE_NOT_FOUND,
  SUCCESS_MESSAGE_DELETE_EMPLOYEE,
} from './constants/messages'

type Props = {
  onRefetch: (arg: { enterpriseId?: number }) => void
  openDeleteConfirm: boolean
  setOpenDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
  reset: UseFormReset<AddEmployeeForm>
}

export const DeleteEmployeeDialog: React.FC<Props> = memo(
  ({
    openDeleteConfirm,
    setOpenDeleteConfirm,
    onRefetch,
    setOpenEditModal,
    reset,
  }) => {
    const enterpriseId = useSelector(getManagerCurrentProjectId)
    const { employeeId, setEmployeeId } = useWorkerEmployeeIdCtx()

    const [apiDeletedWorker] = useDeleteEnterpriseWorkersByIdMutation()

    const renderError = (error: ServerError) => {
      const status = getServerErrorStatus(error)

      if (status === 400) {
        return toast.error(ERROR_MESSAGE_EMPLOYEE_NOT_FOUND)
      }

      return toast.error(ERROR_NO_ACCESS_MESSAGE)
    }

    const handleApproveDeleteEmployee = useCallback(async () => {
      try {
        await apiDeletedWorker({ id: employeeId! }).unwrap()
        setOpenDeleteConfirm(false)
        onRefetch({ enterpriseId })
        setEmployeeId(0)
        reset()
        toast.success(SUCCESS_MESSAGE_DELETE_EMPLOYEE)
      } catch (e) {
        renderError(e as ServerError)
      }
    }, [employeeId, enterpriseId])

    const handleCloseDeleteConfirm = useCallback(() => {
      setOpenDeleteConfirm(false)
      setOpenEditModal(true)
    }, [])

    const successDelete: ButtonProps = {
      onClick: handleApproveDeleteEmployee,
      text: 'Удалить',
      isVisible: true,
    }

    const cancelDelete: ButtonProps = {
      onClick: handleCloseDeleteConfirm,
      text: 'Отменить',
      isVisible: true,
      color: 'secondary',
    }

    return (
      <Dialog
        cancelButton={cancelDelete}
        isOpen={openDeleteConfirm}
        successButton={successDelete}
        title={
          <>
            Вы уверены, что хотите удалить <br /> сотрудника из списка?
          </>
        }
        onClose={handleCloseDeleteConfirm}
      />
    )
  },
)
