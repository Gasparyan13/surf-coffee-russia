import { ComponentMeta } from '@storybook/react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Typography } from './Typography'

const children =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem qui dolorum laborum voluptas, ex laboriosam quos et est perferendis aut odit maiores omnis sint esse quaerat? Iusto modi eveniet temporibus minima, dolores itaque fugiat. Necessitatibus, modi autem distinctio culpa fuga tempora exercitationem quidem repellat. Nesciunt, aliquam eaque consequuntur, eos consequatur voluptates non eius blanditiis labore molestias soluta aperiam unde ipsa dolore sapiente reprehenderit saepe expedita quaerat voluptatem quas dolorum, porro magni quasi possimus? Minus doloribus cumque sit facilis sint quos id modi, labore impedit consequatur at praesentium itaque asperiores cupiditate animi repellendus, iste in sunt! Fuga consectetur ut incidunt corporis?'

export default {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Typography>

const Template = makeStoryTemplate(Typography)

export const H1 = Template.bind({})
H1.args = {
  children: children.slice(0, 240),
  variant: 'H1',
}

export const H2 = Template.bind({})
H2.args = {
  children,
  variant: 'H2',
}

export const H3 = Template.bind({})
H3.args = {
  children,
  variant: 'H3',
}

export const H4 = Template.bind({})
H4.args = {
  children,
  variant: 'H4',
}

export const PBody = Template.bind({})
PBody.args = {
  children,
  variant: 'PBody',
}

export const SUBTextLight = Template.bind({})
SUBTextLight.args = {
  children,
  variant: 'SUBTextLight',
}

export const Small = Template.bind({})
Small.args = {
  children,
  variant: 'Small',
}

export const Button = Template.bind({})
Button.args = {
  children,
  variant: 'Button',
}

export const Input = Template.bind({})
Input.args = {
  children,
  variant: 'Input',
}

export const LabelBold = Template.bind({})
LabelBold.args = {
  children,
  variant: 'LabelBold',
}
