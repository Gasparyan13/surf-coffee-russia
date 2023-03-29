import React from 'react'

import { setupStore } from '@store/rootConfig'

import { appConfig } from '@testEnv/mocks/store/app'
import { financialReportConfig } from '@testEnv/mocks/store/financialReport'
import { render, waitFor } from '@testEnv/utils'

import { AppLayout } from './AppLayout'

const CONTENT_TEXT = 'test content'
const MOCK_CREATE_OPERATIONS = 'CreateOperations'
const MOCK_SIDEBAR = 'Sidebar'

jest.mock('../../../pages/CreateOperations/containers/Main', () => ({
  Main: () => <div>{MOCK_CREATE_OPERATIONS}</div>,
}))
jest.mock('../Sidebar', () => ({
  Sidebar: () => <div>{MOCK_SIDEBAR}</div>,
}))

describe('<AppLayout />', () => {
  let appStore = setupStore({
    app: appConfig({}),
    financialReport: financialReportConfig({}),
  })

  const renderAppLayout = () =>
    render(
      <AppLayout>
        <div>{CONTENT_TEXT}</div>
      </AppLayout>,
      { store: appStore },
    )

  beforeEach(() => {
    appStore = setupStore({ app: appConfig({}) })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should not render "CreateOperations"', async () => {
    appStore = setupStore({})
    const { queryByText } = renderAppLayout()

    await waitFor(() =>
      expect(queryByText(MOCK_CREATE_OPERATIONS)).not.toBeInTheDocument(),
    )
  })

  it('should render "CreateOperations"', async () => {
    const { getByText } = renderAppLayout()

    expect(getByText(MOCK_CREATE_OPERATIONS)).toBeInTheDocument()
  })
})
