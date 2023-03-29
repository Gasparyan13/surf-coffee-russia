import React from 'react'

import { theme } from '@src/common/providers/ThemeProvider/theme'

import { render } from '@testEnv/utils'

import { HelperText } from './HelperText'
import * as T from './HelperText.types'

describe('<HelperText />', () => {
  const TEST_CONTENT = 'test'

  const renderHelperText = ({ disabled, error }: Partial<T.Props>) =>
    render(
      <HelperText disabled={disabled} error={error}>
        {TEST_CONTENT}
      </HelperText>,
    )

  test('render correct content', async () => {
    const { getByText } = renderHelperText({})

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
    expect(getByText(TEST_CONTENT)).toHaveStyle(
      `color: ${theme.colors.wetAsphalt}`,
    )
  })

  it('should change text color if disabled', async () => {
    const { getByText } = renderHelperText({
      disabled: true,
    })

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
    expect(getByText(TEST_CONTENT)).toHaveStyle(`color: ${theme.colors.pencil}`)
  })

  it('should change text color to critical if has error', async () => {
    const { getByText } = renderHelperText({
      error: true,
    })

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
    expect(getByText(TEST_CONTENT)).toHaveStyle(
      `color: ${theme.colors.critical}`,
    )
  })
})
