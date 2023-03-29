import React from 'react'
import { FieldErrorsImpl, FieldError, useForm } from 'react-hook-form'

import { setupStore } from '@store/rootConfig'

import { successGetPrepaymentContractorWorkers } from '@testEnv/mocks/api/prepayment'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer } from '@testEnv/server'
import { mockGetPrepaymentContractorsResponse } from '@testEnv/server/handlers/prepayment'
import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { FormContractorWorkerAutocomplete } from './FormContractorWorkerAutocomplete'

type Errors = FieldErrorsImpl<Record<string, FieldError | undefined>>

const errorMock = {
  contractor: {
    message: 'Не указан контрагент',
    ref: { name: 'contractor' },
    type: 'typeError',
  },
}

const createServer = () =>
  setupServer(
    mockGetPrepaymentContractorsResponse(successGetPrepaymentContractorWorkers),
  )

const Component = ({ errors = {} }: { errors: Errors }) => {
  const { control } = useForm<{
    contractor: string
  }>()

  return (
    <FormContractorWorkerAutocomplete
      control={control}
      errors={errors}
      name="contractor"
    />
  )
}

describe('<FormContractorWorkerAutocomplete />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  const renderFormContractorWorkerAutocomplete = ({
    errors = {},
  }: {
    errors?: Errors
  }) =>
    render(<Component errors={errors} />, {
      store: appStore,
    })

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

  it('should render contractors autocomplete', () => {
    renderFormContractorWorkerAutocomplete({})

    const autocomplete = screen.getByRole('combobox')

    expect(autocomplete).toBeInTheDocument()
    expect(autocomplete).toHaveAttribute('placeholder', 'Например, Васильев')
    expect(screen.getByText('Контрагент')).toBeInTheDocument()
  })

  it('should select option', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    renderFormContractorWorkerAutocomplete({})

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

    expect(autocomplete).toHaveValue('Вадим Галыгин')
  })

  it('should render error', async () => {
    renderFormContractorWorkerAutocomplete({ errors: errorMock })

    expect(screen.getByText('Не указан контрагент')).toBeInTheDocument()
  })
})
