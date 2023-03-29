import styled from '@common/styled'

export const Root = styled.div`
  padding: 23px 24px 30px 0;
  width: inherit;
  height: 100px !important;
  border-right: 1px solid ${({ theme }) => theme.colors.asphaltLight};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
`
