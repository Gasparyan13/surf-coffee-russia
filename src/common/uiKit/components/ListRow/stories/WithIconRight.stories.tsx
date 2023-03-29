import React from 'react'

import { EllipseIcon } from '../../../../IconComponents/EllipseIcon/EllipseIcon'
import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/ListRow/With Icon (Right)',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  selectedArgs,
} = stories

const caseArgs = {
  rightIcon: <EllipseIcon />,
}

const commonArgs = { ...caseArgs, ...defaultArgs }

export const SizeFlex = Template.bind({})
SizeFlex.args = {
  ...commonArgs,
  ...sizeFlexArgs,
}

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  ...commonArgs,
  ...sizeSmallArgs,
}

export const SizeLarge = Template.bind({})
SizeLarge.args = {
  ...commonArgs,
  ...sizeLargeArgs,
}

export const Selected = Template.bind({})
Selected.args = {
  ...commonArgs,
  ...sizeLargeArgs,
  ...selectedArgs,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...commonArgs,
  ...sizeLargeArgs,
  disabled: true,
}
