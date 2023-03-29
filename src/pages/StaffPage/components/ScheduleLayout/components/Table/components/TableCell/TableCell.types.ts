export type CellProps = React.PropsWithChildren & {
  rowType: 'header' | 'footer' | 'main' | 'time'
  width: number
  isCurrentDay?: boolean
}
