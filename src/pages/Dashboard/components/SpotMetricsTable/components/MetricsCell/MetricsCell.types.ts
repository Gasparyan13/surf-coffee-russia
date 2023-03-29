export type MetricsCellType = 'PERCENT' | 'MONEY'
export type MetricsCellColor = 'RED' | 'GREEN' | 'BLACK'

export type Props = {
  value: number
  type: MetricsCellType
  deltaValue?: number
  deltaColor?: MetricsCellColor
}
