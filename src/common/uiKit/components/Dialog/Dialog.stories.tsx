import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

export default {
  title: 'Templates/Dialog',
  component: Dialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Dialog>

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

const Template = makeStoryTemplate(Dialog)

export const Default = Template.bind({})
Default.args = {
  successButton: success,
  title: 'Default dialog',
  isOpen: true,
}

export const ContentAndIcons = Template.bind({})
ContentAndIcons.args = {
  successButton: success,
  cancelButton: cancel,
  title: 'Content and Icons',
  isOpen: true,
  hasCloseIcon: true,
  hasIconBack: true,
  children: <div>Content</div>,
}

export const ConfirmationDialog = Template.bind({})
ConfirmationDialog.args = {
  successButton: { ...success, text: 'Да' },
  cancelButton: { ...cancel, text: 'Нет' },
  title: 'Confirmation dialog',
  isOpen: true,
}

export const ContentAndErrorText = Template.bind({})
ContentAndErrorText.args = {
  successButton: { ...success, text: 'Сохранить' },
  cancelButton: { ...cancel, text: 'Отменить' },
  title: 'Content and error text ',
  isOpen: true,
  errorText: 'Text error or something else',
  children: <div>Content</div>,
  hasError: true,
}

export const LargeDialog = Template.bind({})
LargeDialog.args = {
  successButton: success,
  cancelButton: cancel,
  title: 'Large dialog',
  isOpen: true,
  errorText: 'Text error or something else',
  hasCloseIcon: true,
  children: <div>Content</div>,
  size: 'large',
}
