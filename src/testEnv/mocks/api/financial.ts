/* eslint-disable max-lines */
import {
  ERROR_MESSAGE_ADD_ACT,
  ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD,
} from '@pages/CreateOperations/components/forms/FormAct/constants/messages/errors'
import { SUCCESS_ADD_ACT } from '@pages/CreateOperations/components/forms/FormAct/constants/messages/sucess'
import { ERROR_MESSAGE_ADD_CASH_WARRANT } from '@pages/CreateOperations/components/forms/FormCashWarrant/constants/messages/errors'
import { SUCCESS_ADD_CASH_WARRANT } from '@pages/CreateOperations/components/forms/FormCashWarrant/constants/messages/sucess'
import { ERROR_MESSAGE_ADD_PAYMENT_INVOICE } from '@pages/CreateOperations/components/forms/FormPaymentInvoice/constants/messages/errors'
import { SUCCESS_ADD_PAYMENT_INVOICE } from '@pages/CreateOperations/components/forms/FormPaymentInvoice/constants/messages/success'
import { ERROR_MESSAGE_ADD_PAYMENT_RECEIPT } from '@pages/CreateOperations/components/forms/FormPaymentReceipt/constants/messages/errors'
import { SUCCESS_ADD_PAYMENT_RECEIPT } from '@pages/CreateOperations/components/forms/FormPaymentReceipt/constants/messages/sucess'
import { ERROR_MESSAGE_ADD_PLANNED_OPERATION } from '@pages/CreateOperations/components/forms/FormPlannedOperation/constants/messages/errors'
import { SUCCESS_ADD_PLANNED_OPERATION } from '@pages/CreateOperations/components/forms/FormPlannedOperation/constants/messages/sucess'
import { ERROR_MESSAGE_ADD_TRANSACTION } from '@pages/CreateOperations/components/forms/FormTransaction/constants/messages/errors'
import { SUCCESS_ADD_TRANSACTION } from '@pages/CreateOperations/components/forms/FormTransaction/constants/messages/sucess'
import {
  ERROR_MESSAGE_ADD_WAYBILL,
  ERROR_MESSAGE_EMPTY_WAYBILL_NUMBER_FIELD,
} from '@pages/CreateOperations/components/forms/FormWaybill/constants/messages/errors'
import { SUCCESS_ADD_WAYBILL } from '@pages/CreateOperations/components/forms/FormWaybill/constants/messages/sucess'
import {
  ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
  ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD,
} from '@pages/CreateOperations/constants/messages/error'
import { Error400 } from '@pages/CreateOperations/utils/getters'

import {
  DocumentViewDto,
  FactualExpensesPerOperationViewDto,
  GetFinancialExpensesCashFlowOperationsViewApiResponse,
  GetFinancialExpensesPnlOperationsViewApiResponse,
  GetFinancialOperationsByOperationIdApiResponse,
  GetFinancialOperationsGeneralViewApiResponse,
  GetFinancialPlannedOperationsByIdApiResponse,
  GetFinancialUsedCapitalAssetsApiResponse,
  PatchFinancialPlannedOperationsApiResponse,
  PlannedOperationWithTotalAmountDto,
} from '@rtkApi/modules/__generated__/financial'

import { capitalAssetsBudgetItem, payrollBudgetItem } from './prepayment'

export type Data =
  | string
  | {
      message: string
      error: boolean
      id: number
    }
  | Error400['data']

export type ErrorPostFinancialDocumentByType = {
  timestamp: string
  status: number
  error: string
  path: string
}

export const errorAddPlannedOperation = ERROR_MESSAGE_ADD_PLANNED_OPERATION
export const errorAddInvoicePayment = ERROR_MESSAGE_ADD_PAYMENT_INVOICE
export const errorAddCashWarrantOperation = ERROR_MESSAGE_ADD_CASH_WARRANT
export const errorAddWaybillOperation = ERROR_MESSAGE_ADD_WAYBILL
export const errorAddPaymentReceiptOperation = ERROR_MESSAGE_ADD_PAYMENT_RECEIPT
export const errorAddActOperation = ERROR_MESSAGE_ADD_ACT
export const errorAddTransaction = ERROR_MESSAGE_ADD_TRANSACTION

export const errorPostFinancialDocumentWaybill: ErrorPostFinancialDocumentByType =
  {
    timestamp: '2022-09-27T13:07:33.511+00:00',
    status: 500,
    error: 'Internal Server Error',
    path: '/financial/documents/files/upload/WAYBILL',
  }

export const errorPostFinancialDocumentAct: ErrorPostFinancialDocumentByType = {
  timestamp: '2022-09-27T13:07:33.511+00:00',
  status: 500,
  error: 'Internal Server Error',
  path: '/financial/documents/files/upload/ACT',
}

