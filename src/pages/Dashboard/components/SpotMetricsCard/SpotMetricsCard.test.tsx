import React from 'react'

import { render } from '@testEnv/utils'

import { SpotMetricsCard } from './SpotMetricsCard'
import * as T from './SpotMetricsCard.types'

const TEST_CONTENT = 'test'
const TEST_REVENUE_DATE = '2022-11-13'
const mockProp: T.Props = {
  metricsData: {
    revenue: 1000,
    revenueDate: TEST_REVENUE_DATE,
  },
}

describe('<SpotMetricsCard />', () => {
  const renderSpotMetricsCard = (props = mockProp) =>
    render(<SpotMetricsCard {...props}>{TEST_CONTENT}</SpotMetricsCard>)

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render correct content', async () => {
    const { getByText } = renderSpotMetricsCard()

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
  })

  test('render correct revenue date', async () => {
    const { getByText } = renderSpotMetricsCard()

    expect(getByText('Выручка за 13 ноября')).toBeInTheDocument()
  })

  test('render correct revenue', async () => {
    const { getByText } = renderSpotMetricsCard()

    expect(getByText('1 000')).toBeInTheDocument()
    expect(getByText('₽')).toBeInTheDocument()
  })

  test('render "Нет данных по метрикам" if data is empty', () => {
    const { queryByText, getByText } = renderSpotMetricsCard({
      metricsData: undefined,
    })

    expect(queryByText('1 000')).not.toBeInTheDocument()
    expect(queryByText('₽')).not.toBeInTheDocument()
    expect(getByText('Нет данных по метрикам')).toBeInTheDocument()
  })
})
