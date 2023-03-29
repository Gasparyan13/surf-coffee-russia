import { EOperationsType } from '../../../common/types/Operations'
import { FormAct } from '../components/forms/FormAct'
import { FormCashWarrant } from '../components/forms/FormCashWarrant'
import { FormPaymentInvoice } from '../components/forms/FormPaymentInvoice'
import { FormPaymentReceipt } from '../components/forms/FormPaymentReceipt'
import { FormPlannedOperation } from '../components/forms/FormPlannedOperation'
import { FormTransaction } from '../components/forms/FormTransaction'
import { FormWaybill } from '../components/forms/FormWaybill'

export const CREATE_OPERATION_FORMS: {
  [k in EOperationsType]: typeof FormTransaction | null
} = {
  [EOperationsType.ServiceAct]: FormAct,
  [EOperationsType.PaymentInvoice]: FormPaymentInvoice,
  [EOperationsType.Waybill]: FormWaybill,
  [EOperationsType.Receipt]: FormPaymentReceipt,
  [EOperationsType.PlannedOperation]: FormPlannedOperation,
  [EOperationsType.Transaction]: FormTransaction,
  [EOperationsType.CashOrders]: FormCashWarrant,
}
