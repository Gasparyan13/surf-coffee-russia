import { ForecastMetricItemDto } from '@rtkApi/modules/__generated__/metric'

export type MetricsRow = ForecastMetricItemDto

export type Props = {
  date: string
  rows: MetricsRow[]
}
