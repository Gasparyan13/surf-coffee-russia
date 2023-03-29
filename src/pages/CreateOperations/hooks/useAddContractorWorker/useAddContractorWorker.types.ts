import {
  EPurchaseSale,
  EWriteOffReceipt,
} from '../../components/forms/components/FormToggleButtonGroup/enums'

export type Props = {
  budgetItemId: number | undefined
  isPurchaseOrWriteOff: EPurchaseSale | EWriteOffReceipt
  resetField: () => void
}
