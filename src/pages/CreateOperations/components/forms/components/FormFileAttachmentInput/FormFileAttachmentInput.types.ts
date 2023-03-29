import {
  FieldPath,
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form'

import { Nullable } from '../../../../../../common/types/Nullable'

export type Props<T extends FieldValues> = {
  name: FieldPath<T>
  labelText?: string
  value: Nullable<File>
  onChange: (value: Nullable<File>) => void
  hasError?: boolean
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  setAttachmentError?: UseFormSetError<T>
  clearErrors?: UseFormClearErrors<T>
  testId?: string
  canViewFile?: boolean
  onViewFile?: () => void
}
