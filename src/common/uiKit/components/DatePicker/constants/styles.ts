import { PopperProps as PopperPropsType } from '@mui/material/Popper/Popper'

import { theme } from '@providers/ThemeProvider/theme'

export const TextCSS = {
  fontSize: 14,
  userSelect: 'none',
}

export const SelectedCSS = {
  backgroundColor: theme.colors.grey,
  border: `1px solid ${theme.colors.asphaltLight}`,
  fontWeight: 700,
  color: theme.colors.black,
}

export const CurrentCSS = {
  border: `1px solid ${theme.colors.wetAsphalt}`,
  backgroundColor: theme.colors.white,
}

export const HoverCSS = {
  backgroundColor: theme.colors.asphalt,
  color: theme.colors.white,
  borderColor: theme.colors.asphalt,
}

export const ActiveCSS = {
  backgroundColor: theme.colors.wetAsphalt,
  color: theme.colors.white,
  borderColor: theme.colors.wetAsphalt,
}

export const DisabledCSS = {
  backgroundColor: theme.colors.grey,
  color: theme.colors.pencil,
  cursor: 'default',
}

export const PopperProps: Partial<PopperPropsType> = {
  sx: {
    '& .MuiCalendarPicker-root': { maxHeight: 360 },
    '& .MuiCalendarPicker-root > div': { marginTop: '23px' },
    '& .PrivatePickersSlideTransition-root': {
      overflow: 'hidden',
      minHeight: '250px',
    },
    '&& .PrivatePickersFadeTransitionGroup-root': {
      textTransform: 'capitalize',
      color: theme.colors.wetAsphalt,
      fontWeight: 'bold',
      marginTop: 0,
    },

    '& .PrivatePickersYear-yearButton': {
      color: theme.colors.black,
      ...TextCSS,
    },
    '& .PrivatePickersYear-yearButton.Mui-selected, & .PrivatePickersYear-yearButton.Mui-selected:focus':
      SelectedCSS,
    '& .PrivatePickersYear-yearButton.Mui-selected:hover, & .PrivatePickersYear-yearButton:hover':
      HoverCSS,
    '& .PrivatePickersYear-yearButton:active': ActiveCSS,
    '& .PrivatePickersYear-yearButton:disabled': DisabledCSS,

    '& .PrivatePickersMonth-root': {
      textTransform: 'capitalize',
      color: theme.colors.black,
      ...TextCSS,
    },
    '& .PrivatePickersMonth-root.Mui-selected, & .PrivatePickersMonth-root.Mui-selected:focus':
      SelectedCSS,
    '& .PrivatePickersMonth-root.Mui-selected:hover, & .PrivatePickersMonth-root:hover':
      HoverCSS,
    '& .PrivatePickersMonth-root:active': ActiveCSS,
    '& .PrivatePickersMonth-root:disabled': DisabledCSS,
    '& .MuiTypography-caption': { marginTop: '5px', fontSize: 14 },
    '& .MuiIconButton-root': { padding: 0 },
  },
  placement: 'bottom-start',
}
