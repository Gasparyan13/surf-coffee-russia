/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PopperProps } from '@mui/material'

import { ArrayElement } from '../../../types/ArrayElement'

const getOffsetTop = (height: number) => [-height - 1, -12]
const getOffsetBottom = (height: number) => [height - 1, -12]

export const TOOLTIP_CONFIG = {
  'below-left': {
    borderRadius: '16px 16px 16px 0',
    getOffset: getOffsetTop,
    getOverOffset: () => [-6, -4],
    position: 'right-end',
  },
  'below-right': {
    borderRadius: '16px 16px 0',
    getOffset: getOffsetTop,
    getOverOffset: () => [-6, -4],
    position: 'left-end',
  },
  'below-center': {
    borderRadius: '0 16px 16px 16px',
    getOffset: () => [0, -8],
    getOverOffset: () => [0, 0],
    position: 'bottom',
  },
  'above-left': {
    borderRadius: '0 16px 16px 16px',
    getOffset: getOffsetBottom,
    getOverOffset: () => [16, 0],
    position: 'right-start',
  },
  'above-right': {
    borderRadius: '16px 0 16px 16px',
    getOffset: getOffsetBottom,
    getOverOffset: () => [18, -6],
    position: 'left-start',
  },
  'above-center': {
    borderRadius: '16px 16px 16px 0',
    getOffset: () => [0, -8],
    getOverOffset: () => [0, 0],
    position: 'top',
  },
}

export type Modifier = ArrayElement<NonNullable<PopperProps['modifiers']>>

export const sameWidthModifier: Modifier = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    // @ts-ignore
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
  },
}
