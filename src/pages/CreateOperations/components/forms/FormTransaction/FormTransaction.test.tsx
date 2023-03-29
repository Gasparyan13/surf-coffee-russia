/* eslint-disable max-lines */
import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import { MockFormContractorInput } from '@pages/CreateOperations/mocks/FormContractorInputMock'

import { setupStore } from '@store/rootConfig'

import {
  error400AddTransaction,
  errorAddTransaction,
  successAddTransaction,
  successGetFinancialOperationsByOperationIdIsPayrollBudgetItem,
} from '@testEnv/mocks/api/financial'
import { successGetPrepaymentContractorWorkers } from '@testEnv/mocks/api/prepayment'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialOperationsByOperationId,
  mockPostFinancialTransaction,
  mockPutFinancialTransaction,
} from '@testEnv/server/handlers/financial'
import { mockGetPrepaymentContractorsResponse } from '@testEnv/server/handlers/prepayment'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import {
  ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
  ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
  ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD,
  ERROR_MESSAGE_EMPTY_SUM_FIELD,
} from '../../../constants/messages/error'
import { RefType } from '../../../containers/Main/Main.types'
import { MockFormArticleSelectProps } from '../../../mocks/FormArticlesSelectMock'
import { FormTransaction } from './FormTransaction'
import * as T from './FormTransaction.types'
import {
  ERROR_MESSAGE_ADD_TRANSACTION,
  ERROR_MESSAGE_EDIT_TRANSACTION,
  ERROR_MESSAGE_EMPTY_TRANSACTION_DATE_FIELD,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_TRANSACTION,
  SUCCESS_EDIT_TRANSACTION,
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
    mockPostFinancialTransaction(successAddTransaction, 200),
    mockGetFinancialOperationsByOperationId(),
    mockPutFinancialTransaction(successAddTransaction, 200),
  )

