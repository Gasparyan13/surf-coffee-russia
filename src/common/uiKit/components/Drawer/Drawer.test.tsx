import React from 'react'

import { render, waitFor } from '@testEnv/utils'

import { Drawer } from './Drawer'
import * as T from './Drawer.types'
import { TEST_ID_CLOSE } from './components/Header/constants/testIds'

describe('<Drawer />', () => {
  const HEADER_TEXT = 'test header'
  const CONTENT_TEXT = 'test content'
  const FOOTER_TEXT = 'test footer'
  const SUCCESS_BUTTON_TEXT = 'success'
  const CANCEL_BUTTON_TEXT = 'cancel'

  const renderDrawer = ({
    open = true,
    onClose = () => {},
    ...rest
  }: Partial<T.Props>) =>
    render(
      <Drawer {...rest} open={open} onClose={onClose}>
        <div>{CONTENT_TEXT}</div>
      </Drawer>,
    )

  describe('when render "Drawer" content', () => {
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

  describe('when render header', () => {
    test('render correct header "title" only', async () => {
      const { getByText, queryByTestId, queryByText } = renderDrawer({
        headerProps: { title: HEADER_TEXT },
      })

      expect(getByText(HEADER_TEXT)).toBeInTheDocument()
      expect(queryByText('Назад')).not.toBeInTheDocument()
      expect(queryByTestId(TEST_ID_CLOSE)).not.toBeInTheDocument()
    })

    describe('when render additional header elemnts', () => {
      test('render date as "month fullyear"', async () => {
        const { getByText } = renderDrawer({
          headerProps: { title: HEADER_TEXT, date: '2002-02-01' },
        })

        expect(getByText('февраль 2002')).toBeInTheDocument()
      })

      describe('when render "Back" button', () => {
        test('render "Back" button', async () => {
          const { getByText } = renderDrawer({
            headerProps: {
              title: HEADER_TEXT,
              backButtonProps: {
                onClick: () => {},
              },
            },
          })

          expect(getByText('Назад')).toBeInTheDocument()
        })

        it('should trigger function on click "Back" button', async () => {
          const mockBack = jest.fn(() => {})

          const { user, getByText } = renderDrawer({
            headerProps: {
              title: HEADER_TEXT,
              backButtonProps: {
                onClick: mockBack,
              },
            },
          })

          await user.click(getByText('Назад'))

          expect(mockBack).toHaveBeenCalledTimes(1)
        })
      })

      describe('when render "Close" button', () => {
        test('render "Close" button', async () => {
          const { getByTestId } = renderDrawer({
            headerProps: {
              title: HEADER_TEXT,
              closeButtonProps: {
                onClick: () => {},
              },
            },
          })

          expect(getByTestId(TEST_ID_CLOSE)).toBeInTheDocument()
        })

        it('should trigger function on click "Close" button', async () => {
          const mockClose = jest.fn(() => {})

          const { user, getByTestId } = renderDrawer({
            headerProps: {
              title: HEADER_TEXT,
              closeButtonProps: {
                onClick: mockClose,
              },
            },
          })

          await user.click(getByTestId(TEST_ID_CLOSE))

          expect(mockClose).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('when render footer', () => {
    test('render custom content', async () => {
      const { getByText } = renderDrawer({
        footerProps: { content: FOOTER_TEXT },
      })

      expect(getByText(FOOTER_TEXT)).toBeInTheDocument()
    })

    describe('when render buttons', () => {
      it('should render both buttons', async () => {
        const { getByText } = renderDrawer({
          footerProps: {
            content: FOOTER_TEXT,
            successButtonProps: {
              children: SUCCESS_BUTTON_TEXT,
              onClick: () => {},
            },
            cancelButtonProps: {
              children: CANCEL_BUTTON_TEXT,
              onClick: () => {},
            },
          },
        })

        const successButton = getByText(SUCCESS_BUTTON_TEXT)
        const cancelButton = getByText(CANCEL_BUTTON_TEXT)

        expect(successButton).toBeInTheDocument()
        expect(successButton).toBeEnabled()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      it('should render "success" button only', async () => {
        const { getByText, queryByText } = renderDrawer({
          footerProps: {
            content: FOOTER_TEXT,
            successButtonProps: {
              children: SUCCESS_BUTTON_TEXT,
              onClick: () => {},
            },
          },
        })

        const successButton = getByText(SUCCESS_BUTTON_TEXT)
        const cancelButton = queryByText(CANCEL_BUTTON_TEXT)

        expect(successButton).toBeInTheDocument()
        expect(successButton).toBeEnabled()

        expect(cancelButton).not.toBeInTheDocument()
      })

      it('should render "cancel" button only', async () => {
        const { getByText, queryByText } = renderDrawer({
          footerProps: {
            content: FOOTER_TEXT,
            cancelButtonProps: {
              children: CANCEL_BUTTON_TEXT,
              onClick: () => {},
            },
          },
        })

        const cancelButton = getByText(CANCEL_BUTTON_TEXT)
        const successButton = queryByText(SUCCESS_BUTTON_TEXT)

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()

        expect(successButton).not.toBeInTheDocument()
      })

      describe('when render "success" button', () => {
        it('should render "disabled" button', async () => {
          const { getByText } = renderDrawer({
            footerProps: {
              content: FOOTER_TEXT,
              successButtonProps: {
                children: SUCCESS_BUTTON_TEXT,
                onClick: () => {},
                disabled: true,
              },
            },
          })

          const successButton = getByText(SUCCESS_BUTTON_TEXT)

          expect(successButton).toBeInTheDocument()
          expect(successButton).toBeDisabled()
        })

        it('should call function on button click', async () => {
          const mockCallback = jest.fn(() => {})

          const { getByText, user } = renderDrawer({
            footerProps: {
              content: FOOTER_TEXT,
              successButtonProps: {
                children: SUCCESS_BUTTON_TEXT,
                onClick: mockCallback,
              },
            },
          })

          const successButton = getByText(SUCCESS_BUTTON_TEXT)

          await user.click(successButton)

          expect(mockCallback).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('when render "cancel" button', () => {
      it('should render "disabled" button', async () => {
        const { getByText } = renderDrawer({
          footerProps: {
            content: FOOTER_TEXT,
            cancelButtonProps: {
              children: CANCEL_BUTTON_TEXT,
              onClick: () => {},
              disabled: true,
            },
          },
        })

        const cancelButton = getByText(CANCEL_BUTTON_TEXT)

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeDisabled()
      })

      it('should call function on button click', async () => {
        const mockCallback = jest.fn(() => {})

        const { getByText, user } = renderDrawer({
          footerProps: {
            content: FOOTER_TEXT,
            cancelButtonProps: {
              children: CANCEL_BUTTON_TEXT,
              onClick: mockCallback,
            },
          },
        })

        const cancelButton = getByText(CANCEL_BUTTON_TEXT)

        await user.click(cancelButton)

        expect(mockCallback).toHaveBeenCalledTimes(1)
      })
    })
  })

  test('should render only content', async () => {
    const { getByText, queryByText } = renderDrawer({})

    expect(queryByText(HEADER_TEXT)).not.toBeInTheDocument()
    expect(queryByText(FOOTER_TEXT)).not.toBeInTheDocument()
    expect(getByText(CONTENT_TEXT)).toBeInTheDocument()
  })
})
