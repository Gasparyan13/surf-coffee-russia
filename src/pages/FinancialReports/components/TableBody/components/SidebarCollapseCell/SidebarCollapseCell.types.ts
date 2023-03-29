import { Nullable } from '@common/types/Nullable'

export type Props<T> = {
  data: T
  onToggleExpandRow: (tableRowId: number) => void
  nextRowDataParentId?: Nullable<number>
  searchValue?: string
}
