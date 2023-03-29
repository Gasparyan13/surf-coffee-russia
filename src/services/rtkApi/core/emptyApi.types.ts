import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'

export type BaseQueryWithReAuth = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>

export type QueryReturnType = QueryReturnValue<
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
>
