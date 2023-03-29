import { FieldErrors } from 'react-hook-form'

export const makeInputError = <T extends Record<string, unknown>>(
  name: keyof T,
  errors?: FieldErrors<T>,
) => ({
  error: !!errors?.[name]?.message,
  helperText: errors?.[name]?.message
    ? (errors?.[name]?.message as string)
    : '',
})
