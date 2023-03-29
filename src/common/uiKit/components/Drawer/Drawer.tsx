import { Drawer as MuiDrawer } from '@mui/material'
import React from 'react'

import * as Styled from './Drawer.styled'
import * as T from './Drawer.types'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export const Drawer: React.FC<T.Props> = ({
  open,
  onClose,
  children,
  headerProps,
  footerProps,
}) => {
  return (
    <MuiDrawer anchor="right" open={open} onClose={onClose}>
      <Styled.Wrapper>
        {headerProps && <Header {...headerProps} />}
        <Styled.Content>
          <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
        </Styled.Content>
        {footerProps && <Footer {...footerProps} />}
      </Styled.Wrapper>
    </MuiDrawer>
  )
}
