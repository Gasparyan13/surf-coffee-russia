/* eslint-disable max-lines */
import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { MONTH_YEAR_FORMAT, PATHS, YEAR_MONTH_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import { EMPTY_RESULTS_PLACEHOLDER } from '@uiKit/components/Autocomplete/constants/placeholder'
import { TEST_ID_FILE_UPLOAD_WRAPPER } from '@uiKit/wrappers/FileUploaderWrapper/constants/testIds'

import {
  ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
  ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
  ERROR_MESSAGE_EMPTY_SUM_FIELD,
  SERVER_ERROR_FILE_WRONG,
} from '@pages/CreateOperations/constants/messages/error'
import { MockFormArticleSelectProps } from '@pages/CreateOperations/mocks/FormArticlesSelectMock'
import { MockFormContractorInput } from '@pages/CreateOperations/mocks/FormContractorInputMock'

import { setupStore } from '@store/rootConfig'

import {
  error400AddWaybillOperation,
  errorAddWaybillOperation,
  errorPostFinancialDocumentWaybill,
  successAddWaybill,
  successGetFinancialOperationsByOperationId,
  successGetFinancialOperationsByOperationIdIsCapitalAssets,
  successPostFinancialDocumentWaybill,
} from '@testEnv/mocks/api/financial'
import { mockUseScrollToError } from '@testEnv/mocks/hooks/useScrollToError'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialOperationsByOperationId,
  mockGetFinancialUsedCapitalAssets,
  mockHeadUsedCapitalAssetsApiResponse,
  mockPostFinancialDocument,
  mockPostFinancialDocumentByType,
  mockPostWaybillApiResponse,
  mockPutWaybillApiResponse,
} from '@testEnv/server/handlers/financial'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import {
  ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
  ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD,
} from '../../../constants/messages/error'
import { RefType } from '../../../containers/Main/Main.types'
import { FIXED_ASSETS } from '../components/FormExpenseItem/constants/constants'
import { ERROR_MESSAGE_UNIQUE_NAME } from '../components/FormExpenseItem/constants/error'
import { FormWaybill } from './FormWaybill'
import * as T from './FormWaybill.types'
import {
  ERROR_MESSAGE_ADD_WAYBILL,
  ERROR_MESSAGE_EDIT_WAYBILL,
  ERROR_MESSAGE_EMPTY_COMMISSIONING,
  ERROR_MESSAGE_EMPTY_PERIOD_OF_USE,
  ERROR_MESSAGE_EMPTY_WAYBILL_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_WAYBILL_NUMBER_FIELD,
  ERROR_MESSAGE_FROM_12_TO_36,
} from './constants/messages/errors'
import {
  SUCCESS_ADD_WAYBILL,
  SUCCESS_EDIT_WAYBILL,
} from './constants/messages/sucess'
import { TEST_ID_WAYBILL_NUMBER } from './constants/testIds'

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
const currentDateYearMonthFormat = DateHelper.toLocaleFormat(
  today,
  MONTH_YEAR_FORMAT,
)
const currentDateToServerYearMonthFormat = DateHelper.toFormat(
  today,
  YEAR_MONTH_FORMAT,
)
const currentDateToServer = DateHelper.toServerDateFormat(today)

const createServer = () =>
  setupServer(
    mockHeadUsedCapitalAssetsApiResponse(200),
    mockGetFinancialUsedCapitalAssets(),
    mockPostWaybillApiResponse(successAddWaybill, 200),
    mockPostFinancialDocument(successPostFinancialDocumentWaybill, 200),
    mockPostFinancialDocumentByType(
      successPostFinancialDocumentWaybill.fileName!,
    ),
    mockGetFinancialOperationsByOperationId(
      successGetFinancialOperationsByOperationIdIsCapitalAssets,
    ),
    mockPutWaybillApiResponse(successAddWaybill, 200),
  )

