import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { logout } from '../../../common/helpers'
import { UserInfoDto } from '../modules/__generated__/api'
import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from './constants'
import * as T from './emptyApi.types'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: $BACK_DOMAIN$,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(LS_ACCESS_TOKEN)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const fetchRefreshToken = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions = {},
): Promise<T.QueryReturnType | void> => {
  const release = await mutex.acquire()

  try {
    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN)
    const refreshResult = (await baseQuery(
      {
        url: '/api/auth/refreshToken',
        method: 'POST',
        params: {
          refreshToken,
        },
      },
      api,
      {},
    )) as { data: UserInfoDto }

    const token = refreshResult?.data?.token
    const newRefreshToken = refreshResult?.data?.refreshToken

    if (token && newRefreshToken) {
      localStorage.setItem(LS_ACCESS_TOKEN, token)
      localStorage.setItem(LS_REFRESH_TOKEN, newRefreshToken)
    }

    const result = await baseQuery(args, api, extraOptions)
    return result
  } catch (err) {
    console.error(err)
    logout()
  } finally {
    release()
  }
}

const baseQueryWithReAuth: T.BaseQueryWithReAuth = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 403) {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    } else {
      const newValue = await fetchRefreshToken(args, api, extraOptions)
      if (newValue) {
        result = newValue
      }
    }
  }
  return result
}

export const emptySplitApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
})
