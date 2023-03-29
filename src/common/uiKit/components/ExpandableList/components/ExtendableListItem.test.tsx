import React from 'react'

import { render, waitFor } from '@testEnv/utils'

import { ExtendableListItem } from './ExtendableListItem'
import * as T from './ExtendableListItem.types'
import { TEST_ID_ADD, TEST_ID_REMOVE } from './constants/testIds'

describe('<ExtendableListItem />', () => {
  const CONTENT_TEXT = 'test content'

  const renderExtendableListItem = ({
    canAdd = true,
    canRemove = true,
    onRemove = () => {},
    onAdd = () => {},
  }: Partial<T.Props>) =>
    render(
      <ExtendableListItem
        canAdd={canAdd}
        canRemove={canRemove}
        onAdd={onAdd}
        onRemove={onRemove}>
        <div>{CONTENT_TEXT}</div>
      </ExtendableListItem>,
    )

  test('render correct content', async () => {
    const { getByText } = renderExtendableListItem({})

    await waitFor(() => {
      expect(getByText(CONTENT_TEXT)).toContainHTML(CONTENT_TEXT)
    })
  })

  describe('when "ExtendableListItem" control elements exist', () => {
    describe('when change control visibility', () => {
      it('should not render control buttons', async () => {
        const { queryAllByRole } = renderExtendableListItem({
          canAdd: false,
          canRemove: false,
        })

        expect(queryAllByRole('button').length).toEqual(0)
      })

      it('should render "Add" button only', async () => {
        const { queryByTestId, getByTestId } = renderExtendableListItem({
          canRemove: false,
        })

        await waitFor(() =>
          expect(queryByTestId(TEST_ID_REMOVE)).not.toBeInTheDocument(),
        )
        expect(getByTestId(TEST_ID_ADD)).toBeInTheDocument()
      })

      it('should render "Remove" button only', async () => {
        const { queryByTestId, getByTestId } = renderExtendableListItem({
          canAdd: false,
        })

        await waitFor(() =>
          expect(queryByTestId(TEST_ID_ADD)).not.toBeInTheDocument(),
        )
        expect(getByTestId(TEST_ID_REMOVE)).toBeInTheDocument()
      })

      it('should render all control buttons', async () => {
        const { getByTestId } = renderExtendableListItem({})

        expect(getByTestId(TEST_ID_REMOVE)).toBeInTheDocument()
        expect(getByTestId(TEST_ID_ADD)).toBeInTheDocument()
      })
    })

    it('should trigger onAdd', async () => {
      const onAdd = jest.fn(() => {})

      const { user, getByTestId } = renderExtendableListItem({ onAdd })
      await user.click(getByTestId(TEST_ID_ADD))

      expect(onAdd).toHaveBeenCalledTimes(1)
    })

    it('should trigger onRemove', async () => {
      const onRemove = jest.fn(() => {})

      const { user, getByTestId } = renderExtendableListItem({ onRemove })
      await user.click(getByTestId(TEST_ID_REMOVE))

      expect(onRemove).toHaveBeenCalledTimes(1)
    })
  })
})
