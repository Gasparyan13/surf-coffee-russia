import React from 'react'

import { Props as FooterProps } from './components/Footer/Footer.types'
import { Props as HeaderProps } from './components/Header/Header.types'

export type Props = React.PropsWithChildren & {
  open: boolean
  onClose: () => void
  headerProps?: HeaderProps
  footerProps?: FooterProps
}
