import React from 'react'

import { ToggleButtonGroup } from '@uiKit'

import { render, screen } from '@testEnv/utils'

import * as T from './ToggleButtonGroup.types'

const tabsButton = [{ label: 'TAB 1' }, { label: 'TAB 2' }]

describe('<ToggleButtonGroup/>', () => {
  const renderToggleButtonGroup = ({
    tabs = tabsButton,
    currentValue = 0,
    disabled,
    color,
    onChange,
  }: Partial<T.Props>) =>
    render(
      <ToggleButtonGroup
        color={color}
        currentValue={currentValue}
        disabled={disabled}
        tabs={tabs}
        onChange={onChange}
      />,
    )

  it('should render toggleButtonGroup ', () => {
    renderToggleButtonGroup({})

    const toggleButtonGroup = screen.getByRole('tablist')
    expect(toggleButtonGroup).toBeInTheDocument()
  })

  it('should trigger function onChange', async () => {
    const onChangeMock = jest.fn()

    const { user } = renderToggleButtonGroup({ onChange: onChangeMock })

    const unselectedToggleButton = screen.getByRole('tab', {
      name: 'TAB 2',
      selected: false,
    })

    await user.click(unselectedToggleButton)

    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should toggleButtonGroup be disabled if disabled prop is true', () => {
    renderToggleButtonGroup({
      disabled: true,
    })

    const selectedToggleButton = screen.getByRole('tab', {
      name: 'TAB 1',
      selected: true,
    })

    const unselectedToggleButton = screen.getByRole('tab', {
      name: 'TAB 2',
      selected: false,
    })

    expect(selectedToggleButton).toBeInTheDocument()
    expect(unselectedToggleButton).toBeDisabled()
  })
})
