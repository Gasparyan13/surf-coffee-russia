import styled from '@common/styled'

import { CELL_HEIGHT, HEADER_CELL_HEIGHT } from '../../constants/size'
import { CellProps } from './TableCell.types'

type Cell = {
  $rowType: CellProps['rowType']
  $width: CellProps['width']
  $isCurrentDay: CellProps['isCurrentDay']
}

export const Root = styled.div<Cell>`
  display: flex;
  height: ${CELL_HEIGHT}px;
  width: ${(props) => props.$width}px;
  border-left: 1px solid;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.grey};

  ${(props) => {
    if (props.$rowType === 'header')
      return `
        flex-flow: column;
        align-items: center;
        justify-content: center;
        height: ${HEADER_CELL_HEIGHT}px;
        border: 0;
        border-right: 2px solid ${props.theme.colors.white};
        background-color: ${
          props.$isCurrentDay
            ? props.theme.colors.asphaltLight
            : props.theme.colors.asphaltSuperLight
        };
      `

    if (props.$rowType === 'main')
      return `
        align-items: center;
        justify-content: center;
      `

    if (props.$rowType === 'time') {
      return `
        border: 0;
      `
    }

    if (props.$rowType === 'footer')
      return `
        border: 0;
        background-color: ${props.theme.colors.white};
        height: ${HEADER_CELL_HEIGHT}px;
      `
  }}

  ${(props) => {
    if (props.$rowType === 'main' && props.$isCurrentDay)
      return `
        background-color: ${props.theme.colors.asphaltSuperLight};
        border-right: 2px solid ${props.theme.colors.white}
      `
  }}
`
