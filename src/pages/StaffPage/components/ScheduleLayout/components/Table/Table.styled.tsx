import styled from '@common/styled'

import { HEADER_CELL_HEIGHT, TIME_CELL_WIDTH } from './constants/size'

export const Root = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
  display: flex;
`

export const Wrapper = styled.div`
  overflow: scroll;
  display: grid;
  grid-template-areas:
    'fixedTop header'
    'time main'
    'fixedBottom footer';
`

export const FixedTop = styled.div`
  grid-area: fixedTop;
  position: absolute;
  top: 0;
  width: ${TIME_CELL_WIDTH}px;
  height: ${HEADER_CELL_HEIGHT}px;
  z-index: 20;
  background-color: ${(props) => props.theme.colors.white};
`

export const FixedBottom = styled.div`
  grid-area: fixedBottom;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: ${HEADER_CELL_HEIGHT}px;
  width: ${TIME_CELL_WIDTH}px;
  z-index: 20;
  background-color: ${(props) => props.theme.colors.white};
`

export const Main = styled.div`
  grid-area: main;
  position: relative;
`
