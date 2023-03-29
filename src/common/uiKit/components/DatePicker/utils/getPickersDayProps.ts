import { SxProps, Theme } from '@mui/material'
import { pickersDayClasses } from '@mui/x-date-pickers'

import { theme } from '@providers/ThemeProvider/theme'

import {
  ActiveCSS,
  CurrentCSS,
  DisabledCSS,
  HoverCSS,
  SelectedCSS,
  TextCSS,
} from '../constants/styles'

export const getPickersDaySX = (isWeekend: boolean): SxProps<Theme> => ({
  [`&&.${pickersDayClasses.root}`]: {
    marginBottom: '2px',
    color: isWeekend ? theme.colors.critical : theme.colors.black,
    ...TextCSS,
  },
  [`&&.${pickersDayClasses.root}:hover`]: HoverCSS,
  [`&&.${pickersDayClasses.root}:active`]: ActiveCSS,
  [`&&.${pickersDayClasses.today}`]: CurrentCSS,
  [`&&.${pickersDayClasses.selected}`]: SelectedCSS,
  [`&&.${pickersDayClasses.disabled}`]: DisabledCSS,
  [`&&.${pickersDayClasses.dayOutsideMonth}`]: {
    color: theme.colors.pencil,
  },
})
