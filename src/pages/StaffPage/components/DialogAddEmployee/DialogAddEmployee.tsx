/* eslint-disable max-lines */
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { ServerError } from '@common/types/Errors'

import { PATHS } from '@constants'

import { CurrencyField, Dialog, TextField } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

import {
  PatchEnterpriseWorkersApiArg,
  PostEnterpriseWorkersApiArg,
  useLazyGetEnterpriseWorkersByIdQuery,
  usePatchEnterpriseWorkersMutation,
  usePostEnterpriseWorkersMutation,
} from '@rtkApi/modules/__generated__/enterprise'
import { useLazyGetControlPanelEnterprisesByIdNameQuery } from '@rtkApi/modules/enhancements/control_panel'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { useWorkerEmployeeIdCtx } from '../../containers/WorkersEmployeeCtx'
import { ApproveCancelDialog } from './ApproveCancelDialog'
import { DeleteEmployeeDialog } from './DeleteEmployeeDialog'
import { Styled } from './DialogAddEmployee.styled'
import * as T from './DialogAddEmployee.types'
import { defaultValues, schema } from './constants/forms'
import {
  ERROR_MESSAGE_ADD_EMPLOYEE,
  ERROR_MESSAGE_EDIT_EMPLOYEE,
  ERROR_MESSAGE_FETCH_EDIT_EMPLOYEE,
  ERROR_MESSAGE_FETCH_SPOT_NAME,
  SUCCESS_MESSAGE_ADD_EMPLOYEE,
  SUCCESS_MESSAGE_EDIT_EMPLOYEE,
} from './constants/messages'

