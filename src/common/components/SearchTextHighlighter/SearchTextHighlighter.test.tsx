import React from 'react'

import { FONT_WEIGHT_BOLD } from '@uiKit/constants/fontWeight'

import { render } from '@testEnv/utils'

import { SearchTextHighlighter } from './SearchTextHighlighter'
import { Props } from './SearchTextHighlighter.types'

describe('<SearchTextHighlighter />', () => {
  const getMarks = (root: HTMLElement) => root.querySelectorAll('mark')

  const renderSearchTextHighlighter = ({
    value = 'test',
    caseSensitive = false,
    searchWords = '',
  }: Partial<Props>) =>
    render(
      <SearchTextHighlighter
        caseSensitive={caseSensitive}
        searchWords={searchWords}
        value={value}
      />,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render correct content', async () => {
    const { getByText } = renderSearchTextHighlighter({ value: 'Test' })

    expect(getByText('Test')).toBeInTheDocument()
  })

  test('render content without highlighting', async () => {
    const { container } = renderSearchTextHighlighter({})

    expect(getMarks(container).length).toEqual(0)
  })

  describe('when highlighting text', () => {
    it('should make bold text for searching words', async () => {
      const { container } = renderSearchTextHighlighter({
        value: 'Test',
        searchWords: 's',
      })

      const marks = getMarks(container)

      expect(marks.length).toEqual(1)
      expect(marks[0]).toContainHTML('s')
      expect(marks[0]).toHaveStyle(`font-weight: ${FONT_WEIGHT_BOLD}`)
      expect(marks[0]).toHaveStyle('background-color: transparent')
    })

    describe('when "caseSensitive"', () => {
      it('should render content without highlighting if passed NOT right case', async () => {
        const { container } = renderSearchTextHighlighter({
          value: 'No',
          searchWords: 'n',
          caseSensitive: true,
        })

        const marks = getMarks(container)

        expect(marks.length).toEqual(0)
      })

      it('should render content with highlighting if passed right case', async () => {
        const { container } = renderSearchTextHighlighter({
          value: 'no',
          searchWords: 'n',
          caseSensitive: true,
        })

        const marks = getMarks(container)

        expect(marks.length).toEqual(1)
      })
    })

    describe('when NOT "caseSensitive"', () => {
      it('should render content with highlighting if passed NOT right case', async () => {
        const { container } = renderSearchTextHighlighter({
          value: 'No',
          searchWords: 'n',
          caseSensitive: false,
        })

        const marks = getMarks(container)

        expect(marks.length).toEqual(1)
      })

      it('should render content with highlighting if passed right case', async () => {
        const { container } = renderSearchTextHighlighter({
          value: 'no',
          searchWords: 'n',
          caseSensitive: false,
        })

        const marks = getMarks(container)

        expect(marks.length).toEqual(1)
      })
    })
  })
})
