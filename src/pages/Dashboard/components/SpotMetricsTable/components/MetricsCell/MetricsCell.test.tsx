import React from 'react'

import { render } from '@testEnv/utils'

import { MetricsCell } from './MetricsCell'
import { Props as MetricsCellProps } from './MetricsCell.types'
import { valueColor } from './constants/valueTypes'

describe('<MetricsCell />', () => {
  const renderMetricsCell = ({
    value = 1000,
    type = 'MONEY',
    deltaValue,
    deltaColor,
  }: Partial<MetricsCellProps>) =>
    render(
      <table>
        <tbody>
          <tr>
            <MetricsCell
              deltaColor={deltaColor}
              deltaValue={deltaValue}
              type={type}
              value={value}
            />
          </tr>
        </tbody>
      </table>,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when render "realValue" only', () => {
    test('render only one "p" tag if "deltaValue===undefined"', async () => {
      const { getByRole } = renderMetricsCell({
        value: 1000,
      })

      const table = getByRole('table')
      const content = table.querySelectorAll('tbody > tr > td > div')

      expect(content.length).toEqual(1)
    })

    test('render correct value', async () => {
      const { getByText } = renderMetricsCell({
        value: 1000,
      })

      expect(getByText('1 000')).toBeInTheDocument()
    })

    test('value has "BLACK" text color by default', async () => {
      const { getByText } = renderMetricsCell({})

      expect(getByText('1 000').parentNode).toHaveStyle(
        `color: ${valueColor.BLACK}`,
      )
    })
  })

  describe('when render "deltaValue"', () => {
    test('render correct value', async () => {
      const { getByText } = renderMetricsCell({
        deltaValue: -10,
      })

      expect(getByText('-10')).toBeInTheDocument()
    })

    test('render both values', async () => {
      const { getByText } = renderMetricsCell({
        deltaValue: -10,
      })

      expect(getByText('1 000')).toBeInTheDocument()
      expect(getByText('-10')).toBeInTheDocument()
    })

    test('value has "BLACK" text color by default', async () => {
      const { getByText } = renderMetricsCell({ deltaValue: -10 })

      expect(getByText('-10').parentNode).toHaveStyle(
        `color: ${valueColor.BLACK}`,
      )
    })

    describe('when color property is set', () => {
      test('value has "BLACK" text color by default', async () => {
        const { getByText } = renderMetricsCell({ deltaValue: -10 })

        expect(getByText('-10').parentNode).toHaveStyle(
          `color: ${valueColor.BLACK}`,
        )
      })

      test('value has "GREEN" text color by default', async () => {
        const { getByText } = renderMetricsCell({
          deltaValue: -10,
          deltaColor: 'GREEN',
        })

        expect(getByText('-10').parentNode).toHaveStyle(
          `color: ${valueColor.GREEN}`,
        )
      })

      test('value has "RED" text color by default', async () => {
        const { getByText } = renderMetricsCell({
          deltaValue: -10,
          deltaColor: 'RED',
        })

        expect(getByText('-10').parentNode).toHaveStyle(
          `color: ${valueColor.RED}`,
        )
      })
    })
  })

  describe('when render value sign', () => {
    it('should render "₽" sign', async () => {
      const { getByText } = renderMetricsCell({
        type: 'MONEY',
      })

      expect(getByText('₽')).toBeInTheDocument()
    })
    it('should render "%" sign', async () => {
      const { getByText } = renderMetricsCell({
        type: 'PERCENT',
      })

      expect(getByText('%')).toBeInTheDocument()
    })
  })
})
