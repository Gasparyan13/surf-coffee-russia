import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { PUBLIC_PATHS } from '@common/constants'

import { AddAdminPage } from '@pages/AddAdminPage'
import { AuthPage } from '@pages/AuthPage'
import CreatePassword from '@pages/CreatePassword/CreatePassword'

import { PrivateRoute } from '../PrivateRoute'
import { Storybook } from '../Storybook'
import * as Styled from './RoutesSwitcher.styled'

export const RoutesSwitcher: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <Styled.Root>
            <AuthPage />
          </Styled.Root>
        }
        path={PUBLIC_PATHS.auth}
      />
      <Route
        element={
          <Styled.Root>
            <AddAdminPage />
          </Styled.Root>
        }
        path={PUBLIC_PATHS.addAdmin}
      />
      <Route
        element={
          <Styled.Root>
            <CreatePassword />
          </Styled.Root>
        }
        path={PUBLIC_PATHS.createPassword}
      />
      <Route element={<Storybook />} path="/storybook/*" />
      <Route element={<PrivateRoute />} path="*" />
    </Routes>
  )
}
