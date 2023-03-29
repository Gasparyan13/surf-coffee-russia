import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    putFinancialWaybills: build.mutation<
      PutFinancialWaybillsApiResponse,
      PutFinancialWaybillsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/waybills`,
        method: 'PUT',
        body: queryArg.waybillUpdateDto,
      }),
    }),
    postFinancialWaybills: build.mutation<
      PostFinancialWaybillsApiResponse,
      PostFinancialWaybillsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/waybills`,
        method: 'POST',
        body: queryArg.waybillCreateDto,
      }),
    }),
    putFinancialTransactions: build.mutation<
      PutFinancialTransactionsApiResponse,
      PutFinancialTransactionsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/transactions`,
        method: 'PUT',
        body: queryArg.transactionUpdateDto,
      }),
    }),
    postFinancialTransactions: build.mutation<
      PostFinancialTransactionsApiResponse,
      PostFinancialTransactionsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/transactions`,
        method: 'POST',
        body: queryArg.transactionCreateDto,
      }),
    }),
    putFinancialServiceActs: build.mutation<
      PutFinancialServiceActsApiResponse,
      PutFinancialServiceActsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/service_acts`,
        method: 'PUT',
        body: queryArg.serviceActUpdateDto,
      }),
    }),
    postFinancialServiceActs: build.mutation<
      PostFinancialServiceActsApiResponse,
      PostFinancialServiceActsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/service_acts`,
        method: 'POST',
        body: queryArg.serviceActCreateDto,
      }),
    }),
    putFinancialReceipts: build.mutation<
      PutFinancialReceiptsApiResponse,
      PutFinancialReceiptsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/receipts`,
        method: 'PUT',
        body: queryArg.receiptUpdateDto,
      }),
    }),
    postFinancialReceipts: build.mutation<
      PostFinancialReceiptsApiResponse,
      PostFinancialReceiptsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/receipts`,
        method: 'POST',
        body: queryArg.receiptCreateDto,
      }),
    }),
    putFinancialPaymentInvoices: build.mutation<
      PutFinancialPaymentInvoicesApiResponse,
      PutFinancialPaymentInvoicesApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/payment_invoices`,
        method: 'PUT',
        body: queryArg.paymentInvoiceUpdateDto,
      }),
    }),
    postFinancialPaymentInvoices: build.mutation<
      PostFinancialPaymentInvoicesApiResponse,
      PostFinancialPaymentInvoicesApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/payment_invoices`,
        method: 'POST',
        body: queryArg.paymentInvoiceCreateDto,
      }),
    }),
    putFinancialCashOrders: build.mutation<
      PutFinancialCashOrdersApiResponse,
      PutFinancialCashOrdersApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/cash_orders`,
        method: 'PUT',
        body: queryArg.cashOrderUpdateDto,
      }),
    }),
    postFinancialCashOrders: build.mutation<
      PostFinancialCashOrdersApiResponse,
      PostFinancialCashOrdersApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/cash_orders`,
        method: 'POST',
        body: queryArg.cashOrderCreateDto,
      }),
    }),
    getFinancialPlannedOperations: build.query<
      GetFinancialPlannedOperationsApiResponse,
      GetFinancialPlannedOperationsApiArg
    >({
      query: () => ({ url: `/financial/planned_operations` }),
    }),
    postFinancialPlannedOperations: build.mutation<
      PostFinancialPlannedOperationsApiResponse,
      PostFinancialPlannedOperationsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/planned_operations`,
        method: 'POST',
        body: queryArg.plannedOperationCreateDto,
      }),
    }),
    patchFinancialPlannedOperations: build.mutation<
      PatchFinancialPlannedOperationsApiResponse,
      PatchFinancialPlannedOperationsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/planned_operations`,
        method: 'PATCH',
        body: queryArg.plannedOperationUpdateDto,
      }),
    }),
    getFinancialPlanAdjustments: build.query<
      GetFinancialPlanAdjustmentsApiResponse,
      GetFinancialPlanAdjustmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/plan_adjustments`,
        params: {
          enterpriseId: queryArg.enterpriseId,
          date: queryArg.date,
          budgetItemId: queryArg.budgetItemId,
        },
      }),
    }),
    postFinancialPlanAdjustments: build.mutation<
      PostFinancialPlanAdjustmentsApiResponse,
      PostFinancialPlanAdjustmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/plan_adjustments`,
        method: 'POST',
        body: queryArg.planAdjustmentCreateDto,
      }),
    }),
    deleteFinancialPlanAdjustments: build.mutation<
      DeleteFinancialPlanAdjustmentsApiResponse,
      DeleteFinancialPlanAdjustmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/plan_adjustments`,
        method: 'DELETE',
        params: {
          enterpriseId: queryArg.enterpriseId,
          date: queryArg.date,
          budgetItemId: queryArg.budgetItemId,
        },
      }),
    }),
    postFinancialDocuments: build.mutation<
      PostFinancialDocumentsApiResponse,
      PostFinancialDocumentsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/documents`,
        method: 'POST',
        body: queryArg.documentCreateDto,
      }),
    }),
    postFinancialDocumentsFilesUploadByDocumentType: build.mutation<
      PostFinancialDocumentsFilesUploadByDocumentTypeApiResponse,
      PostFinancialDocumentsFilesUploadByDocumentTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/documents/files/upload/${queryArg.documentType}`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    postFinancialCapitalAssetsCommissioning: build.mutation<
      PostFinancialCapitalAssetsCommissioningApiResponse,
      PostFinancialCapitalAssetsCommissioningApiArg
    >({
      query: () => ({
        url: `/financial/capital_assets/commissioning`,
        method: 'POST',
      }),
    }),
    postFinancialCapitalAssetsAmortizations: build.mutation<
      PostFinancialCapitalAssetsAmortizationsApiResponse,
      PostFinancialCapitalAssetsAmortizationsApiArg
    >({
      query: () => ({
        url: `/financial/capital_assets/amortizations`,
        method: 'POST',
      }),
    }),
    patchFinancialExpensesExcluded: build.mutation<
      PatchFinancialExpensesExcludedApiResponse,
      PatchFinancialExpensesExcludedApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/expenses/excluded`,
        method: 'PATCH',
        body: queryArg.mapsLongToBoolean,
      }),
    }),
    patchFinancialDailySalariesMonthlyViewExcluded: build.mutation<
      PatchFinancialDailySalariesMonthlyViewExcludedApiResponse,
      PatchFinancialDailySalariesMonthlyViewExcludedApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/daily_salaries/monthlyView/excluded`,
        method: 'PATCH',
        body: queryArg.monthlySalaryExcludeDto,
      }),
    }),
    headFinancialUsedCapitalAssetsByNameCapitalAsset: build.mutation<
      HeadFinancialUsedCapitalAssetsByNameCapitalAssetApiResponse,
      HeadFinancialUsedCapitalAssetsByNameCapitalAssetApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/used_capital_assets/${queryArg.nameCapitalAsset}`,
        method: 'HEAD',
      }),
    }),
    getFinancialUsedCapitalAssets: build.query<
      GetFinancialUsedCapitalAssetsApiResponse,
      GetFinancialUsedCapitalAssetsApiArg
    >({
      query: () => ({ url: `/financial/used_capital_assets` }),
    }),
    getFinancialPlannedOperationsById: build.query<
      GetFinancialPlannedOperationsByIdApiResponse,
      GetFinancialPlannedOperationsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/planned_operations/${queryArg.id}`,
      }),
    }),
    getFinancialPlannedOperationsPlannedAmountsByBudgetItems: build.query<
      GetFinancialPlannedOperationsPlannedAmountsByBudgetItemsApiResponse,
      GetFinancialPlannedOperationsPlannedAmountsByBudgetItemsApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/planned_operations/plannedAmountsByBudgetItems`,
        params: {
          reportType: queryArg.reportType,
          enterpriseId: queryArg.enterpriseId,
          yearMonth: queryArg.yearMonth,
          budgetItemId: queryArg.budgetItemId,
        },
      }),
    }),
    getFinancialOperationsByOperationId: build.query<
      GetFinancialOperationsByOperationIdApiResponse,
      GetFinancialOperationsByOperationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/operations/${queryArg.operationId}`,
      }),
    }),
    getFinancialOperationsGeneralView: build.query<
      GetFinancialOperationsGeneralViewApiResponse,
      GetFinancialOperationsGeneralViewApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/operations/general_view`,
        params: {
          dateFrom: queryArg.dateFrom,
          dateTo: queryArg.dateTo,
          operationKind: queryArg.operationKind,
          operationType: queryArg.operationType,
          contractorId: queryArg.contractorId,
          budgetItemId: queryArg.budgetItemId,
          amountFrom: queryArg.amountFrom,
          amountTo: queryArg.amountTo,
        },
      }),
    }),
    getFinancialExpensesPnlOperationsView: build.query<
      GetFinancialExpensesPnlOperationsViewApiResponse,
      GetFinancialExpensesPnlOperationsViewApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/expenses/pnlOperationsView`,
        params: {
          enterpriseId: queryArg.enterpriseId,
          yearMonth: queryArg.yearMonth,
          budgetItemId: queryArg.budgetItemId,
        },
      }),
    }),
    getFinancialExpensesCashFlowOperationsView: build.query<
      GetFinancialExpensesCashFlowOperationsViewApiResponse,
      GetFinancialExpensesCashFlowOperationsViewApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/expenses/cashFlowOperationsView`,
        params: {
          enterpriseId: queryArg.enterpriseId,
          yearMonth: queryArg.yearMonth,
          budgetItemId: queryArg.budgetItemId,
        },
      }),
    }),
    getFinancialDocumentsFilesDownloadByDocumentTypeAndFilename: build.query<
      GetFinancialDocumentsFilesDownloadByDocumentTypeAndFilenameApiResponse,
      GetFinancialDocumentsFilesDownloadByDocumentTypeAndFilenameApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/documents/files/download/${queryArg.documentType}/${queryArg.filename}`,
      }),
    }),
    getFinancialDailySalariesByPlanOrFactType: build.query<
      GetFinancialDailySalariesByPlanOrFactTypeApiResponse,
      GetFinancialDailySalariesByPlanOrFactTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/daily_salaries/${queryArg.planOrFactType}`,
        params: { workerId: queryArg.workerId, yearMonth: queryArg.yearMonth },
      }),
    }),
    getFinancialDailySalariesMonthlyViewByPlanOrFactType: build.query<
      GetFinancialDailySalariesMonthlyViewByPlanOrFactTypeApiResponse,
      GetFinancialDailySalariesMonthlyViewByPlanOrFactTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/financial/daily_salaries/monthlyView/${queryArg.planOrFactType}`,
        params: {
          enterpriseId: queryArg.enterpriseId,
          yearMonth: queryArg.yearMonth,
          budgetItemId: queryArg.budgetItemId,
        },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type PutFinancialWaybillsApiResponse =
  /** status 200 Успешно. */ Response
export type PutFinancialWaybillsApiArg = {
  waybillUpdateDto: WaybillUpdateDto
}
export type PostFinancialWaybillsApiResponse = /** status 200 Успешно. */ Blob
export type PostFinancialWaybillsApiArg = {
  waybillCreateDto: WaybillCreateDto
}
export type PutFinancialTransactionsApiResponse =
  /** status 200 Успешно. */ Response
export type PutFinancialTransactionsApiArg = {
  transactionUpdateDto: TransactionUpdateDto
}
export type PostFinancialTransactionsApiResponse =
  /** status 200 Успешно. */ Blob
export type PostFinancialTransactionsApiArg = {
  transactionCreateDto: TransactionCreateDto
}
export type PutFinancialServiceActsApiResponse =
  /** status 200 Успешно. */ Response
export type PutFinancialServiceActsApiArg = {
  serviceActUpdateDto: ServiceActUpdateDto
}
export type PostFinancialServiceActsApiResponse =
  /** status 200 Успешно. */ Blob
export type PostFinancialServiceActsApiArg = {
  serviceActCreateDto: ServiceActCreateDto
}
export type PutFinancialReceiptsApiResponse =
  /** status 200 Успешно. */ Response
export type PutFinancialReceiptsApiArg = {
  receiptUpdateDto: ReceiptUpdateDto
}
export type PostFinancialReceiptsApiResponse = /** status 200 Успешно. */ Blob
export type PostFinancialReceiptsApiArg = {
  receiptCreateDto: ReceiptCreateDto
}
export type PutFinancialPaymentInvoicesApiResponse =
  /** status 200 Успешно. */ Response
export type PutFinancialPaymentInvoicesApiArg = {
  paymentInvoiceUpdateDto: PaymentInvoiceUpdateDto
}
export type PostFinancialPaymentInvoicesApiResponse =
  /** status 200 Успешно. */ Response
export type PostFinancialPaymentInvoicesApiArg = {
  paymentInvoiceCreateDto: PaymentInvoiceCreateDto
}
export type PutFinancialCashOrdersApiResponse =
  /** status 200 Успешно. */ Response
export type PutFinancialCashOrdersApiArg = {
  cashOrderUpdateDto: CashOrderUpdateDto
}
export type PostFinancialCashOrdersApiResponse = /** status 200 Успешно. */ Blob
export type PostFinancialCashOrdersApiArg = {
  cashOrderCreateDto: CashOrderCreateDto
}
export type GetFinancialPlannedOperationsApiResponse =
  /** status 200 Получены все плановые операции */ PlannedOperationViewDto[]
export type GetFinancialPlannedOperationsApiArg = void
export type PostFinancialPlannedOperationsApiResponse =
  /** status 200 Успешно. */ Response
export type PostFinancialPlannedOperationsApiArg = {
  plannedOperationCreateDto: PlannedOperationCreateDto
}
export type PatchFinancialPlannedOperationsApiResponse =
  /** status 200 Успешно. */ Response
export type PatchFinancialPlannedOperationsApiArg = {
  plannedOperationUpdateDto: PlannedOperationUpdateDto
}
export type GetFinancialPlanAdjustmentsApiResponse =
  /** status 200 Получена ручная сумма по статье. */ PlanAdjustmentViewDto
export type GetFinancialPlanAdjustmentsApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** Произвольная дата внутри месяца */
  date: string
  /** id статьи расходов */
  budgetItemId: number
}
export type PostFinancialPlanAdjustmentsApiResponse =
  /** status 200 Корректировка плановой суммы сохранена. */ string
export type PostFinancialPlanAdjustmentsApiArg = {
  planAdjustmentCreateDto: PlanAdjustmentCreateDto
}
export type DeleteFinancialPlanAdjustmentsApiResponse =
  /** status 200 Ручная сумма по статье удалена. */ string
export type DeleteFinancialPlanAdjustmentsApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** Произвольная дата внутри месяца */
  date: string
  /** id статьи расходов */
  budgetItemId: number
}
export type PostFinancialDocumentsApiResponse =
  /** status 200 Документ добавлен. */ Blob
export type PostFinancialDocumentsApiArg = {
  documentCreateDto: DocumentCreateDto
}
export type PostFinancialDocumentsFilesUploadByDocumentTypeApiResponse =
  /** status 200 Файл сохранен. */ string
export type PostFinancialDocumentsFilesUploadByDocumentTypeApiArg = {
  /** тип документа из перечисления */
  documentType: 'INVOICE' | 'CHECK' | 'ORDERING' | 'WAYBILL' | 'ACT'
  body: {
    document: Blob
  }
}
export type PostFinancialCapitalAssetsCommissioningApiResponse =
  /** status 200 Ни одной проводки ввода в эксплуатацию не создано. */ Blob
export type PostFinancialCapitalAssetsCommissioningApiArg = void
export type PostFinancialCapitalAssetsAmortizationsApiResponse =
  /** status 200 Ни одной амортизации не создано */ Blob
export type PostFinancialCapitalAssetsAmortizationsApiArg = void
export type PatchFinancialExpensesExcludedApiResponse =
  /** status 200 Значения флагов успешно обновлены */ string
export type PatchFinancialExpensesExcludedApiArg = {
  /** карта id-boolean для множественного обновления */
  mapsLongToBoolean: MapsLongToBoolean
}
export type PatchFinancialDailySalariesMonthlyViewExcludedApiResponse =
  /** status 200 Значения флагов успешно обновлены */ string
export type PatchFinancialDailySalariesMonthlyViewExcludedApiArg = {
  /** карта id-boolean для множественного обновления */
  monthlySalaryExcludeDto: MonthlySalaryExcludeDto
}
export type HeadFinancialUsedCapitalAssetsByNameCapitalAssetApiResponse =
  /** status 200 Успешно. */ Blob
export type HeadFinancialUsedCapitalAssetsByNameCapitalAssetApiArg = {
  /** имя ОС */
  nameCapitalAsset: string
}
export type GetFinancialUsedCapitalAssetsApiResponse =
  /** status 200 Получены все используемые ОС */ string[]
export type GetFinancialUsedCapitalAssetsApiArg = void
export type GetFinancialPlannedOperationsByIdApiResponse =
  /** status 200 Успешно */ PlannedOperationViewDto
export type GetFinancialPlannedOperationsByIdApiArg = {
  id: number
}
export type GetFinancialPlannedOperationsPlannedAmountsByBudgetItemsApiResponse =
  /** status 200 Получены все суммы по статье. */ PlannedOperationWithTotalAmountDto[]
export type GetFinancialPlannedOperationsPlannedAmountsByBudgetItemsApiArg = {
  /** тип отчета. Значения: "pnl" - ОПУ или "cashFlow" - ОДДС */
  reportType: string
  /** id предприятия */
  enterpriseId: number
  /** период (год и месяц) */
  yearMonth: string
  /** id статьи расходов */
  budgetItemId: number
}
export type GetFinancialOperationsByOperationIdApiResponse =
  /** status 200 Успешно. */ OperationViewDto
export type GetFinancialOperationsByOperationIdApiArg = {
  /** Уникальный идентификатор операции */
  operationId: number
}
export type GetFinancialOperationsGeneralViewApiResponse =
  /** status 200 Успешно. */ OperationGeneralView[]
export type GetFinancialOperationsGeneralViewApiArg = {
  /** Дата c */
  dateFrom: any
  /** Дата по */
  dateTo: any
  /** Вид операции */
  operationKind?: any
  /** Тип операции */
  operationType?: any
  /** Уникальный идентификатор контрагента */
  contractorId?: any
  /** Уикальный идентификатор статьи бюджета */
  budgetItemId?: any
  /** Сумма с */
  amountFrom?: any
  /** Сумма по */
  amountTo?: any
}
export type GetFinancialExpensesPnlOperationsViewApiResponse =
  /** status 200 Получены все суммы по статьям */ FactualExpensesPerOperationViewDto[]
export type GetFinancialExpensesPnlOperationsViewApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** период (год и месяц) */
  yearMonth: string
  /** id статьи расходов */
  budgetItemId: number
}
export type GetFinancialExpensesCashFlowOperationsViewApiResponse =
  /** status 200 Получены все суммы по статьям */ FactualExpensesPerOperationViewDto[]
export type GetFinancialExpensesCashFlowOperationsViewApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** период (год и месяц) */
  yearMonth: string
  /** id статьи расходов */
  budgetItemId: number
}
export type GetFinancialDocumentsFilesDownloadByDocumentTypeAndFilenameApiResponse =
  /** status 200 Найден файл */ Blob
export type GetFinancialDocumentsFilesDownloadByDocumentTypeAndFilenameApiArg =
  {
    /** тип документа из перечисления */
    documentType: 'INVOICE' | 'CHECK' | 'ORDERING' | 'WAYBILL' | 'ACT'
    /** имя файла */
    filename: string
  }
export type GetFinancialDailySalariesByPlanOrFactTypeApiResponse =
  /** status 200 Получена детализации З/П сотрудника */ DailySalaryViewDto[]
export type GetFinancialDailySalariesByPlanOrFactTypeApiArg = {
  /** тип представления. Значения: "plan" - плановые или "fact" - фактические операции */
  planOrFactType: string
  /** id работника */
  workerId: number
  /** период (год и месяц) */
  yearMonth: string
}
export type GetFinancialDailySalariesMonthlyViewByPlanOrFactTypeApiResponse =
  /** status 200 Получены все зарплаты сотрудников за месяц */ MonthlySalaryViewDto[]
export type GetFinancialDailySalariesMonthlyViewByPlanOrFactTypeApiArg = {
  /** тип представления. Значения: "plan" - плановые или "fact" - фактические операции */
  planOrFactType: string
  /** id предприятия */
  enterpriseId: number
  /** период (год и месяц) */
  yearMonth: string
  /** id статьи расходов ФОТ */
  budgetItemId: number
}
export type Response = {
  message?: string
  entityId?: number
}
export type WaybillExpenseUpdateDto = {
  id?: number
  budgetItemId: number
  amount: number
  name: string
  usageStartDate?: string
  usagePeriod?: string
  primeCost?: number
  isCapitalAssets?: boolean
}
export type DocumentViewDto = {
  documentId?: number
  documentType?: 'INVOICE' | 'CHECK' | 'ORDERING' | 'WAYBILL' | 'ACT'
  fileName?: string
}
export type WaybillUpdateDto = {
  id: number
  enterpriseId: number
  expenses: WaybillExpenseUpdateDto[]
  contractorId: number
  waybillNumber: string
  waybillDate: string
  deliveryDate: string
  document: DocumentViewDto
  isPurchase?: boolean
}
export type WaybillExpenseCreateDto = {
  budgetItemId: number
  amount: number
  name: string
  usageStartDate?: string
  usagePeriod?: string
  primeCost?: number
  isCapitalAssets?: boolean
}
export type WaybillCreateDto = {
  enterpriseId: number
  isPurchase: boolean
  expenses: WaybillExpenseCreateDto[]
  contractorId: number
  waybillNumber: string
  waybillDate: string
  deliveryDate: string
  document: DocumentViewDto
}
export type TransactionExpenseUpdateDto = {
  id?: number
  budgetItemId: number
  amount: number
  name?: string
}
export type TransactionUpdateDto = {
  id: number
  enterpriseId: number
  expenses: TransactionExpenseUpdateDto[]
  contractorId: number
  accountNumber?: string
  transactionNumber?: string
  transactionDate: string
  paymentPurpose: string
  isWriteOff?: boolean
}
export type TransactionExpenseCreateDto = {
  budgetItemId: number
  amount: number
  name?: string
}
export type TransactionCreateDto = {
  enterpriseId: number
  isWriteOff: boolean
  expenses: TransactionExpenseCreateDto[]
  contractorId: number
  accountNumber?: string
  transactionNumber?: string
  transactionDate: string
  paymentPurpose: string
}
export type ActExpenseUpdateDto = {
  id?: number
  budgetItemId: number
  amount: number
  primeCost?: number
  name: string
}
export type ServiceActUpdateDto = {
  id: number
  enterpriseId: number
  expenses: ActExpenseUpdateDto[]
  contractorId: number
  actNumber: string
  actDate: string
  deliveryDate: string
  document: DocumentViewDto
  isPurchase?: boolean
}
export type ActExpenseCreateDto = {
  budgetItemId: number
  amount: number
  name: string
  primeCost?: number
}
export type ServiceActCreateDto = {
  enterpriseId: number
  isPurchase: boolean
  expenses: ActExpenseCreateDto[]
  contractorId: number
  actNumber: string
  actDate: string
  deliveryDate: string
  document: DocumentViewDto
}
export type ReceiptExpenseUpdateDto = {
  id?: number
  budgetItemId: number
  amount: number
  name: string
}
export type ReceiptUpdateDto = {
  id: number
  enterpriseId: number
  expenses: ReceiptExpenseUpdateDto[]
  contractorId: number
  receiptDate: string
  document: DocumentViewDto
}
export type ReceiptExpenseCreateDto = {
  budgetItemId: number
  amount: number
  name: string
}
export type ReceiptCreateDto = {
  enterpriseId: number
  expenses: ReceiptExpenseCreateDto[]
  contractorId: number
  receiptDate: string
  document: DocumentViewDto
}
export type PaymentInvoiceExpenseUpdateDto = {
  id?: number
  budgetItemId: number
  amount: number
  name: string
}
export type PaymentInvoiceUpdateDto = {
  id: number
  enterpriseId: number
  expenses: PaymentInvoiceExpenseUpdateDto[]
  contractorId: number
  accountNumber: string
  invoiceDate: string
  paymentDate: string
  document: DocumentViewDto
  isWriteOff?: boolean
}
export type PaymentInvoiceExpenseCreateDto = {
  budgetItemId: number
  amount: number
  name: string
}
export type PaymentInvoiceCreateDto = {
  enterpriseId: number
  isWriteOff: boolean
  expenses: PaymentInvoiceExpenseCreateDto[]
  contractorId: number
  accountNumber: string
  invoiceDate: string
  paymentDate: string
  document: DocumentViewDto
}
export type CashOrderExpenseUpdateDto = {
  id?: number
  budgetItemId: number
  amount: number
  name?: string
}
export type CashOrderUpdateDto = {
  id: number
  enterpriseId: number
  expenses: CashOrderExpenseUpdateDto[]
  contractorId: number
  accountNumber?: string
  cashOrderNumber?: string
  cashOrderDate: string
  paymentPurpose: string
  isWriteOff?: boolean
}
export type CashOrderExpenseCreateDto = {
  budgetItemId: number
  amount: number
  name?: string
}
export type CashOrderCreateDto = {
  enterpriseId: number
  isWriteOff: boolean
  expenses: CashOrderExpenseCreateDto[]
  contractorId: number
  accountNumber?: string
  cashOrderNumber?: string
  cashOrderDate: string
  paymentPurpose: string
}
export type ContractorViewDto = {
  id?: number
  alias?: string
}
export type BudgetItemDto = {
  id?: number
  isCapitalAssets?: boolean
  name?: string
  parentItemId?: number
}
export type CapitalAssetDto = {
  startDate?: string
  periodOfUse?: number
}
export type ExpenseViewDto = {
  id?: number
  budgetItem?: BudgetItemDto
  money?: number
  primeCost?: number
  name?: string
  capitalAsset?: CapitalAssetDto
}
export type PlannedOperationViewDto = {
  id?: number
  enterpriseId?: number
  contractor?: ContractorViewDto
  isWriteOff?: boolean
  isCash?: boolean
  expense?: ExpenseViewDto
  dateOfPayment?: string
  isService?: boolean
  dateOfReceiving?: string
}
export type ExpenseCreateDto = {
  budgetItemId: number
  money: number
  name?: string
}
export type PlannedOperationCreateDto = {
  enterpriseId: number
  contractorId: number
  isWriteOff: boolean
  isCash: boolean
  expense: ExpenseCreateDto
  dateOfPayment: string
  isService?: boolean
  dateOfReceiving: string
}
export type ExpenseUpdateDto = {
  expensesId: number
  budgetItemId: number
  money: number
  name?: string
}
export type PlannedOperationUpdateDto = {
  id: number
  enterpriseId: number
  contractorId: number
  isWriteOff: boolean
  isCash: boolean
  dateOfPayment: string
  isService?: boolean
  dateOfReceiving: string
  expense: ExpenseUpdateDto
}
export type PlanAdjustmentViewDto = {
  id?: number
  money?: number
}
export type PlanAdjustmentCreateDto = {
  enterpriseId?: number
  budgetItemId?: number
  money?: number
  planDate?: string
}
export type DocumentCreateDto = {
  documentType?: 'INVOICE' | 'CHECK' | 'ORDERING' | 'WAYBILL' | 'ACT'
  fileName?: string
}
export type MapsLongToBoolean = {
  '1'?: boolean
}
export type MonthlySalaryExcludeDto = {
  month?: string
  workerIdToExcluded?: {
    [key: string]: boolean
  }
}
export type PlannedOperationWithAmountDto = {
  id?: number
  isWriteOff?: boolean
  dateOfPayment?: string
  dateOfReceiving?: string
  contractor?: string
  money?: number
}
export type PlannedOperationWithTotalAmountDto = {
  operations?: PlannedOperationWithAmountDto[]
  total?: number
}
export type OperationViewDto = {
  id?: number
  enterpriseId?: number
  contractor?: ContractorViewDto
  expenses?: ExpenseViewDto[]
  operationDate?: string
  operationNumber?: string
  accountNumber?: string
  receiveDate?: string
  paymentPurpose?: string
  document?: DocumentViewDto
  isIncome?: boolean
}
export type OperationGeneralView = {
  operationId?: number
  dateOfPayment?: string
  dateOfReceiving?: string
  operationType?:
    | 'CASH_ORDER'
    | 'PAYMENT_INVOICE'
    | 'SERVICE_ACT'
    | 'TRANSACTION'
    | 'WAYBILL'
    | 'RECEIPT'
    | 'PLANNED'
  operationKind?: 'WRITE_OFF' | 'INCOME' | 'PURCHASE' | 'SALE'
  contractorName?: string
  budgetItemName?: string
  productName?: string
  amount?: number
}
export type FactualExpensesPerOperationViewDto = {
  operationId?: number
  operationType?: string
  contractor?: string
  date?: string
  money?: number
  isIncome?: boolean
  isExpense?: boolean
}
export type DailySalaryViewDto = {
  id?: number
  date?: string
  hours?: number
  money?: number
}
export type MonthlySalaryViewDto = {
  workerId?: number
  name?: string
  enterprise?: string
  hours?: number
  salary?: number
  included?: boolean
}
export const {
  usePutFinancialWaybillsMutation,
  usePostFinancialWaybillsMutation,
  usePutFinancialTransactionsMutation,
  usePostFinancialTransactionsMutation,
  usePutFinancialServiceActsMutation,
  usePostFinancialServiceActsMutation,
  usePutFinancialReceiptsMutation,
  usePostFinancialReceiptsMutation,
  usePutFinancialPaymentInvoicesMutation,
  usePostFinancialPaymentInvoicesMutation,
  usePutFinancialCashOrdersMutation,
  usePostFinancialCashOrdersMutation,
  useGetFinancialPlannedOperationsQuery,
  useLazyGetFinancialPlannedOperationsQuery,
  usePostFinancialPlannedOperationsMutation,
  usePatchFinancialPlannedOperationsMutation,
  useGetFinancialPlanAdjustmentsQuery,
  useLazyGetFinancialPlanAdjustmentsQuery,
  usePostFinancialPlanAdjustmentsMutation,
  useDeleteFinancialPlanAdjustmentsMutation,
  usePostFinancialDocumentsMutation,
  usePostFinancialDocumentsFilesUploadByDocumentTypeMutation,
  usePostFinancialCapitalAssetsCommissioningMutation,
  usePostFinancialCapitalAssetsAmortizationsMutation,
  usePatchFinancialExpensesExcludedMutation,
  usePatchFinancialDailySalariesMonthlyViewExcludedMutation,
  useHeadFinancialUsedCapitalAssetsByNameCapitalAssetMutation,
  useGetFinancialUsedCapitalAssetsQuery,
  useLazyGetFinancialUsedCapitalAssetsQuery,
  useGetFinancialPlannedOperationsByIdQuery,
  useLazyGetFinancialPlannedOperationsByIdQuery,
  useGetFinancialPlannedOperationsPlannedAmountsByBudgetItemsQuery,
  useLazyGetFinancialPlannedOperationsPlannedAmountsByBudgetItemsQuery,
  useGetFinancialOperationsByOperationIdQuery,
  useLazyGetFinancialOperationsByOperationIdQuery,
  useGetFinancialOperationsGeneralViewQuery,
  useLazyGetFinancialOperationsGeneralViewQuery,
  useGetFinancialExpensesPnlOperationsViewQuery,
  useLazyGetFinancialExpensesPnlOperationsViewQuery,
  useGetFinancialExpensesCashFlowOperationsViewQuery,
  useLazyGetFinancialExpensesCashFlowOperationsViewQuery,
  useGetFinancialDocumentsFilesDownloadByDocumentTypeAndFilenameQuery,
  useLazyGetFinancialDocumentsFilesDownloadByDocumentTypeAndFilenameQuery,
  useGetFinancialDailySalariesByPlanOrFactTypeQuery,
  useLazyGetFinancialDailySalariesByPlanOrFactTypeQuery,
  useGetFinancialDailySalariesMonthlyViewByPlanOrFactTypeQuery,
  useLazyGetFinancialDailySalariesMonthlyViewByPlanOrFactTypeQuery,
} = injectedRtkApi
