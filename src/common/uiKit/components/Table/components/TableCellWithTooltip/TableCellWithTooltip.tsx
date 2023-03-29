import React from 'react'

import { Tooltip } from '../../../Tooltip'
import { TableCell } from '../TableCell'
import * as T from './TableCellWithTooltip.types'

export const TableCellWithTooltip: React.FC<T.Props> = ({
  tooltipPlacement = 'above-left',
  tooltipTitle,
  children,
  tooltipAnchorCss,
  ...restCellProps
}) => (
  <TableCell {...restCellProps}>
    <Tooltip
      followCursor
      anchorCss={tooltipAnchorCss}
      placement={tooltipPlacement}
      title={tooltipTitle}>
      {children}
    </Tooltip>
  </TableCell>
)
