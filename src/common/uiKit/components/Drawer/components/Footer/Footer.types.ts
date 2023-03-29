import React from 'react'

import { Props as ButtonProps } from '../../../Button/Button.types'

export type FooterButtonProps = Pick<
  ButtonProps,
  'onClick' | 'disabled' | 'children'
>

export type Props = {
  content?: React.ReactNode
  successButtonProps?: FooterButtonProps
  cancelButtonProps?: FooterButtonProps
}
