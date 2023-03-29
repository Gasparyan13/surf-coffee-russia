import React from 'react'

import { fireEvent, render, waitFor } from '@testEnv/utils'

import { TableCellWithTooltip } from './TableCellWithTooltip'

describe('<TableCellWithTooltip />', () => {
  const CONTENT_TEXT = 'test content'
  const TOOLTIP_TEXT = 'test tooltip'

  const renderTableCellWithTooltip = () =>
    render(
      <table>
        <tbody>
          <tr>
            <TableCellWithTooltip tooltipTitle={TOOLTIP_TEXT}>
              {CONTENT_TEXT}
            </TableCellWithTooltip>
          </tr>
        </tbody>
      </table>,
    )

  test('render correct content', async () => {
    const { getByText } = renderTableCellWithTooltip()

    await waitFor(() => {
      expect(getByText(CONTENT_TEXT)).toContainHTML(CONTENT_TEXT)
    })
  })

  it('should show correct tooltip message on hover', async () => {
    const { getByText } = renderTableCellWithTooltip()

    fireEvent.mouseEnter(getByText(CONTENT_TEXT))

    await waitFor(() => {
      expect(getByText(TOOLTIP_TEXT)).toContainHTML(TOOLTIP_TEXT)
    })
  })
})
