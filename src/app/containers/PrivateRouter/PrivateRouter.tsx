import React from 'react'

import { useGetAuthState } from '@common/hooks'

import { Router } from '../Router'

export const PrivateRouter: React.FC = () => {
  // TODO this hook does not work, try to test and decide what to do with it
  // useUpdateToken()
  useGetAuthState()

  return <Router />
}
