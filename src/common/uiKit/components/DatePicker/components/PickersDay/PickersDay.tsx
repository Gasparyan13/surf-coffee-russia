import {
  PickersDay as MuiPickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers'
import React from 'react'

import { DateHelper } from '../../../../../helpers'
import { getPickersDaySX } from '../../utils/getPickersDayProps'

export const PickersDay = (
  date: Date,
  selectedDates: Array<Date>,
  pickersDayProps: PickersDayProps<Date>,
) => {
  const isWeekend = DateHelper.isWeekend(date)

  return <MuiPickersDay {...pickersDayProps} sx={getPickersDaySX(isWeekend)} />
}
