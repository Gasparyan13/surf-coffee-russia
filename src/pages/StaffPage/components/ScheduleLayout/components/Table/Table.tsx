import React, { memo, useEffect, useLayoutEffect, useRef } from 'react'

import { theme } from '../../../../../../common/providers/ThemeProvider/theme'
import { Typography } from '../../../../../../common/uiKit'
import * as Styled from './Table.styled'
import * as T from './Table.types'
import { TableFooter } from './components/TableFooter'
import { TableHeader } from './components/TableHeader'
import { TableLayerShifts } from './components/TableLayerShifts'
import { TableMainColumns } from './components/TableMainColumns'
import { TableTimeColumn } from './components/TableTimeColumn'
import { CURRENT_DAY } from './constants/className'
import { changeCellWidth } from './utils/changeWidth'
import { getDays } from './utils/getters'

export const Table: React.FC<T.Props> = memo(({ schedule, year, month }) => {
  let days: T.DaysType[] = getDays(year, month)
  const hasSchedule = schedule && schedule.length > 0
  const wrapperContainerRef = useRef<HTMLDivElement>(null)
  const wrapperContainer = wrapperContainerRef.current

  if (hasSchedule) {
    days = changeCellWidth(days, schedule)
  }

  const scrollToCurrDay = () => {
    const currentDayContainer = document.querySelector<HTMLLIElement>(
      `.${CURRENT_DAY}`,
    )
    if (
      wrapperContainer?.scrollLeft !== undefined &&
      currentDayContainer?.offsetLeft
    ) {
      wrapperContainer.scrollLeft =
        currentDayContainer.offsetLeft -
        wrapperContainer.offsetWidth / 2 +
        currentDayContainer.offsetWidth / 2
    }
  }

  useLayoutEffect(() => {
    if (!schedule) return

    scrollToCurrDay()
  }, [days])

  useEffect(() => {
    if (wrapperContainer?.scrollLeft !== undefined) {
      wrapperContainer.scrollLeft = 0
      wrapperContainer.scrollTop = 0
      scrollToCurrDay()
    }
  }, [month])

  return (
    <Styled.Root>
      <Styled.Wrapper ref={wrapperContainerRef}>
        <Styled.FixedTop />

        <Styled.FixedBottom>
          <Typography color={theme.colors.wetAsphalt} variant="SUBTextLight">
            ИТОГО:
          </Typography>
        </Styled.FixedBottom>

        <TableHeader days={days} />

        <TableTimeColumn />

        <Styled.Main>
          {hasSchedule && <TableLayerShifts days={days} schedule={schedule} />}

          <TableMainColumns days={days} />
        </Styled.Main>

        <TableFooter days={days} />
      </Styled.Wrapper>
    </Styled.Root>
  )
})
