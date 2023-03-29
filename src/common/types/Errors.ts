import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export type ServerError = Error | FetchBaseQueryError | SerializedError
