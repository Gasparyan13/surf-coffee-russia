/* eslint-disable max-lines */
import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import { TEST_ID_FILE_UPLOAD_WRAPPER } from '@uiKit/wrappers/FileUploaderWrapper/constants/testIds'

import {
  ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
  ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
  ERROR_MESSAGE_EMPTY_PRIME_COST_FIELD,
  ERROR_MESSAGE_EMPTY_SUM_FIELD,
  SERVER_ERROR_FILE_WRONG,
} from '@pages/CreateOperations/constants/messages/error'
import { MockFormArticleSelectProps } from '@pages/CreateOperations/mocks/FormArticlesSelectMock'
import { MockFormContractorInput } from '@pages/CreateOperations/mocks/FormContractorInputMock'

import { setupStore } from '@store/rootConfig'

import {
  error400AddActOperation,
  errorAddActOperation,
  errorPostFinancialDocumentAct,
  successAddAct,
  successGetFinancialOperationsByOperationId,
  successGetFinancialOperationsByOperationIdIsPayrollBudgetItem,
  successPostFinancialDocumentAct,
} from '@testEnv/mocks/api/financial'
import { successGetPrepaymentContractorWorkers } from '@testEnv/mocks/api/prepayment'
import { mockUseScrollToError } from '@testEnv/mocks/hooks/useScrollToError'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialOperationsByOperationId,
  mockPostActApiResponse,
  mockPostFinancialDocument,
  mockPostFinancialDocumentByType,
  mockPutActApiResponse,
} from '@testEnv/server/handlers/financial'
import { mockGetPrepaymentContractorsResponse } from '@testEnv/server/handlers/prepayment'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import {
  ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
  ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD,
} from '../../../constants/messages/error'
import { RefType } from '../../../containers/Main/Main.types'
import { FIXED_ASSETS } from '../components/FormExpenseItem/constants/constants'
import { FormAct } from './FormAct'
import * as T from './FormAct.types'
import {
  ERROR_MESSAGE_ADD_ACT,
  ERROR_MESSAGE_EDIT_ACT,
  ERROR_MESSAGE_EMPTY_ACT_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD,
} from './constants/messages/errors'
import { SUCCESS_ADD_ACT, SUCCESS_EDIT_ACT } from './constants/messages/sucess'
import { TEST_ID_ACT_NUMBER } from './constants/testIds'

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
    mockPostActApiResponse(successAddAct, 200),
    mockPostFinancialDocument(successPostFinancialDocumentAct, 200),
    mockPostFinancialDocumentByType(successPostFinancialDocumentAct.fileName!),
    mockGetFinancialOperationsByOperationId(),
    mockPutActApiResponse(successAddAct, 200),
  )

