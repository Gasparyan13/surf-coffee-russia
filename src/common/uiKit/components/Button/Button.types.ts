import { SerializedStyles } from '@emotion/react'
import { ExtendButtonBase } from '@mui/material'
import { ButtonTypeMap } from '@mui/material/Button/Button'

import { UIKitSizeType } from '../../types'

export type Props = {
  css?: SerializedStyles | SerializedStyles[]
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'critical'
    | 'context'
} & UIKitSizeType &
  Omit<Parameters<ExtendButtonBase<ButtonTypeMap>>[0], 'color' | 'size'>
