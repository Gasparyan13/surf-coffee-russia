import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { useCallback, useState } from 'react'

import { SvgCalendar24Icon } from '@common/IconComponents/SvgCalendar24Icon'
import { TextField } from '@common/uiKit'

import { DEFAULT_DATE_WITH_NAME_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import * as Styled from './DatePicker.styled'
import * as T from './DatePicker.types'
import { PickersDay } from './components/PickersDay'
import { adapterLocale } from './constants/adapterLocale'
import { INTERNAL_PICKER_FORMAT } from './constants/format'
import { PopperProps } from './constants/styles'

export const DatePicker: React.FC<T.Props> = ({
  size: rootSize,
  onAccept,
  onChange,
  helperText,
  error,
  labelText,
  placeholder,
  inputFormat = DEFAULT_DATE_WITH_NAME_FORMAT,
  views = ['year', 'month', 'day'],
  maxDate,
  minDate,
  disabled,
  openTo = 'day',
  inputReadOnly,
  ...rest
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (!disabled) setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const isFullInputFormat = inputFormat === DEFAULT_DATE_WITH_NAME_FORMAT

  const getParsedDate = useCallback(
    (value: string) => {
      if (
        isFullInputFormat &&
        value?.length === INTERNAL_PICKER_FORMAT.length
      ) {
        return DateHelper.toLocaleFormat(value, inputFormat)
      }
      return value ?? ''
    },
    [inputFormat, isFullInputFormat],
  )

  return (
    <LocalizationProvider
      adapterLocale={adapterLocale}
      dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        showDaysOutsideCurrentMonth
        PopperProps={PopperProps}
        components={{
          OpenPickerIcon: SvgCalendar24Icon,
        }}
        css={Styled.pickerIconCSS}
        dayOfWeekFormatter={(day) => `${day}`}
        disabled={disabled}
        // MUI needs to consume INTERNAL_PICKER_FORMAT to translate month to russian date correctly
        inputFormat={isFullInputFormat ? INTERNAL_PICKER_FORMAT : inputFormat}
        maxDate={maxDate}
        minDate={minDate}
        open={open}
        openTo={openTo}
        renderDay={PickersDay}
        renderInput={({
          size: _,
          inputProps: internalInputProps,
          ...params
        }) => {
          const parsedDate = getParsedDate(internalInputProps?.value)

          return (
            <TextField
              inputProps={{
                ...internalInputProps,
                value: parsedDate,
                autoComplete: 'off',
                placeholder: placeholder ?? DateHelper.toFormat(new Date()),
                readOnly: inputReadOnly,
              }}
              {...params}
              error={error}
              helperText={helperText}
              labelText={labelText}
              size={rootSize}
              onClick={handleOpen}
            />
          )
        }}
        views={views}
        onAccept={onAccept as T.MuiTypes['onAccept']}
        onChange={onChange as T.MuiTypes['onChange']}
        onClose={handleClose}
        {...rest}
      />
    </LocalizationProvider>
  )
}
