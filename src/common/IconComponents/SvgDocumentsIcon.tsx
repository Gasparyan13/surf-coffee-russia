import React from 'react'

import { SvgIconProps } from './types'

export const SvgDocumentsIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        clipRule="evenodd"
        d="M7 2C5.89543 2 5 2.89543 5 4V19C5 20.1046 5.89543 21 7 21H18C19.1046 21 20 20.1046 20 19V7.91421C20 7.649 19.8946 7.39464 19.7071 7.20711L14.7929 2.29289C14.6054 2.10536 14.351 2 14.0858 2H14H7ZM14 3V8H19L14 3ZM7 3C6.44772 3 6 3.44772 6 4V19C6 19.5523 6.44772 20 7 20H18C18.5523 20 19 19.5523 19 19V9H14C13.4477 9 13 8.55228 13 8V3H7Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path d="M8 12H15V13H8V12Z" fill="currentColor" />
      <path d="M8 15H15V16H8V15Z" fill="currentColor" />
    </svg>
  )
}
