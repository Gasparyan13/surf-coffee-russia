import { commonFontStyleCSS } from '@common/common.styled'
import styled from '@common/styled'

export const Empty = styled.div`
  padding: 23px 24px 30px 0;
  width: inherit;
  height: 100px !important;
  border-right: 1px solid ${({ theme }) => theme.colors.asphaltLight};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
`
export const Title = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 14px 12px 14px;
  ${commonFontStyleCSS};
  text-transform: uppercase;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.wetAsphalt};
  background-color: ${({ theme }) => theme.colors.white};
  border-right: none;
  width: inherit;
  height: inherit;
  z-index: 1;
`
