import React, { memo, useCallback, useEffect, useState } from 'react'

import { SvgPlusIcon } from '@common/IconComponents/SvgPlusIcon'

import { useWorkingDayPageCtx } from '@pages/WelcomePage/WorkingDayPages/components/WorkingDayPageCtx'

import { Styled } from './CalendarDayItemTableRow.styled'

type Props = {
  isBlocked?: boolean
  hour: number
  onCreateNewShift: (start: number, end: number) => void
  isFirstCell?: boolean
}

// eslint-disable-next-line react/display-name
export const TableRow: React.FC<Props> = memo(
  ({ isBlocked, hour, onCreateNewShift, isFirstCell }) => {
    const [show, setIsShow] = useState(false)
    const { watch } = useWorkingDayPageCtx()
    const shiftStandard = watch('shiftStandard')

    const isEditable = !isBlocked && shiftStandard === 'manual'

    // const shiftDayType = watch('shiftDayType');
    const handleMouseEnter = useCallback(() => {
      if (!isBlocked) setIsShow(true)
    }, [setIsShow, isBlocked])
    const handleMouseLeave = useCallback(() => {
      if (!isBlocked) setIsShow(false)
    }, [setIsShow, isBlocked])

    const setHour = useCallback(
      (innerHour: number, minutes?: number) =>
        new Date(new Date().setHours(innerHour)).setMinutes(minutes || 0),
      [],
    )

    const handleCreateShift = useCallback(() => {
      if (isEditable) {
        if (hour === 23)
          return onCreateNewShift(setHour(hour), setHour(hour, 59))
        onCreateNewShift(setHour(hour), setHour(hour + 1))
      }
    }, [hour, isEditable, onCreateNewShift, setHour])

    // useEffect(() => {
    //   if (shiftDayType) setIsShow(false);
    // }, [shiftDayType]);

    useEffect(() => {
      if (!isBlocked) setIsShow(false)
    }, [isBlocked])

    return (
      <Styled.TableRow
        $isFirstCell={isFirstCell}
        onClick={handleCreateShift}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Styled.TableData $isFirstCell={isFirstCell}>
          {show && isEditable && (
            <Styled.OpenShiftBox>
              <SvgPlusIcon />
            </Styled.OpenShiftBox>
          )}
        </Styled.TableData>
      </Styled.TableRow>
    )
  },
  (prevProps, nextProps) => prevProps.isBlocked === nextProps.isBlocked,
)
