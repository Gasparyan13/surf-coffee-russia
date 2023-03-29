import { OperationGeneralView } from '@rtkApi/modules/__generated__/financial'

export type OperationRow = OperationGeneralView

export type Props = {
  rows: OperationRow[]
  searchValue?: string
}
