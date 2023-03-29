import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ruLocale from 'date-fns/locale/ru'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { theme } from '@providers/Mui'

import { GlobalStyle } from './common/global.styled'
import { ThemeProvider } from './common/providers'
import { AppStore } from './store/rootConfig'

export type Props = {
  children: React.ReactNode
  store: AppStore
}

export const Providers: React.FC<Props> = ({ children, store }) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <LocalizationProvider
              adapterLocale={ruLocale}
              dateAdapter={AdapterDateFns}>
              <GlobalStyle />
              <CssBaseline />
              <ToastContainer />

              {children}
            </LocalizationProvider>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </ThemeProvider>
  </MuiThemeProvider>
)
