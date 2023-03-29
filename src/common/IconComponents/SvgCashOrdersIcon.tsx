import React from 'react'

import { SvgIconProps } from './types'

export const SvgCashOrdersIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9.00003C2 4.00003 4 2.00003 9 2.00003H14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 10H18C15 10 14 9.00003 14 6.00003V2.00003L22 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 13H13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 17H11"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
