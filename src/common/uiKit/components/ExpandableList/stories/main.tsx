import { Grid, GridSize } from '@mui/material'
import { ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'

import { uuid } from '@helpers/uuid'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TextField } from '../../FieldInputs/TextField'
import { ExtendableList } from '../ExtendableList'
import * as T from '../ExtendableList.types'

const RenderComponent = () => {
  return (
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
}

const RenderLargeComponent = () => {
  return (
    <Grid container minWidth="70vw">
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
}

const RenderSmallComponent = () => {
  return (
    <Grid container maxWidth="10vw">
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
}

const createItem = () => ({
  id: uuid(),
})

const ExtendableListTemplate = ({
  onChange,
  renderContent,
  items,
}: T.Props<{ id: string }>) => {
  const [storedItems, setItems] = useState(items)

  const handleChange = (newItems: typeof items) => {
    onChange(newItems)
    setItems(newItems)
  }

  return (
    <ExtendableList
      createItem={createItem}
      items={storedItems}
      renderContent={renderContent}
      onChange={handleChange}
    />
  )
}

export const Template = makeStoryTemplate(ExtendableListTemplate)

export const storyBookConfig = {
  component: ExtendableList,
  parameters: {
    layout: 'centered',
    actions: {
      argTypesRegex: '^on.*',
    },
  },
} as ComponentMeta<typeof ExtendableList>

const defaultArgs: Partial<T.Props<{ id: string }>> = {
  renderContent: RenderComponent,
  createItem,
  items: [createItem()],
}

const smallComponentArgs: Partial<T.Props<{ id: string }>> = {
  renderContent: RenderSmallComponent,
}

const largeComponentArgs: Partial<T.Props<{ id: string }>> = {
  renderContent: RenderLargeComponent,
}

const manyItemsArgs: Partial<T.Props<{ id: string }>> = {
  items: [createItem(), createItem(), createItem()],
}

export const stories = {
  Template,
  defaultArgs,
  smallComponentArgs,
  largeComponentArgs,
  manyItemsArgs,
}
