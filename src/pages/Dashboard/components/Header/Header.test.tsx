import React from 'react'

import { setupStore } from '@store/rootConfig'

import { appConfig, defaultUserInfo } from '@testEnv/mocks/store/app'
import { render } from '@testEnv/utils'

import { Header } from './Header'

describe('<Header />', () => {
  let appStore = setupStore({
    app: appConfig({}),
  })

  const renderHeader = () => render(<Header />, { store: appStore })

  beforeEach(() => {
    appStore = setupStore({ app: appConfig({}) })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render correct content', async () => {
    const { getByText } = renderHeader()

    expect(
      getByText(`Здравствуйте, ${defaultUserInfo?.name}!`),
    ).toBeInTheDocument()
    expect(
      getByText('Отличный день, чтобы перевыполнить план по выручке!'),
    ).toBeInTheDocument()
  })

  test('render logout button', async () => {
    const { getByText } = renderHeader()

    expect(getByText('Выход')).toBeInTheDocument()
  })
})
