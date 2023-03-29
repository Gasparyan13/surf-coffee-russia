import { InputBaseComponentProps } from '@mui/material'
import { FileRejection } from 'react-dropzone'

import { Props as TooltipProps } from '../../../../Tooltip/Tooltip.types'

export type Props = {
  disabled?: boolean
  value: string
  onDropFile: (acceptedFiles: File[], invalidFiles: FileRejection[]) => void
  fileAttachmentInputTestId?: string
  tooltipPlacement?: TooltipProps['placement']
} & InputBaseComponentProps
