import { ComponentMeta } from '@storybook/react'
import React from 'react'

import styled from '@common/styled'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Typography } from '../../..'
import { Tooltip } from '../Tooltip'
import * as T from '../Tooltip.types'

const Content = styled.div`
  width: 80px;
  height: 40px;
  background-color: #eeeff2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 40px;
  border-radius: 20px;
`

const WithContent = (props: T.Props) => (
  <Tooltip {...props}>
    <Content>
      <Typography variant="H4">Content</Typography>
    </Content>
  </Tooltip>
)

export const Template = makeStoryTemplate(WithContent)

export const storyBookConfig = {
  component: Tooltip,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Tooltip>

const defaultArgs: Partial<T.Props> = {
  title: 'Test',
}

const belowLeftArgs: Partial<T.Props> = {
  placement: 'below-left',
}

const belowRightArgs: Partial<T.Props> = {
  placement: 'below-right',
}

const belowCenterArgs: Partial<T.Props> = {
  placement: 'below-center',
}

const aboveLeftArgs: Partial<T.Props> = {
  placement: 'above-left',
}

const aboveRightArgs: Partial<T.Props> = {
  placement: 'above-right',
}

const aboveCenterArgs: Partial<T.Props> = {
  placement: 'above-center',
}

const bigTextBelowLeftArgs: Partial<T.Props> = {
  title:
    // eslint-disable-next-line max-len
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque quibusdam id, hic illum voluptas at labore debitis ducimus vero! Corporis perspiciatis earum necessitatibus soluta sed fuga quaerat adipisci labore amet!',
  ...belowLeftArgs,
}

export const stories = {
  Template,
  defaultArgs,
  belowLeftArgs,
  belowRightArgs,
  belowCenterArgs,
  aboveLeftArgs,
  aboveRightArgs,
  aboveCenterArgs,
  bigTextBelowLeftArgs,
}
