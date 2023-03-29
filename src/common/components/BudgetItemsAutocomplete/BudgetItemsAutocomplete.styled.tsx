import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { ITEM_HEIGHT } from './constants/sizes'

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  text-transform: uppercase;
  padding-left: 16px;
  padding-right: 16px;
  height: ${ITEM_HEIGHT}px;
  z-index: 1;
  background-color: ${theme.colors.white};
`

export const GroupItems = styled.ul`
  padding: 0;
`
