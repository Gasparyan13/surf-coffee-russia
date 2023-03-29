/* eslint-disable max-lines */
import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import {
  ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
  ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
  ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD,
  ERROR_MESSAGE_EMPTY_SUM_FIELD,
} from '@pages/CreateOperations/constants/messages/error'
import { MockFormArticleSelectProps } from '@pages/CreateOperations/mocks/FormArticlesSelectMock'
import { MockFormContractorInput } from '@pages/CreateOperations/mocks/FormContractorInputMock'

import { setupStore } from '@store/rootConfig'

import {
  error400CashWarrantOperation,
  errorAddCashWarrantOperation,
  successAddCashWarrantOperation,
  successGetFinancialOperationsByOperationIdIsPayrollBudgetItem,
} from '@testEnv/mocks/api/financial'
import { successGetPrepaymentContractorWorkers } from '@testEnv/mocks/api/prepayment'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialOperationsByOperationId,
  mockPostFinancialCashWarrant,
  mockPutFinancialCashWarrant,
} from '@testEnv/server/handlers/financial'
import { mockGetPrepaymentContractorsResponse } from '@testEnv/server/handlers/prepayment'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { RefType } from '../../../containers/Main/Main.types'
import { FormCashWarrant } from './FormCashWarrant'
import * as T from './FormCashWarrant.types'
import {
  ERROR_MESSAGE_ADD_CASH_WARRANT,
  ERROR_MESSAGE_EDIT_CASH_WARRANT,
  ERROR_MESSAGE_EMPTY_CASH_WARRANT_DATE_FIELD,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_CASH_WARRANT,
  SUCCESS_EDIT_CASH_WARRANT,
} from './constants/messages/sucess'
import {
  TEST_ID_ACCOUNT_NUMBER,
  TEST_ID_WARRANT_NUMBER,
} from './constants/testIds'

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
    mockPostFinancialCashWarrant(successAddCashWarrantOperation, 200),
    mockGetFinancialOperationsByOperationId(),
    mockPutFinancialCashWarrant(successAddCashWarrantOperation, 200),
  )

