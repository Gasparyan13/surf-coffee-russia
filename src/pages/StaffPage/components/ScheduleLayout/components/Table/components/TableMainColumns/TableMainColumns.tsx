import React, { memo } from 'react'

import { allHoursDay } from '../../../../../../../../common/constants/hours'
import { TableCell } from '../TableCell'
import * as Styled from './TableMainColumns.styled'
import * as T from './TableMainColumns.types'

const TableMainColumns: React.FC<T.Props> = memo(({ days }) => {
  return (
    <Styled.MainList $columnCount={days.length} $rowCount={allHoursDay.length}>
      {allHoursDay.map((hour) =>
        days.map((day) => (
          <Styled.MainItem key={`${hour}-${day.id}`}>
            <TableCell
              isCurrentDay={day.isCurrentDay}
              rowType="main"
              width={day.cellWidth}
            />
          </Styled.MainItem>
        )),
      )}
    </Styled.MainList>
  )
})

export default TableMainColumns
