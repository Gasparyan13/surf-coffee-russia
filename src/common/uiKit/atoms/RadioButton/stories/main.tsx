import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { RadioButton } from '../RadioButton'
import * as T from '../RadioButton.types'

export const Template = makeStoryTemplate(RadioButton)

export const storyBookConfig = {
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof RadioButton>

const defaultArgs: Partial<T.Props> = {
  label: 'Label',
  id: 'id',
  name: 'name',
}

const disabledArgs: Partial<T.Props> = {
  disabled: true,
}

const checkedArgs: Partial<T.Props> = {
  value: '1',
}

const errorArgs: Partial<T.Props> = {
  error: true,
}

export const stories = {
  Template,
  defaultArgs,
  disabledArgs,
  checkedArgs,
  errorArgs,
}
