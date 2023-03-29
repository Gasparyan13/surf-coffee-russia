import styled from '@common/styled'

export const Icon = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 100;
`

export const ContentContainer = styled.div<{ $centered: boolean }>`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: ${({ $centered }) => ($centered ? 'center' : 'flex-end')};
  ${({ $centered }) => ($centered ? 'padding-left: 24px' : '')};
  color: ${({ theme }) => theme.colors.white};
`
