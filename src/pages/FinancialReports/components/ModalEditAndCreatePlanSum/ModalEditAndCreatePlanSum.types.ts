export type PatchSumData = {
  expenseType: string
  sum: string
}

export type Props = {
  open?: boolean
  onClose: () => void
  date: string
  budgetItemId?: number
  title?: string
  budgetItemName?: string
}
