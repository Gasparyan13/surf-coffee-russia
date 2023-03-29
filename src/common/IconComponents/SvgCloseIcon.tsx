import React from 'react'

import { SvgIconProps } from './types'

export const SvgCloseIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      {...props}
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M18.3029 5.69678C18.4982 5.89206 18.4981 6.20865 18.3029 6.40389L12.7058 11.9999L18.3023 17.5959C18.4976 17.7912 18.4976 18.1078 18.3024 18.303C18.1071 18.4983 17.7905 18.4983 17.5953 18.3031L11.9987 12.707L6.40395 18.3028C6.20871 18.4981 5.89212 18.4981 5.69684 18.3029C5.50155 18.1076 5.50152 17.7911 5.69676 17.5958L11.2916 11.9999L5.69623 6.40404C5.50098 6.20877 5.501 5.89219 5.69627 5.69694C5.89154 5.50169 6.20812 5.5017 6.40338 5.69697L11.9987 11.2928L17.5958 5.6967C17.7911 5.50146 18.1077 5.5015 18.3029 5.69678Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}
