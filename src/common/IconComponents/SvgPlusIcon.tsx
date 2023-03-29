import React from 'react'

import { SvgIconProps } from './types'

export const SvgPlusIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12 11H5.5C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12H12V18.5C12 18.7761 12.2239 19 12.5 19C12.7761 19 13 18.7761 13 18.5V12H19.5C19.7761 12 20 11.7761 20 11.5C20 11.2239 19.7761 11 19.5 11H13V4.5C13 4.22386 12.7761 4 12.5 4C12.2239 4 12 4.22386 12 4.5V11Z"
        fill="currentColor"
      />
    </svg>
  )
}
