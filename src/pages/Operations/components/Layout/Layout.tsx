import React from 'react'

import { Header } from '@pages/Operations/components/Header/Header'

import * as Styled from './Layout.styled'
import * as T from './Layout.types'

export const Layout: React.FC<T.Props> = ({ children }) => (
  <Styled.Root>
    <Header />
    <Styled.Content>{children}</Styled.Content>
  </Styled.Root>
)
