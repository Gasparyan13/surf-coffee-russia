import { ServerError } from '../types/Errors'
import { Nullable } from '../types/Nullable'

// TODO исправить парсинг ошибок в RTQ,
export const getServerErrorStatus = (error: ServerError): Nullable<number> => {
  if ('originalStatus' in error) {
    return error.originalStatus
  }
  if ('status' in error && typeof error.status === 'number') {
    return error.status
  }

  return null
}
