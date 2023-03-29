import React, { useCallback } from 'react'

import { HEADER_MONTH_YEAR_FORMAT } from '@common/constants'

import { DateHelper } from '@helpers'

import { Table, TableCell } from '@uiKit'

import * as Styled from './SpotMetricsTable.styled'
import * as T from './SpotMetricsTable.types'
import { HierarchicalRow } from './components/HierarchicalRow'
import { MetricsCell } from './components/MetricsCell'
import { headerColumns } from './constants/headerColumns'

export const SpotMetricsTable: React.FC<T.Props> = ({ date, rows }) => {
  const rowRenderer = useCallback(
    (item: T.MetricsRow, index: number, key: string) => {
      const { type, color: deltaColor, delta, plan, fact, level } = item

      return (
        <HierarchicalRow key={key} index={index} level={level!}>
          <TableCell cssStyle={Styled.firstColumnCSS}>
            {item.metricName}
          </TableCell>
          <MetricsCell type={type!} value={plan!} />
          <MetricsCell
            deltaColor={deltaColor}
            deltaValue={delta}
            type={type!}
            value={fact!}
          />
        </HierarchicalRow>
      )
    },
    [],
  )

  return (
    <Styled.Root>
      <Styled.TableHeader variant="H3">
        {DateHelper.toLocaleFormat(date, HEADER_MONTH_YEAR_FORMAT)}
      </Styled.TableHeader>
      <Styled.TableContainer>
        <Table
          header={headerColumns}
          minWidth={510}
          rowRenderer={rowRenderer}
          rows={rows}
          sx={{ padding: '0 24px' }}
        />
      </Styled.TableContainer>
    </Styled.Root>
  )
}
