import React from 'react'

import { SvgIconProps } from '@common/IconComponents/types'

export const SvgLogoutIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 25 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M15.516 7.3895V6.4565C15.516 4.4215 13.866 2.7715 11.831 2.7715H6.95597C4.92197 2.7715 3.27197 4.4215 3.27197 6.4565V17.5865C3.27197 19.6215 4.92197 21.2715 6.95597 21.2715H11.841C13.87 21.2715 15.516 19.6265 15.516 17.5975V16.6545"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.3096 12.0214H10.2686"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.3813 9.1063L22.3093 12.0213L19.3813 14.9373"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
