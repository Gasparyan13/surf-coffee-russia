import React from 'react'

import { render } from '@testEnv/utils'

import { SidebarHeaderSearchCell } from './SidebarHeaderSearchCell'
import * as T from './SidebarHeaderSearchCell.types'

describe('<SidebarHeaderSearchCell />', () => {
  const renderSidebarHeaderSearchCell = ({
    value = '',
    onChange = () => {},
  }: Partial<T.Props>) =>
    render(<SidebarHeaderSearchCell value={value} onChange={onChange} />)

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render SearchField', async () => {
    const { getByRole } = renderSidebarHeaderSearchCell({})

    expect(getByRole('textbox')).toBeInTheDocument()
  })
})
