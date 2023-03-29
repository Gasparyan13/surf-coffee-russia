import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import { CellText } from '../../../TableCell/components/CellText'
import { MAIN_CONTENT_CELL_SELECTOR } from '../../constants/classNames'
import * as Styled from './TotalBalanceDataCell.styled'
import * as T from './TotalBalanceDataCell.types'
import { TEST_ID_TOTAL_BALANCE_CELL } from './constants/testIds'

export const TotalBalanceDataCell: React.FC<T.Props> = ({
  data,
  rowIndex = 0,
  columnIndex,
  columnKey,
}) => {
  const item = data[rowIndex] ?? {}
  const sumMismatch = item.sumMismatch?.[columnIndex]

  return (
    <Styled.Root
      $textColor={sumMismatch ? theme.colors.critical : theme.colors.black}
      className={MAIN_CONTENT_CELL_SELECTOR}>
      <CellText
        disabled
        isNumber
        isEditable={false}
        numberFormat="float"
        tableColumnType="MAIN"
        testId={`${TEST_ID_TOTAL_BALANCE_CELL}-${columnKey}-${item?.budgetItemName}`}
        text={`${item.totalSum?.[columnIndex]}`}
        type={item.level === 2 ? 'BOLD' : 'REGULAR'}
      />
    </Styled.Root>
  )
}
