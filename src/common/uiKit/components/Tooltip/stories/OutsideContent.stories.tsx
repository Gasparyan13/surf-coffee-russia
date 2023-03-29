import { storyBookConfig, stories } from './main'

export default {
  title: 'Components/Tooltip/OutsideContent',
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

export const BelowLeft = Template.bind({})
BelowLeft.args = {
  ...defaultArgs,
  ...belowLeftArgs,
}

export const BelowRight = Template.bind({})
BelowRight.args = {
  ...defaultArgs,
  ...belowRightArgs,
}

export const BelowCenter = Template.bind({})
BelowCenter.args = {
  ...defaultArgs,
  ...belowCenterArgs,
}

export const AboveLeft = Template.bind({})
AboveLeft.args = {
  ...defaultArgs,
  ...aboveLeftArgs,
}

export const AboveRight = Template.bind({})
AboveRight.args = {
  ...defaultArgs,
  ...aboveRightArgs,
}

export const AboveCenter = Template.bind({})
AboveCenter.args = {
  ...defaultArgs,
  ...aboveCenterArgs,
}

export const BigTextBelowLeftArgs = Template.bind({})
BigTextBelowLeftArgs.args = {
  ...defaultArgs,
  ...bigTextBelowLeftArgs,
}
