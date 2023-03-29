import { uuid } from '@common/helpers/uuid'

import { EPurchaseSale } from '../../components/FormToggleButtonGroup/enums'
import { CreateActForm } from '../FormAct.types'

export const defaultValues: CreateActForm = {
  isPurchase: EPurchaseSale.Purchase,
  contractor: null,
  expenses: [
    {
      budgetItem: null,
      amount: undefined,
      name: '',
      id: uuid(),
      primeCost: undefined,
    },
  ],
  actNumber: '',
  actDate: null,
  deliveryDate: null,
  document: null,
}
