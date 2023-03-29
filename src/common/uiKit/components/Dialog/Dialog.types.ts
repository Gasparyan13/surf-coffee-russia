import { ReactNode } from 'react'

import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

export type Props = React.PropsWithChildren & {
  size?: 'normal' | 'large'
  onClose?: () => void
  onBack?: () => void
  successButton: ButtonProps
  cancelButton?: ButtonProps
  title: string | ReactNode
  errorText?: string
  hasIconBack?: boolean
  hasError?: boolean
  isOpen: boolean
  hasCloseIcon?: boolean
}
