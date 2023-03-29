import React, { Suspense, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '@app/containers/AppLayout'
import { AppLoader } from '@app/containers/AppLoader'

import { NotFound } from '@pages/NotFound'

import { getUserScopes } from '@store/deprecated/modules/app/selectors'

import { AppRoute } from './components/AppRoute'
import { routes } from './routes'

export const Router: React.FC = () => {
  const userScopes = useSelector(getUserScopes)

  const filteredRoutes = useMemo(
    () =>
      routes?.filter((item) =>
        item?.scopes?.some((scope) => userScopes?.includes(scope)),
      ),
    [userScopes],
  )

  const renderRoutes = useMemo(() => {
    if (filteredRoutes?.length === 0) return <AppLoader />

    return (
      <Routes>
        <Route element={<NotFound />} path="*" />
        {filteredRoutes.map(({ to, caption, component, children }) => (
          <Route
            key={to}
            element={<AppRoute caption={caption} component={component} />}
            path={to}>
            {children?.map(({ to: innerTo, component: innerComponent }) => (
              <Route key={innerTo} element={innerComponent} path={innerTo} />
            ))}
          </Route>
        ))}
      </Routes>
    )
  }, [filteredRoutes])

  return (
    <AppLayout>
      <Suspense fallback={<AppLoader />}>{renderRoutes}</Suspense>
    </AppLayout>
  )
}
