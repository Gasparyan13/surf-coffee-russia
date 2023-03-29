import React from 'react'

import { theme } from '@common/providers/ThemeProvider/theme'

import { reportBudgetItem } from '@testEnv/mocks/api/analytics'
import { render } from '@testEnv/utils'

import { ParsedBudgetItem } from '../../TableBody.types'
import { SidebarCollapseCell } from './SidebarCollapseCell'
import { Props } from './SidebarCollapseCell.types'
import { TEST_ID_CELL_CONTENT_CONTAINER } from './constants/testIds'

const testItem: ParsedBudgetItem = {
  budgetItemId: 1,
  budgetItemName: 'Выручка',
  hasChildren: true,
  level: 1,
  months: {
    ...reportBudgetItem.months,
  },
  total: {
    ...reportBudgetItem.total,
  },
}

describe('<SidebarCollapseCell />', () => {
  const renderSidebarCollapseCell = ({
    searchValue = '',
    data = testItem,
    onToggleExpandRow = () => {},
  }: Partial<Props<ParsedBudgetItem>>) =>
    render(
      <SidebarCollapseCell
        data={data}
        searchValue={searchValue}
        onToggleExpandRow={onToggleExpandRow}
      />,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render correct content', async () => {
    const { getByText } = renderSidebarCollapseCell({})

    expect(getByText(testItem.budgetItemName)).toBeInTheDocument()
  })

  describe('when has "searchValue"', () => {
    const searchTestItem: ParsedBudgetItem = {
      budgetItemId: 1,
      budgetItemName: 'Выручка',
      hasChildren: false,
      level: 2,
      months: {
        ...reportBudgetItem.months,
      },
      total: {
        ...reportBudgetItem.total,
      },
    }

    test('render highlighting text content', async () => {
      const { getByTestId } = renderSidebarCollapseCell({
        data: searchTestItem,
        searchValue: 'Вы',
      })

      const content = getByTestId(TEST_ID_CELL_CONTENT_CONTAINER)

      expect(content.querySelectorAll('mark').length).toEqual(1)
    })

    describe('when highlight content container', () => {
      it('should highlight content container if item has NO children', async () => {
        const { getByTestId } = renderSidebarCollapseCell({
          data: searchTestItem,
          searchValue: 'Вы',
        })

        const content = getByTestId(TEST_ID_CELL_CONTENT_CONTAINER)

        expect(content).toHaveStyleRule('background-color', theme.colors.grey)
      })

      it('should NOT highlight content container if item has children', async () => {
        const { getByTestId } = renderSidebarCollapseCell({
          data: { ...searchTestItem, hasChildren: true },
          searchValue: 'Вы',
        })

        const content = getByTestId(TEST_ID_CELL_CONTENT_CONTAINER)

        expect(content).not.toHaveStyleRule(
          'background-color',
          theme.colors.grey,
        )
      })
    })
  })
})
