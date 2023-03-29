import { SerializedStyles } from '@emotion/react'

import { Props as TooltipProps } from '../../../Tooltip/Tooltip.types'
import { Props as TableCellProps } from '../TableCell/TableCell.types'

export type Props = {
  tooltipPlacement?: TooltipProps['placement']
  tooltipTitle: TooltipProps['title']
  tooltipAnchorCss?: SerializedStyles
} & TableCellProps
