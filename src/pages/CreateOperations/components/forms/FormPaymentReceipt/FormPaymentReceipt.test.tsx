/* eslint-disable max-lines */
import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import { TEST_ID_FILE_UPLOAD_WRAPPER } from '@uiKit/wrappers/FileUploaderWrapper/constants/testIds'

import {
  ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
  ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
  ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
  ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD,
  ERROR_MESSAGE_EMPTY_SUM_FIELD,
  SERVER_ERROR_FILE_WRONG,
} from '@pages/CreateOperations/constants/messages/error'
import { RefType } from '@pages/CreateOperations/containers/Main/Main.types'
import { MockFormArticleSelectProps } from '@pages/CreateOperations/mocks/FormArticlesSelectMock'
import { MockFormContractorInput } from '@pages/CreateOperations/mocks/FormContractorInputMock'

import { setupStore } from '@store/rootConfig'

import {
  error400AddPaymentReceiptOperation,
  errorAddPaymentReceiptOperation,
  errorPostFinancialDocumentPaymentReceipt,
  successAddPaymentReceiptOperation,
  successGetFinancialOperationsByOperationId,
  successPostFinancialDocumentPaymentReceipt,
} from '@testEnv/mocks/api/financial'
import { mockUseScrollToError } from '@testEnv/mocks/hooks/useScrollToError'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialOperationsByOperationId,
  mockPostFinancialDocument,
  mockPostFinancialDocumentByType,
  mockPostFinancialPaymentReceipt,
  mockPutFinancialPaymentReceipt,
} from '@testEnv/server/handlers/financial'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { FormPaymentReceipt } from './FormPaymentReceipt'
import * as T from './FormPaymentReceipt.types'
import {
  ERROR_MESSAGE_ADD_PAYMENT_RECEIPT,
  ERROR_MESSAGE_EDIT_PAYMENT_RECEIPT,
  ERROR_MESSAGE_EMPTY_DATE_DOCUMENT_FIELD,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_PAYMENT_RECEIPT,
  SUCCESS_EDIT_PAYMENT_RECEIPT,
} from './constants/messages/sucess'

jest.mock('../components/FormArticleSelect/FormArticleSelect', () => ({
  FormArticleSelect: MockFormArticleSelectProps,
}))

jest.mock('../components/FormContractorInput/FormContractorInput', () => ({
  FormContractorInput: MockFormContractorInput,
}))

jest.mock('@hooks', () => ({
  useScrollToError: mockUseScrollToError,
}))

const today = new Date()
const currentDate = DateHelper.toFormat(today)
const currentDateToServer = DateHelper.toServerDateFormat(today)

const createServer = () =>
  setupServer(
    mockPostFinancialPaymentReceipt(successAddPaymentReceiptOperation, 200),
    mockPostFinancialDocument(successPostFinancialDocumentPaymentReceipt, 200),
    mockPostFinancialDocumentByType(
      successPostFinancialDocumentPaymentReceipt.fileName!,
    ),
    mockGetFinancialOperationsByOperationId(),
    mockPutFinancialPaymentReceipt(successAddPaymentReceiptOperation, 200),
  )

