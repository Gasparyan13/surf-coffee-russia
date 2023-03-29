import React from 'react'

import { SvgIconProps } from './types'

export const SvgAttachIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      clipRule="evenodd"
      d="M12.5 3C9.46243 3 7 5.46243 7 8.5V16.5C7 18.433 8.567 20 10.5 20C12.433 20 14 18.433 14 16.5V8.5C14 7.67157 13.3284 7 12.5 7C11.6716 7 11 7.67157 11 8.5V15.5H10V8.5C10 7.11929 11.1193 6 12.5 6C13.8807 6 15 7.11929 15 8.5V16.5C15 18.9853 12.9853 21 10.5 21C8.01472 21 6 18.9853 6 16.5V8.5C6 4.91015 8.91015 2 12.5 2C16.0899 2 19 4.91015 19 8.5V18.5H18V8.5C18 5.46243 15.5376 3 12.5 3Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
)
