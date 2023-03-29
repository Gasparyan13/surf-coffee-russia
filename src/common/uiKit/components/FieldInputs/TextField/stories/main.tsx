import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TextField } from '../TextField'
import * as T from '../TextField.types'

const WithState = ({ size, ...props }: T.Props) => {
  const commonProps = { size, ...props }
  if (size === 'flex')
    return (
      <div style={{ width: 700, justifyContent: 'center' }}>
        <TextField {...commonProps} />
      </div>
    )
  return <TextField {...commonProps} />
}

export const Template = makeStoryTemplate(WithState)

export const storyBookConfig = {
  component: TextField,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof TextField>

const defaultArgs: Partial<T.Props> = {
  placeholder: 'Placeholder',
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

const disabledArgs: Partial<T.Props> = {
  disabled: true,
}

const helperTextArgs: Partial<T.Props> = {
  helperText: 'Helper text',
}

const errorArgs: Partial<T.Props> = {
  error: true,
}

export const stories = {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  disabledArgs,
  helperTextArgs,
  errorArgs,
}