describe('<FormCashWarrant />', () => {
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

  const renderFormCashWarrant = ({
    onComplete = () => {},
    onDisabled = () => {},
    editOperationId,
  }: Partial<T.Props>) =>
    render(
      <FormCashWarrant
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
      renderFormCashWarrant({ onComplete: onCompleteMock })

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

      expect(screen.getByText('Номер счёта'))

      expect(screen.getByText('Номер кассового ордера'))

      expect(screen.getByText('Дата кассового ордера')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(currentDate)).toBeInTheDocument()

      expect(screen.getByText('Назначение платежа'))
      expect(screen.getByPlaceholderText('Например, дополнительный взнос'))
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
        renderFormCashWarrant({ onComplete: onCompleteMock })

        expect(
          screen.getByRole('tab', { name: 'Списание', selected: true }),
        ).toBeInTheDocument()
        expect(
          screen.getByRole('tab', { name: 'Поступление' }),
        ).toBeInTheDocument()

        const article = screen.getByPlaceholderText('Например, Продукты')

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

        // 43 is id Payroll Budget Items(Manager)
        fireEvent.change(article, { target: { value: '43' } })

        expect(
          screen.getByPlaceholderText('Например, Васильев'),
        ).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toBeInTheDocument()
      })

      it('should NOT render contractor worker autocomplete field if selected "Поступление"', async () => {
        renderFormCashWarrant({ onComplete: onCompleteMock })

        const admissionTab = screen.getByRole('tab', { name: 'Поступление' })

        expect(
          screen.getByRole('tab', { name: 'Списание', selected: true }),
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
          screen.getByRole('tab', { name: 'Поступление', selected: true }),
        ).toBeInTheDocument()

        expect(screen.getByPlaceholderText('Например, Васильев'))
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
      })

      it('should NOT render contractor worker autocomplete field if selected article is not payroll', async () => {
        renderFormCashWarrant({ onComplete: onCompleteMock })

        expect(
          screen.getByRole('tab', { name: 'Списание', selected: true }),
        ).toBeInTheDocument()
        expect(
          screen.getByRole('tab', { name: 'Поступление' }),
        ).toBeInTheDocument()

        const article = screen.getByPlaceholderText('Например, Продукты')

        fireEvent.change(article, { target: { value: '41' } })

        expect(
          screen.getByPlaceholderText('Например, Васильев'),
        ).toBeInTheDocument()
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
      })

      it('should clear contractor worker autocomplete field', async () => {
        renderFormCashWarrant({ onComplete: onCompleteMock })

        expect(
          screen.getByRole('tab', { name: 'Списание', selected: true }),
        ).toBeInTheDocument()
        expect(
          screen.getByRole('tab', { name: 'Поступление' }),
        ).toBeInTheDocument()

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
        renderFormCashWarrant({ onComplete: onCompleteMock })

        expect(
          screen.getByRole('tab', { name: 'Списание', selected: true }),
        ).toBeInTheDocument()
        expect(
          screen.getByRole('tab', { name: 'Поступление' }),
        ).toBeInTheDocument()

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
        renderFormCashWarrant({ onComplete: onCompleteMock })

        expect(
          screen.getByRole('tab', { name: 'Списание', selected: true }),
        ).toBeInTheDocument()
        expect(
          screen.getByRole('tab', { name: 'Поступление' }),
        ).toBeInTheDocument()

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

  describe('when user change FormCashWarrant type', () => {
    it('should change FormArticleSelect isPurchase prop when user changes form type', async () => {
      renderFormCashWarrant({ onComplete: onCompleteMock })

      const buyTab = screen.getByRole('tab', { name: 'Списание' })
      const sellTab = screen.getByRole('tab', { name: 'Поступление' })
      const article = screen.getByPlaceholderText('Например, Продукты')

      expect(article).toHaveAttribute(
        'data-operation-type',
        EOperationsType.CashOrders,
      )
      expect(article).toHaveAttribute('data-is-purchase', 'true')
      fireEvent.click(sellTab)
      expect(article).toHaveAttribute('data-is-purchase', 'false')
      fireEvent.click(buyTab)
      expect(article).toHaveAttribute('data-is-purchase', 'true')
    })

    it('should clear selected article, if has been selected previously', async () => {
      renderFormCashWarrant({ onComplete: onCompleteMock })

      const buyTab = screen.getByRole('tab', { name: 'Списание' })
      const sellTab = screen.getByRole('tab', { name: 'Поступление' })
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

  describe('when the form is filled', () => {
    describe('when render success message', () => {
      it('should call handleSubmit if all required form fields have been completed', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        renderFormCashWarrant({
          onComplete: onCompleteMock,
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          /Наименования товара или услуги/i,
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
        const cashOrderNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )
        const cashOrderDate = screen.getByPlaceholderText(currentDate)

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(accountNumber, { target: { value: '339940' } })
        fireEvent.change(cashOrderNumber, { target: { value: '432423' } })
        fireEvent.change(paymentPurpose, {
          target: { value: 'Причина платежа' },
        })
        fireEvent.change(cashOrderDate, {
          target: { value: currentDate },
        })

        expect(article).toHaveValue('41')
        expect(sum).toHaveValue('1 000')
        expect(serviceName).toHaveValue('test')
        expect(contractor).toHaveValue('Тест')
        expect(accountNumber).toHaveValue('339940')
        expect(cashOrderNumber).toHaveValue('432423')
        expect(cashOrderDate).toHaveValue(currentDate)
        expect(paymentPurpose).toHaveValue('Причина платежа')

        const pendingCreateFinancialCashOrdersRequest = waitForRequest(
          server,
          'POST',
          /financial\/cash_orders/,
        )

        await act(async () => mockSubmit())

        const createFinancialCashWarrantRequest = await (
          await pendingCreateFinancialCashOrdersRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(createFinancialCashWarrantRequest).toEqual({
          enterpriseId: 1,
          isWriteOff: true,
          expenses: [
            {
              budgetItemId: 41,
              amount: 1000,
              name: 'test',
              isCapitalAssets: false,
            },
          ],
          contractorId: 528,
          cashOrderDate: currentDateToServer,
          accountNumber: '339940',
          paymentPurpose: 'Причина платежа',
          cashOrderNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)
        expect(onCompleteMock).toHaveBeenCalledWith([
          PATHS.financialReports.balance,
          PATHS.financialReports.cashFlow,
        ])

        expect(screen.getByText(SUCCESS_ADD_CASH_WARRANT)).toBeInTheDocument()
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
          const requestGetPrepaymentContractorsSpy = jest.fn()

          renderFormCashWarrant({
            onComplete: onCompleteMock,
          })

          const article = screen.getByPlaceholderText('Например, Продукты')
          const sum = screen.getByPlaceholderText('Например, 1 000')
          const serviceName = screen.getByPlaceholderText(
            /Наименования товара или услуги/i,
          )
          const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
          const cashOrderNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
          const paymentPurpose = screen.getByPlaceholderText(
            'Например, дополнительный взнос',
          )
          const cashOrderDate = screen.getByPlaceholderText(currentDate)

          fireEvent.change(sum, { target: { value: '1000' } })
          fireEvent.change(serviceName, { target: { value: 'test' } })
          fireEvent.change(accountNumber, { target: { value: '339940' } })
          fireEvent.change(cashOrderNumber, { target: { value: '432423' } })
          fireEvent.change(paymentPurpose, {
            target: { value: 'Причина платежа' },
          })
          fireEvent.change(cashOrderDate, {
            target: { value: currentDate },
          })

          server.events.on('request:end', requestGetPrepaymentContractorsSpy)

          // 43 is id Payroll Budget Items(Manager)
          fireEvent.change(article, { target: { value: '43' } })
          expect(article).toHaveValue('43')

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
          expect(sum).toHaveValue('1 000')
          expect(serviceName).toHaveValue('test')
          expect(accountNumber).toHaveValue('339940')
          expect(cashOrderNumber).toHaveValue('432423')
          expect(cashOrderDate).toHaveValue(currentDate)
          expect(paymentPurpose).toHaveValue('Причина платежа')

          const pendingCreateFinancialCashOrdersRequest = waitForRequest(
            server,
            'POST',
            /financial\/cash_orders/,
          )

          server.events.on('request:end', requestSpy)

          await act(async () => mockSubmit())

          const createFinancialCashWarrantRequest = await (
            await pendingCreateFinancialCashOrdersRequest
          ).json()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          expect(createFinancialCashWarrantRequest).toEqual({
            enterpriseId: 1,
            isWriteOff: true,
            expenses: [
              {
                budgetItemId: 43,
                amount: 1000,
                name: 'test',
                isCapitalAssets: false,
              },
            ],
            contractorId: 539,
            cashOrderDate: currentDateToServer,
            accountNumber: '339940',
            paymentPurpose: 'Причина платежа',
            cashOrderNumber: '432423',
          })

          expect(onCompleteMock).toHaveBeenCalledTimes(1)
          expect(onCompleteMock).toHaveBeenCalledWith([
            PATHS.financialReports.balance,
            PATHS.financialReports.cashFlow,
          ])

          expect(screen.getByText(SUCCESS_ADD_CASH_WARRANT)).toBeInTheDocument()
        })
      })
    })

    describe('when render error message', () => {
      it('should show error message if the form was NOT submitted correctly', async () => {
        server.use(
          mockPostFinancialCashWarrant(errorAddCashWarrantOperation, 500),
        )

        renderFormCashWarrant({
          onComplete: onCompleteMock,
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          /Наименования товара или услуги/i,
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
        const cashOrderNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const cashOrderDate = screen.getByPlaceholderText(currentDate)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(accountNumber, { target: { value: '339940' } })
        fireEvent.change(cashOrderNumber, { target: { value: '432423' } })
        fireEvent.change(paymentPurpose, {
          target: { value: 'Причина платежа' },
        })
        fireEvent.change(cashOrderDate, {
          target: { value: currentDate },
        })

        await act(async () => mockSubmit())

        expect(
          screen.getByText(ERROR_MESSAGE_ADD_CASH_WARRANT),
        ).toBeInTheDocument()
      })

      it('should error message "Не указано назначение платежа" if field contains a space', async () => {
        server.use(
          mockPostFinancialCashWarrant(error400CashWarrantOperation, 400),
        )

        renderFormCashWarrant({
          onComplete: onCompleteMock,
        })

        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          /Наименования товара или услуги/i,
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
        const cashOrderNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const cashOrderDate = screen.getByPlaceholderText(currentDate)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(accountNumber, { target: { value: '339940' } })
        fireEvent.change(cashOrderNumber, { target: { value: '432423' } })
        fireEvent.change(paymentPurpose, { target: { value: ' ' } })
        fireEvent.change(cashOrderDate, {
          target: { value: currentDate },
        })

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(paymentPurpose).toHaveValue(' ')

        expect(
          screen.getByText(ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD),
        ).toBeInTheDocument()
      })
    })
  })

  describe('when required fields not filled', () => {
    it('should show error message if "Статья" field is empty', async () => {
      renderFormCashWarrant({
        onComplete: onCompleteMock,
      })

      const article = screen.getByPlaceholderText('Например, Продукты')

      await act(async () => mockSubmit())

      expect(article).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD))
    })

    it('should show error message if "Сумма" field is empty', async () => {
      renderFormCashWarrant({
        onComplete: onCompleteMock,
      })

      const sum = screen.getByPlaceholderText('Например, 1 000')

      await act(async () => mockSubmit())

      expect(sum).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_SUM_FIELD))
    })

    describe('when "Контрагент" field is empty', () => {
      it('should show error message if "Контрагент" field is empty', async () => {
        renderFormCashWarrant({
          onComplete: onCompleteMock,
        })

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
          renderFormCashWarrant({
            onComplete: onCompleteMock,
          })

          expect(
            screen.getByRole('tab', { name: 'Списание', selected: true }),
          ).toBeInTheDocument()
          expect(
            screen.getByRole('tab', { name: 'Поступление' }),
          ).toBeInTheDocument()

          // 43 is id Payroll Budget Items(Manager)
          fireEvent.change(screen.getByPlaceholderText('Например, Продукты'), {
            target: { value: '43' },
          })

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

    it('should show error message if "Дата кассового ордера" field is empty', async () => {
      renderFormCashWarrant({
        onComplete: onCompleteMock,
      })

      const cashOrderDate = screen.getAllByPlaceholderText(currentDate)[0]

      await act(async () => mockSubmit())

      expect(cashOrderDate).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_CASH_WARRANT_DATE_FIELD))
    })

    it('should show error message if "Назначение платежа" field is empty', async () => {
      renderFormCashWarrant({
        onComplete: onCompleteMock,
      })

      const article = screen.getByPlaceholderText(
        'Например, дополнительный взнос',
      )

      await act(async () => mockSubmit())

      expect(article).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD))
    })
  })

  describe('when form edit view active', () => {
    it('should fill all available form fields', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormCashWarrant({ editOperationId: 1, onDisabled: mockOnDisabled })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const serviceName = screen.getByPlaceholderText(
        /Наименования товара или услуги/i,
      )
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
      const cashOrderNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
      const paymentPurpose = screen.getByPlaceholderText(
        'Например, дополнительный взнос',
      )
      const cashOrderDate = screen.getByPlaceholderText(currentDate)

      expect(article).toHaveValue('41')
      expect(sum).toHaveValue('1 000')
      expect(serviceName).toHaveValue('budgetItem')
      expect(contractor).toHaveValue('contractor')
      expect(accountNumber).toHaveValue('accountNumber')
      expect(cashOrderNumber).toHaveValue('operationNumber')
      expect(cashOrderDate).toHaveValue('07-10-2022')
      expect(paymentPurpose).toHaveValue('paymentPurpose')
    })

    it('should disable toggle "Поступление/Списание"', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormCashWarrant({ editOperationId: 1, onDisabled: mockOnDisabled })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const selectedToggleButton = screen.getByRole('tab', {
        name: 'Списание',
        selected: true,
      })

      const unselectedToggleButton = screen.getByRole('tab', {
        name: 'Поступление',
        selected: false,
      })

      expect(selectedToggleButton).toBeInTheDocument()
      expect(unselectedToggleButton).toBeDisabled()
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

        renderFormCashWarrant({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          /Наименования товара или услуги/i,
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
        const cashOrderNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )
        const cashOrderDate = screen.getByPlaceholderText(currentDate)

        expect(article).toHaveValue('43')
        expect(sum).toHaveValue('1 000')
        expect(serviceName).toHaveValue('budgetItem')
        expect(contractor).toHaveValue('contractor')
        expect(accountNumber).toHaveValue('accountNumber')
        expect(cashOrderNumber).toHaveValue('operationNumber')
        expect(cashOrderDate).toHaveValue('07-10-2022')
        expect(paymentPurpose).toHaveValue('paymentPurpose')
      })
    })

    describe('when user saves the form', () => {
      it('should save changes and show success message', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()
        const mockOnComplete = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormCashWarrant({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
          onComplete: mockOnComplete,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const pendingEditFinancialCashWarrantRequest = waitForRequest(
          server,
          'PUT',
          /financial\/cash_orders/,
        )

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        const editFinancialCashWarrantRequest = await (
          await pendingEditFinancialCashWarrantRequest
        ).json()

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(editFinancialCashWarrantRequest).toEqual({
          accountNumber: 'accountNumber',
          cashOrderDate: '2022-10-07',
          contractorId: 1,
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
          paymentPurpose: 'paymentPurpose',
          cashOrderNumber: 'operationNumber',
          isWriteOff: true,
        })

        expect(mockOnComplete).toHaveBeenCalledTimes(1)
        expect(mockOnComplete).toHaveBeenCalledWith([
          PATHS.financialReports.balance,
          PATHS.financialReports.cashFlow,
        ])

        expect(screen.getByText(SUCCESS_EDIT_CASH_WARRANT)).toBeInTheDocument()
      })

      it('should show error message', async () => {
        server.use(
          mockPutFinancialCashWarrant(successAddCashWarrantOperation, 500),
        )

        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormCashWarrant({
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
          screen.getByText(ERROR_MESSAGE_EDIT_CASH_WARRANT),
        ).toBeInTheDocument()
      })
    })
  })
})
