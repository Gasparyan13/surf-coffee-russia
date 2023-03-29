import React from 'react'

import { mockDashboardMetrics } from '@testEnv/mocks/constants/dashboardMetrics'
import { render } from '@testEnv/utils'

import { SpotMetricsTable } from './SpotMetricsTable'
import * as T from './SpotMetricsTable.types'
import { headerColumns } from './constants/headerColumns'

const TEST_DATE = '2022-11-13'
const testRow = { ...mockDashboardMetrics.metrics[0] }

describe('<SpotMetricsTable />', () => {
  const renderSpotMetricsTable = ({
    rows = [testRow],
    date = TEST_DATE,
  }: Partial<T.Props>) => render(<SpotMetricsTable date={date} rows={rows} />)

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render correct table header', async () => {
    const { getByRole } = renderSpotMetricsTable({})

    const table = getByRole('table')
    const headerCells = table.querySelectorAll('thead > tr > th')

    headerCells.forEach((node, index) => {
      expect(node).toContainHTML(headerColumns[index].title)
    })
  })

  test('render correct number of rows', async () => {
    const { getByRole } = renderSpotMetricsTable({})

    const table = getByRole('table')
    const tableRows = table.querySelectorAll('tbody > tr')

    expect(tableRows.length).toEqual(1)
  })

  describe('when render row', () => {
    test(`render correct "${headerColumns[0].title}" cell`, async () => {
      const { getByRole } = renderSpotMetricsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[0]

      expect(cell).toContainHTML(testRow.metricName!)
    })

    test(`render correct "${headerColumns[1].title}" cell`, async () => {
      const { getByRole } = renderSpotMetricsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[1]

      expect(cell).toContainHTML('6 000 000')
    })

    test(`render correct "${headerColumns[2].title}" cell`, async () => {
      const { getByRole } = renderSpotMetricsTable({})

      const table = getByRole('table')
      const cell = table.querySelectorAll('tbody > tr > td')[2]

      expect(cell).toContainHTML('5 000 000')
      expect(cell).toContainHTML('-1 000 000')
    })
  })
})
