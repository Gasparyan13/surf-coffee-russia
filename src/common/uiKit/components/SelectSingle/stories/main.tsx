import { ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'

import { makeNumberedArray } from '@helpers'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { SelectSingle } from '@uiKit'

import * as T from '../SelectSingle.types'

const WithState = ({ size, ...props }: T.Props) => {
  const [value, setValue] = useState('')

  const onChange = (newValue: string) => {
    setValue(newValue)
  }

  const commonProps = { size, value, onChange, ...props }
  if (size === 'flex')
    return (
      <div style={{ width: 700, justifyContent: 'center' }}>
        <SelectSingle {...commonProps} />
      </div>
    )
  return <SelectSingle {...commonProps} />
}

export const Template = makeStoryTemplate(WithState)

export const storyBookConfig = {
  component: SelectSingle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof SelectSingle>

const defaultArgs: Partial<T.Props> = {
  menus: makeNumberedArray(50, 1).map((el) => ({
    key: el,
    value: el,
    text: `Опция №${el}`,
  })),
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

const smallOptionListArgs: Partial<T.Props> = {
  menus: makeNumberedArray(3, 1).map((el) => ({
    key: el,
    value: el,
    text: `Опция №${el}`,
  })),
}

const maxHeightArgs: Partial<T.Props> = {
  menuHeight: 200,
}

const helperTextArgs: Partial<T.Props> = {
  helperText: 'Helper text',
}

const errorArgs: Partial<T.Props> = {
  ...helperTextArgs,
  error: true,
}

export const stories = {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  smallOptionListArgs,
  maxHeightArgs,
  helperTextArgs,
  errorArgs,
}