export const errorPostFinancialDocumentInvoice: ErrorPostFinancialDocumentByType =
  {
    timestamp: '2022-09-27T13:07:33.511+00:00',
    status: 500,
    error: 'Internal Server Error',
    path: '/financial/documents/files/upload/INVOICE',
  }

export const errorPostFinancialDocumentPaymentReceipt: ErrorPostFinancialDocumentByType =
  {
    timestamp: '2022-09-27T13:07:33.511+00:00',
    status: 500,
    error: 'Internal Server Error',
    path: '/financial/documents/files/upload/CHECK',
  }

export const error400AddWaybillOperation = {
  message: 'Validation failed',
  details: [
    ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
    ERROR_MESSAGE_EMPTY_WAYBILL_NUMBER_FIELD,
  ],
}

export const error400AddActOperation = {
  message: 'Validation failed',
  details: [
    ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
    ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD,
  ],
}

export const error400CashWarrantOperation = {
  message: 'Validation failed',
  details: [ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD],
}

export const error400AddTransaction = {
  message: 'Validation failed',
  details: [ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD],
}

export const error400AddInvoicePayment = {
  message: 'Validation failed',
  details: [ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD],
}

export const error400AddPaymentReceiptOperation = {
  message: 'Validation failed',
  details: [ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD],
}

export const successAddWaybill = {
  message: SUCCESS_ADD_WAYBILL,
  error: false,
  id: 123,
}

export const successAddAct = {
  message: SUCCESS_ADD_ACT,
  error: false,
  id: 123,
}

export const successAddTransaction = {
  message: SUCCESS_ADD_TRANSACTION,
  error: false,
  id: 123,
}

export const successAddPlannedOperation = {
  message: SUCCESS_ADD_PLANNED_OPERATION,
  error: false,
  id: 136,
}

export const successAddInvoicePaymentOperation = {
  message: SUCCESS_ADD_PAYMENT_INVOICE,
  error: false,
  id: 123,
}

export const successAddCashWarrantOperation = {
  message: SUCCESS_ADD_CASH_WARRANT,
  error: false,
  id: 123,
}

export const successAddPaymentReceiptOperation = {
  error: false,
  message: SUCCESS_ADD_PAYMENT_RECEIPT,
  id: 1,
}

export const successPostFinancialDocumentWaybill: DocumentViewDto = {
  documentId: 1,
  documentType: 'WAYBILL',
  fileName: 'test',
}

export const successPostFinancialDocumentInvoice: DocumentViewDto = {
  documentId: 1,
  documentType: 'INVOICE',
  fileName: 'test',
}

export const successPostFinancialDocumentAct: DocumentViewDto = {
  documentId: 1,
  documentType: 'ACT',
  fileName: 'test',
}

export const successPostFinancialDocumentPaymentReceipt: DocumentViewDto = {
  documentId: 1,
  documentType: 'CHECK',
  fileName: 'test',
}

export const successGetFinancialExpensesCashFlowOperationsEmptyArray: GetFinancialExpensesCashFlowOperationsViewApiResponse =
  []

export const successGetFinancialExpensesCashFlowOperations: GetFinancialExpensesCashFlowOperationsViewApiResponse =
  [
    {
      operationId: 31,
      date: '2022-10-01',
      contractor: '43',
      money: 23230,
      isIncome: false,
    },
  ]

export const successGetUsedCapitalAssets: GetFinancialUsedCapitalAssetsApiResponse =
  ['Водонагреватель', 'Кофемашина', 'Холодильник']

export const defaultFactualExpensesPerOperationViewDto: Omit<
  FactualExpensesPerOperationViewDto,
  'operationId' | 'operationType'
> = {
  isIncome: true,
  contractor: 'ООО "Пятерочка"',
  date: '2022-10-01',
  money: 30750,
}

export const successGetFinancialExpensesCashFlowOperationsView: GetFinancialExpensesPnlOperationsViewApiResponse =
  [
    {
      ...defaultFactualExpensesPerOperationViewDto,
      operationId: 1,
      operationType: 'Транзакция',
    },
    {
      ...defaultFactualExpensesPerOperationViewDto,
      operationId: 2,
      operationType: 'Кассовый ордер',
      money: -12000,
    },
    {
      ...defaultFactualExpensesPerOperationViewDto,
      operationId: 3,
      operationType: 'Чек',
      money: 30750,
    },
    {
      ...defaultFactualExpensesPerOperationViewDto,
      operationId: 4,
      operationType: 'Акт',
    },
    {
      ...defaultFactualExpensesPerOperationViewDto,
      operationId: 5,
      operationType: 'Накладная',
    },
  ]

