import React from 'react'
import { Navigate, RouteProps } from 'react-router'

import { PUBLIC_PATHS } from '@constants'

import { useRedirect } from '@hooks'

import { PrivateRouter } from '../PrivateRouter'

export const PrivateRoute: React.FC<RouteProps> = () => {
  const shouldRedirect = useRedirect()

  if (shouldRedirect)
    return (
      <Navigate
        to={{
          pathname: PUBLIC_PATHS.auth,
        }}
      />
    )

  return <PrivateRouter />
}
