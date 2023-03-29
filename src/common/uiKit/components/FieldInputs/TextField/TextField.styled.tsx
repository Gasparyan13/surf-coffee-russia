import { TextField as MuiTextField } from '@mui/material'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { INPUT_SIZES } from '../../../constants/sizes'
import * as T from './TextField.types'

const changeBorderColor = (color: string) => `
    fieldset {
        border: 1px solid ${color};
    }
`

export const Root = styled.div``

export const TextField = styled(MuiTextField)<{
  $selectSize: T.Props['size']
  $disabled: T.Props['disabled']
  $error: T.Props['error']
}>`
  && {
    ${({ $selectSize, $disabled, $error }) => {
      let commonStyles = `
        ${changeBorderColor(theme.colors.asphaltSuperLight)}
      `

      if ($selectSize === 'small')
        commonStyles += `width: ${INPUT_SIZES.small}px;`
      if ($selectSize === 'large')
        commonStyles += `width: ${INPUT_SIZES.large}px;`

      if ($error)
        commonStyles += `
          && {
            ${changeBorderColor(theme.colors.critical)}
          }
        `

      if ($disabled)
        commonStyles += `
          && {
            color: ${theme.colors.pencil};

            input {
                -webkit-text-fill-color: ${theme.colors.pencil};
            }
          
            ${changeBorderColor(theme.colors.asphaltSuperLight)}
          }
        `

      commonStyles += `
        &.Mui-focused {
          ${changeBorderColor(theme.colors.asphalt)}
        }
        
        &:hover, &:focus, &:active, &:focus-within {
          ${changeBorderColor(theme.colors.asphalt)}
        }
      `

      return commonStyles
    }}
  }
`
