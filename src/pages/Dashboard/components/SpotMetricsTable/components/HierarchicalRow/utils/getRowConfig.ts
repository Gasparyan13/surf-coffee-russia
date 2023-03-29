import { Props as RowProps } from '../HierarchicalRow.types'

export type GetRowConfig = Omit<RowProps, 'children'>
export type RowConfig = {
  hasBorderTop: boolean
  hasPaddingLeft: boolean
}

export const getRowConfig = ({ index, level }: GetRowConfig): RowConfig => {
  const getConfigByLevel: Record<number, () => RowConfig> = {
    0: () => {
      const isFirstRow = !index

      return { hasBorderTop: !isFirstRow, hasPaddingLeft: false }
    },
    1: () => ({ hasBorderTop: true, hasPaddingLeft: false }),
    2: () => ({ hasBorderTop: false, hasPaddingLeft: true }),
  }

  return getConfigByLevel[level]?.()
}
