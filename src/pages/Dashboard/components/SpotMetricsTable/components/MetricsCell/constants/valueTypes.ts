import { theme } from '@common/providers/ThemeProvider/theme'

import { MetricsCellType, MetricsCellColor } from '../MetricsCell.types'

export const valueSign: Record<MetricsCellType, string> = {
  MONEY: '₽',
  PERCENT: '%',
}

export const valueColor: Record<MetricsCellColor, string> = {
  BLACK: theme.colors.black,
  GREEN: theme.colors.success,
  RED: theme.colors.critical,
}
