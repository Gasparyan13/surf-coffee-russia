import { ThemeProvider as StyledThemeProvider } from '@emotion/react'
import React from 'react'

import { theme } from './theme'
import { getMergedTheme } from './utils/getters'

type Props = React.PropsWithChildren

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <StyledThemeProvider theme={getMergedTheme(theme)}>
      {children}
    </StyledThemeProvider>
  )
}
