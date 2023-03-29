import { TableRowProps } from '@mui/material/TableRow'
import React from 'react'

export type Props = {
  columnsLength: number
  content: React.ReactNode
} & Pick<TableRowProps, 'children'>
