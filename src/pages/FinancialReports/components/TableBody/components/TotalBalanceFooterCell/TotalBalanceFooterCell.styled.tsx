import styled from '@common/styled'

export const Empty = styled.div`
  width: inherit;
  height: inherit;
  border-right: none;
  background-color: #fafafb; // TODO - цвета нет в палитре
  border-right: 2px solid ${({ theme }) => theme.colors.white};
`
