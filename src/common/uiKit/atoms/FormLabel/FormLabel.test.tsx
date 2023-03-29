import React from 'react'

import { theme } from '@src/common/providers/ThemeProvider/theme'

import { render } from '@testEnv/utils'

import { FormLabel } from './FormLabel'
import * as T from './FormLabel.types'

describe('<FormLabel />', () => {
  const TEST_TEXT = 'test text'
  const TEST_CONTENT = 'test content'

  const renderFormLabel = ({ disabled }: Partial<T.Props>) =>
    render(
      <FormLabel disabled={disabled} text={TEST_TEXT}>
        {TEST_CONTENT}
      </FormLabel>,
    )

  test('render correct content', async () => {
    const { getByText } = renderFormLabel({})

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
    expect(getByText(TEST_TEXT)).toHaveStyle(
      `color: ${theme.colors.wetAsphalt}`,
    )
  })

  it('should change text color if disabled', async () => {
    const { getByText } = renderFormLabel({
      disabled: true,
    })

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
    expect(getByText(TEST_TEXT)).toHaveStyle(`color: ${theme.colors.pencil}`)
  })
})
