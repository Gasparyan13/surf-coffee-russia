import React, { memo } from 'react'

import { allHoursDay } from '@common/constants/hours'
import { DateHelper } from '@common/helpers'

import { ShiftCard } from '@uiKit'

import { Role } from '@store/deprecated/modules/app/types'

import { MINIMUM_CONTENT_SLOTS } from '../../constants/counts'
import { LAST_HOUR } from '../../constants/date'
import { getCardWidth } from '../../utils/getters'
import * as Styled from './TableLayerShifts.styled'
import * as T from './TableLayerShifts.types'

export const TableLayerShifts: React.FC<T.Props> = memo(
  ({ days, schedule }) => {
    const cardWidthObject = getCardWidth(schedule)

    const getIsShortCard = (
      diffBetweenDays: number,
      startHour: number,
      endHour: number,
    ): boolean => {
      let diff = endHour - startHour

      if (diffBetweenDays !== 0) {
        diff = LAST_HOUR - startHour
      }

      return diff < MINIMUM_CONTENT_SLOTS
    }

    return (
      <Styled.LayerShifts
        $columnCount={days.length}
        $days={days}
        $rowCount={allHoursDay.length}>
        {schedule?.map((day) =>
          day?.shiftsWorkersSlots?.map((shift, shiftIndex, shiftArray) =>
            allHoursDay.map((hour) => {
              const startDay = DateHelper.toDate(shift.startTime as string)
              const endDay = DateHelper.toDate(shift.endTime as string)
              const startHour = startDay.getHours()
              const endHour = endDay.getHours()

              if (Number(hour) !== startHour) return

              const diffBetweenDays = endDay.getDay() - startDay.getDay()
              const diffBetweenHours = endHour - startHour

              const startRow = startHour + 1
              const endRow =
                diffBetweenDays !== 0
                  ? LAST_HOUR + 1
                  : startRow + diffBetweenHours

              const cardWidth =
                cardWidthObject[day.day as number][shift.timeSlotId as number]

              return (
                <Styled.LayerShiftsItem
                  key={shift.workerId}
                  $column={day.day as number}
                  $endRow={endRow}
                  $index={shiftIndex}
                  $length={shiftArray.length}
                  $startRow={startRow}
                  $width={cardWidth}>
                  <ShiftCard
                    planHours={shift.plannedHours as number}
                    role={shift.role?.toLowerCase() as Role}
                    variant={
                      getIsShortCard(diffBetweenDays, startHour, endHour)
                        ? 'short'
                        : 'normal'
                    }
                    workerName={shift.firstAndLastName as string}
                    // 'factHours' doesn't exist for type 'ShiftWorkerSlotViewDto' so it doesn't work
                    // factHours={shift.actualHours}
                    // 'duty' doesn't exist for type 'ShiftWorkerSlotViewDto' so it doesn't work
                    // isOnDuty={shift.duty}
                  />
                </Styled.LayerShiftsItem>
              )
            }),
          ),
        )}
      </Styled.LayerShifts>
    )
  },
)
