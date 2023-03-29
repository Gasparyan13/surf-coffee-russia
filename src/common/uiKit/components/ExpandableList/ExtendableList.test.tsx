import React from 'react'

import { ExtendableList } from '@uiKit'
import {
  TEST_ID_ADD,
  TEST_ID_REMOVE,
} from '@uiKit/components/ExpandableList/components/constants/testIds'

import { render, screen } from '@testEnv/utils'

import * as T from './ExtendableList.types'

const items = [{ id: '1' }, { id: '2' }]

const mockCreateItem = jest.fn(() => ({ id: '3' }))
const mockOnChange = jest.fn()

const mockPropsValue: T.Props<{ id: string }> = {
  items,
  createItem: mockCreateItem,
  renderContent: (item) => <div>{item.id}</div>,
  onChange: mockOnChange,
}

describe('<ExtendableList />', () => {
  const renderExtendableList = (props = mockPropsValue) =>
    render(<ExtendableList {...props} />)

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render ExtendableList', async () => {
    renderExtendableList()

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should trigger onClick "add icon"', async () => {
    const { user } = renderExtendableList()

    const iconPlus = screen.getByTestId(TEST_ID_ADD)

    expect(iconPlus).toBeInTheDocument()

    await user.click(iconPlus)

    expect(mockCreateItem).toBeCalledTimes(1)

    const newItems = [{ id: '1' }, { id: '2' }, { id: '3' }]

    expect(mockOnChange).toBeCalledWith(newItems)
  })

  it('should trigger onClick "remove icon"', async () => {
    const { user, rerender } = renderExtendableList()
    const iconDelete = screen.getAllByTestId(TEST_ID_REMOVE)[1]
    expect(iconDelete).toBeInTheDocument()
    await user.click(iconDelete)

    expect(mockOnChange).toBeCalledWith([items[0]])

    rerender(<ExtendableList {...mockPropsValue} items={[items[0]]} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })
})
