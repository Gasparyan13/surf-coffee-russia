import { commonFontStyleCSS } from '@common/common.styled'
import styled from '@common/styled'

export const Root = styled.div<{ $textColor: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: inherit;
  height: inherit;
  text-align: right;
  ${commonFontStyleCSS}
  background-color: #fafafb; // TODO - цвета нет в палитре
  padding: 0 24px;
  * > span {
    color: ${({ $textColor }) => $textColor};
  }
  border-right: 2px solid ${({ theme }) => theme.colors.white};
`
