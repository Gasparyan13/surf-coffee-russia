/* eslint-disable max-lines */
import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { DateHelper } from '@helpers'

import { TEST_ID_FILE_UPLOAD_WRAPPER } from '@uiKit/wrappers/FileUploaderWrapper/constants/testIds'

import {
  ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
  ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
  ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
  ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD,
  ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD,
  ERROR_MESSAGE_EMPTY_SUM_FIELD,
  SERVER_ERROR_FILE_WRONG,
} from '@pages/CreateOperations/constants/messages/error'
import { RefType } from '@pages/CreateOperations/containers/Main/Main.types'
import { MockFormArticleSelectProps } from '@pages/CreateOperations/mocks/FormArticlesSelectMock'
import { MockFormContractorInput } from '@pages/CreateOperations/mocks/FormContractorInputMock'

import { setupStore } from '@store/rootConfig'

import {
  error400AddInvoicePayment,
  errorAddInvoicePayment,
  errorPostFinancialDocumentInvoice,
  successAddInvoicePaymentOperation,
  successGetFinancialOperationsByOperationId,
  successPostFinancialDocumentInvoice,
} from '@testEnv/mocks/api/financial'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialOperationsByOperationId,
  mockPostFinancialDocument,
  mockPostFinancialDocumentByType,
  mockPostFinancialInvoicePayment,
  mockPutFinancialInvoicePayment,
} from '@testEnv/server/handlers/financial'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { FormPaymentInvoice } from './FormPaymentInvoice'
import * as T from './FormPaymentInvoice.types'
import {
  ERROR_MESSAGE_ADD_PAYMENT_INVOICE,
  ERROR_MESSAGE_EDIT_PAYMENT_INVOICE,
  ERROR_MESSAGE_EMPTY_INVOICE_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_INVOICE_NUMBER_FIELD,
  ERROR_MESSAGE_EMPTY_INVOICE_PAYMENT_DATE,
  ERROR_MESSAGE_INVOICE_DATE_AFTER_PAYMENT,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_PAYMENT_INVOICE,
  SUCCESS_EDIT_PAYMENT_INVOICE,
} from './constants/messages/success'
import { TEST_ID_INVOICE_NUMBER } from './constants/testIds'

jest.mock('../components/FormArticleSelect/FormArticleSelect', () => ({
  FormArticleSelect: MockFormArticleSelectProps,
}))

jest.mock('../components/FormContractorInput/FormContractorInput', () => ({
  FormContractorInput: MockFormContractorInput,
}))

jest.mock('@hooks', () => ({
  useScrollToError: jest.fn(),
}))

const currentDate = DateHelper.toFormat(new Date())
const currentDateToServer = DateHelper.toServerDateFormat(new Date())

const createServer = () =>
  setupServer(
    mockPostFinancialInvoicePayment(successAddInvoicePaymentOperation, 200),
    mockPostFinancialDocument(successPostFinancialDocumentInvoice, 200),
    mockPostFinancialDocumentByType(
      successPostFinancialDocumentInvoice.fileName!,
    ),
    mockGetFinancialOperationsByOperationId(),
    mockPutFinancialInvoicePayment(successAddInvoicePaymentOperation, 200),
  )

