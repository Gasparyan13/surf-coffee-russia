/* eslint-disable no-underscore-dangle */
import { ArrayElement } from '@common/types/ArrayElement'

import { act, renderHook } from '@testEnv/utils'

import { LOCAL_STORAGE_COLLAPSED_ROWS } from '../useSharedFinancialReportData'
import { useSaveCollapsedRows } from './useSaveCollapsedRows'
import * as T from './useSaveCollapsedRows.types'

const ROWS = [
  { id: 11, title: '11' },
  { id: 22, title: '22' },
  { id: 33, title: '33' },
  { id: 44, title: '44' },
  { id: 55, title: '55' },
]
const TABLE_ROW_ID = ROWS[ROWS.length - 1].id
const ALL_ROWS_IDS = ROWS.map((row) => row.id)
const getRandomizedRows = () =>
  ALL_ROWS_IDS.map((value) => ({
    value,
    sort: Math.random(),
  }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

const getLocalStorage = (key = LOCAL_STORAGE_COLLAPSED_ROWS) => {
  const receivedItem = localStorage.getItem(key)
  if (receivedItem) return JSON.parse(receivedItem)
}

describe('useSaveCollapsedRows()', () => {
  const mockOnChangeExpandedRows = () => undefined

  const renderUseOpenReportCell = ({
    rows = ROWS,
    onChangeExpandedRows = mockOnChangeExpandedRows,
    localStorageKey = LOCAL_STORAGE_COLLAPSED_ROWS,
  }: Partial<T.UseSaveCollapsedRowsParams<ArrayElement<typeof ROWS>>>) =>
    renderHook(
      (
        renderProps: Partial<
          T.UseSaveCollapsedRowsParams<ArrayElement<typeof ROWS>>
        >,
      ) =>
        useSaveCollapsedRows({
          rows,
          onChangeExpandedRows,
          localStorageKey,
          ...renderProps,
        }),
    )

  beforeEach(() => {
    localStorage.clear()
  })

  describe('when render hook', () => {
    test('return default params', async () => {
      const { result } = renderUseOpenReportCell({})

      expect(result.current.collapsedRowsIds).toEqual([])
      expect(typeof result.current.handleToggleExpandRow).toBe('function')
    })

    describe('when "handleToggleExpandRow" is called', () => {
      describe('when selecting one table row', () => {
        it('should append and delete "TABLE_ROW_ID" in "collapsedRowsIds"', async () => {
          const { result } = renderUseOpenReportCell({})

          act(() => {
            result.current.handleToggleExpandRow(TABLE_ROW_ID)
          })
          expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])

          act(() => {
            result.current.handleToggleExpandRow(TABLE_ROW_ID)
          })
          expect(result.current.collapsedRowsIds).toEqual([])
        })

        it('should append and delete "TABLE_ROW_ID" in localStorage', async () => {
          const { result } = renderUseOpenReportCell({})

          expect(localStorage.__STORE__).toEqual({})

          act(() => {
            result.current.handleToggleExpandRow(TABLE_ROW_ID)
          })
          expect(getLocalStorage()).toEqual([TABLE_ROW_ID])

          act(() => {
            result.current.handleToggleExpandRow(TABLE_ROW_ID)
          })
          expect(getLocalStorage()).toEqual([])
        })
      })

      describe('when selecting multiple table rows', () => {
        it('should append and delete "TABLE_ROW_ID" in "collapsedRowsIds" in order of calls', async () => {
          const { result } = renderUseOpenReportCell({})

          // Making sure rows are beeing added in same order
          const randomRowsAppendOrder = getRandomizedRows()
          randomRowsAppendOrder.forEach((row, index) => {
            act(() => {
              result.current.handleToggleExpandRow(row)
            })
            expect(result.current.collapsedRowsIds).toEqual(
              randomRowsAppendOrder.slice(0, index + 1),
            )
          })

          // Making sure rows are beeing deleted in same order
          const randomRowsDeleteOrder = getRandomizedRows()
          randomRowsDeleteOrder.forEach((row) => {
            act(() => {
              result.current.handleToggleExpandRow(row)
            })
            const rowIdIndex = randomRowsAppendOrder.findIndex(
              (deletedRow) => deletedRow === row,
            )
            randomRowsAppendOrder.splice(rowIdIndex, 1)
            expect(result.current.collapsedRowsIds).toEqual(
              randomRowsAppendOrder,
            )
          })
        })

        it('should append and delete "TABLE_ROW_ID" in localStorage in order of calls', async () => {
          const { result } = renderUseOpenReportCell({})

          expect(localStorage.__STORE__).toEqual({})

          // Making sure rows are beeing added in same order
          const randomRowsAppendOrder = getRandomizedRows()
          randomRowsAppendOrder.forEach((row, index) => {
            act(() => {
              result.current.handleToggleExpandRow(row)
            })
            expect(getLocalStorage()).toEqual(
              randomRowsAppendOrder.slice(0, index + 1),
            )
          })

          // Making sure rows are beeing deleted in same order
          const randomRowsDeleteOrder = getRandomizedRows()
          randomRowsDeleteOrder.forEach((row) => {
            act(() => {
              result.current.handleToggleExpandRow(row)
            })
            const rowIdIndex = randomRowsAppendOrder.findIndex(
              (deletedRow) => deletedRow === row,
            )
            randomRowsAppendOrder.splice(rowIdIndex, 1)
            expect(getLocalStorage()).toEqual(randomRowsAppendOrder)
          })
        })
      })
    })

    describe('when "rows" are changed', () => {
      it('should call onChangeExpandedRows and pass collapsed rows ids', async () => {
        const onChangeExpandedRows = jest.fn()
        const { result, rerender } = renderUseOpenReportCell({
          onChangeExpandedRows,
          rows: ROWS,
        })

        expect(onChangeExpandedRows).toHaveBeenCalledTimes(1)

        act(() => {
          result.current.handleToggleExpandRow(TABLE_ROW_ID)
        })
        expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])

        expect(onChangeExpandedRows).toHaveBeenCalledTimes(2)

        rerender({
          rows: ROWS.slice(-1),
          localStorageKey: LOCAL_STORAGE_COLLAPSED_ROWS,
        })
        expect(onChangeExpandedRows).toHaveBeenCalledTimes(3)
        expect(onChangeExpandedRows).toHaveBeenLastCalledWith([TABLE_ROW_ID])
      })

      describe('when toggling "handleToggleExpandRow"', () => {
        it('should NOT change "collapsedRowsIds" export if previous rowId is deleted', async () => {
          const { result, rerender } = renderUseOpenReportCell({
            rows: ROWS,
          })

          act(() => {
            result.current.handleToggleExpandRow(TABLE_ROW_ID)
          })
          expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])

          rerender({
            rows: ROWS.slice(-1),
            localStorageKey: LOCAL_STORAGE_COLLAPSED_ROWS,
          })

          expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])
        })

        it('should NOT change "collapsedRowsIds" export if previous rowId is stayed', async () => {
          const { result, rerender } = renderUseOpenReportCell({
            rows: ROWS,
          })

          act(() => {
            result.current.handleToggleExpandRow(TABLE_ROW_ID)
          })
          expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])

          rerender({
            rows: getRandomizedRows().map((deletedRow) =>
              ROWS.find((row) => row.id === deletedRow),
            ) as { id: number; title: string }[],
            localStorageKey: LOCAL_STORAGE_COLLAPSED_ROWS,
          })

          expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])
        })
      })
    })

    describe('when "localStorageKey" is changed', () => {
      const newLocalStorageKey = 'NEW_LOCAL_STORAGE_KEY'

      it('should NOT change "collapsedRowsIds"', async () => {
        const { result, rerender } = renderUseOpenReportCell({})

        act(() => {
          result.current.handleToggleExpandRow(TABLE_ROW_ID)
        })
        expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])

        rerender({
          localStorageKey: newLocalStorageKey,
        })

        expect(result.current.collapsedRowsIds).toEqual([TABLE_ROW_ID])
      })

      it('should save localStorage data to new localStorageKey', async () => {
        const { result, rerender } = renderUseOpenReportCell({})
        const secondRowId = ROWS[2].id

        act(() => {
          result.current.handleToggleExpandRow(TABLE_ROW_ID)
        })
        expect(getLocalStorage()).toEqual([TABLE_ROW_ID])

        rerender({
          localStorageKey: newLocalStorageKey,
        })

        expect(getLocalStorage(newLocalStorageKey)).toEqual(undefined)
        act(() => {
          result.current.handleToggleExpandRow(secondRowId)
        })

        expect(getLocalStorage(newLocalStorageKey)).toEqual([
          TABLE_ROW_ID,
          secondRowId,
        ])
      })
    })
  })
})
