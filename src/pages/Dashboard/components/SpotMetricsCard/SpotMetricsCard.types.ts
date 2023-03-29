import { ForecastMetricDto } from '@rtkApi/modules/__generated__/metric'

export type Props = React.PropsWithChildren & {
  metricsData: ForecastMetricDto | undefined
}
