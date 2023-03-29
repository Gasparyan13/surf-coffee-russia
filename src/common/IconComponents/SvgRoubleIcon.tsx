import React from 'react'

import { SvgIconProps } from './types'

export const SvgRoubleIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.8667 15.8789H13.7519"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3704 19.1111V4.88892H14.0648C15.1439 4.88892 16.1787 5.33163 16.9417 6.11966C17.7047 6.90769 18.1334 7.97649 18.1334 9.09094C18.1334 10.2054 17.7047 11.2742 16.9417 12.0622C16.1787 12.8502 15.1439 13.293 14.0648 13.293H6.8667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
