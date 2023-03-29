import React from 'react'

import { theme } from '@common/providers/ThemeProvider/theme'

import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import {
  CURRENT_MONTH_CELL_SELECTOR,
  MAIN_CONTENT_CELL_SELECTOR,
} from '../TableBody/constants/classNames'
import { TableCell } from './TableCell'
import * as T from './TableCell.types'

const TEST_CONTENT = 'test'

describe('<TableCell />', () => {
  const renderTableCell = ({
    text,
    isCurrentMonth,
    isEditable,
    isNumber,
    tableColumnType = 'MAIN',
    onClick,
  }: Partial<T.Props>) =>
    render(
      <TableCell
        isCurrentMonth={isCurrentMonth}
        isEditable={isEditable}
        isNumber={isNumber}
        tableColumnType={tableColumnType}
        text={text}
        onClick={onClick}>
        {TEST_CONTENT}
      </TableCell>,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render content', async () => {
    renderTableCell({})

    expect(screen.getByText(TEST_CONTENT)).toBeInTheDocument()
  })

  it('should call "onClick" callback', async () => {
    const mockOnClick = jest.fn()

    renderTableCell({ onClick: mockOnClick })

    fireEvent.click(screen.getByText(TEST_CONTENT))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  describe('when "isAddIcon"', () => {
    it('should add hover styles', async () => {
      renderTableCell({
        text: '',
        isEditable: true,
      })

      fireEvent.mouseOver(screen.getByText(TEST_CONTENT))

      await waitFor(async () => {
        expect(screen.getByText(TEST_CONTENT)).toHaveStyleRule(
          'background-color',
          `${theme.colors.asphalt}!important`,
          { target: 'hover' },
        )
      })
    })

    it('should NOT add hover styles if "text" is NOT empty', async () => {
      renderTableCell({
        isEditable: true,
        text: '1',
      })

      fireEvent.mouseOver(screen.getByText(TEST_CONTENT))

      await waitFor(async () => {
        expect(screen.getByText(TEST_CONTENT)).not.toHaveStyleRule(
          'background-color',
          `${theme.colors.asphalt}!important`,
          { target: 'hover' },
        )
      })
    })

    it('should NOT add hover styles if "isEditable" is "false"', async () => {
      renderTableCell({
        text: '',
        isEditable: false,
      })

      fireEvent.mouseOver(screen.getByText(TEST_CONTENT))

      await waitFor(async () => {
        expect(screen.getByText(TEST_CONTENT)).not.toHaveStyleRule(
          'background-color',
          `${theme.colors.asphalt}!important`,
          { target: 'hover' },
        )
      })
    })
  })

  describe('when "isHoverable"', () => {
    it('should add hover styles', async () => {
      renderTableCell({
        isNumber: true,
        isEditable: true,
      })

      fireEvent.mouseOver(screen.getByText(TEST_CONTENT))

      await waitFor(async () => {
        expect(screen.getByText(TEST_CONTENT)).toHaveStyleRule(
          'background-color',
          `${theme.colors.asphalt}!important`,
          { target: 'hover' },
        )
      })
    })

    it('should NOT add hover styles if "isNumber" is "false"', async () => {
      renderTableCell({
        isNumber: false,
        isEditable: true,
        text: '1',
      })

      fireEvent.mouseOver(screen.getByText(TEST_CONTENT))

      await waitFor(async () => {
        expect(screen.getByText(TEST_CONTENT)).not.toHaveStyleRule(
          'background-color',
          `${theme.colors.asphalt}!important`,
          { target: 'hover' },
        )
      })
    })

    it('should NOT add hover styles if "isEditable" is "false"', async () => {
      renderTableCell({
        isNumber: true,
        isEditable: false,
      })

      fireEvent.mouseOver(screen.getByText(TEST_CONTENT))

      await waitFor(async () => {
        expect(screen.getByText(TEST_CONTENT)).not.toHaveStyleRule(
          'background-color',
          `${theme.colors.asphalt}!important`,
          { target: 'hover' },
        )
      })
    })
  })

  describe('when tableColumnType "MAIN"', () => {
    it('should add "className" if tableColumnType is "MAIN"', async () => {
      renderTableCell({ tableColumnType: 'MAIN' })

      expect(screen.getByText(TEST_CONTENT)).toHaveClass(
        MAIN_CONTENT_CELL_SELECTOR,
      )
    })

    it('should NOT add "className" if tableColumnType is NOT "MAIN"', async () => {
      renderTableCell({ tableColumnType: 'SIDEBAR' })

      expect(screen.getByText(TEST_CONTENT)).not.toHaveClass(
        MAIN_CONTENT_CELL_SELECTOR,
      )
    })

    it('should add background color', async () => {
      renderTableCell({
        tableColumnType: 'MAIN',
      })

      expect(screen.getByText(TEST_CONTENT)).toHaveStyleRule(
        'background-color',
        '#fafafb',
      )
    })

    it('should NOT add background color', async () => {
      renderTableCell({
        tableColumnType: 'SIDEBAR',
      })

      expect(screen.getByText(TEST_CONTENT)).not.toHaveStyleRule(
        'background-color',
        '#fafafb',
      )
    })
  })

  describe('when tableColumnType "SIDEBAR"', () => {
    it('should NOT add background color', async () => {
      renderTableCell({
        tableColumnType: 'SIDEBAR',
      })

      expect(screen.getByText(TEST_CONTENT)).not.toHaveStyleRule(
        'background-color',
        '#fafafb',
      )
    })
  })

  describe('when "isCurrentMonth"', () => {
    it('should add "className" if isCurrentMonth is "true"', async () => {
      renderTableCell({ isCurrentMonth: true })

      expect(screen.getByText(TEST_CONTENT)).toHaveClass(
        CURRENT_MONTH_CELL_SELECTOR,
      )
    })

    it('should NOT add "className" if isCurrentMonth is "false"', async () => {
      renderTableCell({ isCurrentMonth: false })

      expect(screen.getByText(TEST_CONTENT)).not.toHaveClass(
        CURRENT_MONTH_CELL_SELECTOR,
      )
    })
  })
})
