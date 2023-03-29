import styled from '@common/styled'

import { MONTH_CELL_WIDTH } from '../../constants/width'

export type IsHalfCellType = {
  $isHalfCell?: boolean
  $isCurrentMonth?: boolean
}

export const MonthBlock = styled.div<IsHalfCellType>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) =>
    props.$isCurrentMonth
      ? props.theme.colors.asphaltLight
      : props.theme.colors.asphaltSuperLight};

  border-bottom: 2px solid ${(props) => props.theme.colors.white};
  border-right: 2px solid ${(props) => props.theme.colors.white};
  margin-right: 2px;

  height: 58px;
  width: ${(props) =>
    props.$isHalfCell ? MONTH_CELL_WIDTH / 2 : MONTH_CELL_WIDTH}px;
`

export const Month = styled.div`
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 6px;
  > h4 {
    text-align: center;
  }
`

export const Year = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.asphalt};
  text-align: center;
`

export const Root = styled.div``
