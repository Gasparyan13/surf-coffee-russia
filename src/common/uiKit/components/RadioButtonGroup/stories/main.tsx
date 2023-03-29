import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { RadioButtonGroup } from '../RadioButtonGroup'
import * as T from '../RadioButtonGroup.types'
import { options } from '../mocks/option'

export const Template = makeStoryTemplate(RadioButtonGroup)

export const storyBookConfig = {
  component: RadioButtonGroup,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof RadioButtonGroup>

const defaultArgs: Partial<T.Props> = {
  label: 'Тип оплаты',
  name: 'paymentType',
  options,
}

const defaultSelectedArgs: Partial<T.Props> = {
  defaultValue: 'cashless',
}

const disabledArgs: Partial<T.Props> = {
  disabled: true,
}

const errorArgs: Partial<T.Props> = {
  error: 'Не выбран тип оплаты',
}

const horizontalArgs: Partial<T.Props> = {
  variant: 'horizontal',
}

const verticalArgs: Partial<T.Props> = {
  variant: 'vertical',
}

export const stories = {
  Template,
  defaultArgs,
  disabledArgs,
  errorArgs,
  horizontalArgs,
  verticalArgs,
  defaultSelectedArgs,
}
