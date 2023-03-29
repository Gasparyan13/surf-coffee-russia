import { yupResolver } from '@hookform/resolvers/yup'
import React, { memo, useCallback, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ServerError } from '@common/types/Errors'

import {
  ERROR_MESSAGE_500,
  ERROR_NO_ACCESS_MESSAGE,
  ERROR_VALIDATION_MESSAGE,
} from '@constants'

import { DateHelper } from '@helpers'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

import { getServerErrorStatus } from '@utils'

import {
  PostTimetablePlannedSlotsApiArg,
  usePostTimetablePlannedSlotsMutation,
} from '@rtkApi/modules/__generated__/timetable'

import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'
import * as T from './DialogAddEmployeeShift.types'
import { DialogFormData } from './DialogAddEmployeeShift.types'
import { FormShiftDialog } from './components/FormShiftDialog/FormShiftDialog'
import { defaultValues, schema } from './constants/form'
import {
  ERROR_TIMESLOT_FOR_WORKER,
  SUCCESS_ADDED_TIMESLOT,
} from './constants/messages'
import { EDuty } from './types/enums'

export const DialogAddEmployeeShift: React.FC<T.Props> = memo(
  ({ setShowShiftDialog, isOpen, onRefetch }) => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

    const {
      handleSubmit,
      control,
      watch,
      setValue,
      reset,
      formState: { isDirty },
    } = useForm<DialogFormData>({
      defaultValues,
      resolver: yupResolver(schema),
      mode: 'all',
    })

    const workerId = watch('employee')
    const presetId = watch('presetId')

    const [apiCreatePlannedSlots] = usePostTimetablePlannedSlotsMutation()

    const handleCloseShiftDialog = useCallback(() => {
      setShowShiftDialog(false)
      if (isDirty) setShowConfirmationDialog(true)
    }, [isDirty])

    const handleAddNewShift = useCallback(
      handleSubmit(async (data) => {
        try {
          const {
            employee,
            shiftStart,
            shiftEnd,
            date,
            dutyMorning,
            dutyEvening,
          } = data

          const newFormatDate = DateHelper.toServerDateFormat(date)

          const fetchData: PostTimetablePlannedSlotsApiArg = {
            plannedTimeSlotCreateDto: {
              workerId: employee as number,
              start: DateHelper.toFormat(
                `${newFormatDate}T${shiftStart}`,
                "yyyy-MM-dd'T'HH:mm:ssxxx",
              ),
              end: DateHelper.toFormat(
                `${newFormatDate}T${shiftEnd}`,
                "yyyy-MM-dd'T'HH:mm:ssxxx",
              ),
              onMorningDuty: dutyMorning === EDuty.On,
              onEveningDuty: dutyEvening === EDuty.On,
            },
          }

          await apiCreatePlannedSlots(fetchData).unwrap()
          await onRefetch()
          setShowShiftDialog(false)
          reset()
          toast.success(SUCCESS_ADDED_TIMESLOT)
        } catch (error) {
          const serverStatus = getServerErrorStatus(error as ServerError)

          if (serverStatus === 500) {
            return toast.error(ERROR_MESSAGE_500)
          }

          if (serverStatus === 400) {
            return toast.error(ERROR_VALIDATION_MESSAGE)
          }

          if (serverStatus === 409) {
            return toast.error(ERROR_TIMESLOT_FOR_WORKER)
          }

          return toast.error(ERROR_NO_ACCESS_MESSAGE)
        }
      }),
      [onRefetch],
    )

    const disabledButton = !workerId || !presetId

    const addNewShift: ButtonProps = {
      onClick: handleAddNewShift,
      text: 'Добавить',
      color: 'primary',
      disabled: disabledButton,
    }

    useLayoutEffect(() => () => reset(), [isOpen])

    return (
      <>
        <Dialog
          hasCloseIcon
          isOpen={isOpen}
          successButton={addNewShift}
          title="Добавить сотрудника в смену"
          onClose={handleCloseShiftDialog}>
          <FormShiftDialog
            control={control}
            handleAddNewShift={handleAddNewShift}
            setValue={setValue}
            watch={watch}
            onClose={handleCloseShiftDialog}
          />
        </Dialog>
        <ConfirmationDialog
          isOpen={showConfirmationDialog}
          reset={reset}
          setShowConfirmationDialog={setShowConfirmationDialog}
          setShowShiftDialog={setShowShiftDialog}
          onCloseDialog={handleCloseShiftDialog}
        />
      </>
    )
  },
)
