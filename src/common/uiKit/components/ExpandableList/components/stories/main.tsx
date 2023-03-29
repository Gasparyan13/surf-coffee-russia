import { Grid, GridSize } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TextField } from '../../../FieldInputs/TextField'
import { ExtendableListItem } from '../ExtendableListItem'
import * as T from '../ExtendableListItem.types'

const OneRowContent = (
  <Grid container>
    <Grid item xs={12}>
      <TextField labelText="First" placeholder="add some text" />
    </Grid>
  </Grid>
)

const TwoRowsContent = (
  <Grid container>
    <Grid item xs={12}>
      <Grid container justifyContent="space-between">
        <Grid item xs={6}>
          <TextField labelText="First" placeholder="add some text" />
        </Grid>
        <Grid item xs={5.21 as GridSize}>
          <TextField labelText="Second" placeholder="add some text" />
        </Grid>
      </Grid>
    </Grid>
    <Grid item paddingTop="16px" xs={12}>
      <TextField labelText="Third" placeholder="add some text" />
    </Grid>
  </Grid>
)

const ManyRowsContent = (
  <Grid container>
    <Grid item paddingTop="16px" xs={12}>
      <TextField labelText="First" placeholder="add some text" />
    </Grid>
    <Grid item paddingTop="16px" xs={12}>
      <TextField labelText="Second" placeholder="add some text" />
    </Grid>
    <Grid item paddingTop="16px" xs={12}>
      <TextField labelText="Third" placeholder="add some text" />
    </Grid>
  </Grid>
)

const ExtendableListItemTemplate = ({ children, ...rest }: T.Props) => (
  <ExtendableListItem {...rest}>{children}</ExtendableListItem>
)

const Template = makeStoryTemplate(ExtendableListItemTemplate)

export const storyBookConfig = {
  component: ExtendableListItem,
  parameters: {
    layout: 'centered',
    actions: {
      argTypesRegex: '^on.*',
    },
  },
} as ComponentMeta<typeof ExtendableListItem>

const defaultArgs: Partial<T.Props> = {
  canAdd: true,
  canRemove: true,
}

const oneRowArgs: Partial<T.Props> = {
  children: OneRowContent,
}

const twoRowsArgs: Partial<T.Props> = {
  children: TwoRowsContent,
}

const manyRowsArgs: Partial<T.Props> = {
  children: ManyRowsContent,
}

const parameters = {
  jest: ['ExtendableListItem.test.tsx'],
}

export const stories = {
  Template,
  defaultArgs,
  oneRowArgs,
  twoRowsArgs,
  manyRowsArgs,
  parameters,
}
