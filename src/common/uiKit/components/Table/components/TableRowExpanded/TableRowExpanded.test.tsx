import React from 'react'

import { fireEvent, render } from '@testEnv/utils'

import { TableRowExpanded } from './TableRowExpanded'

describe('<TableRowExpanded />', () => {
  const COLUMNS_LENGTH = 1
  const CONTENT_TEXT = 'test content'
  const NESTED_CONTENT_TEXT = 'nested test content'

  const renderTableRowExpanded = () =>
    render(
      <table>
        <tbody>
          <TableRowExpanded
            columnsLength={COLUMNS_LENGTH}
            content={NESTED_CONTENT_TEXT}>
            <th>{CONTENT_TEXT}</th>
          </TableRowExpanded>
        </tbody>
      </table>,
    )

  test('render correct content', async () => {
    const { getByText } = renderTableRowExpanded()

    expect(getByText(CONTENT_TEXT)).toContainHTML(CONTENT_TEXT)
  })

  it('should show expanded content when click on row', async () => {
    const { getByText } = renderTableRowExpanded()

    fireEvent.click(getByText(CONTENT_TEXT))

    expect(getByText(NESTED_CONTENT_TEXT)).toContainHTML(NESTED_CONTENT_TEXT)
  })
})
