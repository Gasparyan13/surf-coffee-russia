import React from 'react'

import { StaffLayout } from '@pages/StaffPage/components'

import { setupStore } from '@store/rootConfig'

import { successGetEnterpriseWorkers } from '@testEnv/mocks/api/enterprise'
import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer } from '@testEnv/server'
import { mockApiGetEnterpriseWorkers } from '@testEnv/server/handlers/enterprise'
import { render, screen, waitFor } from '@testEnv/utils'

const createServer = () =>
  setupServer(mockApiGetEnterpriseWorkers(successGetEnterpriseWorkers, 200))

describe('<StaffLayout />', () => {
  let appStore = setupStore({
    app: appConfig({}),
  })

  const renderStaffLayout = () => render(<StaffLayout />, { store: appStore })
  const server = createServer()

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    server.events.removeAllListeners('request:end')
  })

  beforeEach(() => {
    appStore = setupStore({ app: appConfig({}) })
  })

  describe('when render "loader" ', () => {
    it('should render "loader" when data is loaded', async () => {
      renderStaffLayout()

      await waitFor(() => {
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
      })
    })

    it('should not rendered "loader" on successful request', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderStaffLayout()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
      })
    })
  })
})