export const successGetFinancialExpensesCashFlowOperationsViewSellPurchase: GetFinancialExpensesPnlOperationsViewApiResponse =
  [
    {
      ...defaultFactualExpensesPerOperationViewDto,
      operationId: 1,
      operationType: 'Транзакция',
      isIncome: false,
    },
    {
      ...defaultFactualExpensesPerOperationViewDto,
      operationId: 2,
      operationType: 'Транзакция',
    },
  ]

export const successGetFinancialOperationsByOperationIdFullApiResponse: GetFinancialOperationsByOperationIdApiResponse =
  {
    id: 1,
    enterpriseId: 26,
    contractor: {
      id: 1,
      alias: 'contractor',
    },
    expenses: [
      {
        id: 1,
        budgetItem: {
          ...capitalAssetsBudgetItem,
          id: 41,
          isCapitalAssets: false,
        },
        money: 1000.0,
        name: 'budgetItem',
        capitalAsset: {
          periodOfUse: 20,
          startDate: '2022-10',
        },
        primeCost: 100,
      },
    ],
    operationDate: '2022-10-07',
    operationNumber: 'operationNumber',
    accountNumber: 'accountNumber',
    receiveDate: '2022-10-07',
    paymentPurpose: 'paymentPurpose',
    document: {
      documentId: 442,
      documentType: 'CHECK',
      fileName: 'fileName.pdf',
    },
    isIncome: false,
  }

export const successGetFinancialOperationsByOperationIdIsCapitalAssets: GetFinancialOperationsByOperationIdApiResponse =
  {
    ...successGetFinancialOperationsByOperationIdFullApiResponse,
    expenses:
      successGetFinancialOperationsByOperationIdFullApiResponse?.expenses?.map(
        ({ primeCost, ...expense }) => ({
          ...expense,
          budgetItem: {
            ...capitalAssetsBudgetItem,
          },
        }),
      ),
  }

export const successGetFinancialOperationsByOperationId: GetFinancialOperationsByOperationIdApiResponse =
  {
    ...successGetFinancialOperationsByOperationIdFullApiResponse,
    expenses:
      successGetFinancialOperationsByOperationIdFullApiResponse?.expenses?.map(
        ({ primeCost, ...expense }) => ({
          ...expense,
        }),
      ),
  }

export const successGetFinancialOperationsByOperationIdIsPayrollBudgetItem: GetFinancialOperationsByOperationIdApiResponse =
  {
    ...successGetFinancialOperationsByOperationIdFullApiResponse,
    expenses:
      successGetFinancialOperationsByOperationIdFullApiResponse?.expenses?.map(
        ({ primeCost, ...expense }) => ({
          ...expense,
          budgetItem: {
            ...payrollBudgetItem,
          },
        }),
      ),
  }

export const successGetFinancialPlannedOperationsPlannedAmountsByBudgetItems: PlannedOperationWithTotalAmountDto =
  {
    operations: [
      {
        id: 1,
        isWriteOff: true,
        dateOfPayment: '2022-11-10',
        dateOfReceiving: '2022-11-10',
        contractor: 'Name1',
        money: 10,
      },
      {
        id: 2,
        isWriteOff: false,
        dateOfPayment: '2022-11-10',
        dateOfReceiving: '2022-11-10',
        contractor: 'Name3',
        money: 10,
      },
    ],
    total: 20,
  }

export const successGetFinancialPlannedOperationsById: GetFinancialPlannedOperationsByIdApiResponse =
  {
    id: 3,
    enterpriseId: 26,
    contractor: { id: 476, alias: 'Новое физ лицо' },
    isWriteOff: true,
    isCash: false,
    expense: {
      id: 3,
      budgetItem: {
        id: 3,
        isCapitalAssets: false,
        name: 'Прикассовая зона',
        parentItemId: 1,
      },
      money: 1200.0,
      name: 'кока кола',
    },
    dateOfPayment: '2022-10-26',
    isService: false,
    dateOfReceiving: '2022-10-26',
  }

export const successGetFinancialPlannedOperationsByIdIsPayrollBudgetItem: GetFinancialPlannedOperationsByIdApiResponse =
  {
    ...successGetFinancialPlannedOperationsById,
    expense: {
      ...successGetFinancialPlannedOperationsById.expense,
      budgetItem: {
        ...payrollBudgetItem,
      },
    },
  }

export const successPatchFinancialPlannedOperations: PatchFinancialPlannedOperationsApiResponse =
  {
    entityId: 1,
    message: 'Плановая операция сохранена.',
  }

export const successGetFinancialOperationsGeneralView: GetFinancialOperationsGeneralViewApiResponse =
  [
    {
      operationId: 2,
      dateOfPayment: '2022-07-05',
      dateOfReceiving: '2022-07-18',
      operationType: 'PLANNED',
      operationKind: 'INCOME',
      contractorName: 'ООО "Пятерочка"',
      budgetItemName: 'Расход продуктов',
      productName: 'Вилки пластиковые',
      amount: 30570,
    },
  ]
