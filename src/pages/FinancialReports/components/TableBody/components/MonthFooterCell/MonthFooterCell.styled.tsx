import styled from '@common/styled'

export const Root = styled.div<{ $isCurrentMonth: boolean }>`
  height: inherit;
  border-right: 2px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ $isCurrentMonth, theme }) =>
    $isCurrentMonth
      ? theme.colors.asphaltSuperLight
      : '#fafafb // TODO цвета нет в палитре'};
`
