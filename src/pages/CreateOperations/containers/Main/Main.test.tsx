import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { MockFormComponentProps } from '@pages/CreateOperations/mocks/FormComponentMock'
import { setOperationDrawerState } from '@pages/CreateOperations/redux/createOperation/slice'

import { setupStore } from '@store/rootConfig'

import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer } from '@testEnv/server'
import { mockGetFinancialOperationsGeneralView } from '@testEnv/server/handlers/financial'
import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { Main } from './Main'

jest.mock('@pages/CreateOperations/constants/forms', () => ({
  CREATE_OPERATION_FORMS: {
    WAYBILL: MockFormComponentProps,
  },
}))

jest.mock('@hooks', () => ({
  useLocationQuery: () => ({
    get: () => '30-11-2022',
  }),
}))

const createServer = () => setupServer(mockGetFinancialOperationsGeneralView())

describe('<Main />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  beforeEach(() => {
    appStore = setupStore({
      app: appConfig({}),
    })
  })

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  const renderMain = () =>
    render(<Main />, {
      store: appStore,
    })

  it('should update operations table ', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)
    window.history.pushState({}, 'Test', PATHS.operations)

    appStore.dispatch(
      setOperationDrawerState({
        type: EOperationsType.Waybill,
        title: 'test',
      }),
    )

    renderMain()

    const button = screen.getByText('update table')
    fireEvent.click(button)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
  })
})
