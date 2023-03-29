import { ParsedBudgetItem } from '../../TableBody.types'

export type Props = {
  isFirstLevel: boolean
  items: ParsedBudgetItem['negatedItems']
  title: string
}
