import React from 'react'

import { SvgIconProps } from './types'

export type ElementDirection = 'down' | 'up' | 'right' | 'left'

const ROTATION_ANGLE: Record<ElementDirection, number> = {
  down: 180,
  up: 0,
  right: -90,
  left: 90,
}

type Props = {
  width?: string
  height?: string
  direction?: ElementDirection
} & SvgIconProps

export const SvgArrowIcon: React.FC<Props> = ({
  width = '24',
  height = '24',
  direction = 'down',
  style,
  ...rest
}) => (
  <svg
    fill="none"
    height={height}
    style={{ transform: `rotate(${ROTATION_ANGLE[direction]}deg)`, ...style }}
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}>
    <path
      clipRule="evenodd"
      d="M2.64648 16.6464L3.35359 17.3535L12 8.7071L20.6465 17.3535L21.3536 16.6464L12 7.29289L2.64648 16.6464Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)
