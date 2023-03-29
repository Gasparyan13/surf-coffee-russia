import { css } from '@emotion/react'

import styled from '@common/styled'

const INDENT_LEFT_OPTION = 15
const ICON_WIDTH_WITH_MARGIN = 30

type Option = {
  $level: number
  $hasIcon: boolean
}

const getOptionPadding = (
  level: Option['$level'],
  hasIcon: Option['$hasIcon'],
) => {
  if (level === 1 && hasIcon) return INDENT_LEFT_OPTION
  if (level === 1 && !hasIcon)
    return INDENT_LEFT_OPTION + ICON_WIDTH_WITH_MARGIN
  return INDENT_LEFT_OPTION + (level - 1) * ICON_WIDTH_WITH_MARGIN
}

export const selectSubArticleCSS = ({ $level, $hasIcon }: Option) => css`
  && {
    margin-top: 8px;
    padding-left: ${getOptionPadding($level, $hasIcon)}px;
  }
`

export const Icon = styled.div`
  margin-top: 5px;
`
export const selectArticlesCSS = css`
  && {
    flex-flow: column;
    padding: 0;

    &:hover {
      background-color: transparent;
    }
  }
`

export const List = styled.ul`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`
