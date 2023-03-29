import React from 'react'

import { render } from '@testEnv/utils'

import { TableCell } from './TableCell'

describe('<TableCell />', () => {
  const CONTENT_TEXT = 'test content'

  const renderTableCell = () =>
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>{CONTENT_TEXT}</TableCell>
          </tr>
        </tbody>
      </table>,
    )

  test('render correct content', async () => {
    const { getByText } = renderTableCell()

    expect(getByText(CONTENT_TEXT)).toContainHTML(CONTENT_TEXT)
  })
})
