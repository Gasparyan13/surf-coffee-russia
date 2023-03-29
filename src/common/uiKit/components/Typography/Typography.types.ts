import React from 'react'

export type FontVariant =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'PBody'
  | 'SUBTextLight'
  | 'Small'
  | 'Button'
  | 'Input'
  | 'LabelBold'

export type Props = {
  variant: FontVariant
  color?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>
