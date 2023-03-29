import React from 'react'

import { marginCenterCSS } from '@common/common.styled'
import { NumberFormat } from '@common/newUi/NumberFormat'

import { DateHelper } from '@helpers'

import * as Styled from './SpotMetricsCard.styled'
import * as T from './SpotMetricsCard.types'
import { SPOT_METRICS_CARD_DATE_FORMAT } from './constants/format'

export const SpotMetricsCard: React.FC<T.Props> = ({
  children,
  metricsData,
}) => (
  <Styled.Root>
    {metricsData ? (
      <Styled.Widget>
        <Styled.WidgetText variant="PBody">
          Выручка за{' '}
          {DateHelper.toLocaleFormat(
            metricsData.revenueDate!,
            SPOT_METRICS_CARD_DATE_FORMAT,
          )}
        </Styled.WidgetText>
        <Styled.WidgetText variant="PBody">
          <NumberFormat value={metricsData?.revenue} /> ₽
        </Styled.WidgetText>
      </Styled.Widget>
    ) : (
      <Styled.Widget>
        <Styled.WidgetText css={marginCenterCSS} variant="PBody">
          Нет данных по метрикам
        </Styled.WidgetText>
      </Styled.Widget>
    )}
    {children}
  </Styled.Root>
)
