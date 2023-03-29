import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import { Typography } from '@uiKit/components/Typography/Typography'

import { render, screen } from '@testEnv/utils'

import * as T from './Typography.types'

const propsValue: T.Props = {
  variant: 'PBody',
  children: 'Hello word',
}

describe('<Typography />', () => {
  const renderTypography = (props = propsValue) =>
    render(<Typography {...props} />)

  it('should render Typography', async () => {
    renderTypography()

    const typography = screen.getByText('Hello word')
    expect(typography).toBeInTheDocument()
  })

  it('should render Typography variant "PBody"', async () => {
    renderTypography()

    expect(document.querySelector('span')).toBeInTheDocument()
  })

  it('should render Typography variant "H1"', async () => {
    renderTypography({ ...propsValue, variant: 'H1' })

    expect(document.querySelector('h1')).toBeInTheDocument()
  })

  it('should render Typography variant "H2"', async () => {
    renderTypography({ ...propsValue, variant: 'H2' })

    expect(document.querySelector('h2')).toBeInTheDocument()
  })

  it('should render Typography variant "H3"', async () => {
    renderTypography({ ...propsValue, variant: 'H3' })

    expect(document.querySelector('h3')).toBeInTheDocument()
  })

  it('should render Typography variant "H4"', async () => {
    renderTypography({ ...propsValue, variant: 'H4' })

    expect(document.querySelector('h4')).toBeInTheDocument()
  })

  it('should render Typography variant "SUBTextLight"', async () => {
    renderTypography({ ...propsValue, variant: 'SUBTextLight' })

    expect(document.querySelector('span')).toBeInTheDocument()
  })

  it('should render Typography variant "Small"', async () => {
    renderTypography({ ...propsValue, variant: 'Small' })

    expect(document.querySelector('div')).toBeInTheDocument()
  })

  it('should render Typography variant "Button"', async () => {
    renderTypography({ ...propsValue, variant: 'Button' })

    expect(document.querySelector('div')).toBeInTheDocument()
  })

  it('should render Typography variant "Input"', async () => {
    renderTypography({ ...propsValue, variant: 'Input' })

    expect(document.querySelector('span')).toBeInTheDocument()
  })

  it('should render Typography variant "LabelBold"', async () => {
    renderTypography({ ...propsValue, variant: 'LabelBold' })

    expect(document.querySelector('div')).toBeInTheDocument()
  })

  it('should render Typography color', async () => {
    renderTypography({
      ...propsValue,
      color: theme.colors.pencil,
    })

    const typography = screen.getByText('Hello word')
    expect(typography).toHaveStyle(`color: ${theme.colors.pencil}`)
  })
})
