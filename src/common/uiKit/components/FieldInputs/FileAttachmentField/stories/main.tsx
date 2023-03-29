import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { FileAttachmentField } from '../FileAttachmentField'
import * as T from '../FileAttachmentField.types'

const WithState = ({ size, ...props }: T.Props) => {
  const commonProps = { size, ...props }
  if (size === 'flex')
    return (
      <div style={{ width: 700, justifyContent: 'center' }}>
        <FileAttachmentField {...commonProps} />
      </div>
    )
  return <FileAttachmentField {...commonProps} />
}

export const Template = makeStoryTemplate(WithState)

export const storyBookConfig = {
  component: FileAttachmentField,
  parameters: {
    layout: 'centered',
  },
  actions: {
    argTypesRegex: '^on.*',
  },
} as ComponentMeta<typeof FileAttachmentField>

const defaultArgs: Partial<T.Props> = {
  placeholder: 'Placeholder',
}

const disabledArgs: Partial<T.Props> = {
  disabled: true,
}

const valueArgs: Partial<T.Props> = {
  value: new File([], 'test-name.pdf'),
}

const helperTextArgs: Partial<T.Props> = {
  helperText: 'Helper text',
}

const errorArgs: Partial<T.Props> = {
  ...helperTextArgs,
  error: true,
}

const labelArgs: Partial<T.Props> = {
  labelText: 'Label',
}

const sizeFlexArgs: Partial<T.Props> = {
  size: 'flex',
}

const sizeSmallArgs: Partial<T.Props> = {
  size: 'small',
}

const sizeLargeArgs: Partial<T.Props> = {
  size: 'large',
}

export const stories = {
  Template,
  defaultArgs,
  disabledArgs,
  helperTextArgs,
  errorArgs,
  valueArgs,
  labelArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
}
