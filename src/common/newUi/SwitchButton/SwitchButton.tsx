import { SwitchUnstyled } from '@mui/base'
import React from 'react'

import { SwitchRoot } from './SwitchButton.styled'

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}

export const SwitchButton: React.FC<Props> = ({ ...rest }) => {
  return <SwitchUnstyled {...rest} component={SwitchRoot} />
}
