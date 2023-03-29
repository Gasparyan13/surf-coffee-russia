import React from 'react'

import { SvgIconProps } from './types'

export const SvgTransactionIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M2 10H22"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M11.5483 20.4998H6.43829C2.88829 20.4998 1.98828 19.6198 1.98828 16.1098V7.8898C1.98828 4.7098 2.72831 3.6898 5.51831 3.5298C5.79831 3.5198 6.10829 3.5098 6.43829 3.5098H17.5483C21.0983 3.5098 21.9983 4.3898 21.9983 7.8998V12.3098"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 16H10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M22 18C22 18.75 21.79 19.46 21.42 20.06C20.73 21.22 19.46 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 15.79 15.79 14 18 14C20.21 14 22 15.79 22 18Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
    />
    <path
      d="M16.4414 17.9996L17.4314 18.9896L19.5614 17.0196"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
