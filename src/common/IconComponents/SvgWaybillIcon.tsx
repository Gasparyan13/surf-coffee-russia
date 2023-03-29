import React from 'react'

import { SvgIconProps } from './types'

export const SvgWaybillIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <line
      stroke="currentColor"
      strokeLinecap="round"
      x1="9.03125"
      x2="12.3756"
      y1="8.75781"
      y2="8.75781"
    />
    <line
      stroke="currentColor"
      strokeLinecap="round"
      x1="6.41797"
      x2="6.47321"
      y1="8.75781"
      y2="8.75781"
    />
    <line
      stroke="currentColor"
      strokeLinecap="round"
      x1="6.41797"
      x2="17.582"
      y1="11.8437"
      y2="11.8437"
    />
    <line
      stroke="currentColor"
      strokeLinecap="round"
      x1="6.41797"
      x2="17.582"
      y1="15.0156"
      y2="15.0156"
    />
    <rect
      height="15"
      rx="4.5"
      stroke="currentColor"
      width="21"
      x="1.5"
      y="4.5"
    />
  </svg>
)
