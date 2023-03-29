import React from 'react'

import { EMPTY_RESULTS_PLACEHOLDER } from '@uiKit/components/Autocomplete/constants/placeholder'

import { setupStore } from '@store/rootConfig'

import { successGetPrepaymentContractorWorkers } from '@testEnv/mocks/api/prepayment'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer, waitForRequest } from '@testEnv/server'
import { mockGetPrepaymentContractorsResponse } from '@testEnv/server/handlers/prepayment'
import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { ContractorAutocomplete } from './ContractorAutocomplete'
import { Props } from './ContractorAutocomplete.types'

const createServer = () =>
  setupServer(
    mockGetPrepaymentContractorsResponse(successGetPrepaymentContractorWorkers),
  )

describe('<ContractorAutocomplete />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  const renderContractorAutocomplete = ({
    isWorker = false,
    value = null,
    onChange = () => {},
  }: Partial<Props>) =>
    render(
      <ContractorAutocomplete
        isWorker={isWorker}
        value={value}
        onChange={onChange}
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

  it('should send request to contractors and get OK response if "isWorker" is "false"', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    renderContractorAutocomplete({})

    const pendingGetPrepaymentContractorsRequest = waitForRequest(
      server,
      'GET',
      /prepayment\/contractors/,
    )

    const getPrepaymentContractorRequest =
      await pendingGetPrepaymentContractorsRequest

    expect(
      getPrepaymentContractorRequest.url.searchParams.get('isWorker'),
    ).toBe('false')

    expect(
      getPrepaymentContractorRequest.url.searchParams.get('enterpriseId'),
    ).toBe('1')

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
  })

  it('should send request to contractors and get OK response if "isWorker" is "true"', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    renderContractorAutocomplete({ isWorker: true })

    const pendingGetPrepaymentContractorsRequest = waitForRequest(
      server,
      'GET',
      /prepayment\/contractors/,
    )

    const getPrepaymentContractorRequest =
      await pendingGetPrepaymentContractorsRequest

    expect(
      getPrepaymentContractorRequest.url.searchParams.get('isWorker'),
    ).toBe('true')

    expect(
      getPrepaymentContractorRequest.url.searchParams.get('enterpriseId'),
    ).toBe('1')

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
  })

  it('should send request to contractors and get FAIL response', async () => {
    server.use(mockGetPrepaymentContractorsResponse([], 500))

    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    renderContractorAutocomplete({})

    const pendingGetPrepaymentContractorsRequest = waitForRequest(
      server,
      'GET',
      /prepayment\/contractors/,
    )

    const getPrepaymentContractorRequest =
      await pendingGetPrepaymentContractorsRequest

    expect(
      getPrepaymentContractorRequest.url.searchParams.get('isWorker'),
    ).toBe('false')

    expect(
      getPrepaymentContractorRequest.url.searchParams.get('enterpriseId'),
    ).toBe('1')

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    const autocomplete = screen.getByRole('combobox')

    fireEvent.change(autocomplete, {
      target: { value: 'а' },
    })

    expect(screen.getByText(EMPTY_RESULTS_PLACEHOLDER)).toBeInTheDocument()
  })

  it('should render contractors autocomplete', () => {
    renderContractorAutocomplete({})

    const autocomplete = screen.getByRole('combobox')

    expect(autocomplete).toBeInTheDocument()
  })

  it('should render options if click contractors autocomplete', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    renderContractorAutocomplete({})

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    const autocomplete = screen.getByRole('combobox')

    fireEvent.change(autocomplete, {
      target: { value: 'а' },
    })

    await waitFor(() => {
      expect(screen.getAllByRole('option').length).toBe(2)
    })

    const options = screen.getAllByRole('option')

    expect(options[0]).toHaveTextContent('Господин Управляющий')
    expect(options[1]).toHaveTextContent('Вадим Галыгин')
  })

  it('should call "onChange" when select option', async () => {
    const mockOnChange = jest.fn()
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    renderContractorAutocomplete({ onChange: mockOnChange })

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    const autocomplete = screen.getByRole('combobox')

    fireEvent.change(autocomplete, {
      target: { value: 'а' },
    })

    const options = screen.getAllByRole('option')

    await waitFor(() => {
      expect(options.length).toBe(2)
    })

    fireEvent.click(options[1])

    expect(mockOnChange).toHaveBeenCalledWith(
      successGetPrepaymentContractorWorkers[1],
    )
  })
})
