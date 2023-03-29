import { Dispatch, SetStateAction } from 'react'

import {
  ShiftsStep as ShiftsStepDto,
  ShiftData as ShiftDataDto,
} from '@rtkApi/modules/__generated__/spot_config'

import { createCtx } from '../../../../common/helpers/createCtx'
import { AllUseFormMethods } from '../../../../common/types/AllUseFormMethods'
import { WorkingDayForm } from '../containers/WorkingDay'

export type WorkingDayShiftData = {
  id?: string
} & Required<ShiftDataDto>

export type WorkingDayShiftLayout = {
  weekdays: WorkingDayShiftData[]
  weekends: WorkingDayShiftData[]
}

export type WorkingDayShiftsStep = {
  preset: WorkingDayShiftLayout
  manual: WorkingDayShiftLayout
} & Omit<ShiftsStepDto, 'preset' | 'manual'>

export const [useWorkingDayPageCtx, WorkingDayPageProvider] = createCtx<
  {
    shiftStepsValues: WorkingDayShiftsStep
    setShiftStepsValues: Dispatch<SetStateAction<WorkingDayShiftsStep>>
  } & AllUseFormMethods<WorkingDayForm>
>()