describe('<FormWaybill />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  let mockSubmit: () => Promise<void>

  const ref = (props: RefType) => {
    if (!props) return
    mockSubmit = props.onSubmit
  }

  const renderFormWaybill = ({
    onComplete = () => {},
    onDisabled = () => {},
    editOperationId,
  }: Partial<T.Props>) =>
    render(
      <FormWaybill
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
      renderFormWaybill({})

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

      expect(screen.getByText('Наименование товара')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText(/Например, ящик колы/i),
      ).toBeInTheDocument()

      expect(screen.getByText('Контрагент')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Например, Васильев'),
      ).toBeInTheDocument()

      expect(screen.getByText('Номер накладной')).toBeInTheDocument()

      expect(screen.getByText('Дата накладной')).toBeInTheDocument()
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
          renderFormWaybill({})

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
          renderFormWaybill({})

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
          renderFormWaybill({})

          expect(screen.queryByText('Себестоимость')).not.toBeInTheDocument()
        })
      })
    })

    describe('when user change WayBill type', () => {
      it('should clear name field, when change to sell', async () => {
        renderFormWaybill({})

        const sellTab = screen.getByRole('tab', { name: 'Продажа' })
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')

        fireEvent.change(serviceName, { target: { value: 'Test value' } })
        fireEvent.click(sellTab)

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: false }),
        ).toBeInTheDocument()
        expect(
          screen.getByRole('tab', { name: 'Продажа', selected: true }),
        ).toBeInTheDocument()
        expect(serviceName).toHaveValue('')
      })

      it(`shouldn't clear name field, when change to buy`, async () => {
        renderFormWaybill({})

        const buyTab = screen.getByRole('tab', { name: 'Покупка' })
        const sellTab = screen.getByRole('tab', { name: 'Продажа' })
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')

        fireEvent.click(sellTab)

        fireEvent.change(serviceName, { target: { value: 'Test value' } })
        fireEvent.click(buyTab)

        expect(
          screen.getByRole('tab', { name: 'Покупка', selected: true }),
        ).toBeInTheDocument()
        expect(
          screen.getByRole('tab', { name: 'Продажа', selected: false }),
        ).toBeInTheDocument()
        expect(serviceName).toHaveValue('')
      })

      it('should change FormArticleSelect isPurchase prop when user changes form type', async () => {
        renderFormWaybill({})

        const buyTab = screen.getByRole('tab', { name: 'Покупка' })
        const sellTab = screen.getByRole('tab', { name: 'Продажа' })
        const article = screen.getByPlaceholderText('Например, Продукты')

        expect(article).toHaveAttribute(
          'data-operation-type',
          EOperationsType.Waybill,
        )
        expect(article).toHaveAttribute('data-is-purchase', 'true')
        fireEvent.click(sellTab)
        expect(article).toHaveAttribute('data-is-purchase', 'false')
        fireEvent.click(buyTab)
        expect(article).toHaveAttribute('data-is-purchase', 'true')
      })

      it('should clear selected article, if has been selected previously', async () => {
        const onCompleteMock = jest.fn()

        renderFormWaybill({ onComplete: onCompleteMock })

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

    describe('when article contain "Основное средство"', () => {
      describe('when selected "Покупка"', () => {
        it('should render additional fields', async () => {
          renderFormWaybill({})

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          expect(screen.getByText('Ввод в эксплуатацию')).toBeInTheDocument()
          expect(
            screen.getByPlaceholderText(currentDateYearMonthFormat),
          ).toBeInTheDocument()
          expect(
            screen.getByText('Срок полезного использования'),
          ).toBeInTheDocument()
          expect(
            screen.getByPlaceholderText('Например, кофемашина'),
          ).toBeInTheDocument()
          expect(
            screen.queryByPlaceholderText('Например, ящик колы'),
          ).not.toBeInTheDocument()
          expect(
            screen.getByText('Уникальное наименование товара'),
          ).toBeInTheDocument()
          expect(
            screen.queryByText('Наименование товара'),
          ).not.toBeInTheDocument()
          expect(
            screen.getByPlaceholderText('от 12 месяцев'),
          ).toBeInTheDocument()
        })

        it('should NOT render additional fields', async () => {
          renderFormWaybill({})

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, {
            target: { value: '41' },
          })

          expect(
            screen.queryByText('Ввод в эксплуатацию'),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByPlaceholderText(currentDateYearMonthFormat),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByText('Срок полезного использования'),
          ).not.toBeInTheDocument()
          expect(
            screen.getByPlaceholderText('Например, ящик колы'),
          ).toBeInTheDocument()
          expect(
            screen.queryByPlaceholderText('Например, кофемашина'),
          ).not.toBeInTheDocument()
          expect(screen.getByText('Наименование товара')).toBeInTheDocument()
          expect(
            screen.queryByText('Уникальное наименование товара'),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByPlaceholderText('от 12 месяцев'),
          ).not.toBeInTheDocument()
        })

        it(`should show error when change article to "Основное средство" and name isn't unique`, async () => {
          const requestSpy = jest.fn()
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          server.events.on('request:end', requestSpy)

          const article = screen.getByPlaceholderText('Например, Продукты')
          const name = screen.getByPlaceholderText('Например, ящик колы')

          fireEvent.change(article, {
            target: { value: String(FIXED_ASSETS) },
          })
          fireEvent.change(name, { target: { value: 'Not unique value' } })
          fireEvent.focusOut(name)

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          expect(
            screen.getAllByText(ERROR_MESSAGE_UNIQUE_NAME)[0],
          ).toBeInTheDocument()
        })

        it(`should NOT show error when change article to "Основное средство" and name is unique`, async () => {
          server.use(mockHeadUsedCapitalAssetsApiResponse(404))

          const requestSpy = jest.fn()
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          server.events.on('request:end', requestSpy)

          const article = screen.getByPlaceholderText('Например, Продукты')
          const name = screen.getByPlaceholderText('Например, ящик колы')

          fireEvent.change(article, {
            target: { value: String(FIXED_ASSETS) },
          })

          fireEvent.change(name, { target: { value: 'Not unique value' } })
          fireEvent.focusOut(name)

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          expect(
            screen.queryByText(ERROR_MESSAGE_UNIQUE_NAME),
          ).not.toBeInTheDocument()
        })

        it('should validate uniqueNameField to be unique if server status 404', async () => {
          server.use(mockHeadUsedCapitalAssetsApiResponse(404))

          const requestSpy = jest.fn()
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          server.events.on('request:end', requestSpy)

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const uniqueNameField = screen.getByPlaceholderText(
            'Например, кофемашина',
          )

          fireEvent.change(uniqueNameField, {
            target: { value: 'Уникальное название' },
          })
          fireEvent.focusOut(uniqueNameField)

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          expect(
            screen.queryByText(ERROR_MESSAGE_UNIQUE_NAME),
          ).not.toBeInTheDocument()
        })

        it('should validate uniqueNameField to be NOT unique if server status 200', async () => {
          const requestSpy = jest.fn()
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const uniqueNameField = screen.getByPlaceholderText(
            'Например, кофемашина',
          )

          fireEvent.change(uniqueNameField, {
            target: { value: 'Уникальное название' },
          })

          server.events.on('request:end', requestSpy)

          fireEvent.focusOut(uniqueNameField)

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          await screen.findByText(ERROR_MESSAGE_UNIQUE_NAME)
        })

        it('should NOT send validation request if input is in focus', async () => {
          const requestSpy = jest.fn()
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          server.events.on('request:end', requestSpy)

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const uniqueNameField = screen.getByPlaceholderText(
            'Например, кофемашина',
          )

          fireEvent.change(uniqueNameField, {
            target: { value: 'Уникальное название' },
          })

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(0))
        })

        it('should send validation request if input is NOT in focus', async () => {
          const requestSpy = jest.fn()
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const uniqueNameField = screen.getByPlaceholderText(
            'Например, кофемашина',
          )

          server.events.on('request:end', requestSpy)

          fireEvent.change(uniqueNameField, {
            target: { value: 'Уникальное название' },
          })
          fireEvent.focusOut(uniqueNameField)

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await screen.findByText(ERROR_MESSAGE_UNIQUE_NAME)
        })

        it('should NOT call onSubmit, when name is NOT unique and press Save just after input', async () => {
          const onCompleteMock = jest.fn()
          const requestSpy = jest.fn()
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({
            onComplete: onCompleteMock,
          })

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          const file = new File(
            [],
            successPostFinancialDocumentWaybill.fileName!,
            {
              type: 'application/pdf',
            },
          )

          const article = screen.getByPlaceholderText('Например, Продукты')
          const sum = screen.getByPlaceholderText('Например, 1 000')
          const serviceName = screen.getByPlaceholderText('Например, ящик колы')
          const contractor = screen.getByPlaceholderText('Например, Васильев')
          const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
          const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

          // search DatePicker nodes
          const datePicker = screen.getAllByPlaceholderText(currentDate)
          const waybillDate = datePicker[0]
          const receiveDate = datePicker[1]

          fireEvent.change(sum, { target: { value: '100' } })
          fireEvent.change(contractor, { target: { value: 'Тест' } })
          fireEvent.change(waybillNumber, { target: { value: '432423' } })
          fireEvent.change(document, { target: { files: [file] } })
          // fill DatePicker input
          fireEvent.change(waybillDate, {
            target: { value: currentDate },
          })
          fireEvent.change(receiveDate, {
            target: { value: currentDate },
          })
          // select "Основное средство" and render additional fields
          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const commissioning = screen.getByPlaceholderText(
            currentDateYearMonthFormat,
          )
          const periodOfUse = screen.getByPlaceholderText('от 12 месяцев')

          fireEvent.change(commissioning, {
            target: { value: currentDateYearMonthFormat },
          })
          fireEvent.change(periodOfUse, { target: { value: '13' } })

          await waitFor(() => {
            expect(
              screen.getByPlaceholderText('Прикрепите документ'),
            ).toHaveValue(file.name)
          })

          fireEvent.change(serviceName, { target: { value: 'test' } })

          server.events.on('request:end', requestSpy)

          await act(async () => mockSubmit())
          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          expect(
            screen.getByText(ERROR_MESSAGE_UNIQUE_NAME),
          ).toBeInTheDocument()
        })
      })

      describe('when selected "Продажа"', () => {
        it('should render additional fields', async () => {
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })
          fireEvent.click(screen.getByRole('tab', { name: 'Продажа' }))

          expect(
            screen.queryByText('Ввод в эксплуатацию'),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByPlaceholderText('от 12 месяцев'),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByPlaceholderText(currentDateYearMonthFormat),
          ).not.toBeInTheDocument()
          expect(
            screen.queryByText('Срок полезного использования'),
          ).not.toBeInTheDocument()
          expect(
            screen.getByPlaceholderText('Например, ящик колы'),
          ).toBeInTheDocument()
          expect(
            screen.queryByText('Уникальное наименование товара'),
          ).not.toBeInTheDocument()

          expect(
            screen.queryByPlaceholderText('Например, кофемашина'),
          ).not.toBeInTheDocument()
          expect(screen.getByText('Наименование товара')).toBeInTheDocument()
        })

        it('should NOT render additional fields', async () => {
          const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

          server.events.on(
            'request:end',
            requestGetFinancialUsedCapitalAssetsSpy,
          )

          renderFormWaybill({})

          await waitFor(() =>
            expect(
              requestGetFinancialUsedCapitalAssetsSpy,
            ).toHaveBeenCalledTimes(1),
          )

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, {
            target: { value: '41' },
          })
          fireEvent.click(screen.getByRole('tab', { name: 'Продажа' }))

          expect(
            screen.getByPlaceholderText('Например, ящик колы'),
          ).toBeInTheDocument()
          expect(
            screen.queryByPlaceholderText('Например, кофемашина'),
          ).not.toBeInTheDocument()
        })

        describe('when filling out the autocomplete used capital assets', () => {
          it('should render "Ничего не найдено" if empty used capital assets', async () => {
            server.use(mockGetFinancialUsedCapitalAssets([], 200))

            const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

            server.events.on(
              'request:end',
              requestGetFinancialUsedCapitalAssetsSpy,
            )

            renderFormWaybill({})

            await waitFor(() =>
              expect(
                requestGetFinancialUsedCapitalAssetsSpy,
              ).toHaveBeenCalledTimes(1),
            )

            fireEvent.click(screen.getByRole('tab', { name: 'Продажа' }))
            fireEvent.change(
              screen.getByPlaceholderText('Например, Продукты'),
              {
                target: { value: String(FIXED_ASSETS) },
              },
            )

            const autocomplete = screen.getByPlaceholderText(
              'Например, кофемашина',
            )

            fireEvent.change(autocomplete, {
              target: { value: 'о' },
            })

            expect(screen.getByText(EMPTY_RESULTS_PLACEHOLDER))
          })

          it('should exclude the selected capital assets from the other card', async () => {
            const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

            server.events.on(
              'request:end',
              requestGetFinancialUsedCapitalAssetsSpy,
            )

            renderFormWaybill({})

            await waitFor(() =>
              expect(
                requestGetFinancialUsedCapitalAssetsSpy,
              ).toHaveBeenCalledTimes(1),
            )

            fireEvent.click(screen.getByRole('tab', { name: 'Продажа' }))
            fireEvent.change(
              screen.getByPlaceholderText('Например, Продукты'),
              {
                target: { value: String(FIXED_ASSETS) },
              },
            )

            const autocomplete = screen.getByPlaceholderText(
              'Например, кофемашина',
            )
            fireEvent.change(autocomplete, {
              target: { value: 'о' },
            })

            await waitFor(() => {
              expect(screen.getAllByRole('option').length).toEqual(3)
            })

            fireEvent.click(screen.getAllByRole('option')[0])

            // add second card
            fireEvent.click(screen.getByTestId('add-extendable-list-item'))

            const articleList =
              screen.getAllByPlaceholderText('Например, Продукты')
            fireEvent.change(articleList[1], {
              target: { value: String(FIXED_ASSETS) },
            })

            const autocompleteList = screen.getAllByPlaceholderText(
              'Например, кофемашина',
            )
            fireEvent.change(autocompleteList[1], {
              target: { value: 'о' },
            })

            const secondOptions = screen.getAllByRole('option')
            expect(secondOptions.length).toEqual(2)
            expect(secondOptions[0]).toHaveTextContent('Кофемашина')
            expect(secondOptions[1]).toHaveTextContent('Холодильник')
          })

          it('should add to second options remote capital assets from first autocomplete', async () => {
            const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()

            server.events.on(
              'request:end',
              requestGetFinancialUsedCapitalAssetsSpy,
            )

            renderFormWaybill({})

            await waitFor(() =>
              expect(
                requestGetFinancialUsedCapitalAssetsSpy,
              ).toHaveBeenCalledTimes(1),
            )

            fireEvent.click(screen.getByRole('tab', { name: 'Продажа' }))
            fireEvent.change(
              screen.getByPlaceholderText('Например, Продукты'),
              {
                target: { value: String(FIXED_ASSETS) },
              },
            )

            const autocomplete = screen.getByPlaceholderText(
              'Например, кофемашина',
            )

            fireEvent.change(autocomplete, {
              target: { value: 'о' },
            })

            await waitFor(() => {
              expect(screen.getAllByRole('option').length).toBe(3)
            })

            fireEvent.click(screen.getAllByRole('option')[0])

            // add second card
            fireEvent.click(screen.getByTestId('add-extendable-list-item'))

            const articleList =
              screen.getAllByPlaceholderText('Например, Продукты')
            fireEvent.change(articleList[1], {
              target: { value: String(FIXED_ASSETS) },
            })

            const autocompleteList = screen.getAllByPlaceholderText(
              'Например, кофемашина',
            )
            fireEvent.change(autocompleteList[1], {
              target: { value: 'о' },
            })

            let secondOptions = screen.getAllByRole('option')
            expect(secondOptions.length).toBe(2)
            expect(secondOptions[0]).toHaveTextContent('Кофемашина')
            expect(secondOptions[1]).toHaveTextContent('Холодильник')

            fireEvent.change(autocompleteList[0], {
              target: { value: '' },
            })

            secondOptions = screen.getAllByRole('option')

            expect(secondOptions.length).toBe(3)
            expect(secondOptions[0]).toHaveTextContent('Водонагреватель')
            expect(secondOptions[1]).toHaveTextContent('Кофемашина')
            expect(secondOptions[2]).toHaveTextContent('Холодильник')
          })
        })
      })

      describe('when user change WayBill type', () => {
        it('should clear name field, when change to sell', async () => {
          renderFormWaybill({})

          const sellTab = screen.getByRole('tab', { name: 'Продажа' })
          const article = screen.getByPlaceholderText('Например, Продукты')

          // select "Основное средство" and render additional fields
          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          fireEvent.change(
            screen.getByPlaceholderText('Например, кофемашина'),
            { target: { value: 'Test value' } },
          )

          fireEvent.click(sellTab)

          expect(screen.getByRole('tab', { name: 'Покупка', selected: false }))
          expect(screen.getByRole('tab', { name: 'Продажа', selected: true }))
          expect(
            screen.getByPlaceholderText('Например, ящик колы'),
          ).toHaveValue('')
        })

        it(`shouldn't clear name field, when change to buy`, async () => {
          renderFormWaybill({})

          const buyTab = screen.getByRole('tab', { name: 'Покупка' })
          const sellTab = screen.getByRole('tab', { name: 'Продажа' })

          fireEvent.click(sellTab)

          const article = screen.getByPlaceholderText('Например, Продукты')
          // select "Основное средство" and render additional fields
          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          fireEvent.change(
            screen.getByPlaceholderText('Например, кофемашина'),
            { target: { value: 'Test value' } },
          )

          fireEvent.click(buyTab)

          expect(screen.getByRole('tab', { name: 'Покупка', selected: true }))
          expect(screen.getByRole('tab', { name: 'Продажа', selected: false }))
          expect(
            screen.getByPlaceholderText('Например, ящик колы'),
          ).toHaveValue('')
        })
      })
    })
  })

  describe('when the form is filled', () => {
    describe('when render success message', () => {
      it('should call onSubmit if all form fields are filled', async () => {
        const requestSpy = jest.fn()
        const onCompleteMock = jest.fn()

        renderFormWaybill({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentWaybill.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const waybillDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(waybillNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(waybillDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(waybillDate).toHaveValue(currentDate)
        expect(receiveDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')
        expect(waybillNumber).toHaveValue('432423')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        const pendingCreateFinancialWaybillsRequest = waitForRequest(
          server,
          'POST',
          /financial\/waybills/,
        )

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        const createFinancialWaybillsRequest = await (
          await pendingCreateFinancialWaybillsRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(createFinancialWaybillsRequest).toEqual({
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
            documentType: 'WAYBILL',
            fileName: 'test',
          },
          contractorId: '528',
          waybillDate: currentDateToServer,
          deliveryDate: currentDateToServer,
          waybillNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)
        expect(onCompleteMock).toHaveBeenCalledWith(PATHS.financialReports.pnl)

        expect(screen.getByText(SUCCESS_ADD_WAYBILL)).toBeInTheDocument()
      })

      it('should call onSubmit if all form fields are filled & when isPurchase is "sale"', async () => {
        const requestSpy = jest.fn()
        const onCompleteMock = jest.fn()

        renderFormWaybill({
          onComplete: onCompleteMock,
        })

        const sellTab = screen.getByRole('tab', { name: 'Продажа' })
        fireEvent.click(sellTab)

        const file = new File(
          [],
          successPostFinancialDocumentWaybill.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const [sum, primeCost] =
          screen.getAllByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const waybillDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(primeCost, { target: { value: '199' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(waybillNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(waybillDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(primeCost).toHaveValue('199')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(waybillDate).toHaveValue(currentDate)
        expect(receiveDate).toHaveValue(currentDate)
        expect(contractor).toHaveValue('Тест')
        expect(waybillNumber).toHaveValue('432423')

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(file.name)
        })

        const pendingCreateFinancialWaybillsRequest = waitForRequest(
          server,
          'POST',
          /financial\/waybills/,
        )

        server.events.on('request:end', requestSpy)

        await act(async () => mockSubmit())

        const createFinancialWaybillsRequest = await (
          await pendingCreateFinancialWaybillsRequest
        ).json()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(3))

        expect(createFinancialWaybillsRequest).toEqual({
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
            documentType: 'WAYBILL',
            fileName: 'test',
          },
          contractorId: '528',
          waybillDate: currentDateToServer,
          deliveryDate: currentDateToServer,
          waybillNumber: '432423',
        })

        expect(onCompleteMock).toHaveBeenCalledTimes(1)
        expect(onCompleteMock).toHaveBeenCalledWith(PATHS.financialReports.pnl)

        expect(screen.getByText(SUCCESS_ADD_WAYBILL)).toBeInTheDocument()
      })

      describe('when article contain "Основное средство"', () => {
        describe('when selected "Покупка"', () => {
          it('should call onSubmit if all form fields are filled', async () => {
            server.use(mockHeadUsedCapitalAssetsApiResponse(404))

            const requestGetFinancialUsedCapitalAssetsSpy = jest.fn()
            const onCompleteMock = jest.fn()
            const requestSpy = jest.fn()

            server.events.on(
              'request:end',
              requestGetFinancialUsedCapitalAssetsSpy,
            )

            renderFormWaybill({
              onComplete: onCompleteMock,
            })

            await waitFor(() =>
              expect(
                requestGetFinancialUsedCapitalAssetsSpy,
              ).toHaveBeenCalledTimes(1),
            )

            const file = new File(
              [],
              successPostFinancialDocumentWaybill.fileName!,
              {
                type: 'application/pdf',
              },
            )

            const article = screen.getByPlaceholderText('Например, Продукты')
            // select "Основное средство" and render additional fields
            fireEvent.change(article, {
              target: { value: String(FIXED_ASSETS) },
            })

            const sum = screen.getByPlaceholderText('Например, 1 000')
            const serviceName = screen.getByPlaceholderText(
              'Например, кофемашина',
            )
            const contractor = screen.getByPlaceholderText('Например, Васильев')
            const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
            const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)
            const commissioning = screen.getByPlaceholderText(
              currentDateYearMonthFormat,
            )
            const periodOfUse = screen.getByPlaceholderText('от 12 месяцев')
            const datePicker = screen.getAllByPlaceholderText(currentDate)
            const waybillDate = datePicker[0]
            const receiveDate = datePicker[1]

            server.events.on('request:end', requestSpy)

            fireEvent.change(sum, { target: { value: '100' } })
            fireEvent.change(serviceName, { target: { value: 'test' } })
            fireEvent.focusOut(serviceName)
            fireEvent.change(contractor, { target: { value: 'Тест' } })
            fireEvent.change(waybillNumber, { target: { value: '432423' } })
            fireEvent.change(document, { target: { files: [file] } })
            fireEvent.change(waybillDate, {
              target: { value: currentDate },
            })
            fireEvent.change(receiveDate, {
              target: { value: currentDate },
            })
            fireEvent.change(commissioning, {
              target: { value: currentDateYearMonthFormat },
            })
            fireEvent.change(periodOfUse, { target: { value: '13' } })

            expect(sum).toHaveValue('100')
            expect(serviceName).toHaveValue('test')
            expect(article).toHaveValue(String(FIXED_ASSETS))
            expect(waybillDate).toHaveValue(currentDate)
            expect(receiveDate).toHaveValue(currentDate)
            expect(contractor).toHaveValue('Тест')
            expect(waybillNumber).toHaveValue('432423')

            await waitFor(() => {
              expect(
                screen.getByPlaceholderText('Прикрепите документ'),
              ).toHaveValue(file.name)
            })

            const pendingCreateFinancialWaybillsRequest = waitForRequest(
              server,
              'POST',
              /financial\/waybills/,
            )

            await act(async () => mockSubmit())

            const createFinancialWaybillsRequest = await (
              await pendingCreateFinancialWaybillsRequest
            ).json()

            await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(5))

            expect(createFinancialWaybillsRequest).toEqual({
              enterpriseId: 1,
              isPurchase: true,
              expenses: [
                {
                  budgetItemId: FIXED_ASSETS,
                  amount: 100,
                  name: 'test',
                  usageStartDate: currentDateToServerYearMonthFormat,
                  usagePeriod: '13',
                  isCapitalAssets: true,
                },
              ],
              document: {
                documentId: 1,
                documentType: 'WAYBILL',
                fileName: 'test',
              },
              contractorId: '528',
              waybillDate: currentDateToServer,
              deliveryDate: currentDateToServer,
              waybillNumber: '432423',
            })

            expect(onCompleteMock).toHaveBeenCalledTimes(1)
            expect(onCompleteMock).toHaveBeenCalledWith(
              PATHS.financialReports.pnl,
            )

            expect(screen.getByText(SUCCESS_ADD_WAYBILL)).toBeInTheDocument()
          })
        })

        describe('when selected "Продажа"', () => {
          it('should call onSubmit if all form fields are filled', async () => {
            const onCompleteMock = jest.fn()
            const requestSpy = jest.fn()
            server.events.on('request:end', requestSpy)

            renderFormWaybill({
              onComplete: onCompleteMock,
            })

            await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

            const file = new File(
              [],
              successPostFinancialDocumentWaybill.fileName!,
              {
                type: 'application/pdf',
              },
            )

            fireEvent.click(screen.getByRole('tab', { name: 'Продажа' }))

            const article = screen.getByPlaceholderText('Например, Продукты')
            // select "Основное средство" and render additional fields
            fireEvent.change(article, {
              target: { value: String(FIXED_ASSETS) },
            })

            const sum = screen.getByPlaceholderText('Например, 1 000')
            const serviceName = screen.getByPlaceholderText(
              'Например, кофемашина',
            )
            const contractor = screen.getByPlaceholderText('Например, Васильев')
            const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
            const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)
            const datePicker = screen.getAllByPlaceholderText(currentDate)
            const waybillDate = datePicker[0]
            const receiveDate = datePicker[1]

            fireEvent.change(sum, { target: { value: '100' } })
            fireEvent.change(contractor, { target: { value: 'Тест' } })
            fireEvent.change(waybillNumber, { target: { value: '432423' } })
            fireEvent.change(document, { target: { files: [file] } })
            fireEvent.change(waybillDate, {
              target: { value: currentDate },
            })
            fireEvent.change(receiveDate, {
              target: { value: currentDate },
            })
            fireEvent.change(serviceName, { target: { value: ' ' } })

            await waitFor(() => {
              expect(screen.getAllByRole('option').length).toEqual(3)
            })
            fireEvent.click(screen.getAllByRole('option')[0])

            expect(sum).toHaveValue('100')
            expect(serviceName).toHaveValue('Водонагреватель')
            expect(article).toHaveValue(String(FIXED_ASSETS))
            expect(waybillDate).toHaveValue(currentDate)
            expect(receiveDate).toHaveValue(currentDate)
            expect(contractor).toHaveValue('Тест')
            expect(waybillNumber).toHaveValue('432423')

            await waitFor(() => {
              expect(
                screen.getByPlaceholderText('Прикрепите документ'),
              ).toHaveValue(file.name)
            })

            const pendingCreateFinancialWaybillsRequest = waitForRequest(
              server,
              'POST',
              /financial\/waybills/,
            )

            await act(async () => mockSubmit())

            const createFinancialWaybillsRequest = await (
              await pendingCreateFinancialWaybillsRequest
            ).json()

            await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(4))

            expect(createFinancialWaybillsRequest).toEqual({
              enterpriseId: 1,
              isPurchase: false,
              expenses: [
                {
                  budgetItemId: FIXED_ASSETS,
                  amount: 100,
                  name: 'Водонагреватель',
                  isCapitalAssets: true,
                },
              ],
              document: {
                documentId: 1,
                documentType: 'WAYBILL',
                fileName: 'test',
              },
              contractorId: '528',
              waybillDate: currentDateToServer,
              deliveryDate: currentDateToServer,
              waybillNumber: '432423',
            })

            expect(onCompleteMock).toHaveBeenCalledTimes(1)
            expect(onCompleteMock).toHaveBeenCalledWith(
              PATHS.financialReports.pnl,
            )

            expect(screen.getByText(SUCCESS_ADD_WAYBILL)).toBeInTheDocument()
          })
        })
      })
    })

    describe('when render error message', () => {
      it('should show error message if the form was NOT submitted correctly', async () => {
        server.use(mockPostWaybillApiResponse(errorAddWaybillOperation, 500))

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        renderFormWaybill({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentWaybill.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const waybillDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(waybillNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(waybillDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(waybillDate).toHaveValue(currentDate)
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

        expect(screen.getByText(ERROR_MESSAGE_ADD_WAYBILL)).toBeInTheDocument()
      })

      it('should show error message if document not upload', async () => {
        server.use(
          mockPostFinancialDocumentByType(
            successPostFinancialDocumentWaybill.fileName!,
            errorPostFinancialDocumentWaybill,
          ),
        )

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        renderFormWaybill({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentWaybill.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const waybillDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        fireEvent.change(serviceName, { target: { value: 'test' } })
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(waybillNumber, { target: { value: '432423' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(waybillDate, {
          target: { value: currentDate },
        })
        fireEvent.change(receiveDate, {
          target: { value: currentDate },
        })

        expect(sum).toHaveValue('100')
        expect(serviceName).toHaveValue('test')
        expect(article).toHaveValue('41')
        expect(waybillDate).toHaveValue(currentDate)
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

      it('should show error message from backend if field "Наименование"/"Номер накладной" contains a spaces', async () => {
        server.use(mockPostWaybillApiResponse(error400AddWaybillOperation, 400))

        const onCompleteMock = jest.fn()
        const requestSpy = jest.fn()

        const { user } = renderFormWaybill({
          onComplete: onCompleteMock,
        })

        const file = new File(
          [],
          successPostFinancialDocumentWaybill.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')
        const contractor = screen.getByPlaceholderText('Например, Васильев')
        const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        // search DatePicker nodes
        const datePicker = screen.getAllByPlaceholderText(currentDate)
        const waybillDate = datePicker[0]
        const receiveDate = datePicker[1]

        fireEvent.change(article, { target: { value: '41' } })
        fireEvent.change(sum, { target: { value: '100' } })
        await user.type(serviceName, ' ')
        fireEvent.change(contractor, { target: { value: 'Тест' } })
        fireEvent.change(waybillNumber, { target: { value: ' ' } })
        fireEvent.change(document, { target: { files: [file] } })

        // fill DatePicker input
        fireEvent.change(waybillDate, {
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
        expect(waybillNumber).toHaveValue(' ')
        expect(
          screen.getByText(
            `${ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD}. ${ERROR_MESSAGE_EMPTY_WAYBILL_NUMBER_FIELD}`,
          ),
        ).toBeInTheDocument()
      })
    })
  })

  describe('when required fields not filled', () => {
    it('should show error message if "Статья" field is empty', async () => {
      renderFormWaybill({})

      const article = screen.getByPlaceholderText('Например, Продукты')

      await act(async () => mockSubmit())

      expect(article).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_ARTICLE_FIELD))
    })

    it('should show error message if "Сумма" field is empty', async () => {
      renderFormWaybill({})

      const sum = screen.getByPlaceholderText('Например, 1 000')

      await act(async () => mockSubmit())

      expect(sum).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_SUM_FIELD))
    })

    it('should show error message if "Наименование товара" field is empty', async () => {
      renderFormWaybill({})

      const serviceName = screen.getByPlaceholderText('Например, ящик колы')

      await act(async () => mockSubmit())

      expect(serviceName).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD))
    })

    describe('when article contain "Основное средство"', () => {
      describe('when selected "Покупка"', () => {
        it('should show error message if "Ввод в эксплуатацию" field is empty', async () => {
          renderFormWaybill({})

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const commissioning = screen.getByPlaceholderText(
            currentDateYearMonthFormat,
          )

          await act(async () => mockSubmit())

          expect(commissioning).toHaveValue('')
          expect(screen.getByText(ERROR_MESSAGE_EMPTY_COMMISSIONING))
        })

        it('should show error message if "Срок полезного использования" field is empty', async () => {
          renderFormWaybill({})

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const periodOfUse = screen.getByPlaceholderText('от 12 месяцев')

          await act(async () => mockSubmit())

          expect(periodOfUse).toHaveValue(null)
          expect(screen.getByText(ERROR_MESSAGE_EMPTY_PERIOD_OF_USE))
        })

        it('should show error message if "Срок полезного использования" field value not 12-36', async () => {
          renderFormWaybill({})

          const article = screen.getByPlaceholderText('Например, Продукты')

          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const periodOfUse = screen.getByPlaceholderText('от 12 месяцев')

          fireEvent.change(periodOfUse, { target: { value: '8' } })
          expect(periodOfUse).toHaveValue(8)

          await act(async () => mockSubmit())

          expect(screen.getByText(ERROR_MESSAGE_FROM_12_TO_36))
        })
      })

      describe('when selected "Продажа"', () => {
        it('should show error message if "Наименование товара" field is empty', async () => {
          renderFormWaybill({})

          fireEvent.click(screen.getByRole('tab', { name: 'Продажа' }))

          const article = screen.getByPlaceholderText('Например, Продукты')
          fireEvent.change(article, { target: { value: String(FIXED_ASSETS) } })

          const serviceName = screen.getByPlaceholderText(
            'Например, кофемашина',
          )

          await act(async () => mockSubmit())

          expect(serviceName).toHaveValue('')
          expect(screen.getByText(ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD))
        })
      })
    })

    it('should show error message if "Контрагент" field is empty', async () => {
      renderFormWaybill({})

      const contractor = screen.getByPlaceholderText('Например, Васильев')

      await act(async () => mockSubmit())

      expect(contractor).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD))
    })

    it('should show error message if "Номер накладной" field is empty', async () => {
      renderFormWaybill({})

      const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)

      await act(async () => mockSubmit())

      expect(waybillNumber).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_WAYBILL_NUMBER_FIELD))
    })

    it('should show error message if "Дата накладной" field is empty', async () => {
      renderFormWaybill({})

      const invoiceDate = screen.getAllByPlaceholderText(currentDate)[0]

      await act(async () => mockSubmit())

      expect(invoiceDate).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_WAYBILL_DATE_FIELD))
    })

    it('should show error message if "Дата поставки (поступления)" field is empty', async () => {
      renderFormWaybill({})

      const deliveryDate = screen.getAllByPlaceholderText(currentDate)[0]

      await act(async () => mockSubmit())

      expect(deliveryDate).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD))
    })

    it('should show error message if "Документ" field is empty', async () => {
      renderFormWaybill({})

      const document = screen.getByPlaceholderText('Прикрепите документ')

      await act(async () => mockSubmit())

      expect(document).toHaveValue('')
      expect(screen.getByText(ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD))
    })
  })

  describe('when form edit view active', () => {
    it('should fill all available form fields', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormWaybill({ editOperationId: 1, onDisabled: mockOnDisabled })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

      const article = screen.getByPlaceholderText('Например, Продукты')
      const sum = screen.getByPlaceholderText('Например, 1 000')
      const serviceName = screen.getByPlaceholderText('Например, кофемашина')
      const contractor = screen.getByPlaceholderText('Например, Васильев')
      const waybillNumber = screen.getByTestId(TEST_ID_WAYBILL_NUMBER)
      const commissioning = screen.getByPlaceholderText(
        currentDateYearMonthFormat,
      )
      const periodOfUse = screen.getByPlaceholderText('от 12 месяцев')
      const datePicker = screen.getAllByPlaceholderText(currentDate)
      const waybillDate = datePicker[0]
      const receiveDate = datePicker[1]

      expect(sum).toHaveValue('1 000')
      expect(serviceName).toHaveValue('budgetItem')
      expect(article).toHaveValue('115')
      expect(waybillDate).toHaveValue('07-10-2022')
      expect(receiveDate).toHaveValue('07-10-2022')
      expect(contractor).toHaveValue('contractor')
      expect(waybillNumber).toHaveValue('operationNumber')
      expect(periodOfUse).toHaveValue(20)
      expect(commissioning).toHaveValue('Октябрь, 2022')

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Прикрепите документ')).toHaveValue(
          successGetFinancialOperationsByOperationIdIsCapitalAssets.document!
            .fileName!,
        )
      })
    })

    it('should disable toggle "Покупка/Продажа"', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)
      const mockOnDisabled = jest.fn()

      renderFormWaybill({ editOperationId: 1, onDisabled: mockOnDisabled })

      await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

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

    describe('when user can edit expenses', () => {
      it('should disable expense card if budget item contain capital assets', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)
        const mockOnDisabled = jest.fn()

        renderFormWaybill({ editOperationId: 1, onDisabled: mockOnDisabled })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText('Например, кофемашина')
        const commissioning = screen.getByPlaceholderText(
          currentDateYearMonthFormat,
        )
        const periodOfUse = screen.getByPlaceholderText('от 12 месяцев')

        expect(sum).toHaveValue('1 000')
        expect(serviceName).toHaveValue('budgetItem')
        expect(article).toHaveValue('115')
        expect(periodOfUse).toHaveValue(20)
        expect(commissioning).toHaveValue('Октябрь, 2022')

        expect(sum).toBeDisabled()
        expect(serviceName).toBeDisabled()
        expect(article).toBeDisabled()
        expect(periodOfUse).toBeDisabled()
        expect(commissioning).toBeDisabled()
      })

      it('should NOT disable expense card if is NOT capital assets', async () => {
        server.use(
          mockGetFinancialOperationsByOperationId(
            successGetFinancialOperationsByOperationId,
          ),
        )
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)
        const mockOnDisabled = jest.fn()

        renderFormWaybill({ editOperationId: 1, onDisabled: mockOnDisabled })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const article = screen.getByPlaceholderText('Например, Продукты')
        const sum = screen.getByPlaceholderText('Например, 1 000')
        const serviceName = screen.getByPlaceholderText('Например, ящик колы')

        expect(sum).toHaveValue('1 000')
        expect(serviceName).toHaveValue('budgetItem')
        expect(article).toHaveValue('41')

        expect(sum).toBeEnabled()
        expect(serviceName).toBeEnabled()
        expect(article).toBeEnabled()
      })
    })

    describe('when upload file', () => {
      it('should NOT call upload file API if the file is NOT modified', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormWaybill({ editOperationId: 1, onDisabled: mockOnDisabled })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))
      })

      it('should call upload file API if the file is modified', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormWaybill({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(
            successGetFinancialOperationsByOperationIdIsCapitalAssets.document!
              .fileName!,
          )
        })

        const file = new File(
          [],
          successPostFinancialDocumentWaybill.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentWaybill.fileName!)
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

        const { getByText } = renderFormWaybill({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        expect(getByText('Посмотреть файл')).toBeInTheDocument()
      })

      it('should NOT show open document text if file changed', async () => {
        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        const { getByText, queryByText } = renderFormWaybill({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        expect(getByText('Посмотреть файл')).toBeInTheDocument()

        const file = new File(
          [],
          successPostFinancialDocumentWaybill.fileName!,
          {
            type: 'application/pdf',
          },
        )

        const document = screen.getByTestId(TEST_ID_FILE_UPLOAD_WRAPPER)

        fireEvent.change(document, { target: { files: [file] } })

        await waitFor(() => {
          expect(
            screen.getByPlaceholderText('Прикрепите документ'),
          ).toHaveValue(successPostFinancialDocumentWaybill.fileName!)
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

        renderFormWaybill({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
          onComplete: mockOnComplete,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const pendingEditFinancialWaybillRequest = waitForRequest(
          server,
          'PUT',
          /financial\/waybills/,
        )

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        const editFinancialWaybillRequest = await (
          await pendingEditFinancialWaybillRequest
        ).json()

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(editFinancialWaybillRequest).toEqual({
          contractorId: '1',
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
              budgetItemId: 115,
              id: 1,
              isCapitalAssets: true,
              name: 'budgetItem',
              usagePeriod: '20',
              usageStartDate: '2022-10',
            },
          ],
          id: 1,
          isPurchase: true,
          waybillDate: '2022-10-07',
          waybillNumber: 'operationNumber',
        })

        expect(mockOnComplete).toHaveBeenCalledTimes(1)
        expect(mockOnComplete).toHaveBeenCalledWith(PATHS.financialReports.pnl)

        expect(screen.getByText(SUCCESS_EDIT_WAYBILL)).toBeInTheDocument()
      })

      it('should show error message', async () => {
        server.use(mockPutWaybillApiResponse(successAddWaybill, 500))

        const requestSpy = jest.fn()
        const mockOnDisabled = jest.fn()

        server.events.on('request:end', requestSpy)

        renderFormWaybill({
          editOperationId: 1,
          onDisabled: mockOnDisabled,
        })

        await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(2))

        const requestSubmitSpy = jest.fn()
        server.events.on('request:end', requestSubmitSpy)

        await act(async () => mockSubmit())

        await waitFor(() => expect(requestSubmitSpy).toHaveBeenCalledTimes(1))

        expect(screen.getByText(ERROR_MESSAGE_EDIT_WAYBILL)).toBeInTheDocument()
      })
    })
  })
})
