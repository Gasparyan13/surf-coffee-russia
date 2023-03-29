import React from 'react'

import { EllipseIcon } from '@common/IconComponents/EllipseIcon/EllipseIcon'

import { theme } from '@providers/ThemeProvider/theme'

import { ListRow } from '@uiKit'

import { render, screen } from '@testEnv/utils'
import { createTestId } from '@testEnv/utils/testId/createTestId'

import * as T from './ListRow.types'

describe('<ListRow/>', () => {
  const renderListRow = ({
    text,
    leftIcon,
    rightIcon,
    disabled,
    isSelected,
  }: Partial<T.Props>) =>
    render(
      <ListRow
        key="1"
        disabled={disabled}
        isSelected={isSelected}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        text={text}
      />,
    )

  it('should render listRow', () => {
    renderListRow({})

    const listRow = screen.getByRole('menuitem')

    expect(listRow).toBeInTheDocument()
  })

  it('should render text listRow', () => {
    renderListRow({ text: 'text' })

    const listRow = screen.getByText('text')
    expect(listRow).toBeInTheDocument()
  })

  it('should render leftIcon and rightIcon', () => {
    renderListRow({
      leftIcon: <EllipseIcon {...createTestId('ellipseIconLeft')} />,
      rightIcon: <EllipseIcon {...createTestId('ellipseIconRight')} />,
    })
    const leftIcon = screen.getByTestId('ellipseIconLeft')
    const rightIcon = screen.getByTestId('ellipseIconRight')

    expect(leftIcon).toBeInTheDocument()
    expect(rightIcon).toBeInTheDocument()
  })

  it('should listRow be disabled colors if disabled prop is true', async () => {
    renderListRow({
      text: 'text',
      disabled: true,
      leftIcon: <EllipseIcon {...createTestId('ellipseIcon')} />,
    })

    const option = screen.getByRole('menuitem')
    const leftIcon = screen.getByTestId('ellipseIcon')

    expect(option).toHaveStyle(`color: ${theme.colors.pencil}`)
    expect(leftIcon).toHaveStyle(`color: ${theme.colors.pencil}`)
  })

  it('should listRow be items colors if disabled prop is false', () => {
    renderListRow({
      text: 'text',
      leftIcon: (
        <EllipseIcon
          color={theme.colors.black}
          {...createTestId('ellipseIcon')}
        />
      ),
    })

    const option = screen.getByRole('menuitem')
    const leftIcon = screen.getByTestId('ellipseIcon')

    expect(option).toHaveStyle(`color: ${theme.colors.black}`)
    expect(leftIcon).toHaveStyle(`color: ${theme.colors.black}`)
  })

  describe('when selected', () => {
    it('should selected row if isSelected is true', () => {
      renderListRow({
        text: 'text',
        isSelected: true,
      })

      const option = screen.getByRole('menuitem')

      expect(option).toHaveStyle(`background-color: ${theme.colors.grey}`)
    })

    it('should not selected row if isSelected is false', () => {
      renderListRow({
        text: 'text',
        isSelected: false,
      })

      const option = screen.getByRole('menuitem')

      expect(option).toHaveStyle(`background-color: ${theme.colors.white}`)
    })

    it('should selected parent row if isSelected and isParent is true', () => {
      renderListRow({
        text: 'text',
        isSelected: true,
      })

      const option = screen.getByRole('menuitem')

      expect(option).toHaveStyle(`background-color: ${theme.colors.grey}`)
    })
  })
})
