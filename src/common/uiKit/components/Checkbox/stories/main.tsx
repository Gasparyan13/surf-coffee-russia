import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Checkbox } from '../Checkbox'
import * as T from '../Checkbox.types'

export const Template = makeStoryTemplate(Checkbox)

export const storyBookConfig = {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Checkbox>

const defaultArgs: Partial<T.Props> = {
  name: 'name',
  variant: 'basic',
}

const disabledArgs: Partial<T.Props> = {
  disabled: true,
}

const labelArgs: Partial<T.Props> = {
  label: 'Label',
}

const checkedArgs: Partial<T.Props> = {
  checked: true,
}

const middleCheckboxArgs: Partial<T.Props> = {
  variant: 'middle',
}

export const stories = {
  Template,
  defaultArgs,
  disabledArgs,
  checkedArgs,
  middleCheckboxArgs,
  labelArgs,
}
