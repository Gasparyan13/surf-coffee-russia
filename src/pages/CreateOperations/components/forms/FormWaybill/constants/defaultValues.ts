import { uuid } from '@helpers/uuid'

import { EPurchaseSale } from '../../components/FormToggleButtonGroup/enums'
import { CreateWaybillForm } from '../FormWaybill.types'

export const defaultValues: CreateWaybillForm = {
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
  waybillNumber: '',
  waybillDate: null,
  deliveryDate: null,
  document: null,
}
