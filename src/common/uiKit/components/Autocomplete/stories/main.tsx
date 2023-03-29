import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { Autocomplete } from '../Autocomplete'
import * as T from '../Autocomplete.types'

const options: T.AutocompleteItem[] = [
  { label: 'The Shawshank Redemption', value: 1994, key: 1 },
  { label: 'The Godfather', value: 1972, key: 2 },
  { label: 'The Godfather: Part II', value: 1974, key: 3 },
  { label: 'The Dark Knight', value: 2008, key: 4 },
  { label: '12 Angry Men', value: 1957, key: 5 },
  { label: "Schindler's List", value: 1993, key: 6 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    value: 2003,
    key: 7,
  },
  { label: 'The Good, the Bad and the Ugly', value: 1966, key: 8 },
  { label: 'Fight Club', value: 1999, key: 9 },
]

const WithState = ({ size, ...props }: T.Props<T.AutocompleteItem>) => {
  const commonProps = { size, ...props }
  if (size === 'flex')
    return (
      <div style={{ width: '50vw', maxWidth: 700, justifyContent: 'center' }}>
        <Autocomplete {...commonProps} options={options} />
      </div>
    )
  return <Autocomplete {...commonProps} options={options} />
}

export const Template = makeStoryTemplate(WithState)

export const storyBookConfig = {
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    jest: ['Autocomplete.test.tsx'],
  },
  actions: {
    argTypesRegex: '^on.*',
  },
} as ComponentMeta<typeof Autocomplete>

const disabledArgs: Partial<T.Props<T.AutocompleteItem>> = {
  disabled: true,
}

const valueArgs: Partial<T.Props<T.AutocompleteItem>> = {
  value: options[0],
}

const helperTextArgs: Partial<T.Props<T.AutocompleteItem>> = {
  helperText: 'Helper text',
}

const errorArgs: Partial<T.Props<T.AutocompleteItem>> = {
  ...helperTextArgs,
  error: true,
}

const labelArgs: Partial<T.Props<T.AutocompleteItem>> = {
  labelText: 'Label',
}

const sizeFlexArgs: Partial<T.Props<T.AutocompleteItem>> = {
  size: 'flex',
}

const sizeSmallArgs: Partial<T.Props<T.AutocompleteItem>> = {
  size: 'small',
}

const sizeLargeArgs: Partial<T.Props<T.AutocompleteItem>> = {
  size: 'large',
}

const defaultArgs: Partial<T.Props<T.AutocompleteItem>> = {
  placeholder: 'Placeholder',
  ...sizeFlexArgs,
}

export const stories = {
  Template,
  defaultArgs,
  disabledArgs,
  helperTextArgs,
  errorArgs,
  valueArgs,
  labelArgs,
  sizeFlexArgs,
  sizeSmallArgs,
  sizeLargeArgs,
}
