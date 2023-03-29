import React from 'react'

import { fireEvent, render } from '@testEnv/utils'

import { TableRow } from './TableRow'

describe('<TableRow />', () => {
  const TEST_INDEX = 1
  const CONTENT_TEXT = 'test content'

  const onClickMock = jest.fn(() => {})

  const renderTableRow = () =>
    render(
      <table>
        <tbody>
          <TableRow index={TEST_INDEX} onClick={onClickMock}>
            <th>{CONTENT_TEXT}</th>
          </TableRow>
        </tbody>
      </table>,
    )

  test('render correct content', async () => {
    const { getByText } = renderTableRow()

    expect(getByText(CONTENT_TEXT)).toContainHTML(CONTENT_TEXT)
  })

  it('should call function with row index when click', async () => {
    const { getByText } = renderTableRow()

    fireEvent.click(getByText(CONTENT_TEXT))

    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(onClickMock).toHaveBeenCalledWith(TEST_INDEX)
  })
})
