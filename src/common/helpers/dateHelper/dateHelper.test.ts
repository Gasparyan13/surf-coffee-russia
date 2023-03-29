/* eslint-disable max-lines */
import {
  DEFAULT_SERVER_DATE_FORMAT,
  MONTH_YEAR_FORMAT,
  YEAR_MONTH_FORMAT,
} from '@constants'

import { DateHelper } from './dateHelper'

const date = new Date('1990-12-3')

describe('DateHelper', () => {
  describe('DateHelper.toFormat', () => {
    describe('when passing a string', () => {
      test('should return formatted date by default', () => {
        expect(DateHelper.toFormat('1990-12-3')).toBe('03-12-1990')
      })

      test('should return formatted date according to given "yyyy-MM" format', () => {
        expect(DateHelper.toFormat('1990-12-3', YEAR_MONTH_FORMAT)).toBe(
          '1990-12',
        )
      })

      test('should return formatted date according to given "dd.MM.yyyy" format', () => {
        expect(DateHelper.toFormat('1990-12-3', 'dd.MM.yyyy')).toBe(
          '03.12.1990',
        )
      })
    })

    describe('when passing a Date', () => {
      test('should return formatted date by default', () => {
        expect(DateHelper.toFormat(date)).toBe('03-12-1990')
      })

      test('should return formatted date according to given "yyyy-MM" format', () => {
        expect(DateHelper.toFormat(date, YEAR_MONTH_FORMAT)).toBe('1990-12')
      })

      test('should return formatted date according to given "dd.MM.yyyy" format', () => {
        expect(DateHelper.toFormat(date, 'dd.MM.yyyy')).toBe('03.12.1990')
      })
    })
  })

  describe('DateHelper.toLocaleFormat', () => {
    describe('when passing a string', () => {
      test('should return formatted date by default', () => {
        expect(DateHelper.toLocaleFormat('1990-12-3')).toBe(
          '3 декабря, понедельник',
        )
      })

      test('should return formatted date according to given "EEEEEE" format', () => {
        expect(DateHelper.toLocaleFormat('1990-12-3', 'EEEEEE')).toBe('пн')
      })

      test('should return formatted date according to given "LLLL, yyyy" format', () => {
        expect(DateHelper.toLocaleFormat('1990-12-3', MONTH_YEAR_FORMAT)).toBe(
          'декабрь, 1990',
        )
      })

      test('should return formatted date according to given "d MMMM yyyy" format', () => {
        expect(DateHelper.toLocaleFormat('1990-12-3', 'd MMMM yyyy')).toBe(
          '3 декабря 1990',
        )
      })
    })

    describe('when passing a Date', () => {
      test('should return formatted date by default', () => {
        expect(DateHelper.toLocaleFormat(date)).toBe('3 декабря, понедельник')
      })

      test('should return formatted date according to given "EEEEEE" format', () => {
        expect(DateHelper.toLocaleFormat(date, 'EEEEEE')).toBe('пн')
      })

      test('should return formatted date according to given "LLLL, yyyy" format', () => {
        expect(DateHelper.toLocaleFormat(date, MONTH_YEAR_FORMAT)).toBe(
          'декабрь, 1990',
        )
      })

      test('should return formatted date according to given "d MMMM yyyy" format', () => {
        expect(DateHelper.toLocaleFormat(date, 'd MMMM yyyy')).toBe(
          '3 декабря 1990',
        )
      })
    })
  })

  describe('DateHelper.formatServerDateToClient', () => {
    test('should return formatted server date for client', () => {
      expect(DateHelper.formatServerDateToClient('1990-12-03')).toBe(
        '03-12-1990',
      )
    })
  })

  describe('DateHelper.formatClientDateToServer', () => {
    test('should return formatted client date for server', () => {
      expect(DateHelper.formatClientDateToServer('03-12-1990')).toBe(
        '1990-12-03',
      )
    })
  })

  describe('DateHelper.toServerDateFormat', () => {
    test('should return formatted client date for server', () => {
      expect(DateHelper.toServerDateFormat(date)).toBe('1990-12-03')
    })
  })

  describe('DateHelper.toNumber', () => {
    test('should return timestamp of passed date', () => {
      expect(DateHelper.toNumber('1990-12-3')).toBe(660182400)
    })
  })

  describe('DateHelper.toDate', () => {
    test('should return value in date format if string is passed', () => {
      expect(DateHelper.toDate('1990-12-03')).toEqual(
        new Date('1990-12-03T00:00:00.000Z'),
      )
    })

    test('should return value in date format if Date is passed', () => {
      expect(DateHelper.toDate(date)).toEqual(
        new Date('1990-12-03T00:00:00.000Z'),
      )
    })
  })

  describe('DateHelper.parse', () => {
    test('should return formatted date by default', () => {
      expect(DateHelper.parse('1990-12')).toEqual(
        new Date('1990-12-01T00:00:00.000Z'),
      )
    })

    test('should return formatted date according to given "HH:mm" format', () => {
      const currentDate = DateHelper.toFormat(
        new Date(),
        DEFAULT_SERVER_DATE_FORMAT,
      )

      expect(DateHelper.parse('12:30', 'HH:mm')).toEqual(
        new Date(`${currentDate}T12:30:00.000Z`),
      )
    })
  })

  describe('DateHelper.isWeekend', () => {
    test('should return true if is weekend', () => {
      expect(DateHelper.isWeekend(new Date('1990-12-02'))).toBe(true)
    })

    test('should return false if is NOT weekend', () => {
      expect(DateHelper.isWeekend(date)).toBe(false)
    })
  })

  describe('DateHelper.getTimezone', () => {
    test('should return current time zone', () => {
      expect(DateHelper.getTimezone()).toBe('UTC')
    })
  })

  describe('DateHelper.subYears', () => {
    test('should return result of subtracting positive number of years passed from the passed date', () => {
      expect(DateHelper.subYears(date, 2)).toEqual(
        new Date('1988-12-03T00:00:00.000Z'),
      )
    })

    test('should return result of subtracting negative number of years passed from the passed date', () => {
      expect(DateHelper.subYears(date, -2)).toEqual(
        new Date('1992-12-03T00:00:00.000Z'),
      )
    })
  })

  describe('DateHelper.addYears', () => {
    test('should return result of adding positive number of years passed from the passed date', () => {
      expect(DateHelper.addYears(date, 2)).toEqual(
        new Date('1992-12-03T00:00:00.000Z'),
      )
    })

    test('should return result of adding negative number of years passed from the passed date', () => {
      expect(DateHelper.addYears(date, -2)).toEqual(
        new Date('1988-12-03T00:00:00.000Z'),
      )
    })
  })

  describe('DateHelper.isSameOrBeforeDay', () => {
    test('should return true if passed day is before than compared day', () => {
      expect(DateHelper.isSameOrBeforeDay(date, new Date('1990-12-4'))).toBe(
        true,
      )
    })

    test('should return true if passed day is same as compared day', () => {
      expect(DateHelper.isSameOrBeforeDay(date, new Date('1990-12-3'))).toBe(
        true,
      )
    })

    test('should return false if passed day is after than compared day', () => {
      expect(DateHelper.isSameOrBeforeDay(date, new Date('1990-12-2'))).toBe(
        false,
      )
    })
  })

  describe('DateHelper.isSameOrAftereDay', () => {
    test('should return true if passed day is after than compared day', () => {
      expect(DateHelper.isSameOrAftereDay(date, new Date('1990-12-2'))).toBe(
        true,
      )
    })

    test('should return false if passed day is same as compared day', () => {
      expect(DateHelper.isSameOrAftereDay(date, new Date('1990-12-3'))).toBe(
        true,
      )
    })

    test('should return false if passed day is than than compared day', () => {
      expect(DateHelper.isSameOrAftereDay(date, new Date('1990-12-4'))).toBe(
        false,
      )
    })
  })

  describe('DateHelper.isBeforeMonth', () => {
    test('should return true if passed month is before than compared month', () => {
      expect(DateHelper.isBeforeMonth(date, new Date('1991-01-3'))).toBe(true)
    })

    test('should return false if passed month is same as compared month', () => {
      expect(DateHelper.isBeforeMonth(date, new Date('1990-12-3'))).toBe(false)
    })

    test('should return false if passed month is after than compared month', () => {
      expect(DateHelper.isBeforeMonth(date, new Date('1990-11-2'))).toBe(false)
    })
  })

  describe('DateHelper.isCurrentMonth', () => {
    describe('when passing a string', () => {
      test('should return true if passed month is current month', () => {
        const dateString = DateHelper.toServerDateFormat(new Date())

        expect(DateHelper.isCurrentMonth(dateString)).toBe(true)
      })

      test('should return false if passed before month is not current month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const dateString = DateHelper.toServerDateFormat(
          new Date(currDate.setMonth(currDate.getMonth() - 1)),
        )

        expect(DateHelper.isCurrentMonth(dateString)).toBe(false)
      })

      test('should return false if passed after month is after than compared month', () => {
        const currDate = new Date()
        const dateString = DateHelper.toServerDateFormat(
          new Date(currDate.setMonth(currDate.getMonth() + 1)),
        )

        expect(DateHelper.isCurrentMonth(dateString)).toBe(false)
      })
    })

    describe('when passing a Date', () => {
      test('should return true if passed month is current month', () => {
        const dateString = new Date()

        expect(DateHelper.isCurrentMonth(dateString)).toBe(true)
      })

      test('should return false if passed before month is not current month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const dateString = new Date(currDate.setMonth(currDate.getMonth() - 1))

        expect(DateHelper.isCurrentMonth(dateString)).toBe(false)
      })

      test('should return false if passed after month is after than compared month', () => {
        const currDate = new Date()
        const dateString = new Date(currDate.setMonth(currDate.getMonth() + 1))

        expect(DateHelper.isCurrentMonth(dateString)).toBe(false)
      })
    })
  })

  describe('DateHelper.isPreviousMonth', () => {
    describe('when passing a string', () => {
      test('should return true if passed month is previous month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const dateString = DateHelper.toServerDateFormat(
          new Date(currDate.setMonth(currDate.getMonth() - 1)),
        )

        expect(DateHelper.isPreviousMonth(dateString)).toBe(true)
      })

      test('should return false if passed month is same month', () => {
        const dateString = DateHelper.toServerDateFormat(new Date())

        expect(DateHelper.isPreviousMonth(dateString)).toBe(false)
      })

      test('should return false if passed month is not previous month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const dateString = DateHelper.toServerDateFormat(
          new Date(currDate.setMonth(currDate.getMonth() - 2)),
        )

        expect(DateHelper.isPreviousMonth(dateString)).toBe(false)
      })

      test('should return false if passed after month is after than compared month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const dateString = DateHelper.toServerDateFormat(
          new Date(currDate.setMonth(currDate.getMonth() + 1)),
        )

        expect(DateHelper.isCurrentMonth(dateString)).toBe(false)
      })
    })

    describe('when passing a Date', () => {
      test('should return true if passed month is previous month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const passedDate = new Date(currDate.setMonth(currDate.getMonth() - 1))

        expect(DateHelper.isPreviousMonth(passedDate)).toBe(true)
      })

      test('should return false if passed month is same month', () => {
        const currDate = new Date()

        expect(DateHelper.isPreviousMonth(currDate)).toBe(false)
      })

      test('should return false if passed month is not previous month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const passedDate = new Date(currDate.setMonth(currDate.getMonth() - 2))

        expect(DateHelper.isPreviousMonth(passedDate)).toBe(false)
      })

      test('should return false if passed after month is after than compared month', () => {
        const currDate = new Date()
        currDate.setDate(1)
        const passedDate = new Date(currDate.setMonth(currDate.getMonth() + 1))

        expect(DateHelper.isCurrentMonth(passedDate)).toBe(false)
      })
    })
  })

  describe('DateHelper.getDayOfTheWeek', () => {
    test('should return day of the week - "Monday"', () => {
      expect(DateHelper.getDayOfTheWeek(date)).toBe('Monday')
    })

    test('should return day of the week - "Tuesday"', () => {
      expect(DateHelper.getDayOfTheWeek(new Date('1990-12-04'))).toBe('Tuesday')
    })

    test('should return day of the week - "Wednesday"', () => {
      expect(DateHelper.getDayOfTheWeek(new Date('1990-12-05'))).toBe(
        'Wednesday',
      )
    })

    test('should return day of the week - "Thursday"', () => {
      expect(DateHelper.getDayOfTheWeek(new Date('1990-12-06'))).toBe(
        'Thursday',
      )
    })

    test('should return day of the week - "Friday"', () => {
      expect(DateHelper.getDayOfTheWeek(new Date('1990-12-07'))).toBe('Friday')
    })

    test('should return day of the week - "Saturday"', () => {
      expect(DateHelper.getDayOfTheWeek(new Date('1990-12-08'))).toBe(
        'Saturday',
      )
    })

    test('should return day of the week - "Sunday"', () => {
      expect(DateHelper.getDayOfTheWeek(new Date('1990-12-09'))).toBe('Sunday')
    })
  })

  describe('DateHelper.getEndOfMonth', () => {
    describe('when passing a string', () => {
      test('should return end date of month', () => {
        expect(DateHelper.getEndOfMonth('1990-12-3')).toEqual(
          new Date('1990-12-31T23:59:59.999Z'),
        )
      })
    })

    describe('when passing a Date', () => {
      test('should return end date of month', () => {
        expect(DateHelper.getEndOfMonth(date)).toEqual(
          new Date('1990-12-31T23:59:59.999Z'),
        )
      })
    })
  })

  describe('DateHelper.getStartOfMonth', () => {
    describe('when passing a string', () => {
      test('should return end date of month', () => {
        expect(DateHelper.getStartOfMonth('1990-12-3')).toEqual(
          new Date('1990-12-01T00:00:00.000Z'),
        )
      })
    })

    describe('when passing a Date', () => {
      test('should return end date of month', () => {
        expect(DateHelper.getStartOfMonth(date)).toEqual(
          new Date('1990-12-01T00:00:00.000Z'),
        )
      })
    })
  })

  describe('DateHelper.getTimeOfDay', () => {
    describe('when passing a string', () => {
      test('should return time in format "HH:mm"', () => {
        expect(DateHelper.getTimeOfDay('1990-12-3 12:30:00')).toBe('12:30')
      })
    })

    describe('when passing a Date', () => {
      test('should return time in format "HH:mm"', () => {
        expect(DateHelper.getTimeOfDay(date)).toBe('00:00')
      })
    })
  })
})
