import { ExpensesItemFieldKey } from '../../components/FormExpenses'
import { ItemsName } from '../../components/FormExpenses/FormExpenses.types'
import { EWriteOffReceipt } from '../../components/FormToggleButtonGroup/enums'
import * as T from '../FormPlannedOperation.types'

export const defaultValues: T.CreateFormPlannedOperationForm = {
  isWriteOff: EWriteOffReceipt.WriteOff,
  contractor: null,
  isService: false,
  paymentDate: null,
  receiveDate: null,
  budgetItem: null,
  amount: null,
  name: '',
  paymentType: undefined,
}

export const itemsNamesValue: ItemsName = {
  [ExpensesItemFieldKey.NAME]: {
    placeholder: 'Например, ящик колы',
    label: 'Наименование товара',
  },
}
