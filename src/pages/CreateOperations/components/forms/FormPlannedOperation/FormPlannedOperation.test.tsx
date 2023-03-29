/* eslint-disable max-lines */
import React from 'react'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import {
  ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
  ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
  ERROR_MESSAGE_EMPTY_SUM_FIELD,
} from '@pages/CreateOperations/constants/messages/error'
import { RefType } from '@pages/CreateOperations/containers/Main/Main.types'
import { MockFormArticleSelectProps } from '@pages/CreateOperations/mocks/FormArticlesSelectMock'
import { MockFormContractorInput } from '@pages/CreateOperations/mocks/FormContractorInputMock'

import { setupStore } from '@store/rootConfig'

import {
  errorAddPlannedOperation,
  successAddPlannedOperation,
  successGetFinancialPlannedOperationsById,
  successGetFinancialPlannedOperationsByIdIsPayrollBudgetItem,
  successPatchFinancialPlannedOperations,
} from '@testEnv/mocks/api/financial'
import { successGetPrepaymentContractorWorkers } from '@testEnv/mocks/api/prepayment'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialPlannedOperationsById,
  mockPatchFinancialPlannedOperations,
  mockPostFinancialPlannedOperationsApiResponse,
} from '@testEnv/server/handlers/financial'
import { mockGetPrepaymentContractorsResponse } from '@testEnv/server/handlers/prepayment'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { FormPlannedOperation } from './FormPlannedOperation'
import * as T from './FormPlannedOperation.types'
import {
  ERROR_MESSAGE_ADD_PLANNED_OPERATION,
  ERROR_MESSAGE_EDIT_PLANNED_OPERATION,
  ERROR_MESSAGE_EMPTY_ACCRUAL_DATE,
  ERROR_MESSAGE_EMPTY_PAYMENT_DATE,
  ERROR_MESSAGE_EMPTY_PAYMENT_TYPE,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_PLANNED_OPERATION,
  SUCCESS_EDIT_PLANNED_OPERATION,
} from './constants/messages/sucess'

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
    mockPostFinancialPlannedOperationsApiResponse(
      successAddPlannedOperation,
      200,
    ),
    mockGetFinancialPlannedOperationsById(
      successGetFinancialPlannedOperationsById,
    ),
    mockPatchFinancialPlannedOperations(),
  )