describe('<FormPaymentReceipt />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  let mockSubmit: () => Promise<void>
  const onCompleteMock = jest.fn()

  const ref = (props: RefType) => {
    if (!props) return
    mockSubmit = props.onSubmit
  }

  const renderFormPaymentReceipt = ({
    onComplete = () => {},
    onDisabled = () => {},
    editOperationId,
  }: Partial<T.Props>) =>
    render(
      <FormPaymentReceipt
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

  it('should render basic fields with correct label and placeholder', async () => {
    renderFormPaymentReceipt({})

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

    expect(screen.getByText('Дата документа')).toBeInTheDocument()

    expect(screen.getAllByPlaceholderText(currentDate)[0]).toBeInTheDocument()

    expect(screen.getByText('Документ'))

    expect(
      screen.getByPlaceholderText('Прикрепите документ'),
    ).toBeInTheDocument()
  })

  describe('when the form is filled', () => {
    describe('when render success message', () => {
      it('should call handleSubmit if all required form fields have been completed', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        renderFormPaymentReceipt({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentPaymentReceipt.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const name = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)
        const documentDate = screen.getByPlaceholderText(currentDate)

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(name, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(document, { target: { files: [file] } })
        fireEvent.change(documentDate, {
          target: { value: currentDate },
        })

        expect(article).toHaveValue('41')
        expect(sum).toHaveValue('1 000')
        expect(name).toHaveValue('test')
        expect(contractor).toHaveValue('Тест')
        expect(documentDate).toHaveValue(currentDate)
        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        const pendingCreateFinancialPaymentReceipt = waitForRequest(
          server,
          'POST',
          /financial\/receipts/,
        )

        await act(async () => mockSubmit())

        const createFinancialPaymentReceiptRequest = await (
          await pendingCreateFinancialPaymentReceipt
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(createFinancialPaymentReceiptRequest).toEqual({
          enterpriseId: 1,
          expenses: [
            {
              budgetItemId: 41,
              amount: 1000,
              name: 'test',
              isCapitalAssets: false,
            },
          ],
          contractorId: '528',
          receiptDate: currentDateToServer,
          document: {
            documentId: 1,
            documentType: 'CHECK',
            fileName: 'test',
          },
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)
        expect(onCompleteMock).toHaveBeenCalledWith([
          PATHS.financialReports.pnl,
          PATHS.financialReports.cashFlow,
        ])

        expect(
          screen.getByText(SUCCESS_ADD_PAYMENT_RECEIPT),
        ).toBeInTheDocument()
      })
    })

    describe('when render error message', () => {
      it('should show error message if the form was NOT submitted correctly', async () => {
        server.use(
          mockPostFinancialPaymentReceipt(errorAddPaymentReceiptOperation, 500),
        )

        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        renderFormPaymentReceipt({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentPaymentReceipt.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const name = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)
        const documentDate = screen.getByPlaceholderText(currentDate)

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(name, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(document, { target: { files: [file] } })
        fireEvent.change(documentDate, {
          target: { value: currentDate },
        })

        expect(article).toHaveValue('41')
        expect(sum).toHaveValue('1 000')
        expect(name).toHaveValue('test')
        expect(contractor).toHaveValue('Тест')
        expect(documentDate).toHaveValue(currentDate)
        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        await act(async () => mockSubmit())
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(
          screen.getByText(ERROR_MESSAGE_ADD_PAYMENT_RECEIPT),
        ).toBeInTheDocument()
      })

      it('should show error message if document not upload', async () => {
        server.use(
          mockPostFinancialDocumentByType(
            successPostFinancialDocumentPaymentReceipt.fileName!,
            errorPostFinancialDocumentPaymentReceipt,
          ),
        )

        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        renderFormPaymentReceipt({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentPaymentReceipt.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const name = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)
        const documentDate = screen.getByPlaceholderText(currentDate)

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(name, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(document, { target: { files: [file] } })
        fireEvent.change(documentDate, {
          target: { value: currentDate },
        })

        expect(article).toHaveValue('41')
        expect(sum).toHaveValue('1 000')
        expect(name).toHaveValue('test')
        expect(contractor).toHaveValue('Тест')
        expect(documentDate).toHaveValue(currentDate)
        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        await act(async () => mockSubmit())
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(screen.getByText(SERVER_ERROR_FILE_WRONG)).toBeInTheDocument()
      })

      it('should show error message "Не указано наименование" if field contains a space', async () => {
        server.use(
          mockPostFinancialPaymentReceipt(
            error400AddPaymentReceiptOperation,
            400,
          ),
        )

        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        renderFormPaymentReceipt({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentPaymentReceipt.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const name = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)
        const documentDate = screen.getByPlaceholderText(currentDate)

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(name, { target: { value: ' ' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(document, { target: { files: [file] } })
        fireEvent.change(documentDate, {
          target: { value: currentDate },
        })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        await act(async () => mockSubmit())
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(name).toHaveValue(' ')
        expect(
          screen.getByText(ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD),
        ).toBeInTheDocument()
      })
    })
  })

  describe('when user gets "Receipt" all articles ', () => {
    it('should be "Receipt" attribute for articles', async () => {
      renderFormPaymentReceipt({})

      const article = screen.getByPlaceholderText('Например, Продукты')

      expect(article).toHaveAttribute(
        'data-operation-type',
        EOperationsType.Receipt,
      )
      expect(article).toHaveAttribute('data-is-purchase', 'true')
    })
  })

  describe('when required fields not filled', () => {
    it('should show error message if "Статья" field is empty', async () => {
      renderFormPaymentReceipt({})

      const article = screen.getByPlaceholderText('Например, Продукты')

      await act(async () => {
        await mockSubmit()
      })

      expect(article).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD))
    })

    it('should show error message if "Сумма" field is empty', async () => {
      renderFormPaymentReceipt({})

      const sum = screen.getByPlaceholderText('Например, 1 000')

      await act(async () => {
        await mockSubmit()
      })

      expect(sum).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_SUM_FIELD))
    })

    it('should show error message if "Наименование" field is empty', async () => {
      renderFormPaymentReceipt({})

      const serviceName = screen.getByPlaceholderText('Например, Продукты')

      await act(async () => {
        await mockSubmit()
      })

      expect(serviceName).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD))
    })

    it('should show error message if "Контрагент" field is empty', async () => {
      renderFormPaymentReceipt({})

      const contractor = screen.getByPlaceholderText('Например, Васильев')

      await act(async () => {
        await mockSubmit()
      })

      expect(contractor).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD))
    })

    it('should show error message if "Дата документа" field is empty', async () => {
      renderFormPaymentReceipt({})

      const documentDate = screen.getByPlaceholderText(currentDate)

      await act(async () => {
        await mockSubmit()
      })

      expect(documentDate).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_DATE_DOCUMENT_FIELD))
    })

    it('should show error message if "Документ" field is empty', async () => {
      renderFormPaymentReceipt({})

      const document = screen.getByPlaceholderText('Прикрепите документ')

      await act(async () => {
        await mockSubmit()
      })

      expect(document).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD))
    })
  })

  describe('when form edit view active', () => {
    it('should fill all available form fields', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormPaymentReceipt({
        editOperationId: 1,
        onDisabled: mockOnDisabled,
      })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const name = screen.getByPlaceholderText('Наименования товара или услуги')
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const documentDate = screen.getByPlaceholderText(currentDate)

      expect(article).toHaveValue('41')
      expect(sum).toHaveValue('1 000')
      expect(name).toHaveValue('budgetItem')
      expect(contractor).toHaveValue('contractor')
      expect(documentDate).toHaveValue('07-10-2022')

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

        renderFormPaymentReceipt({
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

        renderFormPaymentReceipt({
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
          successPostFinancialDocumentPaymentReceipt.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentPaymentReceipt.fileName!)
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

        const { getByText } = renderFormPaymentReceipt({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(getByText('Посмотреть файл')).toBeInTheDocument()
      })

      it('should NOT show open document text if file changed', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        const { getByText, queryByText } = renderFormPaymentReceipt({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(getByText('Посмотреть файл')).toBeInTheDocument()

        const file = new File(
          [],
          successPostFinancialDocumentPaymentReceipt.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentPaymentReceipt.fileName!)
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

        renderFormPaymentReceipt({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
          onComplete: mockOnComplete,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const pendingEditFinancialPaymentReceiptRequest = waitForRequest(
          server,
          'PUT',
          /financial\/receipts/,
        )

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        const editFinancialPaymentReceiptRequest = await (
          await pendingEditFinancialPaymentReceiptRequest
        ).json()

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(editFinancialPaymentReceiptRequest).toEqual({
          contractorId: '1',
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
          receiptDate: '2022-10-07',
        })

        expect(mockOnComplete).toHaveBeenCalledTimes(1)
        expect(mockOnComplete).toHaveBeenCalledWith([
          PATHS.financialReports.pnl,
          PATHS.financialReports.cashFlow,
        ])

        expect(
          screen.getByText(SUCCESS_EDIT_PAYMENT_RECEIPT),
        ).toBeInTheDocument()
      })

      it('should show error message', async () => {
        server.use(
          mockPutFinancialPaymentReceipt(
            successAddPaymentReceiptOperation,
            500,
          ),
        )

        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormPaymentReceipt({
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
          screen.getByText(ERROR_MESSAGE_EDIT_PAYMENT_RECEIPT),
        ).toBeInTheDocument()
      })
    })
  })
})
