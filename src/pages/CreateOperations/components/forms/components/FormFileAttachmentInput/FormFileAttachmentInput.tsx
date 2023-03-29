import React from 'react'
import { FieldValues } from 'react-hook-form'

import { FileAttachmentField } from '@uiKit'

import { ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD } from '../../../../constants/messages/error'
import * as Styled from './FormFileAttachmentInput.styled'
import * as T from './FormFileAttachmentInput.types'

export const FormFileAttachmentInput: <C extends FieldValues>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({
  name,
  value,
  onChange,
  hasError,
  labelText = 'Документ',
  placeholder = 'Прикрепите документ',
  errorMessage = ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD,
  disabled = false,
  setAttachmentError = () => {},
  clearErrors = () => {},
  testId,
  canViewFile,
  onViewFile,
}) => {
  const handleCatchAttachmentError = (error: boolean) => {
    if (error) {
      setAttachmentError(name, {
        type: 'manual',
        message: errorMessage,
      })
    } else {
      clearErrors(name)
    }
  }

  const viewFileHelperText = canViewFile && (
    <Styled.ViewFileText onClick={onViewFile}>
      Посмотреть файл
    </Styled.ViewFileText>
  )
  const errorHelperText = hasError && errorMessage

  return (
    <FileAttachmentField
      disabled={disabled}
      error={hasError}
      helperText={errorHelperText || viewFileHelperText}
      labelText={labelText}
      placeholder={placeholder}
      testId={testId}
      value={value}
      onChange={onChange}
      onError={handleCatchAttachmentError}
    />
  )
}
