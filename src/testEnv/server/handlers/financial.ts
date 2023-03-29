import { rest } from 'msw'

import {
  DocumentViewDto,
  GetFinancialExpensesCashFlowOperationsViewApiResponse,
  GetFinancialExpensesPnlOperationsViewApiResponse,
  GetFinancialOperationsByOperationIdApiResponse,
  GetFinancialOperationsGeneralViewApiResponse,
  GetFinancialPlannedOperationsByIdApiResponse,
  GetFinancialUsedCapitalAssetsApiResponse,
  PatchFinancialPlannedOperationsApiResponse,
  PlannedOperationWithTotalAmountDto,
} from '@rtkApi/modules/__generated__/financial'

import {
  Data,
  ErrorPostFinancialDocumentByType,
  successGetFinancialExpensesCashFlowOperationsView,
  successGetFinancialOperationsByOperationId,
  successGetFinancialOperationsGeneralView,
  successGetFinancialPlannedOperationsById,
  successGetUsedCapitalAssets,
  successPatchFinancialPlannedOperations,
} from '@testEnv/mocks/api/financial'

export const mockPostFinancialPlannedOperationsApiResponse = (
  data: Data,
  status = 200,
) =>
  rest.post(/financial\/planned_operations/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPostFinancialCashWarrant = (data: Data, status = 200) =>
  rest.post(/financial\/cash_orders/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPutFinancialCashWarrant = (data: Data, status = 200) =>
  rest.put(/financial\/cash_orders/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPostFinancialInvoicePayment = (data: Data, status = 200) =>
  rest.post(/financial\/payment_invoices/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPutFinancialInvoicePayment = (data: Data, status = 200) =>
  rest.put(/financial\/payment_invoices/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPostWaybillApiResponse = (data: Data, status = 200) =>
  rest.post(/financial\/waybills/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPutWaybillApiResponse = (data: Data, status = 200) =>
  rest.put(/financial\/waybills/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPostActApiResponse = (data: Data, status = 200) =>
  rest.post(/financial\/service_acts/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPutActApiResponse = (data: Data, status = 200) =>
  rest.put(/financial\/service_acts/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPostFinancialTransaction = (data: Data, status = 200) =>
  rest.post(/financial\/transactions/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPutFinancialTransaction = (data: Data, status = 200) =>
  rest.put(/financial\/transactions/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPostFinancialPaymentReceipt = (data: Data, status = 200) =>
  rest.post(/financial\/receipts/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPutFinancialPaymentReceipt = (data: Data, status = 200) =>
  rest.put(/financial\/receipts/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockHeadUsedCapitalAssetsApiResponse = (status = 404) =>
  rest.head(/financial\/used_capital_assets/, async (req, res, ctx) =>
    res(ctx.delay(0), ctx.status(status)),
  )

export const mockGetFinancialExpensesPnLOperationsView = (
  data: GetFinancialExpensesPnlOperationsViewApiResponse,
  status = 200,
) =>
  rest.get(/financial\/expenses\/pnlOperationsView/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockGetFinancialExpensesCashFlowOperationsView = (
  data: GetFinancialExpensesCashFlowOperationsViewApiResponse,
  status = 200,
) =>
  rest.get(
    /financial\/expenses\/cashFlowOperationsView/,
    async (req, res, ctx) => {
      if (typeof data === 'string') {
        return res(ctx.delay(0), ctx.status(status), ctx.text(data))
      }

      return res(ctx.delay(0), ctx.status(status), ctx.json(data))
    },
  )

export const mockPostFinancialDocumentByType = (
  fileName: string,
  error?: ErrorPostFinancialDocumentByType,
) =>
  rest.post(/financial\/documents\/files\/upload/, async (req, res, ctx) => {
    if (error) {
      return res(ctx.delay(0), ctx.status(error.status), ctx.json(error))
    }
    return res(ctx.delay(0), ctx.text(fileName))
  })

export const mockPostFinancialDocument = (
  data: DocumentViewDto | string,
  status = 200,
) =>
  rest.post(/financial\/documents\/$/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockGetFinancialDocumentsFilesDownloadByDocumentTypeAndFilename = (
  status = 200,
) =>
  rest.get(/financial\/documents\/files\/download/, async (req, res, ctx) => {
    const myReq = new Request('test.pdf')
    const data = await myReq.arrayBuffer()

    return res(
      ctx.delay(0),
      ctx.status(status),
      ctx.set('Content-Length', data.byteLength.toString()),
      ctx.set('Content-Type', `application/octet-stream`),
      ctx.body(data),
    )
  })

export const mockGetFinancialUsedCapitalAssets = (
  data: GetFinancialUsedCapitalAssetsApiResponse = successGetUsedCapitalAssets,
  status = 200,
) =>
  rest.get(/financial\/used_capital_assets/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockGetFinancialExpensesV2CashFlowOperationsView = (
  data: GetFinancialExpensesCashFlowOperationsViewApiResponse = successGetFinancialExpensesCashFlowOperationsView,
  status = 200,
) =>
  rest.get(
    /financial\/expenses\/v2\/cashFlowOperationsView/,
    async (req, res, ctx) => {
      return res(ctx.delay(0), ctx.status(status), ctx.json(data))
    },
  )

export const mockGetFinancialOperationsByOperationId = (
  data: GetFinancialOperationsByOperationIdApiResponse = successGetFinancialOperationsByOperationId,
  status = 200,
) =>
  rest.get(/financial\/operations\/\d+/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockGetFinancialPlannedOperationsPlannedAmountsByBudgetItems = (
  data: PlannedOperationWithTotalAmountDto,
  status = 200,
) =>
  rest.get(
    /financial\/planned_operations\/plannedAmountsByBudgetItems/,
    async (req, res, ctx) => {
      if (typeof data === 'string') {
        return res(ctx.delay(0), ctx.status(status), ctx.text(data))
      }

      return res(ctx.delay(0), ctx.status(status), ctx.json(data))
    },
  )

export const mockGetFinancialPlannedOperationsById = (
  data: GetFinancialPlannedOperationsByIdApiResponse = successGetFinancialPlannedOperationsById,
  status = 200,
) =>
  rest.get(/financial\/planned_operations\/\d+/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockPatchFinancialPlannedOperations = (
  data: PatchFinancialPlannedOperationsApiResponse = successPatchFinancialPlannedOperations,
  status = 200,
) =>
  rest.patch(/financial\/planned_operations/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockGetFinancialOperationsGeneralView = (
  data: GetFinancialOperationsGeneralViewApiResponse = successGetFinancialOperationsGeneralView,
  status = 200,
) =>
  rest.get(/financial\/operations\/general_view/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })
