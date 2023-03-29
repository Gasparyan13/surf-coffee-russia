import { css, Global } from '@emotion/react'
import React from 'react'

import { theme } from './providers/ThemeProvider/theme'

const SCROLLBAR_SIZE = 16

export const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      body ::-webkit-scrollbar {
        width: ${SCROLLBAR_SIZE}px;
        height: ${SCROLLBAR_SIZE}px;
      }

      body ::-webkit-scrollbar-thumb {
        border: 5px solid transparent;
        background-clip: padding-box;
        border-radius: 8px;
        background-color: ${theme.colors.asphaltSuperLight};

        :hover {
          background-color: ${theme.colors.asphalt};
        }

        :active {
          background-color: ${theme.colors.wetAsphalt};
        }
      }
    `}
  />
)
