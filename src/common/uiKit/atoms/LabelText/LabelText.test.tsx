import React from 'react'

import { theme } from '@src/common/providers/ThemeProvider/theme'

import { render } from '@testEnv/utils'

import { LabelText } from './LabelText'
import * as T from './LabelText.types'

describe('<LabelText />', () => {
  const TEST_CONTENT = 'test'

  const renderLabelText = ({ disabled }: Partial<T.Props>) =>
    render(<LabelText disabled={disabled}>{TEST_CONTENT}</LabelText>)

  test('render correct content', async () => {
    const { getByText } = renderLabelText({})

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
    expect(getByText(TEST_CONTENT)).toHaveStyle(
      `color: ${theme.colors.wetAsphalt}`,
    )
  })

  it('should change text color if disabled', async () => {
    const { getByText } = renderLabelText({
      disabled: true,
    })

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
    expect(getByText(TEST_CONTENT)).toHaveStyle(`color: ${theme.colors.pencil}`)
  })
})
