import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { ListRow } from '@uiKit'

import * as T from '../ListRow.types'

const WithState = ({ size, ...props }: T.Props) => {
  const commonProps = { size, ...props }
  if (size === 'flex')
    return (
      <div style={{ width: 700, justifyContent: 'center' }}>
        <ListRow {...commonProps} />
      </div>
    )
  return <ListRow {...commonProps} />
}

export const Template = makeStoryTemplate(WithState)

export const storyBookConfig = {
  component: ListRow,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'twitter' },
  },
} as ComponentMeta<typeof ListRow>

const defaultArgs: Partial<T.Props> = {
  text: 'Опция',
}

const sizeFlexArgs: Partial<T.Props> = {
  size: 'flex',
}

const sizeSmallArgs: Partial<T.Props> = {
  size: 'small',
  text: 'Опция с длинным текстом',
}

const sizeLargeArgs: Partial<T.Props> = {
  size: 'large',
}

const selectedArgs: Partial<T.Props> = {
  isSelected: true,
}

export const stories = {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  selectedArgs,
}
