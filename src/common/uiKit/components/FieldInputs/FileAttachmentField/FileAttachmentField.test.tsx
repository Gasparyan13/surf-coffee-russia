import React from 'react'

import { FileAttachmentField } from '@uiKit'
import {
  TEST_ID_ICON_DELETE,
  TEST_ID_ICON_FILE,
} from '@uiKit/components/FieldInputs/FileAttachmentField/constants/testIds'

import { render, screen } from '@testEnv/utils'

import * as T from './FileAttachmentField.types'

const mockOnChange = jest.fn()

const propsValue: T.Props = {
  value: null,
  name: 'FileAttachmentFieldName',
  onChange: mockOnChange,
}
describe('<FileAttachmentField/>', () => {
  const renderFileAttachmentField = (props = propsValue) =>
    render(<FileAttachmentField {...props} />)

  it('should render fileAttachmentField input', () => {
    renderFileAttachmentField({
      ...propsValue,
    })

    const fileAttachment = screen.getByRole('textbox')

    expect(fileAttachment).toBeInTheDocument()
  })

  it('should render attach icon', () => {
    renderFileAttachmentField({
      ...propsValue,
    })

    expect(screen.getByTestId(TEST_ID_ICON_FILE)).toBeInTheDocument()
  })

  it('should render trash icon when value is not empty', () => {
    renderFileAttachmentField({
      ...propsValue,
      value: new File(['1'], 'file.txt'),
    })

    expect(screen.queryByTestId(TEST_ID_ICON_FILE)).not.toBeInTheDocument()

    expect(screen.getByTestId(TEST_ID_ICON_DELETE)).toBeInTheDocument()
  })

  it('should render label and helperText', () => {
    renderFileAttachmentField({
      ...propsValue,
      label: 'test label',
      helperText: 'test helper',
    })

    const label = screen.getByLabelText('test label')
    const helperText = screen.getByText('test helper')

    expect(label).toBeInTheDocument()
    expect(helperText).toBeInTheDocument()
  })

  it('should fileAttachmentField be disabled if disabled prop is true', () => {
    renderFileAttachmentField({
      ...propsValue,
      disabled: true,
    })

    const fileAttachment = screen.getByRole('textbox')

    expect(fileAttachment).toBeDisabled()
  })
})
