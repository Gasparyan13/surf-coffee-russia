import React from 'react'

import { SvgIconProps } from './types'

export const SvgFilterIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M3 6.37307C3 4.51017 4.55467 3 6.47246 3H17.5842C19.4707 3 21 4.48552 21 6.318C21 7.29399 20.5576 8.22048 19.7906 8.85092L16.2703 11.7444C15.1475 12.6672 14.5 14.0234 14.5 15.4521V17.1817C14.5 18.0364 14.079 18.8394 13.3675 19.3421L11.4262 20.7135C10.4165 21.4269 9 20.7262 9 19.5134V15.336C9 13.9746 8.41177 12.6757 7.37862 11.7557L4.12603 8.85954C3.40852 8.22065 3 7.31856 3 6.37307Z"
        stroke="currentColor"
      />
    </svg>
  )
}
