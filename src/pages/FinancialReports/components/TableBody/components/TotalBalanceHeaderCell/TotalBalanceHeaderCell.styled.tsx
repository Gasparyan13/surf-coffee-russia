import styled from '@common/styled'

export const Root = styled.div`
  > h4 {
    z-index: 10;
    padding: 17px 0;
    position: relative;
    text-align: center;
  }
  background-color: ${({ theme }) => theme.colors.asphaltSuperLight};
  border-right: 2px solid ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.white};
`
