import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC, ReactElement } from 'react'

import { AppStore, setupStore } from '@store/rootConfig'

import { Providers } from '../../Providers'

export type ProviderOptions = {
  store?: AppStore
}

const SetupTestProviders: (
  providerOptions: ProviderOptions,
) => FC<{ children: React.ReactNode }> =
  ({ store }) =>
  ({ children }) => {
    return <Providers store={store ?? setupStore()}>{children}</Providers>
  }

type CustomRenderOptions = ProviderOptions & Omit<RenderOptions, 'wrapper'>
type CustomRenderHookOptions<TProps> = ProviderOptions &
  Omit<RenderHookOptions<TProps>, 'wrapper'>

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { store, ...restOptions } = options || {}
  const user = userEvent.setup({ delay: null })

  const wrapper = SetupTestProviders({ store })
  return { user, ...render(ui, { wrapper, ...restOptions }) }
}

const customRenderHook = <TProps, TResult>(
  cb: (props: TProps) => TResult,
  options?: CustomRenderHookOptions<TProps>,
) => {
  const { store, ...restOptions } = options || {}
  const user = userEvent.setup({ delay: null })

  const wrapper = SetupTestProviders({
    store,
  })

  return { user, ...renderHook(cb, { wrapper, ...restOptions }) }
}

export * from '@testing-library/react'
export * as userEvent from '@testing-library/user-event'
export { customRender as render, customRenderHook as renderHook }
