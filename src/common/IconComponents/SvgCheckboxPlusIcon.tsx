import React from 'react'

import { SvgIconProps } from './types'

export const SvgCheckboxPlusIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      clipRule="evenodd"
      d="M17 4H7C5.34315 4 4 5.34315 4 7V16C4 17.6569 5.34315 19 7 19H17C18.6569 19 20 17.6569 20 16V7C20 5.34315 18.6569 4 17 4ZM7 3C4.79086 3 3 4.79086 3 7V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V7C21 4.79086 19.2091 3 17 3H7Z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      d="M8.5 12C8.22386 12 8 11.7761 8 11.5C8 11.2239 8.22386 11 8.5 11H11.5V8C11.5 7.72386 11.7239 7.5 12 7.5C12.2761 7.5 12.5 7.72386 12.5 8V11H15.5C15.7761 11 16 11.2239 16 11.5C16 11.7761 15.7761 12 15.5 12H12.5V15C12.5 15.2761 12.2761 15.5 12 15.5C11.7239 15.5 11.5 15.2761 11.5 15V12H8.5Z"
      fill="currentColor"
    />
  </svg>
)