describe('<FormPlannedOperation />', () => {
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

  const renderFormPlannedOperation = ({
    onComplete = () => {},
    onDisabled = () => {},
    editOperationId,
  }: Partial<T.Props>) =>
    render(
      <FormPlannedOperation
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
      renderFormPlannedOperation({ onComplete: onCompleteMock })

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

      expect(screen.getByText('Контрагент')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Например, Васильев'),
      ).toBeInTheDocument()

      expect(screen.getByText('Наименование')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Наименования товара или услуги'),
      ).toBeInTheDocument()

      expect(screen.getByText('Дата оплаты')).toBeInTheDocument()
      expect(screen.getAllByPlaceholderText(currentDate)[0]).toBeInTheDocument()

      expect(screen.getByText('Дата начисления')).toBeInTheDocument()

      expect(
        screen.getByRole('checkbox', { name: 'Услуга', checked: false }),
      ).toBeInTheDocument()
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
        renderFormPlannedOperation({ onComplete: onCompleteMock })

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
        renderFormPlannedOperation({ onComplete: onCompleteMock })

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
        renderFormPlannedOperation({ onComplete: onCompleteMock })

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
        renderFormPlannedOperation({ onComplete: onCompleteMock })

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
        renderFormPlannedOperation({ onComplete: onCompleteMock })

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
    })
  })

  describe('when the form is filled', () => {
    it('should call handleSubmit if all required form fields have been completed', async () => {
      const requestSpy = jest.fn()

      renderFormPlannedOperation({
        onComplete: onCompleteMock,
      })

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const name = screen.getByPlaceholderText('Наименования товара или услуги')
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const isServiceCheckbox = screen.getByRole('checkbox', {
        name: 'Услуга',
        checked: false,
      })
      const [cashlessRadioButton] = screen.getAllByRole('radio')

      // search DatePicker nodes
      const [paymentDate, receiveDate] =
        screen.getAllByPlaceholderText(currentDate)

      fireEvent.change(article, { target: { value: '41' } })
      fireEvent.change(sum, { target: { value: '1000' } })
      fireEvent.change(name, { target: { value: 'test' } })
      fireEvent.change(contractor, { target: { value: 'Тест' } })
      fireEvent.click(isServiceCheckbox)
      fireEvent.click(cashlessRadioButton)
      // fill DatePicker input
      fireEvent.change(paymentDate, {
        target: { value: currentDate },
      })
      fireEvent.change(receiveDate, {
        target: { value: currentDate },
      })

      expect(article).toHaveValue('41')
      expect(sum).toHaveValue('1 000')
      expect(name).toHaveValue('test')
      expect(contractor).toHaveValue('Тест')
      expect(isServiceCheckbox).toBeChecked()
      expect(paymentDate).toHaveValue(currentDate)
      expect(receiveDate).toHaveValue(currentDate)

      const pendingCreateFinancialPlannedOperationsRequest = waitForRequest(
        server,
        'POST',
        /financial\/planned_operations/,
      )

      server.events.on('request:end', requestSpy)

      await act(async () => mockSubmit())

      const createFinancialPlannedOperationsRequest = await (
        await pendingCreateFinancialPlannedOperationsRequest
      ).json()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      expect(createFinancialPlannedOperationsRequest).toEqual({
        enterpriseId: 1,
        isWriteOff: true,
        expense: {
          budgetItemId: 41,
          money: 1000,
          name: 'test',
        },
        contractorId: 528,
        dateOfPayment: currentDateToServer,
        dateOfReceiving: currentDateToServer,
        isService: true,
        isCash: false,
      })

      expect(onCompleteMock).toHaveBeenCalledTimes(1)
      expect(onCompleteMock).toHaveBeenCalledWith([
        PATHS.financialReports.pnl,
        PATHS.financialReports.cashFlow,
      ])

      expect(
        screen.getByText(SUCCESS_ADD_PLANNED_OPERATION),
      ).toBeInTheDocument()
    })

    it('should show error message if the form was NOT submitted correctly', async () => {
      server.use(
        mockPostFinancialPlannedOperationsApiResponse(
          errorAddPlannedOperation,
          500,
        ),
      )

      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderFormPlannedOperation({
        onComplete: onCompleteMock,
      })

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const [cashlessRadioButton] = screen.getAllByRole('radio')

      // search DatePicker nodes
      const [paymentDate, receiveDate] =
        screen.getAllByPlaceholderText(currentDate)

      fireEvent.click(cashlessRadioButton)
      fireEvent.change(article, { target: { value: '41' } })
      fireEvent.change(sum, { target: { value: '1000' } })
      fireEvent.change(contractor, { target: { value: 'Тест' } })

      // fill DatePicker input
      fireEvent.change(paymentDate, {
        target: { value: currentDate },
      })
      fireEvent.change(receiveDate, {
        target: { value: currentDate },
      })

      await act(async () => mockSubmit())

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      expect(
        screen.getByText(ERROR_MESSAGE_ADD_PLANNED_OPERATION),
      ).toBeInTheDocument()
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

        renderFormPlannedOperation({
          onComplete: onCompleteMock,
        })

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const name = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const isServiceCheckbox = screen.getByRole('checkbox', {
          name: 'Услуга',
          checked: false,
        })
        const [cashlessRadioButton] = screen.getAllByRole('radio')

        const [paymentDate, receiveDate] =
          screen.getAllByPlaceholderText(currentDate)

        server.events.on('request:end', requestGetPrepaymentContractorsSpy)

        // 43 is id Payroll Budget Items(Manager)
        fireEvent.change(article, { target: { value: '43' } })
        expect(article).toHaveValue('43')

        fireEvent.change(sum, { target: { value: '1000' } })
        fireEvent.change(name, { target: { value: 'test' } })
        fireEvent.click(isServiceCheckbox)
        fireEvent.click(cashlessRadioButton)
        fireEvent.change(paymentDate, {
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
        expect(sum).toHaveValue('1 000')
        expect(name).toHaveValue('test')
        expect(isServiceCheckbox).toBeChecked()
        expect(paymentDate).toHaveValue(currentDate)
        expect(receiveDate).toHaveValue(currentDate)

        const pendingCreateFinancialPlannedOperationsRequest = waitForRequest(
          server,
          'POST',
          /financial\/planned_operations/,
        )

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        const createFinancialPlannedOperationsRequest = await (
          await pendingCreateFinancialPlannedOperationsRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(createFinancialPlannedOperationsRequest).toEqual({
          enterpriseId: 1,
          isWriteOff: true,
          expense: {
            budgetItemId: 43,
            money: 1000,
            name: 'test',
          },
          contractorId: 539,
          dateOfPayment: currentDateToServer,
          dateOfReceiving: currentDateToServer,
          isService: true,
          isCash: false,
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)
        expect(onCompleteMock).toHaveBeenCalledWith([
          PATHS.financialReports.pnl,
          PATHS.financialReports.cashFlow,
        ])

        expect(
          screen.getByText(SUCCESS_ADD_PLANNED_OPERATION),
        ).toBeInTheDocument()
      })
    })

    describe('when required fields not filled', () => {
      it('should show error message if "Статья" field is empty', async () => {
        renderFormPlannedOperation({
          onComplete: onCompleteMock,
        })

        const article = screen.getByPlaceholderText('Например, Продукты')

        await act(async () => mockSubmit())

        expect(article).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD))
      })

      it('should show error message if "Сумма" field is empty', async () => {
        renderFormPlannedOperation({
          onComplete: onCompleteMock,
        })

        const sum = screen.getByPlaceholderText('Например, 1 000')

        await act(async () => mockSubmit())

        expect(sum).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_SUM_FIELD))
      })

      describe('when "Контрагент" field is empty', () => {
        it('should show error message if "Контрагент" field is empty', async () => {
          renderFormPlannedOperation({
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
            renderFormPlannedOperation({
              onComplete: onCompleteMock,
            })

            expect(
              screen.getByRole('tab', { name: 'Списание', selected: true }),
            ).toBeInTheDocument()
            expect(
              screen.getByRole('tab', { name: 'Поступление' }),
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

      it('should show error message if "Дата оплаты" field is empty', async () => {
        renderFormPlannedOperation({
          onComplete: onCompleteMock,
        })

        const paymentDate = screen.getAllByPlaceholderText(currentDate)[0]

        await act(async () => mockSubmit())

        expect(paymentDate).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_PAYMENT_DATE))
      })

      it('should show error message if "Дата начисления" field is empty', async () => {
        renderFormPlannedOperation({
          onComplete: onCompleteMock,
        })

        const receiveDate = screen.getAllByPlaceholderText(currentDate)[1]

        await act(async () => mockSubmit())

        expect(receiveDate).toHaveValue('')
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_ACCRUAL_DATE))
      })

      it('should show error message if "Тип оплаты" radio buttons is not selected', async () => {
        renderFormPlannedOperation({
          onComplete: onCompleteMock,
        })

        const [cashlessRadioButton, cashRadioButton] =
          screen.getAllByRole('radio')

        await act(async () => mockSubmit())

        expect(cashlessRadioButton).not.toBeChecked()
        expect(cashRadioButton).not.toBeChecked()
        expect(screen.getByText(ERROR_MESSAGE_EMPTY_PAYMENT_TYPE))
      })
    })
  })

  describe('when form edit view active', () => {
    it('should fill all available form fields', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormPlannedOperation({
        editOperationId: 1,
        onDisabled: mockOnDisabled,
      })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
      await waitFor(async () => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
      })

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const name = screen.getByPlaceholderText('Наименования товара или услуги')
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const isServiceCheckbox = screen.getByRole('checkbox', {
        name: 'Услуга',
        checked: false,
      })
      // search DatePicker nodes
      const [paymentDate, receiveDate] =
        screen.getAllByPlaceholderText(currentDate)

      const testDate = DateHelper.toFormat(new Date('2022-10-26T00:00:00.000Z'))
      expect(article).toHaveValue('3')
      expect(sum).toHaveValue('1 200')
      expect(name).toHaveValue('кока кола')
      expect(contractor).toHaveValue('Новое физ лицо')
      expect(isServiceCheckbox).not.toBeChecked()
      expect(paymentDate).toHaveValue(testDate)
      expect(receiveDate).toHaveValue(testDate)
    })

    it('should disable toggle "Поступление/Списание"', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormPlannedOperation({
        editOperationId: 1,
        onDisabled: mockOnDisabled,
      })

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
          mockGetFinancialPlannedOperationsById(
            successGetFinancialPlannedOperationsByIdIsPayrollBudgetItem,
          ),
        )
      })

      it('should fill all available form fields if "isService"', async () => {
        const requestSpy = jest.fn()
        server.use(
          mockGetFinancialPlannedOperationsById({
            ...successGetFinancialPlannedOperationsById,
            isService: true,
          }),
        )
        server.events.on('request:end', requestSpy)
        const mockOnDisabled = jest.fn()

        renderFormPlannedOperation({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const name = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const isServiceCheckbox = screen.getByRole('checkbox', {
          name: 'Услуга',
          checked: true,
        })
        const [paymentDate, receiveDate] =
          screen.getAllByPlaceholderText(currentDate)

        const testDate = DateHelper.toFormat(
          new Date('2022-10-26T00:00:00.000Z'),
        )
        expect(article).toHaveValue('3')
        expect(sum).toHaveValue('1 200')
        expect(name).toHaveValue('кока кола')
        expect(contractor).toHaveValue('Новое физ лицо')
        expect(isServiceCheckbox).toBeChecked()
        expect(paymentDate).toHaveValue(testDate)
        expect(receiveDate).toHaveValue(testDate)
      })

      it('should fill all available form fields if NOT "isService"', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)
        const mockOnDisabled = jest.fn()

        renderFormPlannedOperation({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const name = screen.getByPlaceholderText(
          'Наименования товара или услуги',
        )
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const isServiceCheckbox = screen.getByRole('checkbox', {
          name: 'Услуга',
          checked: false,
        })
        const [paymentDate, receiveDate] =
          screen.getAllByPlaceholderText(currentDate)

        const testDate = DateHelper.toFormat(
          new Date('2022-10-26T00:00:00.000Z'),
        )
        expect(article).toHaveValue('43')
        expect(sum).toHaveValue('1 200')
        expect(name).toHaveValue('кока кола')
        expect(contractor).toHaveValue('Новое физ лицо')
        expect(isServiceCheckbox).not.toBeChecked()
        expect(paymentDate).toHaveValue(testDate)
        expect(receiveDate).toHaveValue(testDate)
      })
    })

    describe('when user saves the form', () => {
      it('should save changes and show success message', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()
        const mockOnComplete = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormPlannedOperation({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
          onComplete: mockOnComplete,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        const pendingEditRequest = waitForRequest(
          server,
          'PATCH',
          /financial\/planned_operations/,
        )

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        const editRequest = await (await pendingEditRequest).json()

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(editRequest).toEqual({
          contractorId: 476,
          dateOfPayment: '2022-10-26',
          dateOfReceiving: '2022-10-26',
          enterpriseId: 1,
          expense: {
            budgetItemId: 3,
            expensesId: 3,
            money: 1200,
            name: 'кока кола',
          },
          id: 1,
          isCash: false,
          isService: false,
          isWriteOff: true,
        })

        expect(mockOnComplete).toHaveBeenCalledTimes(1)
        expect(mockOnComplete).toHaveBeenCalledWith([
          PATHS.financialReports.pnl,
          PATHS.financialReports.cashFlow,
        ])

        expect(
          screen.getByText(SUCCESS_EDIT_PLANNED_OPERATION),
        ).toBeInTheDocument()
      })

      it('should show error message', async () => {
        server.use(
          mockPatchFinancialPlannedOperations(
            successPatchFinancialPlannedOperations,
            500,
          ),
        )

        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormPlannedOperation({
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
          screen.getByText(ERROR_MESSAGE_EDIT_PLANNED_OPERATION),
        ).toBeInTheDocument()
      })
    })
  })
})