describe('<FormAct />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  let mockSubmit: () => Promise<void>

  const ref = (props: RefType) => {
    if (!props) return
    mockSubmit = props.onSubmit
  }

  const renderFormAct = ({
    onComplete = () => {},
    onDisabled = () => {},
    editOperationId,
  }: Partial<T.Props>) =>
    render(
      <FormAct
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

  describe('when render fields', () => {
    it('should render basic fields with correct label and placeholder', async () => {
      renderFormAct({})

      expect(
        screen.getByRole('tab', { name: 'Покупка', selected: true }),
      ).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Продажа' })).toBeInTheDocument()

      expect(screen.getByText('Статья')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Например, Продукты'),
      ).toBeInTheDocument()

      expect(screen.getByText('Сумма')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Например, 1 000')).toBeInTheDocument()

      expect(screen.getByText('Наименование услуги')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Например, обслуживание ПО'),
      ).toBeInTheDocument()

      expect(screen.getByText('Контрагент')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Например, Васильев'),
      ).toBeInTheDocument()

      expect(screen.getByText('Номер акта')).toBeInTheDocument()

      expect(screen.getByText('Дата акта')).toBeInTheDocument()
      expect(screen.getAllByPlaceholderText(currentDate)[0]).toBeInTheDocument()

      expect(
        screen.getByText('Дата поставки (поступления)'),
      ).toBeInTheDocument()
      expect(screen.getAllByPlaceholderText(currentDate)[1]).toBeInTheDocument()

      expect(screen.getByText('Документ'))
      expect(
        screen.getByPlaceholderText('Прикрепите документ'),
      ).toBeInTheDocument()
    })

    describe('field "Себестоимость"', () => {
      describe('when field "Себестоимость" must be added to form', () => {
        it(`should render field when isPurchase is "sale" and article isn't "ОС"`, async () => {
          renderFormAct({})

          const sellTab = screen.getByRole('tab', { name: 'Продажа' })
          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.click(sellTab)
          fireEvent.change(article, { target: { value: '41' } })
          expect(article).toHaveValue('41')

          expect(screen.getByText('Себестоимость')).toBeInTheDocument()
        })
      })

      describe('when field "Себестоимость" must not be added to form', () => {
        it(`should render field when isPurchase is "sale" and article is "ОС"`, async () => {
          renderFormAct({})

          const sellTab = screen.getByRole('tab', { name: 'Продажа' })
          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.click(sellTab)
          fireEvent.change(article, {
            target: { value: String(FIXED_ASSETS) },
          })

          expect(article).toHaveValue(String(FIXED_ASSETS))
          expect(screen.queryByText('Себестоимость')).not.toBeInTheDocument()
        })

        it(`should render field when isPurchase is "purchase" and article is "ОС"`, async () => {
          renderFormAct({})

          expect(screen.queryByText('Себестоимость')).not.toBeInTheDocument()
        })
      })
    })

    describe('when user change FormAct type', () => {
      it('should change FormArticleSelect isPurchase prop when user changes form type', async () => {
        renderFormAct({})

        const buyTab = screen.getByRole('tab', { name: 'Покупка' })
        const sellTab = screen.getByRole('tab', { name: 'Продажа' })
        const article = screen.getByPlaceholderText('Например, Продукты')

        expect(article).toHaveAttribute(
          'data-operation-type',
          EOperationsType.ServiceAct,
        )
        expect(article).toHaveAttribute('data-is-purchase', 'true')
        fireEvent.click(sellTab)
        expect(article).toHaveAttribute('data-is-purchase', 'false')
        fireEvent.click(buyTab)
        expect(article).toHaveAttribute('data-is-purchase', 'true')
      })

      it('should clear selected article, if has been selected previously', async () => {
        const onCompleteMock = jest.fn()

        renderFormAct({ onComplete: onCompleteMock })

        const buyTab = screen.getByRole('tab', { name: 'Покупка' })
        const sellTab = screen.getByRole('tab', { name: 'Продажа' })
        const article = screen.getByPlaceholderText('Например, Продукты')

        await act(async () => mockSubmit())
        expect(
          screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
        ).toBeInTheDocument()

        fireEvent.change(article, { target: { value: '41' } })
        expect(article).toHaveValue('41')
        await act(async () => mockSubmit())
        expect(
          screen.queryByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
        ).not.toBeInTheDocument()

        fireEvent.click(sellTab)
        await act(async () => mockSubmit())
        expect(
          screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
        ).toBeInTheDocument()
        fireEvent.change(article, { target: { value: '41' } })
        expect(article).toHaveValue('41')
        await act(async () => mockSubmit())
        expect(
          screen.queryByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
        ).not.toBeInTheDocument()

        fireEvent.click(buyTab)
        await act(async () => mockSubmit())
        expect(
          screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
        ).toBeInTheDocument()
        fireEvent.change(article, { target: { value: '41' } })
        expect(article).toHaveValue('41')
        await act(async () => mockSubmit())
        expect(
          screen.queryByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD),
        ).not.toBeInTheDocument()
      })
    })

    describe('when budget item is payroll', () => {
      beforeEach(() => {
        server.use(
          mockGetPrepaymentContractorsResponse(
            successGetPrepaymentContractorWorkers,
          ),
        )
      })

      it('should render contractor worker autocomplete field', async () => {
        renderFormAct({})

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: true }),
        ).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Продажа' })).toBeInTheDocument()

        const article = screen.getByPlaceholderText('Например, Продукты')

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

        // 43 is id Payroll Budget Items(Manager)
        fireEvent.change(article, { target: { value: '43' } })

        expect(
          screen.getByPlaceholderText('Например, Васильев'),
        ).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toBeInTheDocument()
      })

      it('should NOT render contractor worker autocomplete field if selected "Продажа"', async () => {
        renderFormAct({})

        const admissionTab = screen.getByRole('tab', { name: 'Продажа' })

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: true }),
        ).toBeInTheDocument()
        expect(admissionTab).toBeInTheDocument()

        const article = screen.getByPlaceholderText('Например, Продукты')

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

        // 43 is id Payroll Budget Items(Manager)
        fireEvent.change(article, { target: { value: '43' } })

        expect(screen.getByPlaceholderText('Например, Васильев'))
        expect(screen.getByRole('combobox')).toBeInTheDocument()

        fireEvent.click(admissionTab)

        expect(
          screen.getByRole('tab', { name: 'Продажа', selected: true }),
        ).toBeInTheDocument()

        expect(screen.getByPlaceholderText('Например, Васильев'))
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
      })

      it('should NOT render contractor worker autocomplete field if selected article is not payroll', async () => {
        renderFormAct({})

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: true }),
        ).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Продажа' })).toBeInTheDocument()

        const article = screen.getByPlaceholderText('Например, Продукты')

        fireEvent.change(article, { target: { value: '41' } })

        expect(
          screen.getByPlaceholderText('Например, Васильев'),
        ).toBeInTheDocument()
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
      })

      it('should clear contractor worker autocomplete field', async () => {
        renderFormAct({})

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: true }),
        ).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Продажа' })).toBeInTheDocument()

        const article = screen.getByPlaceholderText('Например, Продукты')
        const contractor = screen.getByPlaceholderText('Например, Васильев')

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })

        expect(contractor).toHaveValue('Тест')

        // 43 is id Payroll Budget Items(Manager)
        fireEvent.change(article, { target: { value: '43' } })

        const contractorAutocomplete = screen.getByRole('combobox')

        expect(contractorAutocomplete).toBeInTheDocument()
        expect(contractorAutocomplete).toHaveValue('')
        expect(screen.getByPlaceholderText('Например, Васильев'))
      })

      it('should clear contractor input field', async () => {
        renderFormAct({})

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: true }),
        ).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Продажа' })).toBeInTheDocument()

        const article = screen.getByPlaceholderText('Например, Продукты')

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

        // 43 is id Payroll Budget Items(Manager)
        fireEvent.change(article, { target: { value: '43' } })

        const contractorAutocomplete = screen.getByRole('combobox')
        expect(contractorAutocomplete).toBeInTheDocument()
        expect(contractorAutocomplete).toHaveValue('')

        fireEvent.change(contractorAutocomplete, { target: { value: 'а' } })
        await waitFor(() => {
          expect(screen.getAllByRole('option').length).toBe(2)
        })

        fireEvent.click(screen.getAllByRole('option')[1])

        expect(contractorAutocomplete).toHaveValue('Вадим Галыгин')

        fireEvent.change(article, { target: { value: '41' } })

        const contractorInput =
          screen.getByPlaceholderText('Например, Васильев')
        expect(contractorInput).toHaveValue('')
      })

      it('should leave one card if selected article is payroll', () => {
        renderFormAct({})

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: true }),
        ).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Продажа' })).toBeInTheDocument()

        // add second card
        fireEvent.click(screen.getByTestId('add-extendable-list-item'))

        const articles = screen.getAllByPlaceholderText('Например, Продукты')

        expect(articles.length).toBe(2)

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

        // 43 is id Payroll Budget Items(Manager)
        fireEvent.change(articles[1], { target: { value: '43' } })

        expect(
          screen.getAllByPlaceholderText('Например, Продукты').length,
        ).toBe(1)
        expect(
          screen.getByPlaceholderText('Например, Васильев'),
        ).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toBeInTheDocument()
      })
    })
  })

  describe('when the form is filled', () => {
    describe('when render success message', () => {
      it('should call onSubmit if all form fields are filled', async () => {
        const requestSpy = jest.fn()
        const onCompleteMock = jest.fn()

        renderFormAct({
          onComplete: onCompleteMock,
        })

        const file = new File([], successPostFinancialDocumentAct.fileName!, {
          type: 'application/pdf',
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Например, обслуживание ПО',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const actDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(actNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(actDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(actDate).toHaveValue(currentDate)
        expect(receiveDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')
        expect(actNumber).toHaveValue('432423')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        const pendingCreateFinancialActRequest = waitForRequest(
          server,
          'POST',
          /financial\/service_acts/,
        )

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        const createFinancialActRequest = await (
          await pendingCreateFinancialActRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(createFinancialActRequest).toEqual({
          enterpriseId: 1,
          isPurchase: true,
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
            documentType: 'ACT',
            fileName: 'test',
          },
          contractorId: 528,
          actDate: currentDateToServer,
          deliveryDate: currentDateToServer,
          actNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)
        expect(onCompleteMock).toHaveBeenCalledWith([
          PATHS.financialReports.pnl,
          PATHS.financialReports.balance,
        ])

        expect(screen.getByText(SUCCESS_ADD_ACT)).toBeInTheDocument()
      })

      it('should call onSubmit if all form fields are filled & when isPurchase is "sale"', async () => {
        const requestSpy = jest.fn()
        const onCompleteMock = jest.fn()

        renderFormAct({
          onComplete: onCompleteMock,
        })

        const sellTab = screen.getByRole('tab', { name: 'Продажа' })
        fireEvent.click(sellTab)

        const file = new File([], successPostFinancialDocumentAct.fileName!, {
          type: 'application/pdf',
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const [sum, primeCost] =
          screen.getAllByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Например, обслуживание ПО',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const actDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(primeCost, { target: { value: '199' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(actNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(actDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(primeCost).toHaveValue('199')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(actDate).toHaveValue(currentDate)
        expect(receiveDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')
        expect(actNumber).toHaveValue('432423')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        const pendingCreateFinancialActRequest = waitForRequest(
          server,
          'POST',
          /financial\/service_acts/,
        )

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        const createFinancialActRequest = await (
          await pendingCreateFinancialActRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(createFinancialActRequest).toEqual({
          enterpriseId: 1,
          isPurchase: false,
          expenses: [
            {
              budgetItemId: 41,
              amount: 100,
              name: 'test',
              isCapitalAssets: false,
              primeCost: 199,
            },
          ],
          document: {
            documentId: 1,
            documentType: 'ACT',
            fileName: 'test',
          },
          contractorId: 528,
          actDate: currentDateToServer,
          deliveryDate: currentDateToServer,
          actNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)
        expect(onCompleteMock).toHaveBeenCalledWith([
          PATHS.financialReports.pnl,
          PATHS.financialReports.balance,
        ])

        expect(screen.getByText(SUCCESS_ADD_ACT)).toBeInTheDocument()
      })

      describe('when budget item is payroll', () => {
        beforeEach(() => {
          server.use(
            mockGetPrepaymentContractorsResponse(
              successGetPrepaymentContractorWorkers,
            ),
          )
        })

        it('should call handleSubmit if all required form fields have been completed', async () => {
          const requestSpy = jest.fn()
          const onCompleteMock = jest.fn()
          const requestGetPrepaymentContractorsSpy = jest.fn()

          renderFormAct({
            onComplete: onCompleteMock,
          })

          const file = new File([], successPostFinancialDocumentAct.fileName!, {
            type: 'application/pdf',
          })

          const article = screen.getByPlaceholderText('Например, Продукты')
          const sum = screen.getByPlaceholderText('Например, 1 000')
          const serviceName = screen.getByPlaceholderText(
            'Например, обслуживание ПО',
          )
          const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)
          const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)
          const datePicker = screen.getAllByPlaceholderText(currentDate)
          const actDate = datePicker[0]
          const receiveDate = datePicker[1]

          server.events.on('request:end', requestGetPrepaymentContractorsSpy)

          // 43 is id Payroll Budget Items(Manager)
          fireEvent.change(article, { target: { value: '43' } })
          expect(article).toHaveValue('43')

          fireEvent.change(sum, { target: { value: '100' } })
          fireEvent.change(serviceName, { target: { value: 'test' } })
          fireEvent.change(actNumber, { target: { value: '432423' } })
          fireEvent.change(document, { target: { files: [file] } })

          // fill DatePicker input
          fireEvent.change(actDate, {
            target: { value: currentDate },
          })
          fireEvent.change(receiveDate, {
            target: { value: currentDate },
          })

          await waitFor(() =>
            expect(requestGetPrepaymentContractorsSpy).toHaveBeenCalledTimes(1),
          )
          const contractor = screen.getByPlaceholderText('Например, Васильев')

          fireEvent.change(contractor, { target: { value: 'а' } })
          await waitFor(() => {
            expect(screen.getAllByRole('option').length).toBe(2)
          })

          fireEvent.click(screen.getAllByRole('option')[1])

          expect(contractor).toHaveValue('Вадим Галыгин')
          expect(sum).toHaveValue('100')
          expect(serviceName).toHaveValue('test')
          expect(actDate).toHaveValue(currentDate)
          expect(receiveDate).toHaveValue(currentDate)
          expect(actNumber).toHaveValue('432423')

          await waitFor(() => {
            expect(
              screen.getByPlaceholderText('Прикрепите документ'),
            ).toHaveValue(file.name)
          })

          const pendingCreateFinancialActRequest = waitForRequest(
            server,
            'POST',
            /financial\/service_acts/,
          )

          server.events.on('request:end', requestSpy)

          await act(async () => mockSubmit())

          const createFinancialActRequest = await (
            await pendingCreateFinancialActRequest
          ).json()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

          expect(createFinancialActRequest).toEqual({
            enterpriseId: 1,
            isPurchase: true,
            expenses: [
              {
                budgetItemId: 43,
                amount: 100,
                name: 'test',
                isCapitalAssets: false,
              },
            ],
            document: {
              documentId: 1,
              documentType: 'ACT',
              fileName: 'test',
            },
            contractorId: 539,
            actDate: currentDateToServer,
            deliveryDate: currentDateToServer,
            actNumber: '432423',
          })

          expect(onCompleteMock).toHaveBeenCalledTimes(1)
          expect(onCompleteMock).toHaveBeenCalledWith([
            PATHS.financialReports.pnl,
            PATHS.financialReports.balance,
          ])

          expect(screen.getByText(SUCCESS_ADD_ACT)).toBeInTheDocument()
        })
      })
    })

    describe('when render error message', () => {
      it('should show error message if the form was NOT submitted correctly', async () => {
        server.use(mockPostActApiResponse(errorAddActOperation, 500))

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        renderFormAct({
          onComplete: onCompleteMock,
        })

        const file = new File([], successPostFinancialDocumentAct.fileName!, {
          type: 'application/pdf',
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Например, обслуживание ПО',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const actDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(actNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(actDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(actDate).toHaveValue(currentDate)
        expect(receiveDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(screen.getByText(ERROR_MESSAGE_ADD_ACT)).toBeInTheDocument()
      })

      it('should show error message if document not upload', async () => {
        server.use(
          mockPostFinancialDocumentByType(
            successPostFinancialDocumentAct.fileName!,
            errorPostFinancialDocumentAct,
          ),
        )

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        renderFormAct({
          onComplete: onCompleteMock,
        })

        const file = new File([], successPostFinancialDocumentAct.fileName!, {
          type: 'application/pdf',
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Например, обслуживание ПО',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const actDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(actNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(actDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(actDate).toHaveValue(currentDate)
        expect(receiveDate).toHaveValue(currentDate)
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

      it('should show error message if "Себестоимость" has no value', async () => {
        const onCompleteMock = jest.fn()

        renderFormAct({
          onComplete: onCompleteMock,
        })

        const sellTab = screen.getByRole('tab', { name: 'Продажа' })

        fireEvent.click(sellTab)

        const [, primeCost] = screen.getAllByPlaceholderText('Например, 1 000')

        expect(primeCost).toHaveValue('')

        await act(async () => mockSubmit())

        expect(
          screen.getByText(ERROR_MESSAGE_EMPTY_PRIME_COST_FIELD),
        ).toBeInTheDocument()
      })

      it('should show error message from backend if field "Наименование"/"Номер акта" contains only a spaces', async () => {
        server.use(mockPostActApiResponse(error400AddActOperation, 400))

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        const { user } = renderFormAct({
          onComplete: onCompleteMock,
        })

        const file = new File([], successPostFinancialDocumentAct.fileName!, {
          type: 'application/pdf',
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Например, обслуживание ПО',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const actDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        await user.type(serviceName, ' ')
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(actNumber, { target: { value: ' ' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(actDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
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
        expect(actNumber).toHaveValue(' ')
        expect(
          screen.getByText(
            `${ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD}. ${ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD}`,
          ),
        ).toBeInTheDocument()
      })
    })

    describe('when required fields not filled', () => {
      it('should show error message if "Статья" field is empty', async () => {
        renderFormAct({})

        const article = screen.getByPlaceholderText('Например, Продукты')

        await act(async () => mockSubmit())

        expect(article).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD))
      })

      it('should show error message if "Сумма" field is empty', async () => {
        renderFormAct({})

        const sum = screen.getByPlaceholderText('Например, 1 000')

        await act(async () => mockSubmit())

        expect(sum).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_SUM_FIELD))
      })

      it('should show error message if "Наименование услуги" field is empty', async () => {
        renderFormAct({})

        const serviceName = screen.getByPlaceholderText(
          'Например, обслуживание ПО',
        )

        await act(async () => mockSubmit())

        expect(serviceName).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD))
      })

      describe('when "Контрагент" field is empty', () => {
        it('should show error message if "Контрагент" field is empty', async () => {
          renderFormAct({})

          const contractor = screen.getByPlaceholderText('Например, Васильев')

          await act(async () => mockSubmit())

          expect(contractor).toHaveValue('')
          expect(screen.getByText(ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD))
        })

        describe('when budget item is payroll', () => {
          beforeEach(() => {
            server.use(
              mockGetPrepaymentContractorsResponse(
                successGetPrepaymentContractorWorkers,
              ),
            )
          })

          it('should show error message if "Контрагент" field is empty', async () => {
            renderFormAct({})

            expect(
              screen.getByRole('tab', { name: 'Покупка', selected: true }),
            ).toBeInTheDocument()
            expect(
              screen.getByRole('tab', { name: 'Продажа' }),
            ).toBeInTheDocument()

            // 43 is id Payroll Budget Items(Manager)
            fireEvent.change(
              screen.getByPlaceholderText('Например, Продукты'),
              { target: { value: '43' } },
            )

            expect(
              screen.getByPlaceholderText('Например, Васильев'),
            ).toBeInTheDocument()

            expect(screen.getByRole('combobox')).toBeInTheDocument()

            const contractor = screen.getByRole('combobox')

            await act(async () => mockSubmit())

            expect(contractor).toHaveValue('')
            expect(screen.getByText(ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD))
          })
        })
      })

      it('should show error message if "Номер акта" field is empty', async () => {
        renderFormAct({})

        const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)

        await act(async () => mockSubmit())

        expect(actNumber).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD))
      })

      it('should show error message if "Дата акта" field is empty', async () => {
        renderFormAct({})

        const invoiceDate = screen.getAllByPlaceholderText(currentDate)[0]

        await act(async () => mockSubmit())

        expect(invoiceDate).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_ACT_DATE_FIELD))
      })

      it('should show error message if "Дата поставки (поступления)" field is empty', async () => {
        renderFormAct({})

        const deliveryDate = screen.getAllByPlaceholderText(currentDate)[0]

        await act(async () => mockSubmit())

        expect(deliveryDate).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD))
      })

      it('should show error message if "Документ" field is empty', async () => {
        renderFormAct({})

        const document = screen.getByPlaceholderText('Прикрепите документ')

        await act(async () => mockSubmit())

        expect(document).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD))
      })
    })
  })

  describe('when form edit view active', () => {
    it('should fill all available form fields', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormAct({ editOperationId: 1, onDisabled: mockOnDisabled })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const serviceName = screen.getByPlaceholderText(
        'Например, обслуживание ПО',
      )
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)

      // search DatePicker nodes
      const datePicker = screen.getAllByPlaceholderText(currentDate)
      const actDate = datePicker[0]
      const receiveDate = datePicker[1]

      expect(sum).toHaveValue('1 000')
      expect(serviceName).toHaveValue('budgetItem')
      expect(article).toHaveValue('41')
      expect(actDate).toHaveValue('07-10-2022')
      expect(receiveDate).toHaveValue('07-10-2022')
      expect(contractor).toHaveValue('contractor')
      expect(actNumber).toHaveValue('operationNumber')

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Прикрепите документ')).toHaveValue(
          successGetFinancialOperationsByOperationId.document!.fileName!,
        )
      })
    })

    it('should disable toggle "Покупка/Продажа"', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormAct({ editOperationId: 1, onDisabled: mockOnDisabled })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const selectedToggleButton = screen.getByRole('tab', {
        name: 'Покупка',
        selected: true,
      })

      const unselectedToggleButton = screen.getByRole('tab', {
        name: 'Продажа',
        selected: false,
      })

      expect(selectedToggleButton).toBeInTheDocument()
      expect(unselectedToggleButton).toBeDisabled()
    })

    describe('when upload file', () => {
      it('should NOT call upload file API if the file is NOT modified', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormAct({ editOperationId: 1, onDisabled: mockOnDisabled })

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

        renderFormAct({
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

        const file = new File([], successPostFinancialDocumentAct.fileName!, {
          type: 'application/pdf',
        })

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentAct.fileName!)
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

        const { getByText } = renderFormAct({
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

        const { getByText, queryByText } = renderFormAct({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(getByText('Посмотреть файл')).toBeInTheDocument()

        const file = new File([], successPostFinancialDocumentAct.fileName!, {
          type: 'application/pdf',
        })

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentAct.fileName!)
        })

        expect(queryByText('Посмотреть файл')).not.toBeInTheDocument()
      })
    })

    describe('when budget item is payroll', () => {
      beforeEach(() => {
        server.use(
          mockGetPrepaymentContractorsResponse(
            successGetPrepaymentContractorWorkers,
          ),
        )
        server.use(
          mockGetFinancialOperationsByOperationId(
            successGetFinancialOperationsByOperationIdIsPayrollBudgetItem,
          ),
        )
      })

      it('should fill all available form fields', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)
        const mockOnDisabled = jest.fn()

        renderFormAct({ editOperationId: 1, onDisabled: mockOnDisabled })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          'Например, обслуживание ПО',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const actNumber = screen.getByTestId(TEST_ID_ACT_NUMBER)
        const [actDate, receiveDate] =
          screen.getAllByPlaceholderText(currentDate)

        expect(sum).toHaveValue('1 000')
        expect(serviceName).toHaveValue('budgetItem')
        expect(article).toHaveValue('43')
        expect(actDate).toHaveValue('07-10-2022')
        expect(receiveDate).toHaveValue('07-10-2022')
        expect(contractor).toHaveValue('contractor')
        expect(actNumber).toHaveValue('operationNumber')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(
            successGetFinancialOperationsByOperationId.document!.fileName!,
          )
        })
      })
    })

    describe('when user saves the form', () => {
      it('should save changes and show success message', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()
        const mockOnComplete = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormAct({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
          onComplete: mockOnComplete,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const pendingEditFinancialActRequest = waitForRequest(
          server,
          'PUT',
          /financial\/service_acts/,
        )

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        const editFinancialActRequest = await (
          await pendingEditFinancialActRequest
        ).json()

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(editFinancialActRequest).toEqual({
          actDate: '2022-10-07',
          actNumber: 'operationNumber',
          contractorId: 1,
          deliveryDate: '2022-10-07',
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
          isPurchase: true,
        })

        expect(mockOnComplete).toHaveBeenCalledTimes(1)
        expect(mockOnComplete).toHaveBeenCalledWith([
          PATHS.financialReports.pnl,
          PATHS.financialReports.balance,
        ])

        expect(screen.getByText(SUCCESS_EDIT_ACT)).toBeInTheDocument()
      })

      it('should show error message', async () => {
        server.use(mockPutActApiResponse(successAddAct, 500))

        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormAct({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(screen.getByText(ERROR_MESSAGE_EDIT_ACT)).toBeInTheDocument()
      })
    })
  })
})
