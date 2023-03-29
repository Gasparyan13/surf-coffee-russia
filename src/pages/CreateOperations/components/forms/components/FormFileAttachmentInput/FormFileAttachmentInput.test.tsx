import React from 'react'

import { setupStore } from '@store/rootConfig'

import { appConfig } from '@testEnv/mocks/store/app'
import { fireEvent, render } from '@testEnv/utils'

import { ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD } from '../../../../constants/messages/error'
import { FormFileAttachmentInput } from './FormFileAttachmentInput'
import * as T from './FormFileAttachmentInput.types'

describe('<FormFileAttachmentInput />', () => {
  const appStore = setupStore({
    app: appConfig({}),
  })

  const renderFormFileAttachmentInput = ({
    name = 'test',
    onChange = () => {},
    value = null,
    hasError = false,
    canViewFile,
    onViewFile,
  }: Partial<T.Props<{ test: 'test' }>>) =>
    render(
      <FormFileAttachmentInput
        canViewFile={canViewFile}
        hasError={hasError}
        name={name}
        value={value}
        onChange={onChange}
        onViewFile={onViewFile}
      />,
      {
        store: appStore,
      },
    )

  describe('when show "helperText"', () => {
    it('should show error text', () => {
      const { getByText } = renderFormFileAttachmentInput({ hasError: true })

      expect(getByText(ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD)).toBeInTheDocument()
    })

    it('should show open file text', () => {
      const { getByText } = renderFormFileAttachmentInput({ canViewFile: true })

      expect(getByText('Посмотреть файл')).toBeInTheDocument()
    })

    it('should trigger "onViewFile" by click', () => {
      const mockOnViewFile = jest.fn()
      const { getByText } = renderFormFileAttachmentInput({
        canViewFile: true,
        onViewFile: mockOnViewFile,
      })

      fireEvent.click(getByText('Посмотреть файл'))

      expect(mockOnViewFile).toHaveBeenCalledTimes(1)
    })
  })
})
