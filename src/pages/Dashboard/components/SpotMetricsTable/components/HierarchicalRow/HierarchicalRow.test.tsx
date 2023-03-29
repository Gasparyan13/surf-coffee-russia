import React from 'react'

import { TableCell } from '@uiKit'

import { render } from '@testEnv/utils'

import { HierarchicalRow } from './HierarchicalRow'
import { Props } from './HierarchicalRow.types'

const TEST_CONTENT = 'test'

describe('<HierarchicalRow />', () => {
  const renderHierarchicalRow = ({ index = 0, level = 0 }: Partial<Props>) =>
    render(
      <table>
        <tbody>
          <HierarchicalRow index={index} level={level}>
            <TableCell>{TEST_CONTENT}</TableCell>
          </HierarchicalRow>
        </tbody>
      </table>,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render correct content', async () => {
    const { getByText } = renderHierarchicalRow({})

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
  })
})
