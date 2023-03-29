import React from 'react'

import { SvgSearchIcon } from '@common/IconComponents/SvgSearchIcon'

import * as T from '../TextField.types'
import { stories, storyBookConfig } from './main'

export default {
  title: 'Components/FieldInputs/TextField/TextFieldWithIcon',
  ...storyBookConfig,
}

const {
  Template,
  defaultArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
  disabledArgs,
  errorArgs,
} = stories

const commonArgs: T.Props = {
  ...defaultArgs,
  InputProps: {
    endAdornment: <SvgSearchIcon />,
  },
}

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

export const Disabled = Template.bind({})
Disabled.args = {
  ...commonArgs,
  ...sizeLargeArgs,
  ...disabledArgs,
}

export const Error = Template.bind({})
Error.args = {
  ...commonArgs,
  ...sizeLargeArgs,
  ...errorArgs,
}
