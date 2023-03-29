import { css } from '@emotion/react'

import styled from '@common/styled'

import * as T from './ShiftCard.types'

export const titleCSS = css`
  && {
    text-align: center;
    overflow: hidden;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`

export const Root = styled.div<{
  $width: T.Props['width']
  $height: T.Props['height']
}>`
  background-color: ${(props) => props.theme.colors.asphalt};
  color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  padding: 8px;
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
  user-select: none;
`

export const tooltipCSS = css`
  width: inherit;
`

export const workerNameWrapperCSS = css`
  max-width: 100%;
`
