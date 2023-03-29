import React from 'react'
import { Helmet } from 'react-helmet-async'

import { APP_NAME } from '@constants'

import { Route } from '../routes'

export const AppRoute: React.FC<Pick<Route, 'caption' | 'component'>> = ({
  caption,
  component: Component,
}) => {
  return (
    <>
      <Component />
      <Helmet defer={false}>
        <title>
          {APP_NAME} {`- ${caption}` || ''}
        </title>
        <meta content={caption || ''} name={caption || ''} />
      </Helmet>
    </>
  )
}
