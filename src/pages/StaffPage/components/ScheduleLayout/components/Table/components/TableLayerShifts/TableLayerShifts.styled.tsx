import styled from '@common/styled'

import { NUMBER_CARDS_FOR_COLUMN_WIDTH_INCREASES } from '../../constants/counts'
import {
  CARD_MARGIN,
  CELL_HEIGHT,
  SMALL_CARD_MARGIN,
  SMALL_CARD_WIDTH,
  SPACING_BETWEEN_CARDS,
} from '../../constants/size'
import * as T from './TableLayerShifts.types'

type Shifts = {
  $rowCount: number
  $columnCount: number
  $days: T.Props['days']
}

type ShiftItem = {
  $startRow: number
  $endRow: number
  $width: number
  $column: number
  $index: number
  $length: number
}

const getTemplateColumns = (days: Shifts['$days']) => {
  let styles = ''

  days.forEach((day) => {
    styles += `${day.cellWidth}px `
  })

  return `
    ${styles}
  `
}

export const LayerShifts = styled.div<Shifts>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: repeat(${(props) => props.$rowCount}, ${CELL_HEIGHT}px);
  grid-template-columns: ${(props) => getTemplateColumns(props.$days)};
`

export const LayerShiftsItem = styled.div<ShiftItem>`
  display: flex;
  width: ${(props) => props.$width}px;

  ${({ $startRow, $endRow, $column }) => {
    return `
      grid-row: ${$startRow} / ${$endRow};
      grid-column: ${$column};
    `
  }};

  ${({ $length, $index, $width }) => {
    // случай когда больше 3 карточек или когда 2 карточки но пересекаются(маленький размер)
    if (
      $length >= NUMBER_CARDS_FOR_COLUMN_WIDTH_INCREASES ||
      $width === SMALL_CARD_WIDTH
    ) {
      const margin =
        $length >= NUMBER_CARDS_FOR_COLUMN_WIDTH_INCREASES
          ? SMALL_CARD_MARGIN
          : CARD_MARGIN

      return `
        margin-left: ${
          $index === 0
            ? margin
            : $index * SMALL_CARD_WIDTH +
              $index * SPACING_BETWEEN_CARDS +
              margin
        }px;
      `
    }

    // случай когда две карточки друг под другом
    if ($index === 1)
      return `
        margin: 2px 0 0 ${CARD_MARGIN}px;
      `

    // случай с одной карточкой
    return `
      margin-left: ${CARD_MARGIN}px
    `
  }};
`
