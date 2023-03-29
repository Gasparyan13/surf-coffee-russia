import styled from '@common/styled'

import { WIDTH_DRAWER } from './constants/styles'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: ${WIDTH_DRAWER}px;
  height: 100%;
  overflow: hidden;
  padding: 0;
`

export const Content = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
`

export const ContentWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
`
