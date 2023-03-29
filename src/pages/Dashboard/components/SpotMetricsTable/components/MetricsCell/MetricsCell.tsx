import React from 'react'

import { NumberFormat } from '@common/newUi/NumberFormat'

import { TableCell, Typography } from '@uiKit'

import * as Styled from './MetricsCell.styled'
import * as T from './MetricsCell.types'
import { valueColor, valueSign } from './constants/valueTypes'

export const MetricsCell: React.FC<T.Props> = ({
  value,
  type,
  deltaColor,
  deltaValue,
}) => {
  const color = deltaColor ? valueColor[deltaColor] : valueColor.BLACK

  return (
    <TableCell cssStyle={Styled.cellCSS}>
      <Styled.Content>
        <Typography variant="PBody">
          <NumberFormat value={value} /> {valueSign[type]}
        </Typography>
        {deltaValue !== undefined && (
          <Typography color={color} variant="PBody">
            <NumberFormat value={deltaValue} /> {valueSign[type]}
          </Typography>
        )}
      </Styled.Content>
    </TableCell>
  )
}
