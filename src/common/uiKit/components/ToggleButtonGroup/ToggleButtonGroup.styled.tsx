import { css } from '@emotion/react'
import { Tab } from '@mui/material'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { transitionCSS } from '../../../common.styled'
import { COMMON_INDENT } from '../../constants/sizes'
import * as T from './ToggleButtonGroup.types'
import { HEIGHT_PRIMARY, HEIGHT_SECONDARY } from './constants/sizes'
import { BORDER_RADIUS } from './constants/styles'

export const tabsCSS = css`
  & {
    .MuiTabs-indicator {
      border-radius: ${BORDER_RADIUS}px;
    }

    .MuiButtonBase-root {
      z-index: 1;
      color: ${theme.colors.black};
      border-radius: ${BORDER_RADIUS}px;
      padding-right: ${COMMON_INDENT}px;
      padding-left: ${COMMON_INDENT}px;
      letter-spacing: 0.02em;
      flex-grow: 1;
      height: ${HEIGHT_PRIMARY}px;
    }

    .MuiButtonBase-root.Mui-selected {
      color: ${theme.colors.white};
      background-color: ${theme.colors.black};
    }

    .MuiButtonBase--secondary {
      height: ${HEIGHT_SECONDARY}px;
      min-height: ${HEIGHT_SECONDARY}px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.black};
    }

    .MuiButtonBase--secondary.Mui-selected {
      color: ${theme.colors.black};
      background-color: ${theme.colors.grey};
    }

    .MuiTabs-flexContainer {
      border: 1px solid ${theme.colors.asphaltSuperLight};
      border-radius: ${BORDER_RADIUS}px;
    }
  }
`

export const MuiTabText = styled(Tab)<{
  $isDisabled?: T.StyledProps['isDisabled']
  $isCurrentTab?: T.StyledProps['isCurrentTab']
}>`
  &&&& {
    ${({ $isDisabled, $isCurrentTab }) => {
      if ($isDisabled && $isCurrentTab)
        return `
          cursor: default;
        `
      if ($isDisabled)
        return `
          background-color: transparent;
          color: ${theme.colors.pencil};

          &:hover {
            cursor: default;
          }
        `
      return `
        &:hover,
        &:active {
          color: ${$isCurrentTab ? '' : theme.colors.white};
        }

        &:hover {
          background-color: ${$isCurrentTab ? '' : theme.colors.asphalt};
        }

        &:active {
          background-color: ${$isCurrentTab ? '' : theme.colors.wetAsphalt};
        }`
    }}

    ${transitionCSS}
  }
`
