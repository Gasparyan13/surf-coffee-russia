import React, { memo } from 'react'

import { TableCell } from '../TableCell'
import * as Styled from './TableFooter.styled'
import * as T from './TableFooter.types'

export const TableFooter: React.FC<T.Props> = memo(({ days }) => {
  return (
    <Styled.Footer>
      <Styled.FooterList>
        {days.map((day) => (
          <Styled.FooterItem key={day.id}>
            <TableCell rowType="footer" width={day.cellWidth} />
          </Styled.FooterItem>
        ))}
      </Styled.FooterList>
    </Styled.Footer>
  )
})
