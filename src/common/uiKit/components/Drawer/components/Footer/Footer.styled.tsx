import styled from '@common/styled'
import { BASIC_INDENT } from '@common/styled/variables'

import { INDENT_RIGHT_IN_DRAWER } from '../../constants/styles'

const padding = `${BASIC_INDENT} ${INDENT_RIGHT_IN_DRAWER}px ${BASIC_INDENT} ${BASIC_INDENT};`

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: ${padding};
  box-shadow: 0px 6px 19px 0px rgba(44, 44, 44, 0.1);
`

export const FooterButtonsGroup = styled.div<{
  $marginTop?: string
  $successButtonOnly?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ $successButtonOnly }) =>
    $successButtonOnly ? 'flex-end' : 'space-between'};
  margin-top: ${({ $marginTop }) => $marginTop};
`
