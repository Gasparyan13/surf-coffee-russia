import { Select } from '@mui/material'

import styled from '@common/styled'

import { INPUT_SIZES } from '../../constants/sizes'
import { LIST_ROW_HEIGHT } from '../ListRow/ListRow.styled'
import * as T from './SelectSingle.types'

const changeBorderColor = (color: string) => `
    fieldset {
      border: 1px solid ${color};
    }
`

export const InputIcon = styled.div<{
  $disabled: T.Props['disabled']
}>`
  && {
    ${({ $disabled, theme }) =>
      $disabled
        ? `
    * {
        color: ${theme.colors.asphaltLight};
        fill: ${theme.colors.asphaltLight};
      }`
        : ''}
  }

  & > .MuiSelect-icon {
    top: calc(50% - 12px);
  }

  & > .MuiSelect-iconOpen {
    transform: rotate(0) !important;
  }
`

export const MuiSelect = styled(Select)<{
  $selectSize: T.Props['size']
  $disabled: T.Props['disabled']
  $error: T.Props['error']
}>`
  && {
    ${({ $disabled, $selectSize, theme, $error }) => {
      let commonStyles = `
        height: ${LIST_ROW_HEIGHT}px;
        border-radius: 16px;
        background-color: ${theme.colors.white};
        && {
          .MuiSelect-select {
            display: flex;
            align-items: center;
          }
        }
      `

      if ($selectSize === 'small')
        commonStyles += `width: ${INPUT_SIZES.small}px;`
      if ($selectSize === 'large')
        commonStyles += `width: ${INPUT_SIZES.large}px;`

      if ($error)
        commonStyles += `
          && {
            ${changeBorderColor(theme.colors.critical)}
          }`

      if ($disabled)
        commonStyles += `
          && {
            * {
                -webkit-text-fill-color: ${theme.colors.pencil};
            }
            color: ${theme.colors.pencil};
            ${changeBorderColor(theme.colors.asphaltSuperLight)}
          }`

      commonStyles += `
        &.Mui-focused {
          fieldset {
            border: 1px solid ${theme.colors.asphalt};
          }
        }
        &:hover, &:focus, &:active, &:focus-within {
          ${changeBorderColor(theme.colors.asphalt)}
        }`

      return commonStyles
    }}
  }
`