describe('<FormPaymentInvoice />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  let mockSubmit: () => Promise<void>

  const ref = (props: RefType) => {
    if (!props) return
    mockSubmit = props.onSubmit
  }

  const renderFormInvoicePayment = ({
    onComplete = () => {},
    onDisabled = () => {},
    editOperationId,
  }: Partial<T.Props>) =>
    render(
      <FormPaymentInvoice
        ref={ref}
        editOperationId={editOperationId}
        onComplete={onComplete}
        onDisabled={onDisabled}
      />,
      {
        store: appStore,
      },
    )

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  beforeEach(() => {
    appStore = setupStore({
      app: appConfig({}),
    })
  })
  afterEach(() => {
    jest.resetAllMocks()
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  describe('when render basic fields', () => {
    it('should render basic fields with correct label and placeholder', async () => {
      renderFormInvoicePayment({})

      expect(
        screen.getByRole('tab', { name: 'Списание', selected: true }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('tab', { name: 'Поступление' }),
      ).toBeInTheDocument()

      expect(screen.getByText('Статья')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Например, Продукты'),
      ).toBeInTheDocument()

      expect(screen.getByText('Сумма')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Например, 1 000')).toBeInTheDocument()

      expect(screen.getByText('Наименование')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Наименования товара или услуги'),
      ).toBeInTheDocument()

      expect(screen.getByText('Контрагент')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Например, Васильев'),
      ).toBeInTheDocument()

      expect(screen.getByText('Номер счёта')).toBeInTheDocument()

      expect(screen.getByText('Дата счёта')).toBeInTheDocument()
      expect(screen.getAllByPlaceholderText(currentDate)[0]).toBeInTheDocument()

      expect(screen.getByText('Дата оплаты счёта')).toBeInTheDocument()
      expect(screen.getAllByPlaceholderText(currentDate)[1]).toBeInTheDocument()

      expect(screen.getByText('Документ'))
      expect(
        screen.getByPlaceholderText('Прикрепите документ'),
      ).toBeInTheDocument()
    })
  })

  describe('when user change Invoice type', () => {
    it('should change FormArticleSelect isPurchase prop when user changes form type', async () => {
      renderFormInvoicePayment({})

      const writeOffTab = screen.getByRole('tab', { name: 'Списание' })
      const receiptTab = screen.getByRole('tab', { name: 'Поступление' })
      const article = screen.getByPlaceholderText('Например, Продукты')

      expect(article).toHaveAttribute(
        'data-operation-type',
        EOperationsType.PaymentInvoice,
      )
      expect(article).toHaveAttribute('data-is-purchase', 'true')
      fireEvent.click(receiptTab)
      expect(article).toHaveAttribute('data-is-purchase', 'false')
      fireEvent.click(writeOffTab)
      expect(article).toHaveAttribute('data-is-purchase', 'true')
    })

    it('should NOT clear selected article, if has been selected previously', async () => {
      const onCompleteMock = jest.fn()

      renderFormInvoicePayment({ onComplete: onCompleteMock })

      const writeOffTab = screen.getByRole('tab', { name: 'Списание' })
      const receiptTab = screen.getByRole('tab', { name: 'Поступление' })
      const article = screen.getByPlaceholderText('Например, Продукты')

      fireEvent.change(article, { target: { value: '41' } })
      expect(article).toHaveValue('41')

      await act(async () => mockSubmit())

      expect(
        screen.queryByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
      ).not.toBeInTheDocument()

      fireEvent.click(receiptTab)
      expect(article).toHaveValue('41')

      await act(async () => mockSubmit())

      expect(
        screen.queryByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
      ).not.toBeInTheDocument()

      fireEvent.click(writeOffTab)
      expect(article).toHaveValue('41')

      await act(async () => mockSubmit())

      expect(
        screen.queryByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
      ).not.toBeInTheDocument()
    })
  })

  describe('when the form is filled', () => {
    describe('when render success message', () => {
      it('should call onSubmit if all form fields are filled', async () => {
        const requestSpy = jest.fn()
        const onCompleteMock = jest.fn()

        renderFormInvoicePayment({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentInvoice.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const invoiceNumber = screen.getByTestId(TEST_ID_INVOICE_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const invoiceDate = datePicker[0]
        const paymentDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(invoiceNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(invoiceDate, {
          target: { value: currentDate },
        })
        fireEvent.change(paymentDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(invoiceDate).toHaveValue(currentDate)
        expect(paymentDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')
        expect(invoiceNumber).toHaveValue('432423')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        const pendingCreateFinancialInvoiceRequest = waitForRequest(
          server,
          'POST',
          /financial\/payment_invoices/,
        )

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        const createFinancialInvoiceRequest = await (
          await pendingCreateFinancialInvoiceRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(createFinancialInvoiceRequest).toEqual({
          enterpriseId: 1,
          isWriteOff: true,
          expenses: [
            {
              budgetItemId: 41,
              amount: 100,
              name: 'test',
              isCapitalAssets: false,
            },
          ],
          document: {
            documentId: 1,
            documentType: 'INVOICE',
            fileName: 'test',
          },
          contractorId: 528,
          invoiceDate: currentDateToServer,
          paymentDate: currentDateToServer,
          accountNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)

        expect(
          screen.getByText(SUCCESS_ADD_PAYMENT_INVOICE),
        ).toBeInTheDocument()
      })

      it('should call onSubmit if all form fields are filled & when type is "receipt"', async () => {
        const requestSpy = jest.fn()
        const onCompleteMock = jest.fn()

        renderFormInvoicePayment({
          onComplete: onCompleteMock,
        })

        const receiptTab = screen.getByRole('tab', { name: 'Поступление' })

        fireEvent.click(receiptTab)

        const file = new File(
          [],
          successPostFinancialDocumentInvoice.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const invoiceNumber = screen.getByTestId(TEST_ID_INVOICE_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const invoiceDate = datePicker[0]
        const paymentDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(invoiceNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(invoiceDate, {
          target: { value: currentDate },
        })
        fireEvent.change(paymentDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(invoiceDate).toHaveValue(currentDate)
        expect(paymentDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')
        expect(invoiceNumber).toHaveValue('432423')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        const pendingCreateFinancialWaybillsRequest = waitForRequest(
          server,
          'POST',
          /financial\/payment_invoices/,
        )

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        const createFinancialWaybillsRequest = await (
          await pendingCreateFinancialWaybillsRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(createFinancialWaybillsRequest).toEqual({
          enterpriseId: 1,
          isWriteOff: false,
          expenses: [
            {
              budgetItemId: 41,
              amount: 100,
              name: 'test',
              isCapitalAssets: false,
            },
          ],
          document: {
            documentId: 1,
            documentType: 'INVOICE',
            fileName: 'test',
          },
          contractorId: 528,
          invoiceDate: currentDateToServer,
          paymentDate: currentDateToServer,
          accountNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)

        expect(
          screen.getByText(SUCCESS_ADD_PAYMENT_INVOICE),
        ).toBeInTheDocument()
      })
    })

    describe('when render error message', () => {
      it('should show error message if the form was NOT submitted correctly', async () => {
        server.use(mockPostFinancialInvoicePayment(errorAddInvoicePayment, 500))

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        renderFormInvoicePayment({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentInvoice.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const invoiceNumber = screen.getByTestId(TEST_ID_INVOICE_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const invoiceDate = datePicker[0]
        const paymentDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(invoiceNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(invoiceDate, {
          target: { value: currentDate },
        })
        fireEvent.change(paymentDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(invoiceDate).toHaveValue(currentDate)
        expect(paymentDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(
          screen.getByText(ERROR_MESSAGE_ADD_PAYMENT_INVOICE),
        ).toBeInTheDocument()
      })

      it('should show error message if document not upload', async () => {
        server.use(
          mockPostFinancialDocumentByType(
            successPostFinancialDocumentInvoice.fileName!,
            errorPostFinancialDocumentInvoice,
          ),
        )

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        renderFormInvoicePayment({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentInvoice.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const invoiceNumber = screen.getByTestId(TEST_ID_INVOICE_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const invoicelDate = datePicker[0]
        const paymentDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(invoiceNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(invoicelDate, {
          target: { value: currentDate },
        })
        fireEvent.change(paymentDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(invoicelDate).toHaveValue(currentDate)
        expect(paymentDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(screen.getByText(SERVER_ERROR_FILE_WRONG)).toBeInTheDocument()
      })

      it('should show error message from backend if field "Наименование"/"Номер накладной" contains a spaces', async () => {
        server.use(
          mockPostFinancialInvoicePayment(error400AddInvoicePayment, 400),
        )

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        const { user } = renderFormInvoicePayment({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentInvoice.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const invoiceNumber = screen.getByTestId(TEST_ID_INVOICE_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const invoiceDate = datePicker[0]
        const paymentDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        await user.type(serviceName, ' ')
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(invoiceNumber, { target: { value: ' ' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(invoiceDate, {
          target: { value: currentDate },
        })
        fireEvent.change(paymentDate, {
          target: { value: currentDate },
        })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(serviceName).toHaveValue(' ')
        expect(invoiceNumber).toHaveValue(' ')
        expect(
          screen.getByText(ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD),
        ).toBeInTheDocument()
      })
    })

    describe('when required fields not filled', () => {
      it('should show error message if "Статья" field is empty', async () => {
        renderFormInvoicePayment({})

        const article = screen.getByPlaceholderText('Например, Продукты')

        await act(async () => mockSubmit())

        expect(article).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD))
      })

      it('should show error message if "Сумма" field is empty', async () => {
        renderFormInvoicePayment({})

        const sum = screen.getByPlaceholderText('Например, 1 000')

        await act(async () => mockSubmit())

        expect(sum).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_SUM_FIELD))
      })

      it('should show error message if "Наименование" field is empty', async () => {
        renderFormInvoicePayment({})

        const serviceName = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )

        await act(async () => mockSubmit())

        expect(serviceName).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD))
      })

      it('should show error message if "Контрагент" field is empty', async () => {
        renderFormInvoicePayment({})

        const contractor = screen.getByPlaceholderText('Например, Васильев')

        await act(async () => mockSubmit())

        expect(contractor).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD))
      })

      it('should show error message if "Номер счета" field is empty', async () => {
        renderFormInvoicePayment({})

        const actNumber = screen.getByTestId(TEST_ID_INVOICE_NUMBER)

        await act(async () => mockSubmit())

        expect(actNumber).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_INVOICE_NUMBER_FIELD))
      })

      it('should show error message if "Дата счета" field is empty', async () => {
        renderFormInvoicePayment({})

        const invoiceDate = screen.getAllByPlaceholderText(currentDate)[0]

        await act(async () => mockSubmit())

        expect(invoiceDate).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_INVOICE_DATE_FIELD))
      })

      it('should show error message if "Дата оплаты счета" field is empty', async () => {
        renderFormInvoicePayment({})

        const paymentDate = screen.getAllByPlaceholderText(currentDate)[1]

        await act(async () => mockSubmit())

        expect(paymentDate).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_INVOICE_PAYMENT_DATE))
      })

      it('should show error message if "Документ" field is empty', async () => {
        renderFormInvoicePayment({})

        const document = screen.getByPlaceholderText('Прикрепите документ')

        await act(async () => mockSubmit())

        expect(document).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD))
      })

      it('should show error message if paymentDate in future', async () => {
        renderFormInvoicePayment({})

        const invoiceDate = screen.getAllByPlaceholderText(currentDate)[0]
        const paymentDate = screen.getAllByPlaceholderText(currentDate)[1]

        const currDate = new Date()
        const dateString = DateHelper.toFormat(
          new Date(currDate.setDate(currDate.getDate() - 1)),
        )

        fireEvent.change(invoiceDate, {
          target: { value: currentDate },
        })
        fireEvent.change(paymentDate, {
          target: { value: dateString },
        })

        await act(async () => mockSubmit())

        expect(screen.getByText(ERROR_MESSAGE_INVOICE_DATE_AFTER_PAYMENT))
      })
    })
  })

  describe('when form edit view active', () => {
    it('should fill all available form fields', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormInvoicePayment({
        editOperationId: 1,
        onDisabled: mockOnDisabled,
      })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const serviceName = screen.getByPlaceholderText(
        'Наименования товара или услуги',
      )
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const invoiceNumber = screen.getByTestId(TEST_ID_INVOICE_NUMBER)
      const [invoiceDate, paymentDate] =
        screen.getAllByPlaceholderText(currentDate)

      expect(article).toHaveValue('41')
      expect(sum).toHaveValue('1 000')
      expect(serviceName).toHaveValue('budgetItem')
      expect(contractor).toHaveValue('contractor')
      expect(invoiceDate).toHaveValue('07-10-2022')
      expect(paymentDate).toHaveValue('07-10-2022')
      expect(invoiceNumber).toHaveValue('accountNumber')

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Прикрепите документ')).toHaveValue(
          successGetFinancialOperationsByOperationId.document!.fileName!,
        )
      })
    })

    describe('when upload file', () => {
      it('should NOT call upload file API if the file is NOT modified', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormInvoicePayment({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        // submit form request
        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))
      })

      it('should call upload file API if the file is modified', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormInvoicePayment({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(
            successGetFinancialOperationsByOperationId.document!.fileName!,
          )
        })

        const file = new File(
          [],
          successPostFinancialDocumentInvoice.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentInvoice.fileName!)
        })

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        // 1. upload file to server request
        // 2. add file to database request
        // 3. save form request
        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(3))
      })
    })

    describe('when user opens document in new tab', () => {
      it('should show open document text if file loaded from API', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        const { getByText } = renderFormInvoicePayment({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        expect(getByText('Посмотреть файл')).toBeInTheDocument()
      })

      it('should NOT show open document text if file changed', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        const { getByText, queryByText } = renderFormInvoicePayment({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        expect(getByText('Посмотреть файл')).toBeInTheDocument()

        const file = new File(
          [],
          successPostFinancialDocumentInvoice.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentInvoice.fileName!)
        })

        expect(queryByText('Посмотреть файл')).not.toBeInTheDocument()
      })
    })

    describe('when user saves the form', () => {
      it('should save changes and show success message', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()
        const mockOnComplete = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormInvoicePayment({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
          onComplete: mockOnComplete,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const pendingEditFinancialPaymentInvoiceRequest = waitForRequest(
          server,
          'PUT',
          /financial\/payment_invoices/,
        )

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        const editFinancialPaymentInvoiceRequest = await (
          await pendingEditFinancialPaymentInvoiceRequest
        ).json()

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(editFinancialPaymentInvoiceRequest).toEqual({
          contractorId: 1,
          document: {
            documentId: 442,
            documentType: 'CHECK',
            fileName: 'fileName.pdf',
          },
          enterpriseId: 1,
          expenses: [
            {
              amount: 1000,
              budgetItemId: 41,
              id: 1,
              isCapitalAssets: false,
              name: 'budgetItem',
            },
          ],
          id: 1,
          accountNumber: 'accountNumber',
          invoiceDate: '2022-10-07',
          isWriteOff: true,
          paymentDate: '2022-10-07',
        })

        expect(mockOnComplete).toHaveBeenCalledTimes(1)

        expect(
          screen.getByText(SUCCESS_EDIT_PAYMENT_INVOICE),
        ).toBeInTheDocument()
      })

      it('should show error message', async () => {
        server.use(
          mockPutFinancialInvoicePayment(
            successAddInvoicePaymentOperation,
            500,
          ),
        )

        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormInvoicePayment({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(
          screen.getByText(ERROR_MESSAGE_EDIT_PAYMENT_INVOICE),
        ).toBeInTheDocument()
      })
    })
  })
})
