import React from 'react'

import { Dialog } from '@uiKit'
import * as T from '@uiKit/components/Dialog/Dialog.types'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'
import {
  TEST_ID_BACK,
  TEST_ID_CLOSE,
} from '@uiKit/components/Dialog/components/constants/testIds'

import { render, screen } from '@testEnv/utils'

const handleClickButtons = () => {}

const success: ButtonProps = {
  onClick: handleClickButtons,
  text: 'Сохранить',
  color: 'primary',
}

const cancel: ButtonProps = {
  onClick: handleClickButtons,
  text: 'Отменить',
  color: 'secondary',
  isVisible: true,
}

describe('<Dialog />', () => {
  const renderDialog = ({
    successButton = success,
    title = 'Dialog title',
    isOpen = true,
    size = 'normal',
    hasIconBack,
    hasCloseIcon,
    cancelButton,
    errorText,
    hasError,
    onBack,
    onClose,
  }: Partial<T.Props>) =>
    render(
      <Dialog
        cancelButton={cancelButton}
        errorText={errorText}
        hasCloseIcon={hasCloseIcon}
        hasError={hasError}
        hasIconBack={hasIconBack}
        isOpen={isOpen}
        size={size}
        successButton={successButton}
        title={title}
        onBack={onBack}
        onClose={onClose}
      />,
    )

  describe('when render dialog', () => {
    it('should render default dialog', async () => {
      renderDialog({})
      const dialogTitle = screen.getByText('Dialog title')
      expect(dialogTitle).toBeInTheDocument()

      const dialogButtonSave = screen.getByText('Сохранить')
      expect(dialogButtonSave).toBeInTheDocument()

      expect(screen.queryByTestId(TEST_ID_BACK)).not.toBeInTheDocument()

      expect(screen.queryByTestId(TEST_ID_CLOSE)).not.toBeInTheDocument()

      expect(screen.queryByText('Отменить')).not.toBeInTheDocument()
    })

    it('should trigger function onClick "Save" button', async () => {
      const saveMock = jest.fn(() => {})

      const { user, getByText } = renderDialog({
        successButton: { ...success, onClick: saveMock },
      })

      await user.click(getByText('Сохранить'))

      expect(saveMock).toHaveBeenCalledTimes(1)
    })

    it('should render back-icon', async () => {
      renderDialog({ hasIconBack: true })

      const backIcon = screen.getByTestId(TEST_ID_BACK)
      expect(backIcon).toBeInTheDocument()
    })

    it('should trigger function onClick "Back" button', async () => {
      const backMock = jest.fn(() => {})

      const { user, getByTestId } = renderDialog({
        hasIconBack: true,
        onBack: backMock,
      })

      await user.click(getByTestId(TEST_ID_BACK))

      expect(backMock).toHaveBeenCalledTimes(1)
    })

    it('should trigger function onClick "Close" button', async () => {
      const closeMock = jest.fn(() => {})

      const { user, getByTestId } = renderDialog({
        hasCloseIcon: true,
        onClose: closeMock,
      })

      await user.click(getByTestId(TEST_ID_CLOSE))

      expect(closeMock).toHaveBeenCalledTimes(1)
    })

    it('should render close-icon', async () => {
      renderDialog({ hasCloseIcon: true })

      const closeIcon = screen.queryByTestId(TEST_ID_CLOSE)
      expect(closeIcon).toBeInTheDocument()
    })

    it('should render cancel button ', async () => {
      renderDialog({ cancelButton: cancel })

      const dialogButtonCancel = screen.getByText('Отменить')
      expect(dialogButtonCancel).toBeInTheDocument()
    })

    it('should trigger function onClick "Cancel" button', async () => {
      const cancelMock = jest.fn(() => {})

      const { user, getByText } = renderDialog({
        cancelButton: { ...cancel, onClick: cancelMock },
      })

      await user.click(getByText('Отменить'))

      expect(cancelMock).toHaveBeenCalledTimes(1)
    })

    it('should render error text ', async () => {
      renderDialog({ errorText: 'error', hasError: true })

      const errorText = screen.getByText('error')
      expect(errorText).toBeInTheDocument()
    })
  })
})
