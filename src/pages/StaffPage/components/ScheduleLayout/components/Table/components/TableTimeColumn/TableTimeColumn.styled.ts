import styled from '@common/styled'

export const TimeColumn = styled.div`
  grid-area: time;
  position: sticky;
  left: 0;
  z-index: 5;
  background-color: ${(props) => props.theme.colors.white};
  user-select: none;
`

export const TimeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const TimeItem = styled.li``

export const TimeSpan = styled.span`
  position: relative;
  top: -17px;

  &:after {
    content: '';
    position: absolute;
    right: -26px;
    top: 16px;
    width: 20px;
    height: 1px;
    background-color: ${(props) => props.theme.colors.grey};
  }
`
