import { Column } from 'fixed-data-table-2'
import React from 'react'

import { render, screen, waitFor } from '@testEnv/utils'

import { TableBody } from './TableBody'
import * as T from './TableBody.types'

const MOCK_WINDOW_SIZE = { width: 1920, height: 1080 }

jest.mock('@hooks', () => ({
  useWindowSize: () => MOCK_WINDOW_SIZE,
}))

describe('<TableBody />', () => {
  const TEST_CONTENT = 'content'

  // not real mock
  // just disable "buffer set: 0" messages on tests
  // provided by "getBufferRowCount (node_modules/fixed-data-table-2/internal/selectors/roughHeights.js:185:13)"
  const log = jest.spyOn(console, 'log').mockImplementation(() => {})

  const wrapper = ({
    rowsCount = 1,
    isLoading = false,
    getFooterHeight = () => 0,
    onResize,
  }: Partial<T.Props>) => (
    <TableBody
      getFooterHeight={getFooterHeight}
      isLoading={isLoading}
      rowsCount={rowsCount}
      onResize={onResize}>
      <Column
        allowCellsRecycling
        fixed
        cell={TEST_CONTENT}
        columnKey="test"
        width={100}
      />
    </TableBody>
  )

  const renderTableBody = (props: Partial<T.Props>) => render(wrapper(props))

  afterAll(() => {
    log.mockClear()
  })

  afterEach(() => {
    MOCK_WINDOW_SIZE.height = 1080
    MOCK_WINDOW_SIZE.width = 1920

    jest.resetAllMocks()
  })

  it('should render content', async () => {
    renderTableBody({})

    expect(screen.getByText(TEST_CONTENT)).toBeInTheDocument()
  })

  describe('when show progressbar', () => {
    it('should render progressbar', async () => {
      renderTableBody({ isLoading: true })

      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should NOT render progressbar', async () => {
      renderTableBody({ isLoading: false })

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })

  describe('when resize', () => {
    it('should call "onResize" with dimensions when render first time', async () => {
      const mockOnResize = jest.fn()

      renderTableBody({ onResize: mockOnResize })

      await waitFor(async () => {
        expect(mockOnResize).toHaveBeenCalledTimes(1)
      })
    })

    it('should call "onResize" if window size changed', async () => {
      const mockOnResize = jest.fn()

      const { rerender } = renderTableBody({ onResize: mockOnResize })

      // first call after render
      await waitFor(async () => {
        expect(mockOnResize).toHaveBeenCalledTimes(1)
      })

      MOCK_WINDOW_SIZE.height = 500

      rerender(wrapper({ onResize: mockOnResize }))

      // rootRef.current has no dimensions in tests, so we can't test the new dimension value
      await waitFor(async () => {
        expect(mockOnResize).toHaveBeenCalledTimes(2)
      })
    })
  })

  it('should call "getFooterHeight"', async () => {
    const mockGetFooterHeight = jest.fn().mockImplementation(() => 100)

    renderTableBody({ getFooterHeight: mockGetFooterHeight })

    await waitFor(async () => {
      expect(mockGetFooterHeight).toHaveBeenCalledTimes(1)
    })
  })
})