export const DialogAddEmployee: React.FC<T.Props> = ({
  isOpenCreateEmployee,
  setModal,
  onRefetch,
}) => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)
  const { employeeId, setEmployeeId } = useWorkerEmployeeIdCtx()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openEditConfirm, setOpenEditConfirm] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isValid, isDirty },
  } = useForm<T.AddEmployeeForm>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const [apiCreateWorker, { isLoading: isLoadingCreateWorker }] =
    usePostEnterpriseWorkersMutation()
  const [apiPatchWorker, { isLoading: isLoadingEditWorker }] =
    usePatchEnterpriseWorkersMutation()
  const [apiGetWorkerById, { isFetching: isFetchingGetWorker }] =
    useLazyGetEnterpriseWorkersByIdQuery()
  const [apiGetProjectNameById, { isFetching: isFetchingGetName }] =
    useLazyGetControlPanelEnterprisesByIdNameQuery()

  const moneyTransform = (amount: string) => Number(amount?.split(' ').join(''))

  const handleAddNewEmployee = handleSubmit(async (data) => {
    if (!isDirty) {
      setOpenEditModal(false)
      setModal(false)
      return
    }

    try {
      const { firstAndLastName, email, payRate } = data

      if (employeeId) {
        const params: PatchEnterpriseWorkersApiArg = {
          enterpriseWorkerUpdateDto: {
            id: employeeId,
            firstAndLastName,
            payRate: moneyTransform(payRate),
          },
        }

        await apiPatchWorker(params).unwrap()
        toast.success(SUCCESS_MESSAGE_EDIT_EMPLOYEE)
        setEmployeeId(0)
      } else {
        const params: PostEnterpriseWorkersApiArg = {
          enterpriseWorkerCreateDto: {
            firstAndLastName,
            email,
            payRate: moneyTransform(payRate),
            roleId: 2,
            enterpriseId: enterpriseId!,
          },
        }

        await apiCreateWorker(params).unwrap()
        toast.success(SUCCESS_MESSAGE_ADD_EMPLOYEE)
      }

      setOpenEditModal(false)
      setModal(false)
      onRefetch({ enterpriseId })
      reset()
    } catch (error) {
      const currentError = error as ServerError

      if ('data' in currentError && typeof currentError.data === 'string')
        return toast.error(currentError.data)

      if (employeeId) {
        toast.error(ERROR_MESSAGE_EDIT_EMPLOYEE)
      } else {
        toast.error(ERROR_MESSAGE_ADD_EMPLOYEE)
      }
    }
  })

  const handleCloseModal = useCallback(() => {
    if (isDirty) {
      setModal(false)
      return setOpenConfirm(true)
    }
    return setModal(false)
  }, [isDirty, setModal])

  const handleCloseConfirm = useCallback(() => {
    setOpenConfirm(false)
    setModal(true)
  }, [setModal])

  const handleApproveClose = useCallback(() => {
    reset()
    setModal(false)
    setOpenConfirm(false)
  }, [reset, setModal])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) =>
      !/[0-9]/.test(e.key) && e.preventDefault(),
    [],
  )

  const handleDeleteEmployee = useCallback(() => {
    setOpenDeleteConfirm(true)
    setOpenEditModal(false)
  }, [])

  const handleCloseEditModal = useCallback(() => {
    if (isDirty) {
      setOpenEditConfirm(true)
      return setOpenEditModal(false)
    }

    setOpenEditModal(false)
    reset()
    setEmployeeId(0)
  }, [isDirty, reset, setEmployeeId])

  const fetchEditEmployee = useCallback(
    async (id: number) => {
      try {
        const { firstAndLastName, email, payRate } = await apiGetWorkerById({
          id,
        }).unwrap()

        setValue('firstAndLastName', firstAndLastName!)
        setValue('email', email!)
        setValue('payRate', String(payRate!))
      } catch (e) {
        toast.error(ERROR_MESSAGE_FETCH_EDIT_EMPLOYEE)
      }
    },
    [apiGetWorkerById, setValue],
  )

  const setProjectName = useCallback(async () => {
    try {
      const name = await apiGetProjectNameById({
        id: enterpriseId!,
      }).unwrap()

      setValue('spot', name)
    } catch (e) {
      toast.error(ERROR_MESSAGE_FETCH_SPOT_NAME)
    }
  }, [apiGetProjectNameById, enterpriseId, setValue])

  const openEditDialog = useCallback(() => {
    if (!employeeId) return

    fetchEditEmployee(employeeId!)
    setProjectName()

    setOpenEditModal(true)
  }, [employeeId, fetchEditEmployee, setProjectName])

  const titleDialog = isOpenCreateEmployee
    ? 'Добавить сотрудника'
    : 'Редактировать'

  const successTextDialog = employeeId ? 'Сохранить' : 'Добавить'

  const isLoadingDialogEmployee =
    isFetchingGetWorker ||
    isFetchingGetName ||
    isLoadingEditWorker ||
    isLoadingCreateWorker

  const isDisableSuccessButton =
    !isValid || isLoadingCreateWorker || isLoadingEditWorker

  const successButton: ButtonProps = {
    onClick: handleAddNewEmployee,
    text: successTextDialog,
    disabled: isDisableSuccessButton,
    isVisible: true,
  }

  const cancelButton: ButtonProps = {
    onClick: handleDeleteEmployee,
    text: 'Удалить',
    isVisible: openEditModal,
    color: 'critical',
    disabled: isFetchingGetWorker || isFetchingGetName,
  }

  const successApprove: ButtonProps = {
    onClick: handleApproveClose,
    text: 'Да',
    isVisible: true,
  }

  const cancelApprove: ButtonProps = {
    onClick: handleCloseConfirm,
    text: 'Нет',
    isVisible: true,
    color: 'secondary',
  }

  useEffect(() => {
    if (employeeId) openEditDialog()
  }, [employeeId])

  useEffect(() => {
    if (isOpenCreateEmployee) setProjectName()
  }, [isOpenCreateEmployee])

  return (
    <>
      <Dialog
        hasCloseIcon
        cancelButton={cancelButton}
        isOpen={isOpenCreateEmployee || openEditModal}
        successButton={successButton}
        title={titleDialog}
        onClose={openEditModal ? handleCloseEditModal : handleCloseModal}>
        {isLoadingDialogEmployee ? (
          <Styled.Loader>
            <AppLoader />
          </Styled.Loader>
        ) : (
          <form onSubmit={handleAddNewEmployee}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="firstAndLastName"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <TextField
                      autoFocus
                      fullWidth
                      color="primary"
                      error={!!error}
                      helperText={error && error.message}
                      inputProps={{
                        autoComplete: 'off',
                      }}
                      labelText="Имя и фамилия"
                      name={`${PATHS.staff.employeesList}.firstAndLastName`}
                      placeholder="Например, Иван Иванов"
                      value={value}
                      variant="outlined"
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="email"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      color="primary"
                      disabled={Boolean(employeeId)}
                      error={!!error}
                      helperText={error && error.message}
                      inputProps={{
                        autoComplete: 'off',
                      }}
                      labelText="E-mail"
                      name={`${PATHS.staff.employeesList}.emailNewEmployee`}
                      placeholder="name@surname.com"
                      value={value}
                      variant="outlined"
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="payRate"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <CurrencyField
                      fullWidth
                      error={!!error}
                      helperText={error && error.message}
                      inputProps={{
                        autoComplete: 'off',
                        readOnly: false,
                      }}
                      integerLimit={4}
                      labelText="Ставка/в час"
                      name={`${PATHS.staff.employeesList}.payRateEmployee`}
                      placeholder="Например, 500"
                      value={value}
                      onChange={(arg) => onChange(arg ?? '')}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="jobTitle"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      disabled
                      fullWidth
                      labelText="Должность"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="spot"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      disabled
                      fullWidth
                      labelText="Спот"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Dialog>
      <Dialog
        cancelButton={cancelApprove}
        isOpen={openConfirm}
        successButton={successApprove}
        title="Вы действительно хотите отменить добавление сотрудника?"
        onClose={handleCloseConfirm}
      />
      <ApproveCancelDialog
        openEditConfirm={openEditConfirm}
        openEditModal={openEditModal}
        reset={reset}
        setOpenEditConfirm={setOpenEditConfirm}
        setOpenEditModal={setOpenEditModal}
      />
      <DeleteEmployeeDialog
        openDeleteConfirm={openDeleteConfirm}
        reset={reset}
        setOpenDeleteConfirm={setOpenDeleteConfirm}
        setOpenEditModal={setOpenEditModal}
        onRefetch={onRefetch}
      />
    </>
  )
}
