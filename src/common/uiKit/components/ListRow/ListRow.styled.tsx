import { css } from '@emotion/react'
import { MenuItem } from '@mui/material'

import styled from '@common/styled'

import { theme as styledTheme } from '@providers/ThemeProvider/theme'

import { INPUT_SIZES } from '../../constants/sizes'
import * as T from './ListRow.types'

export const LIST_ROW_HEIGHT = 48

const makeTextOverride = (backgroundColor: string, color: string) => `
  && {
    background-color: ${backgroundColor};
    color: ${color};
    
    * {
      color: ${color};
    }
  }
`

const makeActiveStyle = (theme: typeof styledTheme) => `
  .list-row-typography {
    font-weight: bold;
  }

  ${makeTextOverride(theme.colors.grey, theme.colors.black)}
`

export const MuiMenuItem = styled(MenuItem)<{
  $selectSize: T.Props['size']
  $disabled?: T.Props['disabled']
  $isSelected: T.Props['isSelected']
}>`
  ${({ $disabled, $selectSize, theme, $isSelected }) => {
    let commonStyles = `
        height: ${LIST_ROW_HEIGHT}px;
        background-color: ${theme.colors.white};
        color: ${theme.colors.black};

        &:hover {
          ${makeTextOverride(theme.colors.asphalt, theme.colors.white)}
        }

        &:active {
          ${makeActiveStyle(theme)}
        }
      `
    if ($selectSize === 'small')
      commonStyles += `width: ${INPUT_SIZES.small}px;`
    if ($selectSize === 'large')
      commonStyles += `width: ${INPUT_SIZES.large}px;`

    if ($isSelected) {
      commonStyles += `
        ${makeActiveStyle(theme)}

        &:hover, active {
          ${makeActiveStyle(theme)}
        }
      `
    }

    if ($disabled)
      commonStyles += `
          ${makeTextOverride(theme.colors.white, theme.colors.pencil)}

          &:hover, &:active {
            ${makeTextOverride(theme.colors.white, theme.colors.pencil)}
          }
        `

    return commonStyles
  }}
`

export const TextCSS = css`
  font-weight: bold;
`

export const Text = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
`

export const WrapperTextForRightIconCSS = css`
  max-width: calc(100% - 16px);
  padding-right: 10px;
`

export const WrapperTextCSS = css`
  padding-right: 20px;
  max-width: 100%;
`