describe('<FormTransaction/>', () => {
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

  const renderFormTransaction = ({
    onComplete = () => {},
    onDisabled = () => {},
    editOperationId,
  }: Partial<T.Props>) =>
    render(
      <FormTransaction
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
      renderFormTransaction({ onComplete: onCompleteMock })

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

      expect(screen.getByText('Номер транзакции'))

      expect(screen.getByText('Дата транзакции')).toBeInTheDocument()
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
        renderFormTransaction({ onComplete: onCompleteMock })

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
        renderFormTransaction({ onComplete: onCompleteMock })

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
        renderFormTransaction({ onComplete: onCompleteMock })

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
        renderFormTransaction({ onComplete: onCompleteMock })

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
        renderFormTransaction({ onComplete: onCompleteMock })

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
        renderFormTransaction({ onComplete: onCompleteMock })

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

  describe('when user change FormTransaction type', () => {
    it('should change FormArticleSelect isPurchase prop when user changes form type', async () => {
      renderFormTransaction({ onComplete: onCompleteMock })

      const buyTab = screen.getByRole('tab', { name: 'Списание' })
      const sellTab = screen.getByRole('tab', { name: 'Поступление' })
      const article = screen.getByPlaceholderText('Например, Продукты')

      expect(article).toHaveAttribute(
        'data-operation-type',
        EOperationsType.Transaction,
      )
      expect(article).toHaveAttribute('data-is-purchase', 'true')
      fireEvent.click(sellTab)
      expect(article).toHaveAttribute('data-is-purchase', 'false')
      fireEvent.click(buyTab)
      expect(article).toHaveAttribute('data-is-purchase', 'true')
    })

    it('should clear selected article, if has been selected previously', async () => {
      renderFormTransaction({ onComplete: onCompleteMock })

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

        renderFormTransaction({
          onComplete: onCompleteMock,
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          /Наименования товара или услуги/i,
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
        const transactionNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )
        const transactionDate = screen.getByPlaceholderText(currentDate)

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(accountNumber, { target: { value: '339940' } })
        fireEvent.change(transactionNumber, { target: { value: '432423' } })
        fireEvent.change(paymentPurpose, {
          target: { value: 'Причина платежа' },
        })
        fireEvent.change(transactionDate, {
          target: { value: currentDate },
        })

        expect(article).toHaveValue('41')
        expect(sum).toHaveValue('1 000')
        expect(serviceName).toHaveValue('test')
        expect(contractor).toHaveValue('Тест')
        expect(accountNumber).toHaveValue('339940')
        expect(transactionNumber).toHaveValue('432423')
        expect(transactionDate).toHaveValue(currentDate)
        expect(paymentPurpose).toHaveValue('Причина платежа')

        const pendingCreateTransactionRequest = waitForRequest(
          server,
          'POST',
          /financial\/transactions/,
        )

        await act(async () => mockSubmit())

        const createTransactionRequest = await (
          await pendingCreateTransactionRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(createTransactionRequest).toEqual({
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
          transactionDate: currentDateToServer,
          accountNumber: '339940',
          paymentPurpose: 'Причина платежа',
          transactionNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)

        expect(screen.getByText(SUCCESS_ADD_TRANSACTION)).toBeInTheDocument()
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

          renderFormTransaction({
            onComplete: onCompleteMock,
          })

          const article = screen.getByPlaceholderText('Например, Продукты')
          const sum = screen.getByPlaceholderText('Например, 1 000')
          const serviceName = screen.getByPlaceholderText(
            /Наименования товара или услуги/i,
          )
          const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
          const transactionNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
          const paymentPurpose = screen.getByPlaceholderText(
            'Например, дополнительный взнос',
          )
          const transactionDate = screen.getByPlaceholderText(currentDate)

          fireEvent.change(sum, { target: { value: '1000' } })
          fireEvent.change(serviceName, { target: { value: 'test' } })
          fireEvent.change(accountNumber, { target: { value: '339940' } })
          fireEvent.change(transactionNumber, { target: { value: '432423' } })
          fireEvent.change(paymentPurpose, {
            target: { value: 'Причина платежа' },
          })
          fireEvent.change(transactionDate, {
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
          expect(transactionNumber).toHaveValue('432423')
          expect(transactionDate).toHaveValue(currentDate)
          expect(paymentPurpose).toHaveValue('Причина платежа')

          const pendingCreateTransactionRequest = waitForRequest(
            server,
            'POST',
            /financial\/transactions/,
          )

          server.events.on('request:end', requestSpy)

          await act(async () => mockSubmit())

          const createTransactionRequest = await (
            await pendingCreateTransactionRequest
          ).json()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          expect(createTransactionRequest).toEqual({
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
            transactionDate: currentDateToServer,
            accountNumber: '339940',
            paymentPurpose: 'Причина платежа',
            transactionNumber: '432423',
          })

          expect(onCompleteMock).toHaveBeenCalledTimes(1)

          expect(screen.getByText(SUCCESS_ADD_TRANSACTION)).toBeInTheDocument()
        })
      })
    })

    describe('when render error message', () => {
      it('should show error message if the form was NOT submitted correctly', async () => {
        server.use(mockPostFinancialTransaction(errorAddTransaction, 500))

        renderFormTransaction({
          onComplete: onCompleteMock,
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText(
          /Наименования товара или услуги/i,
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
        const transactionNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const transactionDate = screen.getByPlaceholderText(currentDate)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(accountNumber, { target: { value: '339940' } })
        fireEvent.change(transactionNumber, { target: { value: '432423' } })
        fireEvent.change(paymentPurpose, {
          target: { value: 'Причина платежа' },
        })
        fireEvent.change(transactionDate, {
          target: { value: currentDate },
        })

        await act(async () => mockSubmit())

        expect(
          screen.getByText(ERROR_MESSAGE_ADD_TRANSACTION),
        ).toBeInTheDocument()
      })

      it('should error message "Не указано назначение платежа" if the field contains only space', async () => {
        server.use(mockPostFinancialTransaction(error400AddTransaction, 400))

        renderFormTransaction({
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
        const transactionNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const transactionDate = screen.getByPlaceholderText(currentDate)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(accountNumber, { target: { value: '339940' } })
        fireEvent.change(transactionNumber, { target: { value: '432423' } })
        fireEvent.change(paymentPurpose, { target: { value: ' ' } })
        fireEvent.change(transactionDate, {
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
      renderFormTransaction({
        onComplete: onCompleteMock,
      })

      const article = screen.getByPlaceholderText('Например, Продукты')

      await act(async () => mockSubmit())

      expect(article).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD))
    })

    it('should show error message if "Сумма" field is empty', async () => {
      renderFormTransaction({
        onComplete: onCompleteMock,
      })

      const sum = screen.getByPlaceholderText('Например, 1 000')

      await act(async () => mockSubmit())

      expect(sum).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_SUM_FIELD))
    })

    it('should show error message if "Контрагент" field is empty', async () => {
      renderFormTransaction({
        onComplete: onCompleteMock,
      })

      const contractor = screen.getByPlaceholderText('Например, Васильев')

      await act(async () => mockSubmit())

      expect(contractor).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD))
    })

    it('should show error message if "Дата транзакции" field is empty', async () => {
      renderFormTransaction({
        onComplete: onCompleteMock,
      })

      const transactionDate = screen.getAllByPlaceholderText(currentDate)[0]

      await act(async () => mockSubmit())

      expect(transactionDate).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_TRANSACTION_DATE_FIELD))
    })

    it('should show error message if "Назначение платежа" field is empty', async () => {
      renderFormTransaction({
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

      renderFormTransaction({ editOperationId: 1, onDisabled: mockOnDisabled })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const serviceName = screen.getByPlaceholderText(
        /Наименования товара или услуги/i,
      )
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const accountNumber = screen.getByTestId(TEST_ID_ACCOUNT_NUMBER)
      const transactionNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
      const paymentPurpose = screen.getByPlaceholderText(
        'Например, дополнительный взнос',
      )
      const transactionDate = screen.getByPlaceholderText(currentDate)

      expect(article).toHaveValue('41')
      expect(sum).toHaveValue('1 000')
      expect(serviceName).toHaveValue('budgetItem')
      expect(contractor).toHaveValue('contractor')
      expect(accountNumber).toHaveValue('accountNumber')
      expect(transactionNumber).toHaveValue('operationNumber')
      expect(transactionDate).toHaveValue('07-10-2022')
      expect(paymentPurpose).toHaveValue('paymentPurpose')
    })

    it('should disable toggle "Поступление/Списание"', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormTransaction({ editOperationId: 1, onDisabled: mockOnDisabled })

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

        renderFormTransaction({
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
        const transactionNumber = screen.getByTestId(TEST_ID_WARRANT_NUMBER)
        const paymentPurpose = screen.getByPlaceholderText(
          'Например, дополнительный взнос',
        )
        const transactionDate = screen.getByPlaceholderText(currentDate)

        expect(article).toHaveValue('43')
        expect(sum).toHaveValue('1 000')
        expect(serviceName).toHaveValue('budgetItem')
        expect(contractor).toHaveValue('contractor')
        expect(accountNumber).toHaveValue('accountNumber')
        expect(transactionNumber).toHaveValue('operationNumber')
        expect(transactionDate).toHaveValue('07-10-2022')
        expect(paymentPurpose).toHaveValue('paymentPurpose')
      })
    })

    describe('when user saves the form', () => {
      it('should save changes and show success message', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()
        const mockOnComplete = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormTransaction({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
          onComplete: mockOnComplete,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const pendingEditFinancialTransactionRequest = waitForRequest(
          server,
          'PUT',
          /financial\/transactions/,
        )

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        const editFinancialTransactionRequest = await (
          await pendingEditFinancialTransactionRequest
        ).json()

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(editFinancialTransactionRequest).toEqual({
          accountNumber: 'accountNumber',
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
          transactionDate: '2022-10-07',
          transactionNumber: 'operationNumber',
          isWriteOff: true,
        })

        expect(mockOnComplete).toHaveBeenCalledTimes(1)
        expect(mockOnComplete).toHaveBeenCalledWith(
          PATHS.financialReports.cashFlow,
        )

        expect(screen.getByText(SUCCESS_EDIT_TRANSACTION)).toBeInTheDocument()
      })

      it('should show error message', async () => {
        server.use(mockPutFinancialTransaction(successAddTransaction, 500))

        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormTransaction({
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
          screen.getByText(ERROR_MESSAGE_EDIT_TRANSACTION),
        ).toBeInTheDocument()
      })
    })
  })
})
