import React from 'react'

import { Tooltip } from '@uiKit/components/Tooltip/Tooltip'
import * as T from '@uiKit/components/Tooltip/Tooltip.types'

import { render, screen, waitFor } from '@testEnv/utils'

const propsValue: T.Props = {
  placement: 'above-center',
  children: <div>Tooltip</div>,
  title: 'Test Tooltip',
}

describe('<Tooltip />', () => {
  const renderTooltip = (props = propsValue) => render(<Tooltip {...props} />)

  it('should render Tooltip', async () => {
    const { user } = renderTooltip()

    user.hover(screen.getByText('Tooltip'))

    await waitFor(() => {
      expect(
        screen.getByRole('tooltip', {
          name: 'Test Tooltip',
          hidden: true,
        }),
      ).toBeInTheDocument()
    })
  })
})
