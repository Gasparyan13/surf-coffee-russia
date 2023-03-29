import { ForecastMetricDto } from '@rtkApi/modules/__generated__/metric'

export const successGetMetricsForecast: ForecastMetricDto = {
  month: '2022-11',
  revenue: 100000,
  revenueDate: '2022-11-13',
  reportTimestamp: '2022-11-22T10:33:23.26608312',
  metrics: [
    {
      id: 1,
      level: 0,
      parentId: undefined,
      children: [2],
      metricName: 'Средний чек',
      plan: 123000,
      fact: 50000,
      delta: -73000,
      type: 'MONEY',
      color: 'RED',
    },
  ],
}
