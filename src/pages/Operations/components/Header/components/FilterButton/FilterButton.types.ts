import { ButtonProps } from '@mui/material'

export type Props = {
  numberOfAppliedFilters?: number
  onClickFilterButton?: ButtonProps['onClick']
  onClickClearButton?: ButtonProps['onClick']
}
