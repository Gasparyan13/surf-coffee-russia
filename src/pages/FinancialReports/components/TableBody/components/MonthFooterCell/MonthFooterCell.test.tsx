import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import { render } from '@testEnv/utils'

import { MonthFooterCell } from './MonthFooterCell'
import * as T from './MonthFooterCell.types'

describe('<MonthFooterCell />', () => {
  const renderMonthFooterCell = ({
    currentMonthNumber = 12,
    monthColumnIndex = 0,
  }: Partial<T.Props>) =>
    render(
      <MonthFooterCell
        currentMonthNumber={currentMonthNumber}
        monthColumnIndex={monthColumnIndex}
      />,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render current month cell with special color', async () => {
    const { container } = renderMonthFooterCell({
      currentMonthNumber: 1,
      monthColumnIndex: 1,
    })

    expect(container.lastChild).toHaveStyleRule(
      'background-color',
      theme.colors.asphaltSuperLight,
    )
  })

  it('should render common month cell with "asphaltSuperLight" color', async () => {
    const { container } = renderMonthFooterCell({
      currentMonthNumber: 1,
      monthColumnIndex: 11,
    })

    expect(container.lastChild).toHaveStyleRule('background-color', '#fafafb')
  })
})
