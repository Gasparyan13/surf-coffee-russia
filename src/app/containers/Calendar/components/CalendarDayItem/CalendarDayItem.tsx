/* eslint-disable max-lines */
import { Box, Grid } from '@mui/material'
import { addMinutes, format, parse } from 'date-fns'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import GridLayout, { Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { toast } from 'react-toastify'

import { ml } from '@common/common.styled'
import { makeNumberedArray } from '@common/helpers'
import { uuid } from '@common/helpers/uuid'
import { Nullable } from '@common/types/Nullable'

import { useWorkingDayPageCtx } from '@pages/WelcomePage/WorkingDayPages/components/WorkingDayPageCtx'

import { useCalendarOneDayCtx } from '../../containers/CalendarOneDayCtx'
import { TableRow } from '../CalendarDayItemTableRow'
import { ShiftPopover } from '../ShiftPopover/ShiftPopover'
import { CalendarEventType } from '../types'
import {
  eventHoursCSS,
  eventMiddleHoursCSS,
  eventMiddleTimeCSS,
  eventMiddleTitleCSS,
  eventMiniBoxCSS,
  eventMiniHoursCSS,
  eventMiniShiftCSS,
  eventMiniTimeCSS,
  eventMiniTitleCSS,
  eventTimeCSS,
  eventTitleCSS,
  gridLayoutCSS,
  Styled,
} from './CalendarDayItem.styled'

type Props = {
  events: CalendarEventType[]
  segment: number
  allowOverlap?: boolean
  onDragStart: () => void
  onDragEnd: () => void
  isAddingDisabled?: boolean
}
type AnchorElAction = {
  id: string
  domTarget: Nullable<Element>
} | null
const HOUR_COEFFICIENT = 5
const MINUTES_SECTION = 15
const MAX_W = 24
const SHIFT_DATE_STRING_FORMAT = 'HH:mm'
// const MINUTES_IN_HOUR = 60;

const allDayHrs = makeNumberedArray(24)

export const CalendarDayItem: React.FC<Props> = memo(
  ({
    events,
    segment,
    allowOverlap,
    onDragStart,
    onDragEnd,
    isAddingDisabled,
  }) => {
    const [isDragging, setIsDragging] = useState(false)
    const { onChange } = useCalendarOneDayCtx()
    const { watch } = useWorkingDayPageCtx()
    const dragStartTime = useRef<number>()

    const isEditable = watch('shiftStandard') === 'manual'

    const [layout, setLayout] = useState<GridLayout.Layout[]>()
    const [anchorEl, setAnchorEl] = useState<AnchorElAction | null>(null)

    const formatToStringDateFormat = useCallback(
      (prevAmount: number): string => {
        const amount = prevAmount - 1

        let minutesFromAmount =
          Math.round(amount % HOUR_COEFFICIENT) * MINUTES_SECTION
        const calculatedHours = Math.trunc(amount / HOUR_COEFFICIENT)
        if (calculatedHours === 23 && minutesFromAmount >= 60)
          minutesFromAmount = 59

        const mins = minutesFromAmount
        const hrs = calculatedHours

        const returnDate = new Date(new Date().setHours(hrs)).setMinutes(mins)

        return format(returnDate, SHIFT_DATE_STRING_FORMAT)
      },
      [],
    )

    const handleDragStart = useCallback(() => {
      dragStartTime.current = window.performance.now()
      setIsDragging(true)
      onDragStart()
    }, [onDragStart])

    const cancelDragging = useCallback(() => {
      onDragEnd()
      setIsDragging(false)
    }, [onDragEnd])

    const getYAxisOffset = useCallback((date: Date) => {
      const minutes = date.getMinutes()
      const hours = date.getHours()

      let returnValue =
        hours * HOUR_COEFFICIENT +
        (minutes >= 15 ? Math.trunc(minutes / 15) * (HOUR_COEFFICIENT / 4) : 0)

      // handling 24 hour state
      if (hours === 23 && minutes === 59) returnValue = 24 * HOUR_COEFFICIENT

      return Number(returnValue)
    }, [])

    const getOverlapsCount = useCallback(
      (comparingEl: CalendarEventType, comparingArr: CalendarEventType[]) => {
        const { start, end } = comparingEl
        const top = getYAxisOffset(start)
        const bottom = getYAxisOffset(end)
        return comparingArr.filter((el) => {
          const minH = getYAxisOffset(el.start)
          const maxH = getYAxisOffset(el.end)

          return (
            // inside
            ((minH > top && maxH < bottom) ||
              // overlap
              (minH < top && maxH > bottom) ||
              // overlapTop
              (minH <= top && maxH > top) ||
              // overlapBottom
              (minH < bottom && maxH >= bottom) ||
              // areEqual
              (minH === top && maxH === bottom)) &&
            el.segment === comparingEl.segment
          )
        })?.length
      },
      [getYAxisOffset],
    )

    const makeLayoutFromEvents = useCallback(() => {
      const newEventsLayout: GridLayout.Layout[] = events?.map(
        (item, index) => {
          let w = MAX_W
          let x = 0
          const y = getYAxisOffset(item.start)
          const h = getYAxisOffset(item.end) - getYAxisOffset(item.start)

          const prevOverlapsCount = getOverlapsCount(
            item,
            events?.slice(0, index),
          )
          const overlapsCount = getOverlapsCount(item, events)

          if (overlapsCount && allowOverlap) {
            w = Math.floor(MAX_W / overlapsCount)

            x = w * prevOverlapsCount
          }

          return {
            i: `${item.id}:${item.name}`,
            x,
            y,
            w,
            h,
            minW: 2,
            maxW: MAX_W,
            isDraggable: isEditable,
            isResizable: isEditable,
            static: true,
            isBounded: true,
            resizeHandles: ['s'],
            // Need to really update draggable library state
            a: Math.random(),
          }
        },
      )

      setLayout(newEventsLayout)
    }, [allowOverlap, events, getOverlapsCount, getYAxisOffset, isEditable])

    const handleDragStop = useCallback(
      (nextLayout: Layout[], oldItem: Layout, newItem: Layout) => {
        onDragEnd()
        const [layoutId, ...layoutName] = newItem.i.split(':')
        const oldElement = events?.find((el) => el.id === layoutId)
        let elDiffInMinutes = 0
        if (oldElement)
          elDiffInMinutes = differenceInMinutes(
            oldElement?.end,
            oldElement?.start,
          )

        const endDiffSting = String(elDiffInMinutes).slice(-1)
        if (endDiffSting === '9' || endDiffSting === '4') elDiffInMinutes += 1

        const name = layoutName.join('')
        let newStart = newItem.y
        let newEnd = newStart + newItem.h

        if (newEnd > 120) {
          newEnd = 120
        }
        if (newStart <= 0) {
          newEnd = newEnd - newStart + 1
          newStart = 1
        }
        // Handling 0 minutes shift creation
        if (newEnd - newStart === 1) {
          newEnd = oldItem.h + oldItem.y
        }

        const updateState = () => {
          if (newStart !== newEnd) {
            if (oldItem.y !== newStart) {
              const start = formatToStringDateFormat(newStart)
              let endDate = addMinutes(
                parse(start, SHIFT_DATE_STRING_FORMAT, new Date()),
                elDiffInMinutes,
              )
              if (endDate.getMinutes() === 0 && endDate.getHours() === 0)
                endDate = new Date(
                  new Date(endDate.setMinutes(59)).setHours(23),
                )

              const end = format(endDate, SHIFT_DATE_STRING_FORMAT)
              return onChange({
                action: 'UPDATE',
                id: layoutId,
                start,
                end,
                segment,
                name,
              })
            }
            const heightDiff = oldItem.h - newItem.h
            // Auto resizing back if value is smaller then 15m amount
            const BACK_VALUE = 1
            if (heightDiff > -BACK_VALUE && heightDiff < BACK_VALUE) {
              return makeLayoutFromEvents()
            }
            if (oldItem.h !== newItem.h) {
              return onChange({
                action: 'UPDATE',
                id: layoutId,
                start: formatToStringDateFormat(newStart),
                end: formatToStringDateFormat(newEnd),
                segment,
                name,
              })
            }
          }
        }
        updateState()

        setIsDragging(false)
      },
      [
        onDragEnd,
        events,
        makeLayoutFromEvents,
        onChange,
        formatToStringDateFormat,
        segment,
      ],
    )

    const blockedHours = useMemo(
      () =>
        events?.map((event) => [
          Math.floor(getYAxisOffset(event.start) / HOUR_COEFFICIENT),
          Math.ceil(getYAxisOffset(event.end) / HOUR_COEFFICIENT),
        ]),
      [events, getYAxisOffset],
    )

    const getIsHourBlocked = useCallback(
      (hour: number) =>
        blockedHours?.some(
          ([startHour, endHour]) => startHour <= hour && endHour > hour,
        ),
      [blockedHours],
    )

    const handleCreateShift = useCallback(
      (start: number, end: number) => {
        onChange({
          action: 'CREATE',
          start,
          end,
          name: 'Новая смена',
          segment,
          id: uuid(),
        })
        toast.success('Смена успешно создана')
      },
      [onChange, segment],
    )
    const handleOpenPopover = useCallback(
      (id: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const timeDiffFromDragStart =
          window.performance.now() - (dragStartTime.current || 0)
        if (isEditable && timeDiffFromDragStart < 180)
          setAnchorEl({ domTarget: e.currentTarget, id })
        cancelDragging()
      },
      [cancelDragging, isEditable],
    )

    const handleCloseModal = useCallback<
      React.MouseEventHandler<HTMLDivElement>
    >(
      (e) => {
        e.stopPropagation()
        setAnchorEl(null)
        cancelDragging()
      },
      [cancelDragging],
    )

    const renderShifts = useCallback(
      (event: CalendarEventType) => {
        if (
          getYAxisOffset(event.end) / HOUR_COEFFICIENT - 1.5 >
          getYAxisOffset(event.start) / HOUR_COEFFICIENT
        ) {
          return (
            <Box>
              <Box css={eventTitleCSS}>{event.name}</Box>
              <Box css={eventTimeCSS}>
                <Box>c {format(new Date(event.start), 'HH:mm')}</Box>
                <Box css={ml(3)}>- {format(new Date(event.end), 'HH:mm')}</Box>
              </Box>
              <Box css={eventHoursCSS}>
                {getYAxisOffset(event.end) / HOUR_COEFFICIENT -
                  getYAxisOffset(event.start) / HOUR_COEFFICIENT}
                ч.
              </Box>
            </Box>
          )
        }
        if (
          getYAxisOffset(event.end) / HOUR_COEFFICIENT -
            getYAxisOffset(event.start) / HOUR_COEFFICIENT <
          1
        ) {
          return (
            <Grid container css={eventMiniBoxCSS}>
              <Grid item css={eventMiniTitleCSS} xs={4}>
                {event.name}
              </Grid>
              <Grid
                container
                item
                css={eventMiniTimeCSS}
                justifyContent="center"
                xs={5}>
                <Grid> c {format(new Date(event.start), 'HH:mm')}</Grid>
                <Grid css={ml(3)}>
                  - {format(new Date(event.end), 'HH:mm')}
                </Grid>
              </Grid>
              <Grid item css={eventMiniHoursCSS} xs={3}>
                {getYAxisOffset(event.end) / HOUR_COEFFICIENT -
                  getYAxisOffset(event.start) / HOUR_COEFFICIENT}
                ч.
              </Grid>
            </Grid>
          )
        }
        return (
          <Grid
            container
            alignItems="start"
            css={eventMiniShiftCSS}
            direction="column"
            justifyContent="space-around">
            <Grid item css={eventMiddleTitleCSS} xs={4}>
              {event.name}
            </Grid>
            <Grid
              container
              item
              css={eventMiddleTimeCSS}
              justifyContent="flex-start"
              xs={5}>
              <Grid> c {format(new Date(event.start), 'HH:mm')}</Grid>
              <Grid css={ml(3)}> - {format(new Date(event.end), 'HH:mm')}</Grid>
            </Grid>
            <Grid item css={eventMiddleHoursCSS} xs={3}>
              {getYAxisOffset(event.end) / HOUR_COEFFICIENT -
                getYAxisOffset(event.start) / HOUR_COEFFICIENT}
              ч.
            </Grid>
          </Grid>
        )
      },
      [getYAxisOffset],
    )

    useEffect(() => {
      makeLayoutFromEvents()
    }, [events])

    const renderLayout = useMemo(
      () => (
        <GridLayout
          isBounded
          allowOverlap={allowOverlap}
          className="layout"
          cols={24}
          css={gridLayoutCSS}
          layout={layout}
          maxRows={120}
          rowHeight={2}
          useCSSTransforms={false}
          width={269}
          onDragStart={handleDragStart}
          onDragStop={handleDragStop}
          onResizeStart={handleDragStart}
          onResizeStop={handleDragStop}
          // onLayoutChange={handleLayoutChange}
          // onDropDragOver={handleDragOver}
          // breakpoints={{ xxl: 1920, lg: 1280, md: 960, sm: 600, xs: 0 }}
          // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {events?.map((event) => (
            <Styled.Event
              key={`${event.id}:${event.name}`}
              onClick={handleOpenPopover(event.id)}>
              {renderShifts(event)}
              {anchorEl?.id === event.id && (
                <ShiftPopover
                  anchorEl={anchorEl?.domTarget}
                  end={event.end}
                  id={event.id}
                  name={event.name}
                  open={Boolean(anchorEl?.domTarget)}
                  segment={event.segment}
                  start={event.start}
                  title={event.title}
                  onClose={handleCloseModal}
                  onDelete={cancelDragging}
                />
              )}
            </Styled.Event>
          ))}
        </GridLayout>
      ),
      [
        allowOverlap,
        anchorEl?.domTarget,
        anchorEl?.id,
        cancelDragging,
        events,
        handleCloseModal,
        handleDragStart,
        handleDragStop,
        handleOpenPopover,
        layout,
        renderShifts,
      ],
    )

    return (
      <Styled.Root>
        <Styled.Background>
          <Styled.Table>
            <tbody>
              {allDayHrs?.map((hour, i) => (
                <TableRow
                  key={hour}
                  hour={hour}
                  isBlocked={
                    isDragging || getIsHourBlocked(hour) || isAddingDisabled
                  }
                  isFirstCell={i === 0}
                  onCreateNewShift={handleCreateShift}
                />
              ))}
            </tbody>
          </Styled.Table>
        </Styled.Background>
        {renderLayout}
      </Styled.Root>
    )
  },
  (prevProps, nextProps) =>
    prevProps.allowOverlap === nextProps.allowOverlap &&
    prevProps.events === nextProps.events &&
    prevProps.onDragStart === nextProps.onDragStart &&
    prevProps.segment === nextProps.segment &&
    prevProps.onDragEnd === nextProps.onDragEnd &&
    prevProps.isAddingDisabled === nextProps.isAddingDisabled,
)
