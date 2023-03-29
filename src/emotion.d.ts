import '@emotion/react'
import { SerializedStyles } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

type DefaultTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme extends DefaultTheme {}
}

declare module 'react' {
  interface Attributes {
    css?: SerializedStyles | SerializedStyles[]
  }
}
