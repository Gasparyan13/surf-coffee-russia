import { SerializedStyles } from '@emotion/react'
import { SxProps, Theme } from '@mui/material'
import React from 'react'

import { Props as CellProps } from './components/TableCell/TableCell.types'

export type TableHeaderCell = {
  key: string
  title: string
  width?: CellProps['width']
  align?: CellProps['align']
  cssStyle?: SerializedStyles
}

export type Props<T> = {
  maxHeight?: number
  minWidth?: number
  rows: T[]
  header: TableHeaderCell[]
  sx?: Omit<SxProps<Theme>, 'maxHeight' | 'minWidth'>
  tableCSS?: SerializedStyles | SerializedStyles[]
  headerCSS?: SerializedStyles | SerializedStyles[]
  bodyCSS?: SerializedStyles | SerializedStyles[]
  contentEmptyRowRenderer?: () => React.ReactNode
  rowRenderer: (row: T, index: number, key: string) => React.ReactNode
}
