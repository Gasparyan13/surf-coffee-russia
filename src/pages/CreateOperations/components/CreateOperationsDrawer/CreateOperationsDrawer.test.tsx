import React from 'react'

import { render, screen, waitFor } from '@testEnv/utils'

import { CreateOperationsDrawer } from './CreateOperationsDrawer'
import * as T from './CreateOperationsDrawer.types'

describe('<CreateOperationsDrawer />', () => {
  const TITLE_TEXT = 'test title'
  const CONTENT_TEXT = 'test content'

  const renderDrawer = ({
    title = TITLE_TEXT,
    open = true,
    onClose = () => {},
    onAdd = () => {},
    disabled = false,
    isEdit = false,
  }: Partial<T.Props>) =>
    render(
      <CreateOperationsDrawer
        disabled={disabled}
        isEdit={isEdit}
        open={open}
        title={title}
        onAdd={onAdd}
        onClose={onClose}>
        <div>{CONTENT_TEXT}</div>
      </CreateOperationsDrawer>,
    )

  describe('when render "CreateOperationsDrawer" content', () => {
    it('should not render content if open === false', async () => {
      const { queryByText } = renderDrawer({ open: false })

      await waitFor(() =>
        expect(queryByText(CONTENT_TEXT)).not.toBeInTheDocument(),
      )
    })

    it('should render content if open === true', async () => {
      const { getByText } = renderDrawer({})

      expect(getByText(CONTENT_TEXT)).toBeInTheDocument()
    })
  })

  test('title contains correct text', async () => {
    const { getByText } = renderDrawer({})

    expect(getByText(TITLE_TEXT)).toContainHTML(TITLE_TEXT)
  })

  describe('when change "isEdit" mode', () => {
    test('render "Save" label', async () => {
      renderDrawer({ isEdit: true })

      expect(screen.getByText('Сохранить')).toBeInTheDocument()
    })

    test('render "Add" label', async () => {
      renderDrawer({})

      expect(screen.getByText('Добавить')).toBeInTheDocument()
    })

    test('render "Back" button', async () => {
      renderDrawer({ isEdit: true })

      expect(screen.getByText('Назад')).toBeInTheDocument()
    })
  })

  describe('when render on "CreateOperationsDrawer" controls', () => {
    describe('when "disabled=false"', () => {
      it('should trigger onAdd', async () => {
        const onAdd = jest.fn(() => {})

        const { user } = renderDrawer({ onAdd })
        await user.click(screen.getByText('Добавить'))

        expect(onAdd).toHaveBeenCalledTimes(1)
      })

      it('should trigger onClose', async () => {
        const onClose = jest.fn(() => {})

        const { user } = renderDrawer({ onClose })
        await user.click(screen.getByText('Отменить'))

        expect(onClose).toHaveBeenCalledTimes(1)
      })
    })

    describe('when "disabled=true"', () => {
      it('should disable onAdd action button', async () => {
        renderDrawer({ disabled: true })

        expect(screen.getByText('Добавить')).toBeDisabled()
      })

      it('should disable onClose action button', async () => {
        renderDrawer({ disabled: true })

        expect(screen.getByText('Отменить')).toBeDisabled()
      })
    })
  })
})
