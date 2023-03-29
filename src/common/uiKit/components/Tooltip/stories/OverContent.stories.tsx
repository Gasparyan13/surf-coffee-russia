import * as T from '../Tooltip.types'
import { storyBookConfig, stories } from './main'

export default {
  title: 'Components/Tooltip/OverContent',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  belowLeftArgs,
  belowRightArgs,
  belowCenterArgs,
  aboveLeftArgs,
  aboveRightArgs,
  aboveCenterArgs,
  bigTextBelowLeftArgs,
} = stories

const commonProps: Partial<T.Props> = {
  ...defaultArgs,
  followCursor: true,
}

export const BelowLeft = Template.bind({})
BelowLeft.args = {
  ...commonProps,
  ...belowLeftArgs,
}

export const BelowRight = Template.bind({})
BelowRight.args = {
  ...commonProps,
  ...belowRightArgs,
}

export const BelowCenter = Template.bind({})
BelowCenter.args = {
  ...commonProps,
  ...belowCenterArgs,
}

export const AboveLeft = Template.bind({})
AboveLeft.args = {
  ...commonProps,
  ...aboveLeftArgs,
}

export const AboveRight = Template.bind({})
AboveRight.args = {
  ...commonProps,
  ...aboveRightArgs,
}

export const AboveCenter = Template.bind({})
AboveCenter.args = {
  ...commonProps,
  ...aboveCenterArgs,
}

export const BigTextBelowLeftArgs = Template.bind({})
BigTextBelowLeftArgs.args = {
  ...commonProps,
  ...bigTextBelowLeftArgs,
}
